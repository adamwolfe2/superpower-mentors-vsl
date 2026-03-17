# VSL Quiz Booking Funnel — Template

A production-ready, reusable VSL quiz funnel built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## How It Works

1. Visitor lands on `/apply`
2. They answer 3 qualifying questions (auto-advance on selection)
3. They enter their email
4. They're routed to one of 3 Cal.com/Calendly embeds based on their score
5. Lead data is POSTed to your webhook (Zapier, Make, n8n)

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/apply`.

## Deploy to Vercel

1. Push this repo to GitHub (already done: github.com/adamwolfe2/superpower-mentors-vsl)
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import from GitHub
3. Select `adamwolfe2/superpower-mentors-vsl`
4. No environment variables needed — click **Deploy**
5. Once deployed, go to **Settings → Domains** → add `superheromentor.com`
6. Update DNS at your registrar: add a CNAME pointing `@` or `www` to `cname.vercel-dns.com`

**Framework:** Next.js 15 (auto-detected)
**Build command:** `npm run build` (auto-detected)
**Output:** `.next` (auto-detected)

## Customizing Per Client

All configuration lives in **one file**: `config/client.ts`

### 1. Swap the Logo
- Drop your SVG or PNG into `/public/` (e.g. `logo-clientname.svg`)
- Update `brand.logoUrl` in `config/client.ts`:
  ```ts
  logoUrl: "/logo-clientname.svg",
  ```

### 2. Change Brand Colors
Update these three values in `brand`:
```ts
primaryColor: "#2563EB",       // Main color — buttons, progress bar, accents
primaryColorLight: "#EFF6FF",  // Light tint — option hover/selected backgrounds
primaryColorDark: "#1D4ED8",   // Darker shade — button hover state
```

### 3. Update the Headline & Subheadline
```ts
quiz: {
  headline: "Find out if you qualify for [Your Service]",
  subheadline: "Answer 3 quick questions to see if we're a fit.",
}
```

### 4. Change the Questions
Edit the `questions` array. Each question has a `key`, `text`, and `options`. Each option has an `id`, `label`, and `points` value.
```ts
questions: [
  {
    key: "q1",
    text: "Your question here?",
    options: [
      { id: "a", label: "Option A", points: 0 },
      { id: "b", label: "Option B", points: 1 },
      { id: "c", label: "Option C", points: 2 },
      { id: "d", label: "Option D", points: 3 },
    ],
  },
  // ... q2, q3
]
```

### 5. Update Calendar URLs
```ts
calendars: {
  high: "https://cal.com/your-name/hot-lead",   // Score >= thresholds.high
  mid:  "https://cal.com/your-name/warm-lead",  // Score >= thresholds.mid
  low:  "https://cal.com/your-name/intro-call", // Score < thresholds.mid
},
```
Works with Cal.com and Calendly embed URLs.

### 6. Adjust Score Thresholds
```ts
thresholds: {
  high: 7,  // Total points >= 7 → hot lead calendar
  mid: 4,   // Total points >= 4 → warm lead calendar
            // Total points < 4  → intro call calendar
},
```

### 7. Connect Your Webhook
```ts
webhook: {
  url: "https://hooks.zapier.com/hooks/catch/YOUR_HOOK_ID",
}
```
Supports Zapier, Make.com, n8n, or any HTTP endpoint. Payload:
```json
{
  "email": "user@example.com",
  "answers": { "q1": "c", "q2": "b", "q3": "d" },
  "timestamp": "2025-01-01T00:00:00.000Z",
  "source": "Acme Corp"
}
```

### 8. Update SEO Meta
```ts
meta: {
  title: "Apply | Your Company Name",
  description: "See if you qualify for our program.",
  faviconUrl: "/favicon.ico",
}
```

## Deploying to Vercel

1. Push to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. No environment variables needed (config is in `config/client.ts`)
4. Add your custom domain in Vercel → Project → Settings → Domains

## Forking for a New Client

1. Fork this repository (or duplicate it)
2. Edit `config/client.ts` only
3. Drop new logo in `/public/`
4. Deploy as a new Vercel project

Zero other files need to change.
