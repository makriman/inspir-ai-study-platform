# OAuth Setup Guide for inspir

This guide walks you through setting up Google, Apple, and Microsoft OAuth for parent authentication.

## Prerequisites

- Supabase project: `ksdnbkxixbywurohugkx`
- Backend API: `https://inspir.uk/api`
- Frontend URL: `https://inspir.uk`

---

## 1. Google OAuth Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Enable the **Google+ API** and **Google Identity Services**

### Step 2: Create OAuth Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Select **Web application**
4. Configure:
   - **Name**: inspir Production
   - **Authorized JavaScript origins**:
     - `https://inspir.uk`
     - `https://ksdnbkxixbywurohugkx.supabase.co`
   - **Authorized redirect URIs**:
     - `https://ksdnbkxixbywurohugkx.supabase.co/auth/v1/callback`
     - `https://inspir.uk/auth/callback`

5. Click **Create** and copy:
   - Client ID
   - Client Secret

### Step 3: Configure in Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/ksdnbkxixbywurohugkx/auth/providers)
2. Click **Authentication** → **Providers**
3. Find **Google** and toggle it ON
4. Paste:
   - Client ID
   - Client Secret
5. Click **Save**

### Step 4: Test Google OAuth

1. Go to `https://inspir.uk/signup`
2. Click "Continue with Google"
3. Sign in with Google account
4. Should redirect to dashboard with account created

---

## 2. Apple OAuth Setup

### Step 1: Apple Developer Account

1. Go to [Apple Developer Portal](https://developer.apple.com/)
2. Sign in with Apple ID (requires paid developer account - $99/year)

### Step 2: Create App ID

1. Go to **Certificates, Identifiers & Profiles**
2. Click **Identifiers** → **+** button
3. Select **App IDs** → Click **Continue**
4. Configure:
   - **Description**: inspir
   - **Bundle ID**: `uk.inspir.auth` (or your domain)
   - **Capabilities**: Check **Sign in with Apple**
5. Click **Continue** → **Register**

### Step 3: Create Service ID

1. Go to **Identifiers** → **+** button
2. Select **Services IDs** → Click **Continue**
3. Configure:
   - **Description**: inspir Web Auth
   - **Identifier**: `uk.inspir.web`
   - Check **Sign in with Apple**
   - Click **Configure** next to Sign in with Apple
   - **Primary App ID**: Select the App ID created above
   - **Web Domain**: `inspir.uk`
   - **Return URLs**:
     - `https://ksdnbkxixbywurohugkx.supabase.co/auth/v1/callback`
4. Click **Continue** → **Register**

### Step 4: Create Private Key

1. Go to **Keys** → **+** button
2. Configure:
   - **Key Name**: inspir Sign in with Apple Key
   - Check **Sign in with Apple**
   - Click **Configure** → Select Primary App ID
3. Click **Continue** → **Register**
4. **Download the .p8 key file** (you can only download once!)
5. Note the **Key ID** (10 characters)

### Step 5: Get Team ID

1. Go to **Membership** in Apple Developer Portal
2. Copy your **Team ID** (10 characters)

### Step 6: Configure in Supabase

1. Go to Supabase Dashboard → Authentication → Providers
2. Find **Apple** and toggle it ON
3. Enter:
   - **Services ID**: `uk.inspir.web`
   - **Team ID**: (from step 5)
   - **Key ID**: (from step 4)
   - **Private Key**: Paste contents of .p8 file
4. Click **Save**

### Step 7: Test Apple OAuth

1. Go to `https://inspir.uk/signup`
2. Click "Continue with Apple"
3. Sign in with Apple ID
4. Should redirect to dashboard

---

## 3. Microsoft OAuth Setup

### Step 1: Azure Portal

1. Go to [Azure Portal](https://portal.azure.com/)
2. Sign in with Microsoft account

### Step 2: Register Application

1. Go to **Microsoft Entra ID** (formerly Azure AD)
2. Click **App registrations** → **New registration**
3. Configure:
   - **Name**: inspir
   - **Supported account types**: Accounts in any organizational directory and personal Microsoft accounts
   - **Redirect URI**:
     - Platform: **Web**
     - URI: `https://ksdnbkxixbywurohugkx.supabase.co/auth/v1/callback`
4. Click **Register**

### Step 3: Get Application Details

1. On the **Overview** page, copy:
   - **Application (client) ID**
   - **Directory (tenant) ID**

### Step 4: Create Client Secret

1. Go to **Certificates & secrets**
2. Click **New client secret**
3. Configure:
   - **Description**: inspir Production
   - **Expires**: 24 months (or custom)
4. Click **Add**
5. **Copy the secret VALUE immediately** (you can only see it once!)

### Step 5: Add Additional Redirect URI

1. Go to **Authentication**
2. Under **Web** → **Redirect URIs**, click **Add URI**
3. Add: `https://inspir.uk/auth/callback`
4. Click **Save**

### Step 6: Configure API Permissions

1. Go to **API permissions**
2. Click **Add a permission**
3. Select **Microsoft Graph**
4. Select **Delegated permissions**
5. Add:
   - `openid`
   - `profile`
   - `email`
   - `User.Read`
6. Click **Add permissions**

### Step 7: Configure in Supabase

1. Go to Supabase Dashboard → Authentication → Providers
2. Find **Azure (Microsoft)** and toggle it ON
3. Enter:
   - **Application (client) ID**: (from step 3)
   - **Client Secret**: (from step 4)
   - **Tenant ID**: `common` (for all accounts) or your specific tenant ID
4. Click **Save**

### Step 8: Test Microsoft OAuth

1. Go to `https://inspir.uk/signup`
2. Click "Continue with Microsoft"
3. Sign in with Microsoft account
4. Should redirect to dashboard

---

## 4. Update Backend Environment Variables

Add OAuth configuration to `/root/inspir/backend/.env`:

```bash
# OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

APPLE_CLIENT_ID=uk.inspir.web
APPLE_TEAM_ID=your_team_id_here
APPLE_KEY_ID=your_key_id_here

MICROSOFT_CLIENT_ID=your_microsoft_client_id_here
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret_here
MICROSOFT_TENANT_ID=common
```

---

## 5. Testing OAuth Flow

### Manual Testing Checklist

For each provider (Google, Apple, Microsoft):

1. **Sign Up Flow:**
   - [ ] Go to `https://inspir.uk/signup`
   - [ ] Click OAuth button
   - [ ] Sign in with provider
   - [ ] Should create parent account
   - [ ] Should redirect to `/dashboard`
   - [ ] Check database: parent_accounts table has new row with provider_id

2. **Sign In Flow (Existing Account):**
   - [ ] Go to `https://inspir.uk/login`
   - [ ] Click OAuth button
   - [ ] Sign in with same provider account
   - [ ] Should log in (not create duplicate)
   - [ ] Should redirect to `/dashboard`

3. **Email Linking:**
   - [ ] Create account with email/password
   - [ ] Try to sign in with OAuth using same email
   - [ ] Should link accounts and set provider_id

4. **Error Handling:**
   - [ ] Cancel OAuth flow midway
   - [ ] Should return to login/signup page with error message
   - [ ] Try OAuth with unverified email (if applicable)
   - [ ] Should handle gracefully

### Automated API Testing

```bash
# Test OAuth callback endpoint
curl -X POST https://inspir.uk/api/auth/parent/oauth-callback \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "google",
    "oauth_id": "12345678901234567890",
    "email": "test@example.com",
    "name": "Test User"
  }'

# Should return:
# {
#   "success": true,
#   "token": "...",
#   "parent": { ... }
# }
```

---

## 6. Troubleshooting

### Google OAuth Issues

**Error: "redirect_uri_mismatch"**
- Check Authorized redirect URIs in Google Cloud Console
- Must include: `https://ksdnbkxixbywurohugkx.supabase.co/auth/v1/callback`

**Error: "access_denied"**
- User canceled login or didn't grant permissions
- Make sure email scope is requested

### Apple OAuth Issues

**Error: "invalid_client"**
- Check Services ID matches in Supabase config
- Verify Team ID and Key ID are correct
- Ensure .p8 private key is complete (including headers)

**Error: "invalid_grant"**
- Return URL doesn't match configuration
- Check web domain and return URLs in Apple Developer Portal

### Microsoft OAuth Issues

**Error: "AADSTS50011: redirect_uri mismatch"**
- Check redirect URIs in Azure Portal
- Must include: `https://ksdnbkxixbywurohugkx.supabase.co/auth/v1/callback`

**Error: "AADSTS65001: consent required"**
- User needs to grant permissions
- Check API permissions are added in Azure Portal

### General Issues

**OAuth button doesn't appear**
- Check browser console for JavaScript errors
- Verify Supabase provider is enabled in dashboard

**Account not created after OAuth**
- Check backend logs: `pm2 logs inspir-backend`
- Verify OAuth callback endpoint is working
- Check database connection

**Duplicate accounts created**
- OAuth ID should be unique per provider
- Check email linking logic in authController.js

---

## 7. Security Considerations

1. **HTTPS Only**: OAuth only works over HTTPS (not HTTP)
2. **Client Secrets**: Never expose client secrets in frontend code
3. **Token Storage**: JWT tokens stored in localStorage (consider httpOnly cookies for production)
4. **CORS**: Backend allows all origins - restrict in production
5. **Rate Limiting**: Consider adding rate limiting to OAuth endpoints

---

## 8. Next Steps After OAuth Setup

1. **Email Verification**: Set up email templates in Supabase
2. **User Onboarding**: Add onboarding flow after OAuth signup
3. **Profile Completion**: Prompt users to complete profile (institution, etc.)
4. **Account Linking**: Allow linking multiple OAuth providers to one account
5. **Monitoring**: Set up error tracking (Sentry) for OAuth failures

---

## Quick Reference: Callback URLs

All OAuth providers need these redirect URIs:

1. **Supabase Callback**: `https://ksdnbkxixbywurohugkx.supabase.co/auth/v1/callback`
2. **App Callback**: `https://inspir.uk/auth/callback` (optional, for custom handling)

---

## Support

If you encounter issues:
1. Check backend logs: `pm2 logs inspir-backend`
2. Check Next.js logs: `pm2 logs inspir-nextjs`
3. Check Supabase logs in Dashboard → Logs → Auth Logs
4. Review OAuth provider documentation
