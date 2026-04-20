# OPSIYS Production Launch Guide

This website has been converted to a full-stack application (Express + React) to handle real data and production requirements.

## 🚀 Key Production Integrations

To make this a "real" live website, follow these steps:

### 1. Email Handling (The Leads)
The contact form currently logs to the server console. To receive real emails:
- **Service**: Use [Resend](https://resend.com) or [SendGrid](https://sendgrid.com).
- **Setup**: 
    1. Install the SDK: `npm install resend`
    2. Add API key to `.env`
    3. Update `server.ts` to send the email inside the `/api/contact` route.

### 2. Domain & Hosting
- **Hosting**: Recommended [Vercel](https://vercel.com) (Standard for Next.js/React) or [Render](https://render.com) (Great for Express backends).
- **Domain**: Purchase `opsiys.com` via Namecheap or Google Domains.
- **SSL**: Most modern hosts provide this for free automatically.

### 3. Analytics & Tracking
To track conversions from your "Book a Call" button:
- **Google Analytics**: Add the tracking script to `index.html`.
- **Facebook/LinkedIn Pixel**: Essential if you plan on running ads for your agency.

### 4. SEO & Meta Tags
- Update `index.html` with:
    - `<title>OPSIYS | AI Automation & Scalable Workflows</title>`
    - `<meta name="description" content="...">`
    - Open Graph tags for premium link sharing on LinkedIn/Twitter.

### 5. Deployment Script
To deploy manually or to a VPS:
1. `npm run build` (Generates the optimized frontend)
2. `npm start` (Starts the production server on port 3000)

---

## 🛠 Tech Stack Details
- **Frontend**: React 19 + Vite + Tailwind 4
- **Backend**: Node.js + Express (Full-stack)
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui

Feel free to ask if you need a specific implementation for any of these steps!
