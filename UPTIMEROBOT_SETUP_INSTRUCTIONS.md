# 📊 UptimeRobot Setup Instructions

## ⏱️ Total Time: 10 minutes
## 💰 Cost: FREE (up to 50 monitors)

---

## 🎯 What UptimeRobot Does

**UptimeRobot monitors your website 24/7 and alerts you if it goes down.**

- Checks every 5 minutes (free tier)
- Email/SMS alerts when site is down
- Beautiful status page
- 90-day history
- Response time graphs

---

## 📝 Step-by-Step Setup

### **Step 1: Create Account (2 minutes)**

1. **Go to:** https://uptimerobot.com/signUp

2. **Sign up** with email

3. **Verify** your email (check inbox/spam)

4. **Log in:** https://uptimerobot.com/login

---

### **Step 2: Add Monitors (5 minutes)**

#### **Monitor 1: Homepage**

1. **Click** "Add New Monitor" (big green button)

2. **Fill in:**
   - Monitor Type: **HTTP(s)**
   - Friendly Name: **inspir - Homepage**
   - URL: `https://inspir.uk`
   - Monitoring Interval: **5 minutes**

3. **Click** "Create Monitor"

---

#### **Monitor 2: Blog**

1. **Click** "Add New Monitor"

2. **Fill in:**
   - Monitor Type: **HTTP(s)**
   - Friendly Name: **inspir - Blog**
   - URL: `https://inspir.uk/blog`
   - Monitoring Interval: **5 minutes**

3. **Click** "Create Monitor"

---

#### **Monitor 3: Tools**

1. **Click** "Add New Monitor"

2. **Fill in:**
   - Monitor Type: **HTTP(s)**
   - Friendly Name: **inspir - Tools**
   - URL: `https://inspir.uk/tools`
   - Monitoring Interval: **5 minutes**

3. **Click** "Create Monitor"

---

#### **Monitor 4: Chat App (React SPA)**

1. **Click** "Add New Monitor"

2. **Fill in:**
   - Monitor Type: **HTTP(s)**
   - Friendly Name: **inspir - Chat App**
   - URL: `https://inspir.uk/chat`
   - Monitoring Interval: **5 minutes**

3. **Click** "Create Monitor"

---

### **Step 3: Configure Alerts (2 minutes)**

1. **Go to** "My Settings" (top right corner)

2. **Click** "Alert Contacts" tab

3. **Verify your email** is listed and active

4. **Optional:** Add SMS alerts
   - Click "Add Alert Contact"
   - Type: SMS
   - Phone number: +44XXXXXXXXXX
   - *Note: SMS is paid feature (£4/month)*

5. **Set Alert Preferences:**
   - Click "Account Profile" tab
   - Email alerts: **Enabled**
   - Alert interval: **As soon as it's down** (0 minutes)
   - Re-alert: **Every 30 minutes** until up

6. **Save**

---

### **Step 4: Test Alerts (1 minute)**

1. **Go to** your monitors list

2. **Click** on "inspir - Homepage"

3. **Click** "Pause Monitor" (temporarily)

4. **Wait 1 minute** - you should get an email!

5. **Check your email** - you should see "inspir - Homepage is DOWN"

6. **Unpause the monitor**

---

## ✅ Verify Setup

### **Your Dashboard Should Show:**

```
┌─────────────────────────────────────────────────┐
│ Monitor Name          Status    Response Time   │
├─────────────────────────────────────────────────┤
│ inspir - Homepage     🟢 UP     250ms           │
│ inspir - Blog         🟢 UP     280ms           │
│ inspir - Tools        🟢 UP     270ms           │
│ inspir - Chat App     🟢 UP     245ms           │
└─────────────────────────────────────────────────┘

Overall Uptime: 100%
```

---

## 🎁 Bonus: Public Status Page (Optional)

### **Create a Status Page for Users**

1. **Go to** "Public Status Pages" in UptimeRobot dashboard

2. **Click** "Add Public Status Page"

3. **Settings:**
   - Page name: **inspir Status**
   - Custom URL: `inspir-status` (creates: uptimerobot.com/inspir-status)
   - Select monitors to show: **All 4 monitors**
   - Show response times: **Yes**
   - Show uptime: **Yes**

4. **Save**

5. **Your status page URL:**
   ```
   https://stats.uptimerobot.com/YOUR-PAGE-ID
   ```

6. **Optional:** Add to your footer
   ```html
   <a href="https://stats.uptimerobot.com/YOUR-PAGE-ID">
     System Status
   </a>
   ```

---

## 📧 What Alerts Look Like

### **When Site Goes Down:**

```
Subject: [UptimeRobot Alert] inspir - Homepage is DOWN

Monitor: inspir - Homepage
URL: https://inspir.uk
Status: DOWN
Reason: Connection timeout (522)
Time: 2025-12-26 14:23:45 UTC

This monitor has been DOWN for 5 minutes.
```

### **When Site Comes Back Up:**

```
Subject: [UptimeRobot Alert] inspir - Homepage is UP

Monitor: inspir - Homepage
URL: https://inspir.uk
Status: UP
Downtime: 12 minutes
Time: 2025-12-26 14:35:22 UTC
```

---

## 🎯 What to Monitor

### **Suggested Monitors:**

**Currently Set Up:**
- ✅ https://inspir.uk (homepage)
- ✅ https://inspir.uk/blog (blog)
- ✅ https://inspir.uk/tools (tools)
- ✅ https://inspir.uk/chat (chat app)

**Optional Additional Monitors:**
- `https://inspir.uk/pricing` - Pricing page
- `https://inspir.uk/sitemap.xml` - SEO health check
- `https://ksdnbkxixbywurohugkx.supabase.co` - Supabase database

---

## 📊 Understanding Your Uptime

### **Target Metrics:**

| Uptime % | Downtime/Month | Status       |
|----------|----------------|--------------|
| 99.99%   | 4.3 minutes    | ⭐ Excellent  |
| 99.9%    | 43 minutes     | ✅ Good       |
| 99.5%    | 3.6 hours      | ⚠️ Acceptable |
| 99.0%    | 7.2 hours      | ❌ Poor       |

**inspir Target:** 99.9% (43 min downtime/month max)

---

## 🔔 Advanced: Slack Integration (Optional)

### **Get Alerts in Slack:**

1. **In UptimeRobot:**
   - My Settings → Alert Contacts → Add Alert Contact
   - Type: **Webhook**

2. **In Slack:**
   - Go to: https://api.slack.com/apps
   - Create new app → From scratch
   - Name: UptimeRobot
   - Workspace: Your workspace
   - Add Incoming Webhooks
   - Copy webhook URL

3. **Back in UptimeRobot:**
   - Paste webhook URL
   - Save

4. **Assign to monitors:**
   - Edit each monitor
   - Alert Contacts: Check the Slack webhook
   - Save

Now you'll get Slack notifications instantly!

---

## 📱 Mobile App (Optional)

**Get push notifications on your phone:**

1. **Download app:**
   - iOS: https://apps.apple.com/app/uptimerobot/id1104878581
   - Android: https://play.google.com/store/apps/details?id=com.uptimerobot

2. **Log in** with your UptimeRobot account

3. **Enable push notifications**

4. **Get instant alerts** when site goes down!

---

## 🔥 Common Scenarios

### **Scenario 1: Site is Down**

**You get email:**
```
inspir - Homepage is DOWN
```

**What to do:**
1. Check PM2: `pm2 status`
2. Check Nginx: `sudo systemctl status nginx`
3. Check logs: `pm2 logs inspir-nextjs`
4. Restart if needed: `pm2 restart inspir-nextjs`

---

### **Scenario 2: Slow Response Times**

**Dashboard shows:**
```
inspir - Homepage: 🟢 UP (2500ms)  ⚠️ SLOW
```

**What to do:**
1. Run: `npx lighthouse https://inspir.uk --view`
2. Check server load: `top` or `htop`
3. Review Sentry performance tab
4. Consider caching improvements

---

### **Scenario 3: Database Connection Failed**

**Monitor shows:**
```
inspir - Blog: 🔴 DOWN (500 Internal Server Error)
```

**What to do:**
1. Check Supabase status: https://status.supabase.com/
2. Test connection: `curl https://ksdnbkxixbywurohugkx.supabase.co`
3. Check environment variables: `cat /root/inspir/nextjs-seo/.env.local`

---

## ✅ Completion Checklist

After setup, you should have:

- ✅ UptimeRobot account created
- ✅ 4 monitors configured (homepage, blog, tools, chat)
- ✅ Email alerts enabled
- ✅ Test alert received
- ✅ Dashboard accessible at https://uptimerobot.com/dashboard
- ✅ Monitors checking every 5 minutes
- ✅ Expected uptime: 99.9%+

---

## 🎯 Quick Reference

**Your UptimeRobot Dashboard:**
```
https://uptimerobot.com/dashboard
```

**Monitor IDs:** (Save these for API access later)
```
inspir - Homepage: Monitor ID 123456789
inspir - Blog: Monitor ID 123456790
inspir - Tools: Monitor ID 123456791
inspir - Chat App: Monitor ID 123456792
```

---

## 📚 Resources

- **Documentation:** https://blog.uptimerobot.com/
- **API:** https://uptimerobot.com/api/ (for advanced automation)
- **Support:** support@uptimerobot.com

---

## 🚀 You're Protected!

Your inspir platform now has:
- ✅ 24/7 uptime monitoring
- ✅ Instant email alerts
- ✅ 5-minute check intervals
- ✅ Response time tracking
- ✅ 90-day history

**Peace of mind: Achieved!** 🎉

---

**Next Steps:**
1. ✅ Sentry (Error Monitoring) - DONE
2. ✅ UptimeRobot (Uptime) - DONE
3. 🚀 Populate database fields
4. 🚀 Write missing blog posts
