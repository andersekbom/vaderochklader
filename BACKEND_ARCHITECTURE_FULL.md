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

### DDoS & Abuse Prevention

#### 1. Rate Limiting (Multiple Layers)

```javascript
// IP-based rate limiting
const ipLimiter = rateLimit({
  store: new RedisStore({ client: redis }),
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 1, // 1 submission per 5 minutes
  message: 'Too many submissions, please try again later',
});

// Global rate limiting
const globalLimiter = rateLimit({
  store: new RedisStore({ client: redis }),
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 total requests per minute (all users)
});
```

#### 2. Request Validation

```javascript
// Validate grid cell format
function isValidGridCell(gridCell) {
  const pattern = /^\d{2}\.\d_\d{2}\.\d$/;
  return pattern.test(gridCell);
}

// Validate weather enum
const VALID_WEATHER = ['sunny', 'cloudy', 'rainy', 'snowy', 'stormy'];

// Validate temperature range
function isValidTemperature(temp) {
  return temp >= -40 && temp <= 40;
}

// Validate timestamp (within 5 minutes of server time)
function isValidTimestamp(timestamp) {
  const now = Date.now();
  const diff = Math.abs(now - timestamp);
  return diff < 5 * 60 * 1000; // 5 minutes
}
```

#### 3. Cloudflare Protection

- Enable "Under Attack Mode" if needed
- Bot detection and challenge pages
- Automatic DDoS mitigation
- Geographic restrictions (optional: Sweden only)

---

## Implementation Guide

### Step 1: Backend Setup (Node.js + Redis)

**Install Dependencies**:
```bash
npm install fastify redis dotenv
npm install -D @types/node typescript
```

**Project Structure**:
```
backend/
├── src/
│   ├── index.ts          # Server entry point
│   ├── routes/
│   │   ├── locations.ts  # Location endpoints
│   │   └── health.ts     # Health check
│   ├── services/
│   │   ├── redis.ts      # Redis client
│   │   └── gridCell.ts   # Grid calculation utils
│   ├── middleware/
│   │   ├── rateLimit.ts  # Rate limiting
│   │   └── validate.ts   # Request validation
│   └── config/
│       └── env.ts        # Environment config
├── package.json
├── tsconfig.json
└── .env
```

**Basic Server Implementation** (`src/index.ts`):

```typescript
import Fastify from 'fastify';
import redis from './services/redis';
import locationRoutes from './routes/locations';
import healthRoutes from './routes/health';

const server = Fastify({ logger: true });

// Register routes
server.register(locationRoutes, { prefix: '/v1' });
server.register(healthRoutes, { prefix: '/v1' });

// CORS configuration
server.register(require('@fastify/cors'), {
  origin: ['https://weatherclothesapp.com'], // Your mobile app domain
  methods: ['GET', 'POST'],
});

// Start server
const start = async () => {
  try {
    await redis.connect();
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server running on http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
```

**Redis Service** (`src/services/redis.ts`):

```typescript
import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

client.on('error', (err) => console.error('Redis error:', err));

export default client;
```

**Grid Cell Service** (`src/services/gridCell.ts`):

```typescript
export function calculateGridCell(
  lat: number,
  lng: number,
  precision: number = 0.5
): string {
  const gridLat = Math.floor(lat / precision) * precision;
  const gridLng = Math.floor(lng / precision) * precision;
  return `${gridLat.toFixed(1)}_${gridLng.toFixed(1)}`;
}

export function isValidGridCell(gridCell: string): boolean {
  const pattern = /^\d{2}\.\d_\d{2}\.\d$/;
  return pattern.test(gridCell);
}

export function isInSweden(gridCell: string): boolean {
  const [lat, lng] = gridCell.split('_').map(parseFloat);
  // Sweden bounds: lat 55-69, lng 11-24
  return lat >= 55 && lat <= 69 && lng >= 11 && lng <= 24;
}
```

**Location Routes** (`src/routes/locations.ts`):

```typescript
import { FastifyInstance } from 'fastify';
import redis from '../services/redis';
import { isValidGridCell, isInSweden } from '../services/gridCell';
import crypto from 'crypto';

const VALID_WEATHER = ['sunny', 'cloudy', 'rainy', 'snowy', 'stormy'];
const EXPIRATION_TIME = 4 * 60 * 60; // 4 hours

export default async function locationRoutes(server: FastifyInstance) {
  // Submit location
  server.post('/locations', async (request, reply) => {
    const { gridCell, weather, temperature, timestamp } = request.body as any;

    // Validation
    if (!isValidGridCell(gridCell) || !isInSweden(gridCell)) {
      return reply.code(400).send({ error: 'Invalid grid cell' });
    }
    if (!VALID_WEATHER.includes(weather)) {
      return reply.code(400).send({ error: 'Invalid weather condition' });
    }
    if (temperature < -40 || temperature > 40) {
      return reply.code(400).send({ error: 'Invalid temperature' });
    }

    // Rate limiting (hash IP)
    const ip = request.ip;
    const hashedIP = crypto
      .createHash('sha256')
      .update(ip + process.env.IP_SALT)
      .digest('hex')
      .substring(0, 16);

    const rateLimitKey = `ratelimit:${hashedIP}:${Math.floor(Date.now() / 300000)}`;
    const count = await redis.incr(rateLimitKey);
    await redis.expire(rateLimitKey, 300);

    if (count > 1) {
      return reply.code(429).send({ error: 'Rate limit exceeded', retryAfter: 300 });
    }

    // Store submission
    const submission = {
      weather,
      temperature,
      submittedAt: Date.now(),
    };

    const cellKey = `cell:${gridCell}`;
    await redis.lpush(cellKey, JSON.stringify(submission));
    await redis.expire(cellKey, EXPIRATION_TIME);

    return reply.send({
      success: true,
      cellId: gridCell,
      expiresIn: EXPIRATION_TIME,
    });
  });

  // Fetch locations
  server.get('/locations', async (request, reply) => {
    const keys = await redis.keys('cell:*');
    const locations = [];

    for (const key of keys) {
      const data = await redis.lrange(key, 0, -1);
      const submissions = data.map((d) => JSON.parse(d));

      // Only include cells with 2+ users
      if (submissions.length >= 2) {
        const avgTemp = Math.round(
          submissions.reduce((sum, s) => sum + s.temperature, 0) / submissions.length
        );
        const mostCommonWeather = submissions
          .map((s) => s.weather)
          .sort(
            (a, b) =>
              submissions.filter((s) => s.weather === b).length -
              submissions.filter((s) => s.weather === a).length
          )[0];

        locations.push({
          gridCell: key.replace('cell:', ''),
          count: submissions.length,
          weather: mostCommonWeather,
          avgTemperature: avgTemp,
          lastUpdated: Math.max(...submissions.map((s) => s.submittedAt)),
        });
      }
    }

    return reply.send({
      locations,
      totalCells: locations.length,
      timestamp: Date.now(),
    });
  });
}
```

---

### Step 2: Mobile Client Integration

**Location Submission** (`src/services/communityMapApi.js`):

```javascript
import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig.extra.communityMapApiUrl;

// Calculate grid cell (client-side for privacy)
function calculateGridCell(lat, lng, precision = 0.5) {
  const gridLat = Math.floor(lat / precision) * precision;
  const gridLng = Math.floor(lng / precision) * precision;
  return `${gridLat.toFixed(1)}_${gridLng.toFixed(1)}`;
}

export async function submitLocation(latitude, longitude, weather, temperature) {
  try {
    const gridCell = calculateGridCell(latitude, longitude);

    const response = await fetch(`${API_BASE_URL}/v1/locations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Version': '1.0',
      },
      body: JSON.stringify({
        gridCell,
        weather,
        temperature: Math.round(temperature),
        timestamp: Date.now(),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Submission failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to submit location:', error);
    throw error;
  }
}

export async function fetchActiveLocations() {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/locations`, {
      headers: {
        'X-API-Version': '1.0',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch locations:', error);
    throw error;
  }
}
```

**UI Integration** (add to `SwedenMap.js`):

```javascript
// Add to SwedenMap component
const [communityLocations, setCommunityLocations] = useState([]);

useEffect(() => {
  // Fetch community locations every 30 seconds
  const fetchCommunity = async () => {
    try {
      const data = await fetchActiveLocations();
      setCommunityLocations(data.locations);
    } catch (error) {
      console.error('Failed to fetch community locations:', error);
    }
  };

  fetchCommunity();
  const interval = setInterval(fetchCommunity, 30000);
  return () => clearInterval(interval);
}, []);

// Render community markers in SVG
{communityLocations.map((loc, index) => {
  const [lat, lng] = loc.gridCell.split('_').map(parseFloat);
  const pos = latLngToSvg(lat + 0.25, lng + 0.25); // Center of grid cell

  return (
    <React.Fragment key={index}>
      <Circle
        cx={pos.x}
        cy={pos.y}
        r="10"
        fill={getWeatherColor(loc.weather)}
        opacity="0.7"
        stroke="#333"
        strokeWidth="1"
      />
      <SvgText
        x={pos.x}
        y={pos.y + 4}
        fontSize="10"
        textAnchor="middle"
        fill="white"
      >
        {loc.count}
      </SvgText>
    </React.Fragment>
  );
})}
```

---

### Step 3: Deployment

#### Option 1: Railway (Recommended for beginners)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add Redis
railway add redis

# Deploy
railway up
```

**Environment Variables**:
```
REDIS_URL=redis://default:password@redis.railway.internal:6379
IP_SALT=random-daily-rotating-salt
NODE_ENV=production
```

#### Option 2: DigitalOcean App Platform

1. Push code to GitHub
2. Create new App in DigitalOcean
3. Connect GitHub repo
4. Add Redis managed database
5. Configure environment variables
6. Deploy

**Cost**: ~$12/month (Basic tier + Redis)

#### Option 3: AWS Lambda + API Gateway

Serverless option for high scalability and low cost.

**Cost**: Free tier covers ~1M requests/month

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

## Alternative Approaches

### 1. Fully Client-Side (P2P)

**Pros**:
- No backend needed
- Zero data collection
- Maximum privacy

**Cons**:
- Requires WebRTC or similar
- Complex implementation
- Difficult to moderate
- Battery intensive

**Verdict**: Not recommended for children's app

---

### 2. Blockchain-Based

**Pros**:
- Decentralized
- Transparent

**Cons**:
- Extremely complex
- High latency
- Expensive
- Overkill for this use case

**Verdict**: Not recommended

---

### 3. Firebase Realtime Database

**Pros**:
- Easy to set up
- Automatic scaling
- Real-time updates

**Cons**:
- More expensive at scale
- Less control over data
- Harder to implement strict anonymity

**Verdict**: Possible alternative, but custom backend preferred for privacy control

---

## Cost Estimates

### Monthly Operating Costs (Sweden region)

| Users  | Hosting        | Redis    | Total/month |
|--------|----------------|----------|-------------|
| 0-100  | Free (Render)  | Free     | $0          |
| 100-1K | Railway Basic  | Included | $5          |
| 1K-10K | DO App Platform| $7       | $12-20      |
| 10K+   | AWS/GCP        | $15      | $30-50      |

---

## Privacy Policy Addition

Add this section to your privacy policy:

```
### Community Weather Map (Optional Feature)

The Weather & Clothes App includes an optional "Community Map" feature that shows where the app is being used across Sweden.

**What data is shared:**
- Your approximate location (rounded to a 50km area)
- Current weather condition in your area
- Current temperature

**What data is NOT shared:**
- Your name or any identifying information
- Your exact location
- Your device information
- Your history or usage patterns

**How it works:**
- When you open the map, your phone may send your approximate area to our servers
- Data is automatically deleted after 4 hours
- We cannot identify individual users
- No data is used for advertising or sold to third parties

**Your choice:**
- This feature is optional and can be disabled in settings
- You can use all other app features without enabling this

**Child safety:**
- Users cannot communicate with each other
- No personal information is ever collected or displayed
- Locations are grouped by large areas (50km+) to prevent identification
```

---

## Testing Checklist

Before launch:

- [ ] Load testing (100+ concurrent users)
- [ ] Privacy audit (cannot identify users)
- [ ] Rate limiting works correctly
- [ ] Data expiration verified (4 hours)
- [ ] No data leaks in logs
- [ ] HTTPS enforced
- [ ] CORS configured correctly
- [ ] Error handling tested
- [ ] Monitoring and alerts configured
- [ ] Privacy policy updated
- [ ] Legal review completed
- [ ] Parent testing group feedback

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

## Legal Disclaimer

**IMPORTANT**: This document provides technical architecture guidance only. It is not legal advice. Before implementing this feature:

1. Consult with a privacy lawyer familiar with GDPR and COPPA
2. Conduct a Data Protection Impact Assessment (DPIA)
3. Update privacy policy and obtain necessary consents
4. Consider appointing a Data Protection Officer (DPO) if required
5. Implement proper data breach notification procedures

Children's privacy is serious business. When in doubt, collect less data.

---

**Last Updated**: December 2025
**Architecture Version**: 1.0
**Security Review**: Required before production deployment
