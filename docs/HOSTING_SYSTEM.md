# Hosting System Documentation

## Overview

The InstantSite platform uses a credit-based hosting model where:
- **Preview generation**: 1 credit (one-time)
- **AI enhancement**: 1 credit (one-time)
- **Website deployment**: 20 credits (one-time)
- **Monthly hosting**: 5 credits per LIVE website (recurring every 30 days)

## Credit Economics

- **1 credit = KES 150** (configurable via `CREDIT_VALUE_KES` env var)
- Credits are treated as currency, not UI points
- All credit deductions are wrapped in database transactions for safety

## Website Statuses

A website can be in exactly one of three states:

1. **PREVIEW**: Initial state after generation. Not live, no hosting charges.
2. **LIVE**: Deployed and active. Requires monthly hosting credits.
3. **PAUSED**: Automatically paused when hosting credits are insufficient. Shows 402 Payment Required page.

## Monthly Hosting Charges

### How It Works

1. Every 30 days, the system charges `MONTHLY_HOSTING` (5) credits per LIVE website
2. If agent has sufficient credits → charge succeeds, website stays LIVE
3. If agent has insufficient credits → website is automatically paused (status → PAUSED)
4. Paused websites show a branded "Site paused" page instead of the website content

### Setting Up the Cron Job

The hosting charge system is triggered via the `/api/hosting/charge` endpoint.

#### Option 1: Vercel Cron (Recommended)

Add to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/hosting/charge",
      "schedule": "0 0 * * *"
    }
  ]
}
```

#### Option 2: External Cron Service

Use a service like:
- **cron-job.org**
- **EasyCron**
- **GitHub Actions** (scheduled workflows)

Set up a daily HTTP request to:
```
POST https://your-domain.com/api/hosting/charge
Authorization: Bearer YOUR_CRON_SECRET
```

Set `CRON_SECRET` in your environment variables.

#### Option 3: Manual Trigger (Development)

For testing, you can manually trigger the charge:

```bash
curl -X POST https://your-domain.com/api/hosting/charge \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

## Resuming Paused Websites

When an agent adds credits, they can resume paused websites:

1. Call `PUT /api/hosting/charge` with `agentId`
2. System checks if agent has sufficient credits for all paused websites
3. If yes → deduct credits and resume all paused websites to LIVE
4. If no → return error with required credit amount

## Agent Restrictions

- **Max LIVE sites**: 10 per agent (configurable via `MAX_LIVE_SITES_PER_AGENT` env var)
- **Deployment blocked** if:
  - Agent has insufficient credits (< 20)
  - Agent has reached max LIVE sites limit
- **AI enhancement blocked** if agent has insufficient credits (< 1)

## Database Schema

### WebsitePreview Model

```prisma
enum WebsiteStatus {
  PREVIEW
  LIVE
  PAUSED
}

model WebsitePreview {
  status        WebsiteStatus @default(PREVIEW)
  deployed_at   DateTime?
  last_hosting_charged_at DateTime?
  // ... other fields
}
```

## Credit Costs Configuration

All costs are defined in `lib/credits.ts`:

```typescript
export const CREDIT_COSTS = {
  PREVIEW_GENERATION: 1,
  AI_ENHANCEMENT: 1,
  SECTION_ADDITION: 1,
  DEPLOY_WEBSITE_BASE: 20,
  MONTHLY_HOSTING: 5,
}
```

## Environment Variables

```bash
# Credit value in KES
CREDIT_VALUE_KES=150

# Max LIVE sites per agent
MAX_LIVE_SITES_PER_AGENT=10

# Cron secret for hosting charge endpoint
CRON_SECRET=your-secret-key-here
```

## API Endpoints

### Deploy Website
```
POST /api/deploy
Body: { previewId: string }
```

### Charge Hosting (Cron)
```
POST /api/hosting/charge
Headers: { Authorization: Bearer CRON_SECRET }
```

### Resume Paused Websites
```
PUT /api/hosting/charge
Body: { agentId: string }
```

## Testing the System

1. **Generate a preview** (costs 1 credit)
2. **Deploy the website** (costs 20 credits, sets status to LIVE)
3. **Wait 30 days** or manually trigger hosting charge
4. **If insufficient credits** → website pauses automatically
5. **Add credits** → resume paused websites

## Economic Model

This system ensures:
- **Platform earns recurring revenue** per deployed website (5 credits/month)
- **Agents pay fair prices** for infrastructure and AI services
- **Automatic pause** prevents unexpected charges
- **Clear cost structure** for agents to understand expenses

