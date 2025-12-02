# Anonymous Location Tracking Backend Architecture

Architecture design for a privacy-first, anonymous location tracking system for the Weather & Clothes App, enabling community weather visualization without compromising child safety.

---

## Table of Contents

1. [Overview](#overview)
2. [Core Principles](#core-principles)
3. [Architecture Design](#architecture-design)
4. [API Specification](#api-specification)
5. [Data Models](#data-models)
6. [Security & Privacy](#security--privacy)
7. [Implementation Guide](#implementation-guide)
8. [Scaling Considerations](#scaling-considerations)
9. [Alternative Approaches](#alternative-approaches)

---

## Overview

### Purpose

Enable users to see where the Weather & Clothes App is being used across Sweden, showing:
- Anonymous location markers on the map
- Current weather conditions at those locations
- General outfit trends (optional)

### Critical Requirements

Since this app targets kindergarten children (ages 3-5):
- **Absolute anonymity**: No user identification possible
- **No persistent tracking**: No user history or profiling
- **Minimal data collection**: Only what's necessary for map visualization
- **GDPR/COPPA compliance**: Strict adherence to children's privacy laws
- **No communication**: Users cannot communicate or identify each other

---

## Core Principles

### 1. Data Minimization

Only collect:
- ✅ Approximate location (coarse grid cell, not precise coordinates)
- ✅ Current weather condition
- ✅ Timestamp (for expiration, not history)
- ❌ **NO** user identifiers
- ❌ **NO** device IDs
- ❌ **NO** IP addresses (beyond request validation)
- ❌ **NO** historical data

### 2. Ephemeral Data

- All location data expires after 1-4 hours automatically
- No database backups of user locations
- No logging of user activity
- Sessions are stateless and unlinkable

### 3. Aggregation & Obfuscation

- Grid-based location system (e.g., 10km x 10km cells)
- Multiple users in same cell appear as single marker
- Minimum threshold: Only show cells with 2+ active users
- Random jitter added to prevent exact location inference

### 4. No Reverse Engineering

- Cannot identify individual users
- Cannot track user movement over time
- Cannot correlate multiple submissions from same user
- Cannot determine user's home location

---

## Architecture Design

### High-Level Architecture

```
┌─────────────────┐
│  Mobile Client  │
│  (React Native) │
└────────┬────────┘
         │
         │ HTTPS (Anonymous POST)
         ▼
┌─────────────────────────────────┐
│     Load Balancer / CDN         │
│  (Cloudflare, AWS ALB, etc.)    │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│      API Gateway / Server       │
│  (Node.js / Express / Fastify)  │
│  - Rate limiting                │
│  - Request validation           │
│  - Grid cell calculation        │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│     In-Memory Data Store        │
│  (Redis / Memcached)            │
│  - TTL-based expiration         │
│  - Aggregated grid cells        │
│  - No persistent storage        │
└─────────────────────────────────┘
```

### Technology Stack (Recommended)

**Backend:**
- **Runtime**: Node.js 20+ (TypeScript optional)
- **Framework**: Fastify (high performance) or Express
- **Data Store**: Redis (in-memory with TTL)
- **Deployment**:
  - Serverless: AWS Lambda + API Gateway
  - Traditional: DigitalOcean Droplet, Railway, Render
  - Managed: Vercel, Netlify Functions

**Infrastructure:**
- **CDN**: Cloudflare (DDoS protection + rate limiting)
- **Monitoring**: Datadog, New Relic, or built-in provider tools
- **Alerts**: PagerDuty, email notifications for anomalies

---

## API Specification

### Base URL

```
https://api.weatherclothesapp.com/v1
```

### Endpoints

#### 1. Submit Anonymous Location (POST)

**Endpoint**: `POST /locations`

**Description**: Submit user's current approximate location and weather condition for map visualization.

**Request Headers**:
```
Content-Type: application/json
X-API-Version: 1.0
```

**Request Body**:
```json
{
  "gridCell": "58.5_15.5",
  "weather": "sunny",
  "temperature": 18,
  "timestamp": 1701234567890
}
```

**Field Specifications**:
- `gridCell`: String - Pre-calculated grid cell identifier (lat_lng rounded to 0.5° precision)
  - Example: "58.5_15.5" represents area around 58.5°N, 15.5°E
  - Covers approximately 50km x 35km area in Sweden
- `weather`: Enum - One of: `sunny`, `cloudy`, `rainy`, `snowy`, `stormy`
- `temperature`: Integer - Temperature in Celsius (-40 to 40)
- `timestamp`: Number - Client timestamp (for validation, not stored)

**Response** (200 OK):
```json
{
  "success": true,
  "cellId": "58.5_15.5",
  "expiresIn": 14400
}
```

**Response** (429 Too Many Requests):
```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "retryAfter": 60
}
```

**Rate Limiting**:
- 1 submission per 5 minutes per IP address
- 100 submissions per hour per IP address
- Implemented via Redis + rolling window

---

#### 2. Fetch Active Locations (GET)

**Endpoint**: `GET /locations`

**Description**: Retrieve all currently active grid cells for map visualization.

**Request Headers**:
```
X-API-Version: 1.0
```

**Query Parameters**:
- `region`: (Optional) Filter by region code (e.g., `south`, `north`, `central`)

**Response** (200 OK):
```json
{
  "locations": [
    {
      "gridCell": "59.5_18.0",
      "count": 5,
      "weather": "rainy",
      "avgTemperature": 12,
      "lastUpdated": 1701234567890
    },
    {
      "gridCell": "58.0_13.0",
      "count": 3,
      "weather": "sunny",
      "avgTemperature": 18,
      "lastUpdated": 1701234500000
    }
  ],
  "totalCells": 2,
  "timestamp": 1701234600000
}
```

**Field Specifications**:
- `count`: Number of anonymous users in this grid cell (minimum 2)
- `weather`: Most common weather condition in cell
- `avgTemperature`: Average temperature (rounded to nearest integer)
- `lastUpdated`: Most recent update timestamp in cell

**Caching**:
- Response cached for 60 seconds via CDN
- Client-side caching: 30 seconds

---

#### 3. Health Check (GET)

**Endpoint**: `GET /health`

**Response** (200 OK):
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "uptime": 86400
}
```

---

## Data Models

### Grid Cell Schema (Redis)

**Key Pattern**: `cell:{gridCell}`

**Value (JSON)**:
```json
{
  "users": [
    {
      "weather": "sunny",
      "temperature": 18,
      "submittedAt": 1701234567890
    },
    {
      "weather": "sunny",
      "temperature": 19,
      "submittedAt": 1701234580000
    }
  ],
  "expiresAt": 1701249567890
}
```

**TTL**: 4 hours (14400 seconds)

**Operations**:
```javascript
// Add new submission
await redis.lpush(`cell:${gridCell}`, JSON.stringify(submission));
await redis.expire(`cell:${gridCell}`, 14400);

// Retrieve cell data
const data = await redis.lrange(`cell:${gridCell}`, 0, -1);

// Cleanup old entries (automatically via TTL)
```

---

### Rate Limiting Schema (Redis)

**Key Pattern**: `ratelimit:{hashedIP}:{window}`

**Value**: Counter (integer)

**TTL**: 5 minutes (300 seconds) or 1 hour (3600 seconds)

```javascript
// Check rate limit
const key = `ratelimit:${hashedIP}:${currentWindow}`;
const count = await redis.incr(key);
await redis.expire(key, 300);

if (count > MAX_REQUESTS) {
  throw new Error('Rate limit exceeded');
}
```

---

## Security & Privacy

### Privacy Measures

#### 1. IP Address Handling

```javascript
// Hash IP addresses for rate limiting only
import crypto from 'crypto';

function hashIP(ip) {
  const salt = process.env.IP_SALT; // Rotate daily
  return crypto
    .createHash('sha256')
    .update(ip + salt)
    .digest('hex')
    .substring(0, 16);
}

// Never store raw IP addresses
// Hash is used only for rate limiting, expires with TTL
```

#### 2. Grid Cell Calculation (Client-Side)

```javascript
// Mobile client calculates grid cell BEFORE sending to server
function calculateGridCell(lat, lng, precision = 0.5) {
  const gridLat = Math.floor(lat / precision) * precision;
  const gridLng = Math.floor(lng / precision) * precision;
  return `${gridLat.toFixed(1)}_${gridLng.toFixed(1)}`;
}

// Example: 59.3293, 18.0649 → "59.0_18.0"
// Server never receives precise coordinates
```

#### 3. Minimum Aggregation Threshold

```javascript
// Only return cells with 2+ users
function getActiveCells(allCells) {
  return allCells.filter(cell => cell.users.length >= 2);
}

// Prevents identifying individual users in sparse areas
```

#### 4. No Session Tracking

- No cookies
- No session tokens
- No user IDs
- Stateless API (each request independent)

#### 5. Data Expiration

```javascript
// Automatic cleanup via Redis TTL
const EXPIRATION_TIME = 4 * 60 * 60; // 4 hours in seconds

await redis.setex(
  `cell:${gridCell}`,
  EXPIRATION_TIME,
  JSON.stringify(data)
);

// No manual deletion needed
// No database backups
// Data disappears automatically
```

---

### GDPR Compliance

✅ **Lawful Basis**: Legitimate interest (with strong safeguards)

✅ **Data Minimization**: Only grid cell, weather, temperature

✅ **Purpose Limitation**: Map visualization only

✅ **Storage Limitation**: 4-hour maximum retention

✅ **Transparency**: Privacy policy explains feature clearly

✅ **Right to Object**: Users can opt-out (don't submit location)

✅ **Data Protection by Design**: Privacy-first architecture

✅ **No Profiling**: Cannot track individual users

**GDPR Article 6(1)(f) Justification**:
- Legitimate interest: Educational community feature
- Necessity: Cannot achieve purpose with less data
- Balancing test: Strong privacy safeguards outweigh minimal data collection
- No sensitive data: Weather conditions are not personal
- Child safety: Anonymous by design, no communication possible

---

### COPPA Compliance (US)

✅ **No Personal Information**: No names, emails, or identifiers

✅ **No Persistent Identifiers**: No device IDs or tracking

✅ **No Behavioral Advertising**: No ads or tracking pixels

✅ **Parental Notice**: Privacy policy explains feature

✅ **Data Security**: HTTPS, secure infrastructure

✅ **No Third-Party Disclosure**: Data not shared or sold

**Recommendation**: Since feature is entirely anonymous and collects no personal information, COPPA consent may not be required. Consult with legal counsel for final determination.

---


## Scaling Considerations

### Performance Targets

- **Response Time**: < 200ms (p95)
- **Throughput**: 100 requests/second
- **Availability**: 99.9% uptime
- **Data Size**: < 10MB total (ephemeral)

### Scaling Strategy

#### Vertical Scaling (Single Server)
- **Up to 1,000 users**: Single server + Redis sufficient
- **Memory**: 512MB - 1GB
- **CPU**: 1-2 cores

#### Horizontal Scaling (Multiple Servers)
- **1,000 - 10,000 users**: Add load balancer + 2-3 servers
- **Redis**: Shared Redis instance (managed service)
- **Caching**: CDN caching for GET requests

#### High Scale (10,000+ users)
- **Redis Cluster**: Multiple Redis instances with sharding
- **Regional Deployment**: Servers in multiple regions (if expanding beyond Sweden)
- **Rate Limiting**: More sophisticated algorithms (token bucket)

---


## Monitoring & Maintenance

### Key Metrics

- **Total active cells**: Number of grid cells with data
- **Submission rate**: Submissions per minute
- **Error rate**: Failed requests percentage
- **Response time**: API latency (p50, p95, p99)
- **Redis memory**: Current memory usage

### Alerts

- Error rate > 5%
- Response time p95 > 500ms
- Redis memory > 80%
- Submission rate spike (potential attack)

### Maintenance

- Rotate `IP_SALT` daily (automated cron job)
- Review logs weekly for anomalies
- Update dependencies monthly
- Performance review quarterly

---