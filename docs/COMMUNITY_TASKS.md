# Community Presence Feature — Task List

Spec: [BACKEND_ARCHITECTURE_COMBINED.md](BACKEND_ARCHITECTURE_COMBINED.md)

Tasks are ordered by dependency. Each task is independently testable before moving to the next.

Status markers: `[ ]` todo · `[x]` done · `[-]` skipped

---

## Backend

### B1 — Initialize backend project

**Start**: Empty `backend/` directory
**End**: Express server starts on port 3000, responds to any request

Steps:
- Create `backend/` with `package.json`, install `express`, `better-sqlite3`, `dotenv`
- Create `src/index.js` — starts Express, loads `.env`, listens on `PORT` (default 3000)
- Create `src/config.js` — exports `PORT`, `APP_HMAC_SECRET`, `IP_SALT`, `NODE_ENV`
- Create `.env` (gitignored) with placeholder values

**Done when**: `node src/index.js` starts without errors and `curl localhost:3000` returns a response (any 404 is fine).

---

### B2 — Database schema

**Start**: Task B1 complete
**End**: SQLite database file is created on startup with both tables present

Steps:
- Create `src/services/db.js` — opens (or creates) `community.db` via `better-sqlite3`
- Run `CREATE TABLE IF NOT EXISTS heartbeats (id, region, received_at)`
- Run `CREATE INDEX IF NOT EXISTS idx_heartbeats_region_time ON heartbeats (region, received_at)`
- Run `CREATE TABLE IF NOT EXISTS region_weather (region, condition, temperature, updated_at)`
- Export the `db` instance

**Done when**: Server start creates `community.db`; running `.tables` in the SQLite shell shows both tables.

---

### B3 — `GET /health` endpoint

**Start**: Task B2 complete
**End**: Health endpoint returns correct JSON

Steps:
- Create `src/routes/health.js` — returns `{ status: "ok", version: "1.0.0", uptime: process.uptime() }`
- Register route in `src/index.js` as `GET /v1/health`
- No authentication required on this route

**Done when**: `curl localhost:3000/v1/health` returns `{"status":"ok","version":"1.0.0","uptime":...}` with status 200.

---

### B4 — `POST /heartbeat` — validation and INSERT (no auth yet)

**Start**: Task B3 complete
**End**: Valid heartbeats are stored; invalid ones are rejected with correct status codes

Steps:
- Create `src/config.js` entry `VALID_REGIONS` — array of 16 SMHI station identifiers
- Create `src/routes/heartbeat.js`:
  - Parse `region` from request body
  - Return `400` with `{ error: "unknown_region" }` if region not in `VALID_REGIONS`
  - INSERT `(region, Math.floor(Date.now()/1000))` into `heartbeats`
  - Return `200` with `{ ok: true }`
- Register route in `src/index.js` as `POST /v1/heartbeat`
- Add `express.json()` middleware

**Done when**:
- `curl -X POST localhost:3000/v1/heartbeat -d '{"region":"stockholm"}' -H 'Content-Type: application/json'` → `{"ok":true}`
- `curl -X POST localhost:3000/v1/heartbeat -d '{"region":"nowhere"}' ...` → 400

---

### B5 — Heartbeat cleanup job

**Start**: Task B4 complete
**End**: Rows older than 60 minutes are automatically deleted

Steps:
- Create `src/services/cleanup.js` — exports `startCleanupJob(db)`
- Deletes rows where `received_at < now - 3600` using a parameterised query
- Runs immediately on startup, then every 15 minutes via `setInterval`
- Call `startCleanupJob(db)` in `src/index.js`

**Done when**: Manually insert a row with `received_at = 0` (epoch), wait for cleanup cycle or trigger manually, verify row is deleted. Log message confirms deletion count.

---

### B6 — `GET /regions` — active user counts (no weather yet)

**Start**: Task B5 complete
**End**: Endpoint returns regions with ≥ 3 heartbeats in the last 30 minutes

Steps:
- Create `src/routes/regions.js`:
  - Query `heartbeats` for rows where `received_at > now - 1800`, grouped by `region`, `HAVING count >= 3`
  - Return `{ updated_at, window_minutes: 30, min_display_count: 3, regions: [...] }`
  - Each region entry: `{ region, display_name, latitude, longitude, active_users, weather: null }`
  - Include a static lookup map of region → `{ display_name, latitude, longitude }` for the 16 SMHI stations
- Register route as `GET /v1/regions`

**Done when**:
- Insert 3+ heartbeats for `"stockholm"` with current timestamps → `GET /v1/regions` returns stockholm in the array
- Insert 2 heartbeats for `"kiruna"` → kiruna is absent from the response
- Insert 3 heartbeats with `received_at = 0` → they fall outside the 30-min window and are excluded

---

### B7 — SMHI weather proxy and cache

**Start**: Task B6 complete
**End**: Server fetches weather from SMHI and caches it per region for 10 minutes

Steps:
- Create `src/services/smhi.js`:
  - `getWeatherForRegion(db, region)` — checks `region_weather` table; if `updated_at > now - 600` return cached row
  - Otherwise fetch from SMHI API for that station's coordinates, parse `condition` and `temperature`, upsert into `region_weather`, return result
  - Map SMHI weather symbol codes to `sunny | cloudy | rainy | snowy | stormy`
- Wire into `GET /regions`: for each active region call `getWeatherForRegion(db, region)` and include result in the `weather` field

**Done when**: `GET /v1/regions` returns a `weather: { condition, temperature }` object for each active region. Calling it twice within 10 minutes only triggers one SMHI fetch per region (verify with log or test counter).

---

### B8 — HMAC authentication middleware

**Start**: Task B7 complete
**End**: Requests without a valid signature are rejected; valid ones pass through

Steps:
- Create `src/middleware/auth.js`:
  - Reads `X-App-Id`, `X-Timestamp`, `X-Signature` from request headers
  - Returns `401` if `X-App-Id !== "vaderochklader-v1"`
  - Returns `401` if `|now - X-Timestamp| > 300` seconds
  - Reconstructs `string_to_sign = METHOD\nPATH\nTIMESTAMP\nSHA256(body)`
  - Computes expected signature with `crypto.timingSafeEqual`; returns `401` on mismatch
- Apply middleware to `POST /v1/heartbeat` and `GET /v1/regions` (not `/health`)

**Done when**:
- Request with valid headers → passes through to route handler
- Request with missing headers → 401
- Request with timestamp > 5 min old → 401
- Request with tampered body → 401

---

### B9 — Rate limiting middleware

**Start**: Task B8 complete
**End**: Endpoints enforce per-IP rate limits

Steps:
- Create `src/middleware/rateLimit.js`:
  - Implements in-memory sliding window using a `Map`
  - Hashes IP with SHA-256 + `IP_SALT` before using as key (never store raw IP)
  - `POST /heartbeat`: max 1 request per IP per 5 minutes → 429 on excess
  - `GET /regions`: max 10 requests per IP per minute → 429 on excess
  - Returns `{ error: "rate_limit_exceeded", retryAfter: <seconds> }` on 429
- Apply middleware in `src/index.js` before route handlers

**Done when**:
- Two rapid `POST /heartbeat` requests from same IP → second gets 429
- Eleven rapid `GET /regions` requests → eleventh gets 429
- Requests from different IPs are counted independently

---

### B10 — Deploy backend to Railway

**Start**: Task B9 complete
**End**: Server is live at `https://api.vaderochklader.se/v1` (or staging URL)

Steps:
- Add `Procfile` or `railway.json` start command (`node src/index.js`)
- Add `.gitignore` entries for `node_modules`, `.env`, `*.db`
- Set environment variables in Railway dashboard: `APP_HMAC_SECRET`, `IP_SALT`, `NODE_ENV=production`, `PORT`
- Push to Railway; verify deploy succeeds
- Point `api.vaderochklader.se` DNS to Railway deployment

**Done when**: `curl https://api.vaderochklader.se/v1/health` returns `{"status":"ok",...}` from the live URL.

---

## Client App

### C1 — Environment configuration

**Start**: Task B10 complete (staging URL available)
**End**: App reads `APP_API_URL` and `APP_HMAC_SECRET` from environment at build time

Steps:
- Install `react-native-dotenv` (or confirm `expo-constants` `extra` pattern is already in place)
- Add `APP_API_URL` and `APP_HMAC_SECRET` to the gitignored `.env` at project root
- Add both keys to `app.json` → `extra` block, reading from `process.env`
- Verify values are accessible via `Constants.expoConfig.extra`

**Done when**: `console.log(Constants.expoConfig.extra.appApiUrl)` in any component prints the correct URL in dev build. `.env` is in `.gitignore`.

---

### C2 — HMAC signing utility

**Start**: Task C1 complete
**End**: A `sign(method, path, body)` function produces correct HMAC signatures

Steps:
- Install a React Native-compatible HMAC+SHA256 library (e.g. `react-native-quick-crypto` or `expo-crypto`)
- Create `src/services/communityApi.js` with only the `sign()` function for now
- Write a quick manual test: call `sign('POST', '/v1/heartbeat', '{"region":"stockholm"}')` and verify the output matches an expected value computed independently (e.g. in Node.js with `crypto`)

**Done when**: `sign()` output matches a reference value computed with the same key and inputs in Node.js.

---

### C3 — `sendHeartbeat()` client function

**Start**: Task C2 complete
**End**: Client can POST a heartbeat to the live backend

Steps:
- Add `sendHeartbeat(region)` to `src/services/communityApi.js`:
  - Builds signed request with headers `X-App-Id`, `X-Timestamp`, `X-Signature`
  - POSTs `{ region }` to `APP_API_URL + /v1/heartbeat`
  - Returns parsed JSON response
  - Silently swallows errors (community feature must never crash the main app)

**Done when**: Calling `sendHeartbeat("stockholm")` from a test component or `console.log` call returns `{ ok: true }` and the backend `heartbeats` table gains a row.

---

### C4 — `fetchRegions()` client function

**Start**: Task C3 complete
**End**: Client can GET regions from the live backend

Steps:
- Add `fetchRegions()` to `src/services/communityApi.js`:
  - Builds signed GET request
  - Returns parsed `{ regions, updated_at, ... }` response
  - Silently swallows errors (returns empty regions array on failure)

**Done when**: Calling `fetchRegions()` returns the regions array from the live backend (may be empty if no active users — that is fine).

---

### C5 — `useCommunity.js` hook — heartbeat lifecycle

**Start**: Task C4 complete
**End**: App sends a heartbeat on foreground and every 10 minutes; stops when backgrounded

Steps:
- Create `src/hooks/useCommunity.js`
- Hook takes `region` (the current SMHI station name, already available from `useLocation`)
- On mount (or when `region` becomes available): call `sendHeartbeat(region)`
- Start a 10-minute `setInterval` calling `sendHeartbeat(region)`
- Subscribe to `AppState` changes: clear interval when state goes to `background`, restart when it returns to `active`
- Clear interval on unmount

**Done when**: Open the app → heartbeat row appears in the backend DB. Background the app for >10 min → no new rows during that period. Foreground again → new row appears.

---

### C6 — Add community translation keys

**Start**: Task C5 complete (or can be done in parallel)
**End**: Three new keys exist in all 6 language files with correct translations

Steps:
- Add to `src/translations/index.js` in every language block (`sv`, `en`, `de`, `fi`, `se`, `ko`):
  - `communityCirclesLabel` — "Circles show how many friends are using the app in each area"
  - `communityUsersCount` — "{count} users" (uses variable substitution)
  - `communityLoading` — "Loading community data..."

**Done when**: `t('communityCirclesLabel')` returns a non-empty string in every language without falling back to Swedish.

---

### C7 — Community circles in `SwedenMap.js`

**Start**: Task C6 complete
**End**: Map renders semi-transparent circles for active regions; does not crash when prop is absent

Steps:
- Add optional prop `communityRegions` (default `[]`) to `SwedenMap`
- For each entry in `communityRegions`, convert `{ latitude, longitude }` to SVG coordinates using the existing `latLngToSvg` function
- Render beneath existing city markers:
  - Filled circle: `rgba(74,144,226,0.3)`, radius = `20 + Math.min(count, 50) * 0.8`
  - Stroke circle: `#4A90E2`, strokeWidth 2, no fill
  - Weather emoji centred above count numeral

**Done when**:
- Passing `communityRegions={[{ region:"stockholm", latitude:59.33, longitude:18.07, active_users:14, weather:{ condition:"cloudy", temperature:2 } }]}` renders a visible circle on the map
- Passing `communityRegions={[]}` or omitting the prop renders the map unchanged

---

### C8 — Wire community data into `MapModal.js`

**Start**: Task C7 complete
**End**: Map modal fetches regions on open and displays live circles

Steps:
- In `MapModal.js`: on component mount call `fetchRegions()` from `communityApi.js`
- Store result in local state `communityRegions` (default `[]`)
- Pass `communityRegions` to `SwedenMap`
- Show `t('communityLoading')` as a small subtitle beneath the map while the fetch is in progress
- Show `t('communityCirclesLabel')` as a subtitle once loaded (or if result is empty)
- Fetch errors are silently ignored — map still renders normally

**Done when**: Open the map modal → loading label appears briefly → (if backend has ≥3 active users in any region) circles appear on the map. If no active regions, map looks identical to before this change.

---

## Summary

| # | Task | Deliverable |
|---|---|---|
| B1 | Init backend project | Express server starts |
| B2 | DB schema | SQLite tables created on startup |
| B3 | GET /health | Returns `{"status":"ok"}` |
| B4 | POST /heartbeat | Validates region, stores row |
| B5 | Cleanup job | Deletes rows older than 60 min |
| B6 | GET /regions | Returns counts ≥ 3, with 30-min window |
| B7 | SMHI weather proxy | Weather included in /regions, cached 10 min |
| B8 | HMAC auth middleware | Invalid signatures → 401 |
| B9 | Rate limiting | Excess requests → 429 |
| B10 | Deploy | Live at production URL |
| C1 | Env config | App reads API URL + secret from .env |
| C2 | HMAC signing utility | sign() output matches reference |
| C3 | sendHeartbeat() | Row appears in backend DB |
| C4 | fetchRegions() | Returns live regions array |
| C5 | useCommunity hook | Heartbeat fires on foreground, pauses on background |
| C6 | Translation keys | 3 new keys in all 6 languages |
| C7 | Map circles | SwedenMap renders community circles |
| C8 | MapModal wiring | Map fetches and displays live data on open |
