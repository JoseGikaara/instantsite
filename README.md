# InstantSite - Website Generator for Sales Agents

A Next.js MVP platform that allows sales agents to generate instant website previews and run Google Presence audits.

## Features

- **Authentication**: Simple email/password signup and login
- **Credit System**: Agents start with 10 credits, deducted for previews and audits
- **Website Preview Generator**: 4 locked template types
- **AI-Powered Content**: DeepSeek AI integration for enhanced website content
- **Google Presence Audit**: Mock audit system for GMB checks
- **Dashboard**: View all previews and audits in one place

## Tech Stack

- Next.js 14 (App Router)
- React
- Tailwind CSS
- Prisma + PostgreSQL
- Server Actions
- bcryptjs for password hashing

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up local PostgreSQL database:
   - Install PostgreSQL locally (if not already installed)
   - Create a database named `instantsite`:
     ```sql
     CREATE DATABASE instantsite;
     ```
   - Create a `.env` file in the root directory with:
     ```
     DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/instantsite"
     DEEPSEEK_API_KEY=sk-c817cdf01ae84afcab78fd6d08b29f12
     DEEPSEEK_BASE_URL=https://api.deepseek.com/v1
     GOOGLE_PLACES_API_KEY=AIzaSyAb9_qu6cTBQSNZkXNVNEhmhEQIrl_f5tY
     ```
     Replace `YOUR_PASSWORD` with your PostgreSQL password. If using default postgres user without password, use:
     ```
     DATABASE_URL="postgresql://postgres@localhost:5432/instantsite"
     ```
     **Note**: API keys are configured with defaults in the code, but it's recommended to set them in `.env` for security.

3. Initialize Prisma:
```bash
npx prisma db push
npx prisma generate
```

4. Seed test data:
```bash
npm run db:seed
```

5. Run the development server:
```bash
npm run dev
```

## Test Account

- Email: `test@agent.com`
- Password: `password123`
- Starting Credits: 50

## Website Templates

1. **Local Business Website** - Standard business page
2. **WhatsApp Lead Website** - WhatsApp-focused lead generation
3. **Landing Page** - Conversion-focused landing page
4. **Directory Listing Page** - Directory-style listing

## Project Structure

```
app/
  api/          # API routes (auth, generate, audit)
  dashboard/    # Dashboard and action pages
  preview/      # Preview display pages
  components/   # React components
  templates/    # Website templates
lib/            # Utilities (auth, prisma)
prisma/         # Database schema and seed
```

## AI Enhancement

The platform includes DeepSeek AI integration for enhanced website content:

- **Automatic AI Generation**: New previews automatically include AI-generated content (if API key is configured)
- **Manual Enhancement**: Use the "✨ Enhance with AI" button on any preview to upgrade it
- **AI Content Includes**: Headlines, descriptions, service lists, CTAs, and SEO metadata
- **Credit Cost**: AI enhancement costs 1 additional credit
- **Rate Limiting**: Max 10 AI requests per minute per agent
- **Fallback**: If AI fails, basic content is used automatically

## Google Places Integration

The Google Presence Audit now uses real Google Places API:

- **Real Business Data**: Searches Google Places for actual business information
- **Completeness Score**: Calculated based on available data (name, address, rating, reviews, photos)
- **Accurate Results**: Shows real ratings, review counts, and photo availability
- **Fallback**: If Google Places API fails, falls back to mock data
- **API Key**: Configured with Google Places API key

## Notes

- Credits are deducted immediately on preview generation and audit
- Preview URLs are generated with unique IDs
- All templates are mobile-first and use Tailwind CSS
- AI enhancement is optional - works with or without DeepSeek API key
- No payment integration (MVP only)
- Audit logic is mocked for MVP

