# Community Presence Backend — MVP Specification

**Project**: Väder & Kläder (Weather & Clothes App)
**Feature**: Anonymous regional presence display with weather data
**Date**: February 2026
**Status**: Ready for implementation

---

## Table of Contents

1. [Overview](#1-overview)
2. [Privacy Model](#2-privacy-model)
3. [Architecture](#3-architecture)
4. [API Specification](#4-api-specification)
5. [Authentication](#5-authentication)
6. [Data Models](#6-data-models)
7. [Security & Privacy](#7-security--privacy)
8. [Client App Changes](#8-client-app-changes)
9. [Scaling & Operations](#9-scaling--operations)
10. [Deployment](#10-deployment)
11. [Legal & Compliance](#11-legal--compliance)
12. [Testing Checklist](#12-testing-checklist)
13. [Open Questions](#13-open-questions)

---

## 1. Overview

### Purpose

Show children where others are using the app across Sweden — a sense of community: *"others near you are also checking the weather today"*. Displays anonymous presence circles on the existing Sweden map, sized by active user count and coloured by weather condition.

### Critical Requirements

Since this app targets kindergarten children (ages 3–5):

- **Absolute anonymity** — no user identification possible
- **No persistent tracking** — no user history or profiling
- **Minimal data collection** — only what is necessary for map visualisation
- **GDPR/COPPA compliant by design** — no personal data collected or processed
- **No communication** — users cannot communicate or identify each other

---

## 2. Privacy Model

### Location anonymisation (client-side)

The client already calculates the nearest SMHI weather station from its GPS position. That station name is the only location data ever sent to the backend. The 16 stations and their approximate coverage:

```
Stockholm    Göteborg     Malmö        Uppsala      Kiruna
Linköping    Växjö        Karlstad     Västerås     Örebro
Lund         Helsingborg  Kalmar       Visby        Luleå
Sundsvall
```

Each station covers roughly 50–200 km radius — far too coarse to identify any individual.

| Data point | What is sent | Precision |
|---|---|---|
| Device GPS | Not sent | — |
| SMHI station name | e.g. `"stockholm"` | ~50–200 km radius |
| User identity | Not sent | — |
| IP address | Standard HTTP (not logged or stored) | — |

### Active window & retention

- A user is **active** while the app is open, signalled by a heartbeat every 10 minutes.
- The **active window** for counting is the last **30 minutes**.
- Heartbeat rows older than **60 minutes** are deleted by a cleanup job (runs every 15 minutes).

### Minimum display threshold

Regions with fewer than **3 active users** in the 30-minute window are omitted from all responses and never rendered on the map. This prevents de-anonymisation in sparse areas.

---

## 3. Architecture

### Stack

| Component | Choice | Rationale |
|---|---|---|
| Runtime | Node.js 20 LTS | Matches app's JS ecosystem |
| Framework | Express 4 | Simple, well-understood |
| Database | SQLite (`better-sqlite3`) | Zero config; adequate for expected load; swap for PostgreSQL if needed |
| CDN / DDoS | Cloudflare | DDoS protection, rate limiting at edge |
| Monitoring | Provider-native or Datadog | Alerts on error rate and latency |

### High-level diagram

```
┌─────────────────┐
│  Mobile Client  │
│  (React Native) │
└────────┬────────┘
         │ HTTPS + HMAC-signed requests
         ▼
┌──────────────────────┐
│  Cloudflare CDN      │
└────────┬─────────────┘
         ▼
┌──────────────────────────────────┐
│  Express 4 server (Node.js 20)   │
│  - HMAC auth                     │
│  - Rate limiting (in-memory)     │
│  - Input validation              │
│  - SMHI weather proxy/cache      │
└────────┬─────────────────────────┘
         ▼
┌──────────────────────────────────┐
│  SQLite (better-sqlite3)         │
│  - heartbeats (60-min TTL)       │
│  - region_weather (10-min cache) │
└──────────────────────────────────┘
```

### Project structure

```
backend/
├── src/
│   ├── index.js              # Server entry point
│   ├── routes/
│   │   ├── heartbeat.js      # POST /heartbeat
│   │   ├── regions.js        # GET /regions
│   │   └── health.js         # GET /health
│   ├── services/
│   │   ├── db.js             # SQLite client + schema init
│   │   ├── smhi.js           # SMHI weather proxy + cache
│   │   └── cleanup.js        # Periodic heartbeat deletion
│   ├── middleware/
│   │   ├── auth.js           # HMAC signature validation
│   │   └── rateLimit.js      # In-memory sliding window
│   └── config.js             # Environment + constants
├── package.json
└── .env                      # Gitignored
```

---

## 4. API Specification

**Base URL**: `https://api.vaderochklader.se/v1`

All endpoints except `/health` require HMAC authentication headers (see §5). All responses are JSON.

---

### 4.1 `POST /heartbeat`

Registers that a user is currently active in a region.

**When called**: On app foreground, then every 10 minutes while the app remains open.

**Request body**

```json
{ "region": "stockholm" }
```

`region` must be one of the 16 valid SMHI station identifiers (lowercase).

**Response `200 OK`**

```json
{ "ok": true }
```

**Response `400`** — unknown region

```json
{ "error": "unknown_region", "message": "Region must be one of the 16 valid SMHI station identifiers" }
```

**Response `401`** — invalid or missing HMAC signature

```json
{ "error": "unauthorized" }
```

**Response `429`** — rate limit exceeded

```json
{ "error": "rate_limit_exceeded", "retryAfter": 300 }
```

**Rate limit**: 1 request per IP per 5 minutes. Duplicate heartbeats within the window are silently accepted (idempotent).

---

### 4.2 `GET /regions`

Returns active user counts and current weather for all regions meeting the minimum threshold.

**When called**: On map screen open and after each successful heartbeat.

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
    }
  ]
}
```

Regions with fewer than 3 active users are omitted entirely from the array.

| Field | Description |
|---|---|
| `updated_at` | ISO 8601 timestamp of response generation |
| `window_minutes` | Rolling window used to count active users (always 30) |
| `min_display_count` | Minimum count before a region is included (always 3) |
| `regions[].region` | Internal SMHI station identifier |
| `regions[].display_name` | Human-readable name (translated by client) |
| `regions[].active_users` | Heartbeat count in the last 30 minutes |
| `regions[].weather.condition` | One of: `sunny`, `cloudy`, `rainy`, `snowy`, `stormy` |
| `regions[].weather.temperature` | Temperature in °C, one decimal place |

Weather data is cached 10 minutes per region before re-fetching from SMHI.

**CDN caching**: Response cached 60 seconds at Cloudflare.

**Rate limit**: 10 requests per IP per minute.

---

### 4.3 `GET /health`

Liveness probe. No authentication required.

**Response `200 OK`**

```json
{ "status": "ok", "version": "1.0.0", "uptime": 86400 }
```

---

## 5. Authentication

Every request except `/health` must include:

| Header | Value |
|---|---|
| `X-App-Id` | `vaderochklader-v1` |
| `X-Timestamp` | Unix timestamp in seconds, e.g. `"1739262120"` |
| `X-Signature` | HMAC-SHA256 hex digest (see below) |

### Signature construction

```
string_to_sign = METHOD + "\n"
               + PATH + "\n"
               + TIMESTAMP + "\n"
               + SHA256_HEX(request_body_or_empty_string)

signature = HMAC-SHA256(APP_HMAC_SECRET, string_to_sign)
```

### Server validation

1. Check `X-App-Id` equals `vaderochklader-v1`.
2. Reject if `|now − X-Timestamp| > 300` seconds (prevents replay attacks).
3. Reconstruct `string_to_sign`; compare expected signature with `X-Signature` using constant-time comparison.
4. Return `401` on any failure.

### Secret management

- A 32-byte random secret is generated once at server setup (hex-encoded).
- Stored in server environment variable `APP_HMAC_SECRET`.
- The same secret is built into the React Native app via a gitignored `.env` file, exposed through `expo-constants`.
- **Never committed to the repository**.

---

## 6. Data Models

### Schema (SQLite)

```sql
-- One row per active heartbeat
CREATE TABLE heartbeats (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  region      TEXT    NOT NULL,   -- SMHI station name, e.g. "stockholm"
  received_at INTEGER NOT NULL    -- Unix timestamp (seconds)
);

CREATE INDEX idx_heartbeats_region_time ON heartbeats (region, received_at);

-- Cached weather per region (server-side SMHI proxy)
CREATE TABLE region_weather (
  region      TEXT    PRIMARY KEY,
  condition   TEXT,               -- "sunny" | "cloudy" | "rainy" | "snowy" | "stormy"
  temperature REAL,               -- degrees Celsius
  updated_at  INTEGER NOT NULL    -- Unix timestamp
);
```

No personal data is stored in any table.

### Cleanup job

```javascript
// Runs every 15 minutes
function deleteOldHeartbeats(db) {
  const cutoff = Math.floor(Date.now() / 1000) - 3600; // 60 minutes ago
  db.prepare('DELETE FROM heartbeats WHERE received_at < ?').run(cutoff);
}
```

### Active user query

```javascript
function getActiveRegions(db) {
  const windowStart = Math.floor(Date.now() / 1000) - 1800; // 30 minutes ago
  return db.prepare(`
    SELECT region, COUNT(*) as count
    FROM heartbeats
    WHERE received_at > ?
    GROUP BY region
    HAVING count >= 3
  `).all(windowStart);
}
```

---

## 7. Security & Privacy

### IP address handling

IP addresses are hashed (SHA-256 + daily-rotated salt) before use in rate-limit keys. Raw IPs are never logged or stored.

```javascript
import crypto from 'crypto';

function hashIP(ip) {
  const salt = process.env.IP_SALT; // rotated daily via cron
  return crypto.createHash('sha256').update(ip + salt).digest('hex').substring(0, 16);
}
```

### Rate limiting (in-memory sliding window)

```javascript
const windows = new Map();

export function checkRateLimit(hashedIP, endpoint) {
  const windowMs = endpoint === 'heartbeat' ? 5 * 60 * 1000 : 60 * 1000;
  const maxRequests = endpoint === 'heartbeat' ? 1 : 10;
  const key = `${hashedIP}:${endpoint}`;
  const now = Date.now();
  const hits = (windows.get(key) || []).filter(t => now - t < windowMs);
  if (hits.length >= maxRequests) return false;
  hits.push(now);
  windows.set(key, hits);
  return true;
}
```

### Input validation

```javascript
const VALID_REGIONS = new Set([
  'stockholm', 'goteborg', 'malmo', 'uppsala', 'kiruna',
  'linkoping', 'vaxjo', 'karlstad', 'vasteras', 'orebro',
  'lund', 'helsingborg', 'kalmar', 'visby', 'lulea', 'sundsvall'
]);
```

### No session tracking

- No cookies, no session tokens, no user IDs.
- Each request is stateless and unlinkable.

---

## 8. Client App Changes

### 8.1 New file: `src/services/communityApi.js`

```javascript
import Constants from 'expo-constants';
// Use a React Native-compatible HMAC library, e.g. react-native-hmac-sha256

const API_BASE_URL = Constants.expoConfig.extra.appApiUrl;
const APP_HMAC_SECRET = Constants.expoConfig.extra.appHmacSecret;

async function sign(method, path, body = '') {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const bodyHash = /* sha256 hex of body string */;
  const stringToSign = `${method}\n${path}\n${timestamp}\n${bodyHash}`;
  const signature = /* HMAC-SHA256 hex of stringToSign with APP_HMAC_SECRET */;
  return { timestamp, signature };
}

export async function sendHeartbeat(region) {
  const path = '/v1/heartbeat';
  const body = JSON.stringify({ region });
  const { timestamp, signature } = await sign('POST', path, body);
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-App-Id': 'vaderochklader-v1',
      'X-Timestamp': timestamp,
      'X-Signature': signature,
    },
    body,
  });
  if (!response.ok) throw new Error('Heartbeat failed');
  return response.json();
}

export async function fetchRegions() {
  const path = '/v1/regions';
  const { timestamp, signature } = await sign('GET', path);
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'X-App-Id': 'vaderochklader-v1',
      'X-Timestamp': timestamp,
      'X-Signature': signature,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch regions');
  return response.json();
}
```

### 8.2 Heartbeat lifecycle

Add a `useCommunity.js` hook (or extend `useLocation.js`):

```
App foregrounds
  → GPS already fetched → nearest SMHI station already known
  → sendHeartbeat(station)
  → start interval: sendHeartbeat every 10 minutes

App backgrounds / closes
  → clear interval
```

Use `AppState` from React Native to pause the interval when backgrounded.

### 8.3 `SwedenMap.js` — community circles

Add optional prop `communityRegions` (array from `/regions`). Render circles beneath existing city emoji markers:

```xml
<!-- Per region in communityRegions: radius = 20 + Math.min(count, 50) * 0.8 -->
<Circle cx={svgX} cy={svgY} r={radius} fill="rgba(74,144,226,0.3)" />
<Circle cx={svgX} cy={svgY} r={radius} stroke="#4A90E2" strokeWidth="2" fill="none" />
<Text x={svgX} y={svgY - 4} textAnchor="middle" fontSize="18">{weatherEmoji}</Text>
<Text x={svgX} y={svgY + 14} textAnchor="middle" fontSize="14">{count}</Text>
```

### 8.4 `MapModal.js` — fetch on open

- On mount: call `fetchRegions()` and pass result to `SwedenMap`.
- Show a non-blocking loading indicator while fetching.
- Render explanatory label below map using `t('communityCirclesLabel')`.

### 8.5 New translation keys

Add to all 6 language files (`sv`, `en`, `de`, `fi`, `se`, `ko`):

| Key | Swedish example |
|---|---|
| `communityCirclesLabel` | `"Cirklar visar hur många som använder appen i varje område"` |
| `communityUsersCount` | `"{count} användare"` |
| `communityLoading` | `"Laddar gemenskapsdata..."` |

### 8.6 Environment configuration

Add to `app.json` `extra` block (populated from gitignored `.env`):

```
APP_API_URL=https://api.vaderochklader.se/v1
APP_HMAC_SECRET=<secret-hex-string>
```

---

## 9. Scaling & Operations

### Expected load

| Metric | Expected | Upper bound |
|---|---|---|
| Monthly active users | 100–1,000 | 10,000 |
| Heartbeats/day | 1,000–10,000 | 100,000 |
| DB rows at any time | < 2,000 | < 20,000 |
| `/regions` calls/day | 500–5,000 | 50,000 |

SQLite is adequate through the upper bound. When the app reaches tens of thousands of users, swap `better-sqlite3` for `pg` (PostgreSQL) with no other architectural changes.

SMHI weather proxy fetches at most 16 × 6 = 96 SMHI API calls per hour (one per station per 10-minute cache window).

### Key metrics to monitor

- Active region count
- Heartbeat submission rate (spikes may indicate abuse)
- Error rate (alert at > 5%)
- Response time p95 (alert at > 500 ms)
- DB row count (unexpected growth = cleanup job failure)

### Maintenance

- Rotate `IP_SALT` daily via cron job
- Review anomaly logs weekly
- Update dependencies monthly

---

## 10. Deployment

### Recommended: Railway

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

Set environment variables in Railway dashboard:

```
APP_HMAC_SECRET=<32-byte hex secret>
IP_SALT=<random string, rotated daily>
NODE_ENV=production
```

**Cost**: ~$5/month.

### Alternative: Fly.io

Low-latency European deployment close to Swedish users. ~$3–7/month.

### Alternative: DigitalOcean App Platform

Connect GitHub repo, configure env vars, deploy. ~$12/month.

---

## 11. Legal & Compliance

### GDPR

✅ Data minimisation — only region name and timestamp
✅ Storage limitation — 60-minute maximum retention
✅ Purpose limitation — map visualisation only
✅ No profiling — cannot track individual users
✅ Right to object — users can opt-out (see Open Question §13)
✅ Data protection by design

Lawful basis: Legitimate interest (Article 6(1)(f)), with strong privacy safeguards. A Data Protection Impact Assessment (DPIA) should be completed before launch.

### COPPA

✅ No personal information
✅ No persistent identifiers
✅ No behavioural advertising
✅ Data security via HTTPS

### Privacy policy addition

```
Community Weather Map (Optional Feature)

The app includes an optional "Community Map" feature that shows where
the app is being used across Sweden.

What data is shared:
- Your approximate region (nearest of 16 weather station areas,
  each covering 50–200 km)

What data is NOT shared:
- Your name or any identifying information
- Your exact location
- Your device information
- Your usage history

How it works:
- While the app is open your phone sends your approximate region
  every 10 minutes. Data is deleted after 60 minutes. We cannot
  identify individual users. A minimum of 3 simultaneous users is
  required before any region appears on the map.

Your choice:
- This feature is optional and can be disabled in Settings.
```

**Note**: Consult with a privacy lawyer before launch. Conduct a DPIA. Update the privacy policy and obtain any required consents.

---

## 12. Testing Checklist

Before launch:

- [ ] Load test — 100+ concurrent users
- [ ] Privacy audit — verify individual users cannot be identified from region name + count alone
- [ ] Rate limiting — both endpoints enforce limits correctly
- [ ] Data expiration — 60-minute cleanup deletes rows; 30-minute window counts correctly
- [ ] Minimum threshold — regions with < 3 users never appear in any response
- [ ] HMAC auth — replayed requests (timestamp > 5 min old) rejected with `401`
- [ ] HMAC auth — requests with tampered body rejected
- [ ] Input validation — unknown region names rejected with `400`
- [ ] No data leaks in server logs (no IPs, no coordinates)
- [ ] HTTPS enforced end-to-end
- [ ] CORS configured for app domain only
- [ ] SMHI proxy cache — weather refreshes after 10 minutes, not on every request
- [ ] Client heartbeat stops when app is backgrounded
- [ ] Map circles render correctly and sit behind city emoji markers
- [ ] Privacy policy updated and reviewed by legal

---

## 13. Open Questions

1. **Opt-in or opt-out?** The feature sends data while the app is open. Should it require an explicit "Share that I'm using the app" toggle in Settings (opt-in), or be on by default (opt-out)? Opt-in is more transparent and better practice for a children's app.

2. **Minimum threshold value** — Is 3 users the right floor, or should it be higher (e.g. 5) for extra safety in regions with low population density?

3. **Weather proxy vs. client-direct** — The spec has the server fetch SMHI data and return it via `/regions`. Alternatively, clients could continue fetching SMHI directly, and `/regions` would return user counts only. This is simpler to implement but produces a less unified map experience.

4. **Certificate pinning** — Recommended as a future hardening step to prevent MITM. Out of scope for v1.

---

**Last Updated**: February 2026
**Version**: 1.1 — MVP
