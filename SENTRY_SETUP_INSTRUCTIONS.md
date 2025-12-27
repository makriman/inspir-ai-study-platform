# 🔴 Sentry Setup Instructions

## ✅ What I've Done

I've installed and configured Sentry for your Next.js app. Here's what's ready:

**Files Created:**
- ✅ `sentry.client.config.ts` - Browser error tracking
- ✅ `sentry.server.config.ts` - Server error tracking
- ✅ `sentry.edge.config.ts` - Edge runtime tracking
- ✅ `next.config.mjs` - Updated with Sentry integration
- ✅ `.env.sentry-template` - Environment variable template

---

## 🎯 What YOU Need to Do (10 minutes)

### **Step 1: Create Sentry Account (3 minutes)**

1. **Go to:** https://sentry.io/signup/

2. **Sign up** with email or GitHub

3. **Create Organization:**
   - Name: `inspir`
   - Click "Create Organization"

4. **Create Project:**
   - Platform: Select **"Next.js"**
   - Project name: `inspir-nextjs`
   - Team: Default
   - Click "Create Project"

5. **YOU'LL SEE A DSN** - Copy it! It looks like:
   ```
   https://1234567890abcdef@o123456.ingest.sentry.io/7654321
   ```

---

### **Step 2: Get Your Auth Token (2 minutes)**

1. **Go to:** https://sentry.io/settings/account/api/auth-tokens/

2. **Click "Create New Token"**

3. **Token Settings:**
   - Name: `inspir-nextjs-upload`
   - Scopes: Select these:
     - ✅ `project:releases`
     - ✅ `project:write`
     - ✅ `org:read`

4. **Click "Create Token"** and **copy it immediately** (you won't see it again!)

---

### **Step 3: Add Environment Variables (3 minutes)**

```bash
cd /root/inspir/nextjs-seo

# Create .env.local from template
cp .env.sentry-template .env.local

# Edit the file
nano .env.local
```

**Replace** the placeholder values:

```bash
# Paste your DSN from Step 1
NEXT_PUBLIC_SENTRY_DSN=https://YOUR-DSN-HERE

# Organization name (you created this in Step 1)
SENTRY_ORG=inspir

# Project name (you created this in Step 1)
SENTRY_PROJECT=inspir-nextjs

# Auth token from Step 2
SENTRY_AUTH_TOKEN=sntrys_YOUR-TOKEN-HERE
```

**IMPORTANT:** Also add your existing Supabase variables to `.env.local`:

```bash
# Copy from your existing .env file
NEXT_PUBLIC_SUPABASE_URL=https://ksdnbkxixbywurohugkx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Save and exit:** `Ctrl+X`, then `Y`, then `Enter`

---

### **Step 4: Rebuild and Restart (2 minutes)**

```bash
cd /root/inspir/nextjs-seo

# Rebuild with Sentry
npm run build

# Restart PM2
pm2 restart inspir-nextjs

# Check logs for errors
pm2 logs inspir-nextjs --lines 50
```

---

## ✅ Verify It's Working (2 minutes)

### **Test Error Tracking:**

1. **Create a test error page:**

```bash
# Create test error button
cat > /root/inspir/nextjs-seo/src/app/sentry-test/page.tsx << 'EOF'
'use client'

import * as Sentry from '@sentry/nextjs'

export default function SentryTestPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl mb-4">Sentry Error Test</h1>
      <button
        onClick={() => {
          Sentry.captureException(new Error('Test error from Next.js!'))
          alert('Error sent to Sentry! Check your dashboard.')
        }}
        className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600"
      >
        Trigger Test Error
      </button>
    </div>
  )
}
EOF
```

2. **Rebuild:**
```bash
npm run build
pm2 restart inspir-nextjs
```

3. **Visit:** https://inspir.uk/sentry-test

4. **Click** the "Trigger Test Error" button

5. **Check Sentry Dashboard:**
   - Go to: https://sentry.io/organizations/inspir/issues/
   - You should see the error appear within 30 seconds!

6. **Delete test page when done:**
```bash
rm /root/inspir/nextjs-seo/src/app/sentry-test/page.tsx
```

---

## 🔔 Configure Alerts (5 minutes)

### **Set Up Email Notifications:**

1. **Go to:** https://sentry.io/organizations/inspir/projects/inspir-nextjs/

2. **Click "Alerts"** in the left sidebar

3. **Click "Create Alert"**

4. **Alert Settings:**
   - Alert name: `New Production Errors`
   - Conditions:
     - When: **An event is seen**
     - Filters: **environment equals production**
   - Then: **Send a notification to**
     - Select: **Your email**
   - Click **Save Rule**

Now you'll get emailed whenever an error happens in production!

---

## 📊 Sentry Dashboard Overview

**Your Sentry Dashboard:** https://sentry.io/organizations/inspir/issues/

**What You'll See:**
- ✅ **Issues** - All errors with stack traces
- ✅ **Performance** - Slow pages and API calls
- ✅ **Releases** - Track errors by deployment
- ✅ **Alerts** - Email/Slack notifications

**Key Metrics to Watch:**
- Error rate (aim for <0.1%)
- Affected users
- Most common errors

---

## 🎯 What Sentry Now Tracks

### **Automatic Error Tracking:**
- ✅ Client-side JavaScript errors
- ✅ Server-side Next.js errors
- ✅ API route errors
- ✅ Edge function errors
- ✅ Unhandled promise rejections
- ✅ Network errors

### **Session Replay:**
- ✅ Records user sessions when errors occur
- ✅ See exactly what the user did before the error
- ✅ 10% of all sessions recorded (configurable)

### **Performance Monitoring:**
- ✅ Page load times
- ✅ API response times
- ✅ Component render times

---

## 🔥 Common Issues & Fixes

### **Issue: "Module not found: Can't resolve '@sentry/nextjs'"**
**Fix:**
```bash
cd /root/inspir/nextjs-seo
npm install @sentry/nextjs
```

### **Issue: "Invalid DSN"**
**Fix:** Make sure your `.env.local` has the correct DSN format:
```
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

### **Issue: "Source maps not uploading"**
**Fix:** Check that `SENTRY_AUTH_TOKEN` is set and has correct scopes

### **Issue: "Errors not appearing in Sentry"**
**Fix:**
1. Check `.env.local` is in the right directory
2. Make sure you restarted PM2: `pm2 restart inspir-nextjs`
3. Check PM2 logs: `pm2 logs inspir-nextjs`
4. Try the test error page above

---

## 🎁 Bonus: Backend Error Tracking

Want to track Express backend errors too? Here's how:

### **Step 1: Create Backend Sentry Project**

1. **In Sentry dashboard:** https://sentry.io/organizations/inspir/projects/
2. **Click "Create Project"**
3. Platform: **Node.js**
4. Project name: **inspir-backend**
5. Copy the DSN

### **Step 2: Install Sentry in Backend**

```bash
cd /root/inspir/backend
npm install @sentry/node
```

### **Step 3: Add to server.js**

```javascript
// At the very top of server.js
const Sentry = require('@sentry/node')

Sentry.init({
  dsn: 'YOUR-BACKEND-DSN-HERE',
  environment: process.env.NODE_ENV || 'production',
  tracesSampleRate: 1.0,
})

// Add AFTER all other middleware, BEFORE your routes
app.use(Sentry.Handlers.requestHandler())

// ... your routes here ...

// Add AFTER routes, BEFORE error handlers
app.use(Sentry.Handlers.errorHandler())
```

### **Step 4: Restart Backend**

```bash
pm2 restart inspir-backend
```

---

## ✅ You're Done!

**Sentry is now:**
- ✅ Tracking all Next.js errors
- ✅ Recording session replays
- ✅ Monitoring performance
- ✅ Sending you email alerts

**Free Tier Limits:**
- 5,000 errors/month
- 500 replays/month
- 10K performance units/month

This should be plenty for your current traffic!

---

## 📚 Resources

- **Sentry Docs:** https://docs.sentry.io/platforms/javascript/guides/nextjs/
- **Dashboard:** https://sentry.io/organizations/inspir/
- **Support:** https://forum.sentry.io/

---

**Next:** Set up UptimeRobot for uptime monitoring! (See below)
