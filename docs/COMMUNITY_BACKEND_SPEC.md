# Community Presence Backend — Specification

**Project**: Väder & Kläder (Weather & Clothes App)
**Feature**: Anonymous regional presence display with weather data
**Date**: 2026-02-11
**Status**: Draft — for review

---

## 1. Overview

This document specifies a lightweight backend service that lets the app display how many users are active in different regions of Sweden, together with regional weather data. The goal is to provide a sense of community for children using the app — "others near you are also checking the weather today".

### Core design principles

- **No exact location is ever stored or transmitted.** The client rounds its position to the nearest SMHI weather station (16 regions, ~50–200 km radius) before sending anything.
- **No user identity.** No accounts, no device IDs, no persistent session tokens. A request contains nothing that can be linked back to an individual.
- **Aggregate-only display.** Only regions with at least 3 active users are shown on the map. Fewer than 3 always renders as blank.
- **Time-limited presence.** A user is "active" only while the app is open, plus a 30-minute grace window. Counts automatically decay.
- **GDPR / COPPA compliant by design.** No personal data is collected or processed.

---

## 2. Privacy Model

### Location anonymisation (client side)

The client app already calculates the nearest SMHI weather station from its GPS position. This station name (e.g. `"stockholm"`, `"kiruna"`) is the only location data ever sent to the backend.

| Data point | What is sent | Precision |
|---|---|---|
| Device GPS | Not sent | — |
| SMHI station name | `"gothenburg"` | ~50–200 km radius |
| User identity | Not sent | — |
| IP address | Standard HTTP (not logged or stored) | — |

The 16 SMHI stations and their approximate coverage radii:

```
Stockholm    Göteborg     Malmö        Uppsala      Kiruna
Linköping    Växjö        Karlstad     Västerås     Örebro
Lund         Helsingborg  Kalmar       Visby        Luleå
Sundsvall
```

Each station covers a radius of roughly 50–200 km — far too coarse to identify an individual's position.

### Minimum display threshold

Regions with fewer than 3 active heartbeats in the 30-minute window are treated as zero and not rendered on the map. This prevents de-anonymisation when user counts are very low.

---

## 3. Backend Architecture

### Technology stack (suggested)

| Component | Recommendation | Rationale |
|---|---|---|
| Runtime | Node.js 20 LTS | Matches JS ecosystem of the app |
| Framework | Express 4 | Minimal, well-understood |
| Database | SQLite (via `better-sqlite3`) | Zero-config, suitable for expected load; swap for PostgreSQL if needed |
| Hosting | Any VPS or PaaS (Fly.io, Railway, Render) | Stateless server + single SQLite file |
| SMHI proxy | Built-in | Cache SMHI responses per region, serve to clients |

### Database schema

```sql
-- One row per active heartbeat tick
CREATE TABLE heartbeats (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  region      TEXT    NOT NULL,    -- SMHI station name, e.g. "stockholm"
  received_at INTEGER NOT NULL     -- Unix timestamp (seconds)
);

-- Index for fast window queries
CREATE INDEX idx_heartbeats_region_time ON heartbeats (region, received_at);

-- Cached weather data per region
CREATE TABLE region_weather (
  region      TEXT    PRIMARY KEY,
  condition   TEXT,               -- "sunny", "cloudy", "rainy", "snowy", "stormy"
  temperature REAL,               -- degrees Celsius
  updated_at  INTEGER NOT NULL    -- Unix timestamp
);
```

No personal data is stored in any table.

### Data retention

- **Heartbeat rows older than 60 minutes** are deleted by a cleanup job that runs every 15 minutes.
- The database never accumulates significant data volume.

---

## 4. REST API

**Base URL**: `https://api.vaderochklader.se/v1`
*(or self-hosted equivalent)*

All requests must include authentication headers (see §5). All responses are JSON.

---

### 4.1 POST `/heartbeat`

Registers that a user is currently active in a region.

**When called**: On app foreground, then every 10 minutes while the app remains open.

**Request body**

```json
{
  "region": "stockholm"
}
```

| Field | Type | Description |
|---|---|---|
| `region` | string | SMHI station identifier (lowercase, one of the 16 valid values) |

**Response `200 OK`**

```json
{
  "ok": true
}
```

**Response `400 Bad Request`** — unknown region name

```json
{
  "error": "unknown_region",
  "message": "Region must be one of the 16 valid SMHI station identifiers"
}
```

**Notes**

- The server records `(region, now())` and nothing else.
- Duplicate heartbeats from the same IP within 5 minutes are silently accepted (idempotent) but rate-limited beyond that.
- The server does **not** link successive heartbeats. Each is anonymous.

---

### 4.2 GET `/regions`

Returns active user counts and current weather for all regions that meet the minimum display threshold.

**When called**: On app foreground and after each successful heartbeat.

**Request body**: None

**Response `200 OK`**

```json
{
  "updated_at": "2026-02-11T08:42:00Z",
  "window_minutes": 30,
  "min_display_count": 3,
  "regions": [
    {
      "region": "stockholm",
      "display_name": "Stockholm",
      "latitude": 59.33,
      "longitude": 18.07,
      "active_users": 14,
      "weather": {
        "condition": "cloudy",
        "temperature": 2.1
      }
    },
    {
      "region": "gothenburg",
      "display_name": "Göteborg",
      "latitude": 57.71,
      "longitude": 11.97,
      "active_users": 7,
      "weather": {
        "condition": "rainy",
        "temperature": 5.4
      }
    }
  ]
}
```

Regions with fewer than 3 active users are **omitted entirely** from the array.

| Field | Description |
|---|---|
| `updated_at` | ISO 8601 timestamp of response generation |
| `window_minutes` | The rolling window used to count active users (always 30) |
| `min_display_count` | Minimum count before a region is included (always 3) |
| `regions[].region` | Internal station identifier |
| `regions[].display_name` | Human-readable name (translated by client) |
| `regions[].active_users` | Heartbeat count in the last 30 minutes |
| `regions[].weather.condition` | One of: `sunny`, `cloudy`, `rainy`, `snowy`, `stormy` |
| `regions[].weather.temperature` | Temperature in °C, one decimal place |

Weather data is cached for 10 minutes per region before re-fetching from SMHI.

---

### 4.3 GET `/health`

Liveness probe. No authentication required.

**Response `200 OK`**

```json
{
  "status": "ok",
  "version": "1.0.0"
}
```

---

## 5. Authentication

The challenge is allowing only genuine instances of the app to call the API, without requiring user accounts. The solution is **HMAC-SHA256 request signing** using a shared secret embedded in the app, combined with a short timestamp window to prevent replay attacks.

### Why this approach

| Method | Pros | Cons |
|---|---|---|
| No auth | Simple | Anyone can flood the server with fake data |
| API key in header | Simple | Key is easily extracted from app bundle |
| **HMAC signing** | Key cannot be reused without secret; replay protection | Secret can theoretically be extracted with reverse engineering |
| Google Play Integrity / Apple App Attest | Cryptographic proof the app is genuine | Complex integration, platform-specific, overkill for this use case |

HMAC signing is the right balance. Even if the secret were extracted, an attacker would only be able to submit fake region heartbeats — which are already anonymous and capped by rate limiting. There is no sensitive data to steal.

### Signing algorithm

Every request (except `/health`) must include the following headers:

| Header | Value |
|---|---|
| `X-App-Id` | `vaderochklader-v1` (constant, identifies app) |
| `X-Timestamp` | Unix timestamp in seconds as a string (e.g. `"1739262120"`) |
| `X-Signature` | HMAC-SHA256 hex digest (see below) |

**Signature construction**

```
string_to_sign = METHOD + "\n"
               + PATH + "\n"
               + TIMESTAMP + "\n"
               + SHA256_HEX(request_body_bytes_or_empty_string)

signature = HMAC-SHA256(APP_SECRET, string_to_sign)
```

Example for `POST /v1/heartbeat` with body `{"region":"stockholm"}`:

```
string_to_sign = "POST\n/v1/heartbeat\n1739262120\ne3b0... (sha256 of body)"
```

**Server validation**

1. Check `X-App-Id` equals `vaderochklader-v1`.
2. Parse `X-Timestamp`; reject if `|now - timestamp| > 300` seconds (5-minute replay window).
3. Reconstruct `string_to_sign` using the received method, path, timestamp, and body.
4. Compute expected signature; compare with `X-Signature` using a constant-time comparison.
5. Reject with `401` if any check fails.

### Secret management

- One shared secret is generated at server setup (32 random bytes, hex-encoded).
- The secret is stored in a server environment variable `APP_HMAC_SECRET`.
- The same secret is compiled into the React Native app as a constant (in a non-committed `.env` file loaded at build time via `react-native-dotenv` or `expo-constants`).
- The secret is **never committed to the git repository**.

### Rate limiting

Applied regardless of authentication:

| Endpoint | Limit |
|---|---|
| `POST /heartbeat` | 1 request per IP per 5 minutes |
| `GET /regions` | 10 requests per IP per minute |

Rate limiting is implemented server-side using a simple in-memory sliding window. If an IP exceeds the limit, the server returns `429 Too Many Requests`.

---

## 6. Server-Side Weather Proxy

Instead of each client hitting SMHI directly (as they do today), the backend fetches and caches SMHI data for all 16 regions and serves it via the `/regions` endpoint.

Benefits:
- Reduces SMHI API load.
- Clients make fewer external API calls.
- Weather data is already aggregated per region in a format the map needs.

Cache policy: SMHI data for each region is refreshed every 10 minutes, or on first request after server start.

---

## 7. Required Client App Changes

### 7.1 New service file: `src/services/communityApi.js`

Encapsulates all backend communication:

- `sendHeartbeat(region)` — POSTs the current SMHI station name. Called when the app foregrounds and every 10 minutes via a background interval.
- `fetchRegions()` — GETs the regions data for map display.
- HMAC signing logic applied to all outgoing requests.
- Reads `APP_API_URL` and `APP_HMAC_SECRET` from environment config.

### 7.2 Heartbeat lifecycle in `useLocation.js` or a new `useCommunity.js` hook

```
App opens
  → fetch GPS (already done)
  → find nearest SMHI station (already done)
  → sendHeartbeat(station)           ← NEW
  → start interval: sendHeartbeat every 10 min  ← NEW

App goes to background / closes
  → clear interval                   ← NEW
```

The heartbeat interval should use `AppState` from React Native to stop when the app is backgrounded and resume when foregrounded.

### 7.3 Updates to `SwedenMap.js`

The map component receives a new optional prop `communityRegions` (array from `/regions` response). When present, it renders semi-transparent coloured circles over the 16 SMHI station coordinates, sized by `active_users` count.

**Visual design**:
- Circles centred on SMHI station coordinates (already in `weatherApi.js`).
- Minimum rendered radius: 20 SVG units; maximum: 60 SVG units.
- Scale: `radius = 20 + Math.min(count, 50) * 0.8`
- Fill: primary app colour at 30% opacity.
- Label inside circle: count as numeral (e.g. `14`), plus a small weather emoji.
- Circles do not replace the existing city emoji markers; they are rendered underneath.

**Example circle layout** (SVG pseudo-code):
```xml
<Circle cx={svgX} cy={svgY} r={radius} fill="rgba(74,144,226,0.3)" />
<Circle cx={svgX} cy={svgY} r={radius} stroke="#4A90E2" strokeWidth="2" fill="none" />
<Text x={svgX} y={svgY - 4} textAnchor="middle" fontSize="18">{weatherEmoji}</Text>
<Text x={svgX} y={svgY + 14} textAnchor="middle" fontSize="14">{count}</Text>
```

### 7.4 Updates to `MapModal.js`

- On mount, call `fetchRegions()` and pass the result to `SwedenMap`.
- Show a subtle loading indicator while regions are loading (non-blocking; map still appears).
- Add a short explanatory label below the map: translated string, e.g. *"Circles show how many friends are using the app in each area"*.

### 7.5 Environment configuration

Add `react-native-dotenv` (or use `expo-constants` with `extra` config) to expose two build-time variables:

```
APP_API_URL=https://api.vaderochklader.se/v1
APP_HMAC_SECRET=<secret-hex-string>
```

These are read at runtime from `app.json`'s `extra` block (Expo pattern), which is populated from a local `.env` file that is **gitignored**.

### 7.6 New translation keys

Add to all 6 language files:

| Key | Swedish (sv) example |
|---|---|
| `communityCirclesLabel` | `"Cirklar visar hur många som använder appen i varje område"` |
| `communityUsersCount` | `"{count} användare"` |
| `communityLoading` | `"Laddar gemenskapsdata..."` |

---

## 8. Data Flow Summary

```
Client app
  │
  ├─ [on open / every 10 min]
  │    POST /v1/heartbeat  {"region": "stockholm"}
  │    Headers: X-App-Id, X-Timestamp, X-Signature
  │
  └─ [on map open]
       GET /v1/regions
       ← [{region, active_users, weather}, ...]
       → render circles on SwedenMap

Backend server
  │
  ├─ Validate HMAC signature
  ├─ Rate limit check
  ├─ INSERT heartbeat row (region, now)
  ├─ Periodic DELETE of rows older than 60 min
  ├─ Cache SMHI weather per region (10 min TTL)
  └─ Aggregate: SELECT region, COUNT(*) WHERE received_at > now-30min
```

---

## 9. Scalability and Operational Notes

| Metric | Expected | Upper bound |
|---|---|---|
| Monthly active users | 100–1,000 | 10,000 |
| Heartbeats/day | 1,000–10,000 | 100,000 |
| Rows in DB at any time | < 2,000 | < 20,000 |
| `/regions` calls/day | 500–5,000 | 50,000 |

At this scale, SQLite is entirely adequate. Migration to PostgreSQL is a straightforward swap of the `better-sqlite3` driver for `pg` if the app ever reaches tens of thousands of users.

The SMHI weather proxy fetches at most 16 × 6 = 96 SMHI API calls per hour (one per station per 10-minute cache window), well within SMHI's fair-use limits.

---

## 10. Security Considerations

| Threat | Mitigation |
|---|---|
| Fake heartbeats flooding a region | HMAC auth + IP rate limiting |
| Replay attack with captured request | 5-minute timestamp window |
| Extracting HMAC secret from app bundle | Secret is obfuscated; damage limited to fake counts only (no sensitive data) |
| Exact location inference | Impossible — only the region name is sent |
| Re-identification of children | No user IDs; counts only; minimum threshold of 3 |
| MITM / traffic interception | HTTPS enforced; certificate pinning recommended as future step |
| SQL injection | Parameterised queries; region names validated against a whitelist |

---

## 11. Out of Scope for This Version

- Push notifications based on regional activity.
- Historical trend data (how activity changes over time).
- Admin dashboard.
- Certificate pinning (recommended future improvement).
- Platform attestation (Google Play Integrity / Apple App Attest).
- User-controlled opt-out UI (though opt-out can be added by simply not calling `sendHeartbeat` based on a settings flag).

---

## 12. Open Questions for Review

1. **Should there be an explicit opt-in UI?** The data is anonymous but the app does phone home while open. A simple "Share that you're using the app" toggle in Settings would be transparent and good practice, especially since the app is used by children.

2. **Minimum threshold**: Is 3 users the right floor, or should it be higher (e.g. 5) for extra safety?

3. **Heartbeat interval**: 10 minutes is a balance between freshness and battery/data usage. Acceptable?

4. **Hosting**: Where should the backend be deployed? A VPS gives full control; a managed PaaS (Fly.io, Render) is simpler to operate.

5. **Weather proxy vs. client-direct**: The spec proposes the server fetch SMHI data. If preferred, the client could continue fetching SMHI directly and the `/regions` endpoint would only return counts (weather already being available client-side). This is simpler but gives a less unified experience on the map.
