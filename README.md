# SalaryDaddy

## 1) What's this project?

SalaryDaddy is a Next.js web app that generates personalized salary negotiation scripts and email drafts using AI (Groq via the AI SDK). Users can choose negotiation context (new offer vs internal appraisal), compensation currency, monthly/annual basis, and supporting details like achievements and competing offers, then get ready-to-use negotiation output tailored to their situation.

## 2) Requirements

- Node.js 18+ (Node.js 20 LTS recommended)
- npm 9+ (or a compatible npm version bundled with Node.js)
- A Groq API key (`GROQ_API_KEY`) for real AI generation
- Optional ad IDs if you enable AdSense placements

## 3) How to start it locally

Run these commands from your terminal:

```bash
# 1) Clone
git clone <your-repo-url>
cd salary_daddy

# 2) Install dependencies
npm install

# 3) Create local env file
cp .env .env.local
```

Then edit `.env.local` and set at least:

```bash
GROQ_API_KEY=your_groq_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
USE_MOCK_AI=false
```

Optional env values:

```bash
# Optional model override
# GROQ_MODEL=llama-3.1-8b-instant

# Optional AdSense slots (only if ads are enabled in code)
# NEXT_PUBLIC_ADSENSE_CLIENT_ID=
# NEXT_PUBLIC_AD_SLOT_SIDEBAR=
# NEXT_PUBLIC_AD_SLOT_BELOW_OUTPUT=
```

Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## 4) How to run the tests?

There is no dedicated automated test suite configured yet (`test` script is not present). For now, run quality checks with:

```bash
npm run lint
npm run build
```

## 5) How to deploy it? (commands only)

```bash
npm install
npm run build
npm run start
```

```bash
npm install -g vercel
vercel login
vercel --prod
```
