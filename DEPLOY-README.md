# Bernadette Borromeo-Macatangay — Portfolio

Next.js 16 + TypeScript + Tailwind CSS 4 + shadcn/ui portfolio website.

## Deploy to Vercel (5 minutes)

1. Go to github.com and sign in (or create a free account)
2. Click the **+** icon (top right) → **New repository**
3. Name it `portfolio` (or anything you like)
4. Set to **Public** (Vercel Hobby tier needs public repos for free)
5. Click **Create repository**
6. On the next page, scroll to "uploading an existing file" link and click it
7. Drag all files from this ZIP into the GitHub upload area
8. Commit with message "Initial portfolio upload"
9. Go to vercel.com → log in with Google
10. Click **Add New** → **Project**
11. Click **Import** next to your `portfolio` GitHub repo
12. Vercel auto-detects Next.js — just click **Deploy**
13. Wait ~2 minutes — Vercel gives you a URL like `portfolio-xxx.vercel.app`
14. Click **Visit** to confirm the site loads (with valid HTTPS — no more warnings!)

## After deploy: update your Bitly link

1. Go to bitly.com → log in
2. Find your `bit.ly/bernadette-portfolio` link → click Edit
3. Replace the destination URL with your new Vercel URL
4. Save — your Bitly link now redirects to a secure HTTPS site

## After deploy: regenerate the QR code

The QR code in `public/qr-portfolio.png` currently encodes the old URL.
Once you have your Vercel URL, you can either:
- Use any free online QR generator (qr-code-generator.com) with your Vercel URL
- Or just leave the current QR code — it points to Bitly, which will redirect correctly

## Local development (optional)

If you want to run the project locally:
```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Tech stack
- Next.js 16 (App Router)
- TypeScript 5
- Tailwind CSS 4
- shadcn/ui components
- Inter + Playfair Display fonts (loaded via next/font/google)
