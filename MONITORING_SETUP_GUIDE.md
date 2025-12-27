# inspir Monitoring & Analytics Setup Guide

This guide covers setting up uptime monitoring, keyword ranking tracking, and error monitoring for the inspir platform.

---

## ✅ Already Configured

### 1. Google Analytics 4
**Status:** ✅ Active (ID: G-H9NLQ3DV2T)
- Location: `/root/inspir/nextjs-seo/src/app/layout.tsx:31-44`
- Helper functions: `/root/inspir/nextjs-seo/src/lib/analytics.ts`
- Tracking: Page views, events, conversions

**Usage Examples:**
```typescript
import { trackBlogView, trackCTAClick, trackToolView } from '@/lib/analytics'

// Track blog post view
trackBlogView('Post Title', 'post-slug', 'Category Name')

// Track CTA clicks
trackCTAClick('Start Free Trial', 'pricing_page')

// Track tool page view
trackToolView('Quiz Generator', 'quiz-generator')
```

### 2. Microsoft Clarity
**Status:** ✅ Active (ID: uqoefkpodz)
- Location: `/root/inspir/nextjs-seo/src/app/layout.tsx:47-57`
- Features: Heatmaps, session recordings, user behavior analytics
- Dashboard: https://clarity.microsoft.com/

### 3. Search Console
**Status:** ✅ Submitted
- Sitemap URL: https://inspir.uk/sitemap.xml
- Dashboard: https://search.google.com/search-console

### 4. Bing Webmaster Tools
**Status:** ✅ Submitted
- Dashboard: https://www.bing.com/webmasters

---

## 🚀 Setup Required

### 5. Uptime Monitoring

#### Option A: UptimeRobot (Recommended - Free)

**Why:** Free for up to 50 monitors, 5-minute checks, email/SMS alerts

**Setup Steps:**

1. **Sign up at https://uptimerobot.com/**
   - Create free account
   - No credit card required

2. **Add Monitors:**
   ```
   Monitor 1: Main Site
   - Type: HTTP(s)
   - URL: https://inspir.uk
   - Name: inspir - Homepage
   - Monitoring Interval: 5 minutes

   Monitor 2: Blog
   - Type: HTTP(s)
   - URL: https://inspir.uk/blog
   - Name: inspir - Blog
   - Monitoring Interval: 5 minutes

   Monitor 3: API Health
   - Type: Keyword
   - URL: https://inspir.uk/api/chat
   - Name: inspir - API
   - Keyword: (check for 404 or specific response)
   - Alert if keyword is found: Yes (for 404)

   Monitor 4: Next.js App
   - Type: HTTP(s)
   - URL: https://inspir.uk/tools
   - Name: inspir - Tools Page
   ```

3. **Configure Alerts:**
   - Alert Contacts → Add email
   - Optional: Add SMS (requires paid plan)
   - Alert threshold: Alert me when monitor is down

4. **Get Status Page (Optional):**
   - UptimeRobot provides free public status page
   - URL: `https://status.inspir.uk` (requires CNAME setup)
   - OR use: `https://yourusername.uptimerobot.com`

**Expected Result:**
- Email alerts within 5 minutes of downtime
- Dashboard showing uptime percentage (target: 99.9%+)
- Incident history and response times

---

#### Option B: Better Uptime (Alternative - Also Free)

**Why:** Beautiful status pages, more detailed analytics

**Setup:** https://betteruptime.com
- Similar setup to UptimeRobot
- Free tier: 3 monitors
- Better status pages and Slack integration

---

#### Option C: Self-Hosted (Advanced)

**Use Uptime Kuma (Docker):**

```bash
# Install Uptime Kuma on your server
docker run -d --restart=always -p 3002:3001 -v uptime-kuma:/app/data --name uptime-kuma louislam/uptime-kuma:1

# Access at: http://your-server-ip:3002
```

Pros: Full control, no external dependencies
Cons: Requires server maintenance

---

### 6. Keyword Ranking Tracking

#### Option A: Google Search Console (Free - Already Set Up)

**Access:** https://search.google.com/search-console

**Features:**
- Tracks keywords you're ranking for
- Shows impressions, clicks, CTR, position
- Completely free

**How to Use:**
1. Go to Search Console dashboard
2. Click "Performance" → "Search results"
3. Filter by:
   - **Pages**: See which pages rank best
   - **Queries**: See which keywords drive traffic
   - **Countries**: Geographic performance
   - **Devices**: Mobile vs desktop

**Export Keywords Weekly:**
```
Search Console → Performance → Export → Download CSV
- Track ranking changes over time
- Focus on keywords with high impressions, low CTR (opportunity)
```

**Target Keywords to Track (from your plan):**
- "AI tutor for students"
- "active recall study method"
- "SAT study guide"
- "GCSE revision strategies"
- "AI quiz generator"
- "Pomodoro timer for studying"

---

#### Option B: Ahrefs (Paid - $99/month - Professional)

**Best For:** Comprehensive SEO tracking, competitor analysis

**Setup:**
1. Sign up: https://ahrefs.com/
2. Add Project → Enter inspir.uk
3. Rank Tracker → Add keywords (50-100 keywords)
4. Set up weekly email reports

**Features:**
- Daily rank updates
- Competitor tracking
- Backlink monitoring
- Keyword suggestions
- SERP feature tracking

**ROI:** Worth it if you're serious about SEO growth

---

#### Option C: Semrush (Paid - $119/month - Alternative)

Similar to Ahrefs, slightly different feature set.

**Setup:** https://www.semrush.com/

---

#### Option D: Free Rank Tracker Tools

**1. SerpWatcher by Mangools ($29/month)**
- Cheapest paid option
- Good for small sites
- https://mangools.com/serpwatcher

**2. Nightwatch (Free tier available)**
- https://nightwatch.io/
- Limited free tier: 25 keywords

**3. Manual Tracking (Free - Time-consuming)**

Create a Google Sheet and track manually:

```
Keywords to Track:
- AI tutor for students
- active recall study method
- SAT study guide
- flashcard app for students
- Pomodoro timer for studying

Weekly Process:
1. Google each keyword in incognito
2. Find your ranking position
3. Log in spreadsheet
4. Track trends
```

---

### 7. Error Monitoring

#### Option A: Sentry (Recommended - Free Tier)

**Why:** Industry standard, 5,000 errors/month free, full stack trace

**Setup for Next.js:**

1. **Sign up:** https://sentry.io/signup/

2. **Install Sentry:**
```bash
cd /root/inspir/nextjs-seo
npx @sentry/wizard@latest -i nextjs
```

This wizard will:
- Create `sentry.client.config.ts`
- Create `sentry.server.config.ts`
- Update `next.config.mjs`
- Add environment variables

3. **Add to environment variables:**
```bash
# Add to /root/inspir/nextjs-seo/.env.local
NEXT_PUBLIC_SENTRY_DSN=your-dsn-here
SENTRY_ORG=your-org
SENTRY_PROJECT=inspir-nextjs
```

4. **Test Error Tracking:**
```typescript
// Add a test error button in development
import * as Sentry from '@sentry/nextjs'

<button onClick={() => {
  Sentry.captureException(new Error('Test error'))
}}>
  Trigger Test Error
</button>
```

5. **Configure Alerts:**
- Sentry Dashboard → Alerts → Create Alert
- Trigger: New issue created
- Action: Email notification
- Filter: Production environment only

**Expected Result:**
- Real-time error notifications
- Full stack traces with source maps
- User context (browser, OS, etc.)
- Performance monitoring (on paid plans)

---

#### Option B: LogRocket (Alternative - Session Replay + Errors)

**Why:** Combines error tracking with session replay (see what user did before error)

**Setup:**

1. **Sign up:** https://logrocket.com/

2. **Install:**
```bash
cd /root/inspir/nextjs-seo
npm install logrocket logrocket-react
```

3. **Initialize in layout:**
```typescript
// /root/inspir/nextjs-seo/src/app/layout.tsx
import LogRocket from 'logrocket'

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  LogRocket.init('your-app-id/inspir')
}
```

4. **Integrate with Sentry (Optional):**
```typescript
import * as Sentry from '@sentry/nextjs'
import LogRocket from 'logrocket'

LogRocket.getSessionURL(sessionURL => {
  Sentry.configureScope(scope => {
    scope.setExtra('sessionURL', sessionURL)
  })
})
```

**Pricing:**
- Free: 1,000 sessions/month
- Pro: $99/month (10,000 sessions)

---

#### Option C: Express Backend Error Monitoring

**For your Express API (port 3000):**

1. **Install Sentry for Node.js:**
```bash
cd /root/inspir/backend
npm install @sentry/node
```

2. **Update `server.js`:**
```javascript
// At the top of server.js
const Sentry = require('@sentry/node')

Sentry.init({
  dsn: 'your-backend-dsn',
  environment: process.env.NODE_ENV || 'development',
  tracesSampleRate: 1.0,
})

// Request handler (must be first middleware)
app.use(Sentry.Handlers.requestHandler())

// ... your routes ...

// Error handler (must be last middleware before default error handler)
app.use(Sentry.Handlers.errorHandler())
```

3. **PM2 Logs Integration:**
```bash
# View real-time logs
pm2 logs inspir-backend

# Set up log rotation
pm2 install pm2-logrotate

# Configure max log size
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

---

### 8. Performance Monitoring (Lighthouse CI)

**Automate Lighthouse Audits:**

1. **Install Lighthouse CI:**
```bash
npm install -g @lhci/cli
```

2. **Create config:**
```bash
cd /root/inspir/nextjs-seo
```

Create `lighthouserc.js`:
```javascript
module.exports = {
  ci: {
    collect: {
      url: [
        'https://inspir.uk/',
        'https://inspir.uk/blog',
        'https://inspir.uk/tools',
        'https://inspir.uk/pricing',
      ],
      numberOfRuns: 3,
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', {minScore: 0.9}],
        'categories:accessibility': ['error', {minScore: 0.9}],
        'categories:seo': ['error', {minScore: 0.95}],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
```

3. **Run Weekly Audits:**
```bash
# Manual run
lhci autorun

# Or add to cron
crontab -e
# Add: 0 0 * * 0 cd /root/inspir/nextjs-seo && lhci autorun
```

---

## 📊 Recommended Monitoring Stack (Budget-Conscious)

### Free Tier Setup (£0/month):
1. ✅ **Google Analytics 4** - Traffic & conversions (already active)
2. ✅ **Microsoft Clarity** - User behavior (already active)
3. ✅ **Google Search Console** - Keyword rankings (already active)
4. 🚀 **UptimeRobot** - Uptime monitoring (setup: 10 min)
5. 🚀 **Sentry Free** - Error tracking (setup: 15 min)
6. 📈 **Manual keyword tracking** - Google Sheets (setup: 5 min)

**Total Monthly Cost:** £0
**Setup Time:** ~30 minutes

---

### Growth Tier Setup (£28-50/month):
1. ✅ **Google Analytics 4** - Traffic & conversions
2. ✅ **Microsoft Clarity** - User behavior
3. ✅ **Google Search Console** - Basic keywords
4. 🚀 **Better Uptime Pro** - Advanced uptime (£15/month)
5. 🚀 **Sentry Team** - Better error tracking (£26/month)
6. 📈 **SerpWatcher** - Automated rank tracking (£29/month)

**Total Monthly Cost:** £70/month
**Value:** Professional monitoring, saves hours of manual work

---

### Professional Tier (£200+/month):
Add Ahrefs or Semrush for competitive intelligence.

---

## 🎯 Quick Start: Essential Monitoring (30 minutes)

**Priority Order:**

1. **Uptime Monitoring (10 min)**
   - Sign up for UptimeRobot
   - Add 4 monitors (homepage, blog, tools, API)
   - Set email alerts

2. **Error Tracking (15 min)**
   - Run Sentry wizard: `npx @sentry/wizard@latest -i nextjs`
   - Add environment variables
   - Deploy and test

3. **Keyword Tracking (5 min)**
   - Open Google Search Console
   - Export current keyword data
   - Create weekly reminder to check rankings

---

## 📝 Monitoring Checklist

### Daily:
- [ ] Check Sentry for new errors (if any email alerts)
- [ ] Check GA4 for traffic anomalies

### Weekly:
- [ ] Review Search Console keyword performance
- [ ] Check UptimeRobot uptime % (target: 99.9%+)
- [ ] Review Clarity session recordings (1-2 sessions)

### Monthly:
- [ ] Run Lighthouse audit
- [ ] Review error trends in Sentry
- [ ] Export keyword rankings (track growth)
- [ ] Review conversion funnel in GA4

---

## 🚨 Alert Thresholds

**Immediate Action Required:**
- Site down (UptimeRobot alert)
- Error rate >1% (Sentry alert)
- Traffic drop >50% day-over-day (GA4)

**Investigate Within 24h:**
- Error rate 0.1-1%
- Uptime <99.5%
- Core Web Vitals degradation

**Monitor Trends:**
- Keyword ranking drops (weekly)
- Conversion rate changes
- Bounce rate increases

---

## 💡 Pro Tips

1. **Set Up Slack Integrations:**
   - UptimeRobot → Slack (get instant downtime alerts)
   - Sentry → Slack (team error notifications)
   - Search Console → Weekly email reports

2. **Create Monitoring Dashboard:**
   - Use Google Data Studio (free)
   - Combine GA4 + Search Console + Uptime data
   - One view for all metrics

3. **Automate Reports:**
   - GA4: Schedule weekly email reports
   - Search Console: Auto-export to Google Sheets
   - Sentry: Daily digest of errors

4. **Test Your Alerts:**
   - Trigger test error in Sentry
   - Verify UptimeRobot alerts work
   - Check email delivery

---

## 📧 Support & Resources

**Google Analytics:** https://support.google.com/analytics
**Sentry Docs:** https://docs.sentry.io/platforms/javascript/guides/nextjs/
**UptimeRobot Docs:** https://uptimerobot.com/help/
**Search Console Help:** https://support.google.com/webmasters

---

## ✅ Done!

All monitoring tools are now configured or have setup guides. Your inspir platform has:
- ✅ Traffic analytics (GA4 + Clarity)
- ✅ SEO tracking (Search Console + Bing)
- 🚀 Uptime monitoring (guide provided)
- 🚀 Error tracking (guide provided)
- 🚀 Keyword tracking (guide provided)

**Next Steps:**
1. Follow "Quick Start" guide above (30 min)
2. Set weekly calendar reminders to review metrics
3. Adjust alert thresholds based on your baseline data

Happy monitoring! 🎉
