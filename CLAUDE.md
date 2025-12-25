# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**inspir** is a revolutionary AI study platform powered by Claude Sonnet 4.5. It features a unique interface design with chat on the LEFT (opposite of traditional AI tools), navigation on the RIGHT, and 15 study tools at the BOTTOM (like a macOS dock).

**Tech Stack:**
- Frontend: React 19 + Vite 5 + Tailwind CSS + Framer Motion
- Backend: Node.js + Express + Server-Sent Events (SSE streaming)
- Database: Supabase (PostgreSQL)
- AI: Anthropic Claude API (Sonnet 4.5)
- Infrastructure: Nginx reverse proxy, PM2 process management

## Design Philosophy - "The Apple of AI Chat"

**Core Principle**: This is NOT a ChatGPT clone. We're building a complete reimagining of how students interact with AI tutors.

**Key Differentiators:**
1. **Chat on LEFT** (opposite of ChatGPT) - More natural for reading, maximizes content area
2. **Navigation on RIGHT** (opposite of ChatGPT) - Keep context visible while chatting
3. **Tools at BOTTOM** (like macOS dock) - Always accessible, never hidden in menus
4. **Vibrant & Animated** - NOT minimalist black/white silhouettes
5. **Tool-first approach** - 15 integrated study tools, not just a chat interface

**Design Inspiration:**
- Think Steve Jobs designing AI chat
- macOS Big Sur / iOS app icon quality
- Multi-platform optimization with MINIMAL scrolling/friction

## Revolutionary Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│    MAIN CHAT (LEFT 60-70%)          RIGHT SIDEBAR (320px)   │
│  ┌───────────────┐                ┌──────────────┐          │
│  │               │                │              │          │
│  │  CHAT AREA    │                │  • History   │          │
│  │  (Messages    │                │  • Notes     │          │
│  │   scroll      │                │  • Calendar  │          │
│  │   here)       │                │  • Planner   │          │
│  │               │                │  • Saved     │          │
│  │               │                │              │          │
│  └───────────────┘                └──────────────┘          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         ANIMATED TOOLBAR (BOTTOM 80px)                │   │
│  │  [🎨][📝][🃏][📊][⏰][✅][💡][🎵][📸][🧮][🔬][🌍]  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Why This Layout:**
- Chat on left optimizes for reading (left-to-right)
- Right sidebar keeps organization visible
- Bottom toolbar is always accessible (macOS dock pattern)
- Minimal scrolling - everything visible at once

## Supabase MCP Setup

**Model Context Protocol (MCP)** allows Claude Code to directly interact with the Supabase database without manual SQL editor usage.

### Installation

1. Install the Supabase MCP package globally:
```bash
npm install -g supabase-mcp
```

2. Create MCP configuration at `~/.config/claude-code/mcp.json`:
```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "supabase-mcp"],
      "env": {
        "SUPABASE_URL": "https://your-project.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "your-service-role-key"
      }
    }
  }
}
```

3. Get credentials from `backend/.env`:
   - `SUPABASE_URL` → Use the value from `.env`
   - `SUPABASE_SERVICE_ROLE_KEY` → Use the service role key (NOT anon key)

4. Restart Claude Code to load the MCP configuration

### Usage

Once configured, Claude Code can:
- Run SQL queries directly on Supabase
- Read/write to database tables
- Execute migrations and seed data
- Query schema information

This eliminates the need to manually copy/paste SQL into the Supabase dashboard.

## Development Commands

### Backend Development

```bash
cd backend

# Install dependencies
npm install

# Development mode (with hot reload)
npm run dev

# Production mode
npm start

# Using PM2 for production
pm2 start ecosystem.config.cjs
pm2 status
pm2 logs inspir-backend
pm2 restart inspir-backend
```

### Frontend Development

```bash
cd frontend

# Install dependencies (use --legacy-peer-deps for React 19 compatibility)
npm install --legacy-peer-deps

# Development server (runs on port 5173)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

### Database Setup

```bash
# Run the schema in Supabase SQL Editor
# File: database-schema.sql
# This creates: chat_conversations, chat_messages, chat_folders tables
# Includes: triggers, indexes, RLS policies, full-text search
```

## Architecture Overview

### Hybrid Architecture (Production)

**inspir** uses a **three-tier hybrid architecture** in production:

1. **Next.js SEO Layer** (port 3001)
   - Serves all SEO-optimized marketing pages: `/`, `/blog`, `/tools`, `/pricing`, `/about`
   - Server-side rendering (SSR) for optimal SEO
   - Dynamic sitemap and robots.txt generation
   - Supabase integration for blog posts and tool pages

2. **React SPA Chat Interface** (static files)
   - Serves the main chat interface at `/chat`
   - Built with React 19 + Vite
   - Served as static files via Nginx
   - Client-side routing with React Router

3. **Express Backend API** (port 3000)
   - Handles all `/api/chat/*` endpoints
   - Server-Sent Events (SSE) streaming for Claude responses
   - Supabase database operations
   - Content moderation and session management

**Why Hybrid?**
- SEO pages need server-side rendering → Next.js
- Chat needs real-time SSE streaming → Express backend
- Chat interface benefits from SPA architecture → React
- Nginx routes between them seamlessly based on URL path

See [Production Deployment](#production-deployment-hybrid-architecture) section for setup details.

### Session-Based Authentication
The app uses **session-based identification** (no user accounts). Session IDs are generated from IP address + user agent hash in `backend/controllers/chatController.js:getSessionId()`. All conversations are tied to this session ID.

### Real-Time Streaming Architecture
Messages use **Server-Sent Events (SSE)** for streaming Claude responses word-by-word:
1. Client sends message via POST to `/api/chat/conversations/:id/messages`
2. Backend validates content through moderation system
3. Claude API streams response via Anthropic SDK's `.messages.stream()`
4. Backend forwards chunks as SSE events: `data: {type: 'content', text: '...'}\n\n`
5. Frontend accumulates chunks and displays in real-time

Key streaming code: `backend/controllers/chatController.js:sendMessage()`

### Content Moderation System
Multi-layer safety filtering in `backend/utils/contentModeration.js`:
- **Blocked patterns**: Violence, explicit content, drugs, personal info, bullying
- **Jailbreak detection**: Catches prompt injection attempts
- **Flagged topics**: Mental health, academic integrity (logged but allowed)
- **Age-appropriate prompts**: 3 levels (under14, teen, adult) with different system prompts

Content is checked BEFORE being sent to Claude API. Blocked content returns 400 error.

### Database Schema
Three main tables in Supabase:
- `chat_conversations`: Session-scoped conversations with folders, pinning
- `chat_messages`: User/assistant messages with token counts, moderation flags
- `chat_folders`: Optional organization system

**Important**: Uses PostgreSQL triggers to auto-update `last_message_at` and `updated_at` on conversations when messages are inserted.

Full-text search enabled via GIN index on message content.

### Component Structure

**Frontend Pages:**
- `src/pages/Landing.jsx`: Marketing/landing page
- `src/pages/Chat.jsx`: Main chat interface (handles all state, SSE connection, tool management)

**Chat Components:**
- `ChatHeader.jsx`: Top bar with subject selector, age filter, new chat button
- `MessageBubble.jsx`: Individual message rendering with markdown, syntax highlighting, regeneration
- `RightSidebar.jsx`: Conversation history, notes, planner, habits (collapsible)
- `ToolbarIcon.jsx`: Individual tool button with 3D animations
- `ToolModal.jsx`: Modal overlay when tool is activated

**State Management:**
All state is managed in `Chat.jsx` using React hooks (no Redux/Zustand). Key states:
- `conversations`, `currentConversation`: Conversation list and active conversation
- `messages`, `streamingMessage`: Message history and current streaming response
- `isStreaming`: Prevents duplicate sends during streaming
- `ageFilter`, `currentSubject`: User preferences

### API Endpoints

All routes defined in `backend/routes/chat.js`:

**Conversations:**
- `POST /api/chat/conversations` - Create new conversation
- `GET /api/chat/conversations` - List all conversations for session
- `GET /api/chat/conversations/:id` - Get messages for conversation
- `PATCH /api/chat/conversations/:id` - Update title/folder/pin status
- `DELETE /api/chat/conversations/:id` - Delete conversation (cascades to messages)

**Messages:**
- `POST /api/chat/conversations/:id/messages` - Send message (SSE streaming response)
  - Rate limited: 200 messages per hour per IP
  - Request body: `{ content, ageFilter?, isRegeneration?, previousResponseId? }`
  - Response: SSE stream with events: `content`, `done`, `error`

**Search:**
- `GET /api/chat/search?query=...` - Full-text search across messages

### Environment Variables

**Backend (.env):**
```
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-sonnet-4-5-20250929
SUPABASE_URL=https://....supabase.co
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
PORT=3000
NODE_ENV=development
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:3000/api
```

### Nginx Configuration

Two configs available:
- `nginx.conf`: Development setup (localhost)
- `nginx-production.conf`: Production with SSL/domain

Nginx serves frontend static files and proxies `/api/*` to backend on port 3000.

## Production Deployment (Hybrid Architecture)

**inspir** uses a **hybrid architecture** in production:
- **Next.js (port 3001)**: SEO-optimized pages (/, /blog, /tools, /pricing, etc.)
- **React SPA (static files)**: Chat interface (/chat)
- **Express (port 3000)**: Backend API (/api/chat)

### Deployment Steps

#### 1. Build All Projects

```bash
# Build React frontend (chat SPA)
cd /root/inspir/frontend
npm run build
# Creates: /root/inspir/frontend/dist/

# Build Next.js SEO layer
cd /root/inspir/nextjs-seo
npm run build
# Creates: /root/inspir/nextjs-seo/.next/

# Backend (no build needed - runs directly)
cd /root/inspir/backend
npm install
```

#### 2. Set Up File Permissions

Nginx runs as `www-data` user and needs access to serve React SPA static files:

```bash
# Grant execute permissions on directories
sudo chmod o+x /root
sudo chmod o+x /root/inspir
sudo chmod o+x /root/inspir/frontend

# Grant read permissions on dist folder
sudo chmod -R o+r /root/inspir/frontend/dist
```

**Critical:** Without these permissions, `/chat` will return 403 Forbidden or 404 errors.

#### 3. Configure Nginx

Use the hybrid routing configuration at `/etc/nginx/sites-available/inspir`:

```nginx
server {
    listen 443 ssl http2;
    server_name inspir.uk www.inspir.uk;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/inspir.uk/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/inspir.uk/privkey.pem;

    # PRIORITY 1: Backend API (Express on port 3000)
    location /api/chat {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        # SSE streaming support
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 300s;
    }

    # PRIORITY 2: React SPA Chat App
    location = /chat {
        root /root/inspir/frontend/dist;
        try_files /index.html =404;
    }

    location ^~ /chat/ {
        rewrite ^/chat(.*)$ $1 break;
        root /root/inspir/frontend/dist;
        try_files $uri $uri/index.html /index.html;
    }

    # Chat app assets
    location ^~ /assets/ {
        root /root/inspir/frontend/dist;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # PRIORITY 3: Next.js SEO Layer (port 3001)
    location /_next/static/ {
        proxy_pass http://localhost:3001;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
    }
}
```

**Routing Logic:**
1. `/api/chat/*` → Express backend (SSE streaming)
2. `/chat` and `/chat/*` → React SPA (static files)
3. `/assets/*` → React SPA assets (1-year cache)
4. Everything else → Next.js (SEO pages)

#### 4. Test and Reload Nginx

```bash
# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

#### 5. Set Up PM2 Process Management

```bash
# Start backend
cd /root/inspir/backend
pm2 start ecosystem.config.cjs

# Start Next.js
cd /root/inspir/nextjs-seo
pm2 start npm --name "inspir-nextjs" -- start

# Save PM2 configuration
pm2 save

# Set up PM2 to start on boot
pm2 startup
```

#### 6. Verify Deployment

Test all critical routes:

```bash
# SEO landing page (Next.js)
curl -I https://inspir.uk/

# Chat interface (React SPA)
curl -I https://inspir.uk/chat

# Blog (Next.js)
curl -I https://inspir.uk/blog

# Tools (Next.js)
curl -I https://inspir.uk/tools

# API health check (Express)
curl -I https://inspir.uk/api/chat
```

All should return **HTTP 200** (except `/api/chat` which returns 404 for root GET).

#### 7. Monitor Processes

```bash
# Check PM2 status
pm2 list

# View logs
pm2 logs inspir-backend
pm2 logs inspir-nextjs

# Restart if needed
pm2 restart inspir-backend
pm2 restart inspir-nextjs
```

### Common Deployment Issues

#### Issue: `/chat` returns 404
**Cause:** Nginx can't access `/root/inspir/frontend/dist/` (permission denied)
**Fix:** Run permission commands from step 2 above

#### Issue: Assets not loading (403/404)
**Cause:** Wrong Nginx root/alias configuration or permissions
**Fix:** Verify `/assets/` location block uses `root` directive and has read permissions

#### Issue: Next.js 502 Bad Gateway
**Cause:** Next.js process not running on port 3001
**Fix:** Check `pm2 logs inspir-nextjs` and restart if crashed

#### Issue: SSE streaming not working
**Cause:** Nginx buffering enabled for `/api/chat`
**Fix:** Ensure `proxy_buffering off` in `/api/chat` location block

### SSL Certificate Renewal

Certificates auto-renew via Let's Encrypt. To renew manually:

```bash
sudo certbot renew
sudo systemctl reload nginx
```

### Updating After Code Changes

```bash
# Update React SPA
cd /root/inspir/frontend
git pull
npm run build
# No restart needed - static files updated

# Update Next.js
cd /root/inspir/nextjs-seo
git pull
npm run build
pm2 restart inspir-nextjs

# Update Backend
cd /root/inspir/backend
git pull
npm install
pm2 restart inspir-backend
```

## Visual Design Specifications

### Color Palette

**Primary Colors:**
- Primary Purple: `#7C3AED` (purple-600) - Main brand color
- Primary Blue: `#0030AB` - Deep blue for professionalism
- Accent Green: `#10B981` (green-500) - Success states, positive feedback
- Accent Orange: `#F59E0B` (amber-500) - Warnings, highlights
- Accent Red: `#EF4444` (red-500) - Errors, important alerts

**Gradients** (extensively used):
- Hero: `from-purple-600 via-blue-600 to-green-600`
- Tool icons: Each tool has unique gradient (see tools list below)
- Backgrounds: Subtle gradients for depth (`from-purple-50 to-blue-50`)

**Why Vibrant Colors:**
- Stand out from minimal black/white interfaces
- Make learning feel fun and engaging
- Each tool instantly recognizable by color

### Typography

- **Font Family**: System fonts (Apple-style) - Montserrat for custom text
- **Weights Used**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold), 900 (black)
- **Sizes**:
  - Hero: 7xl-8xl (72-96px)
  - Headings: 2xl-5xl (24-48px)
  - Body: base-xl (16-20px)
  - Small: sm-xs (12-14px)

### Animation Principles

**All animations use Framer Motion:**

1. **Page Load Animations:**
   - Stagger animations for toolbar icons (50ms delay each)
   - Fade in + slide up for content sections
   - Hero elements: scale + rotate entrance

2. **Hover States:**
   - Toolbar icons: Scale 1.2-1.3x with elastic bounce
   - Rotation: `[-5, 5, -5, 0]` for playful wobble
   - Shadow expansion on hover

3. **Click/Tap Feedback:**
   - Scale down to 0.95x briefly (whileTap)
   - Ripple effect emanating from click point
   - Satisfying bounce back

4. **Active States:**
   - Continuous glow/pulse for active tools
   - Elevated appearance (higher z-index, larger shadow)
   - Color shift to primary-blue

5. **Transitions:**
   - Use `ease-out` or `ease-in-out` (NEVER linear)
   - Duration: 200-300ms for most interactions
   - Spring physics for organic feel: `{ type: 'spring', stiffness: 200, damping: 15 }`

**Performance Requirements:**
- 60fps minimum for all animations
- Use CSS transforms (GPU accelerated)
- RequestAnimationFrame for smooth animations
- Reduce motion option for accessibility

## The 15 Revolutionary Study Tools

Each tool is carefully designed with vibrant, detailed 3D-style icons (NOT flat, NOT silhouettes):

### Tool Specifications

1. **🎨 Draw/Sketch**
   - Gradient: `from-blue-500 to-green-500`
   - Opens: Drawing canvas overlay with color palette
   - Use case: Visual learners, diagrams, sketching concepts

2. **📝 Quiz Generator**
   - Gradient: `from-purple-500 to-pink-500`
   - Opens: Quiz creation modal with difficulty settings
   - Features: Topic input, difficulty selector (easy/medium/hard), question count slider

3. **🃏 Flashcards**
   - Gradient: `from-yellow-500 to-orange-500`
   - Opens: Flashcard study mode with flip animations
   - Features: Card navigation, progress tracking, shuffle option

4. **📊 Practice Tests**
   - Gradient: `from-blue-500 to-indigo-500`
   - Opens: Test builder interface
   - Features: Full-length practice exams, timed mode, scoring

5. **⏰ Study Timer**
   - Gradient: `from-red-500 to-pink-500`
   - Opens: Floating Pomodoro timer widget
   - Features: 15/25/45 min presets, start/pause/reset controls

6. **✅ Habit Tracker**
   - Gradient: `from-green-500 to-teal-500`
   - Opens: Habit tracking panel
   - Features: Daily checkboxes, streak counter, progress visualization

7. **💡 Explain Concept**
   - Gradient: `from-yellow-400 to-yellow-600`
   - Function: Prompts Claude for deep explanation mode
   - Use case: Understanding difficult concepts in depth

8. **🎵 Study Music**
   - Gradient: `from-purple-400 to-purple-600`
   - Opens: Study music player with curated playlists
   - Features: Lo-fi beats, classical, nature sounds, binaural beats

9. **📸 Image Analysis**
   - Gradient: `from-blue-400 to-cyan-500`
   - Opens: Image upload interface
   - Features: Camera integration, homework photo upload, OCR

10. **🧮 Math Solver**
    - Gradient: `from-indigo-500 to-blue-500`
    - Opens: Math problem solver
    - Features: Step-by-step solutions, equation rendering (KaTeX)

11. **🔬 Science Lab**
    - Gradient: `from-green-400 to-emerald-500`
    - Opens: Virtual experiments & simulations
    - Features: Interactive chemistry, physics demos

12. **🌍 Visual Learning**
    - Gradient: `from-blue-500 to-green-400`
    - Opens: Diagram/map generator
    - Features: Mind maps, flowcharts, geography maps

13. **📓 Notes Sync**
    - Gradient: `from-amber-600 to-orange-600`
    - Opens: Cornell note-taking panel
    - Features: Auto-save from chats, structured notes, export

14. **📅 AI Planner**
    - Gradient: `from-violet-500 to-purple-500`
    - Opens: Smart study schedule generator
    - Features: Exam date input, subject rotation, adaptive planning

15. **🎯 Goal Setter**
    - Gradient: `from-red-500 to-rose-500`
    - Opens: Goal tracking interface
    - Features: Set targets, track progress, milestone celebrations

### Toolbar Interaction Patterns

**Icon Specifications:**
- Size: 56px × 56px (desktop), 48px (tablet), 40px (mobile)
- Spacing: 20px between icons
- Background: Subtle frosted glass circle
- Shadow: Soft shadow that grows on hover

**Hover Behavior:**
```jsx
whileHover={{
  scale: 1.3,
  rotate: [-5, 5, -5, 0],
  transition: { duration: 0.3 }
}}
```

**Tooltip Display:**
- Slides up 300ms ease
- Shows tool name + description
- Positioned above icon
- Arrow pointing down to icon

**Active Tool Indication:**
- Continuous primary-blue glow
- Elevated (1.1x scale always)
- Subtle pulsing animation
- Badge/dot indicator below icon

## Message Design Specifications

### AI Message Bubbles

**Styling:**
- Background: White with 4px primary-blue left border
- Shadow: `0 2px 8px rgba(0,0,0,0.08)`
- Border-radius: 12px
- Padding: 16px
- Max-width: 85%
- Align: Left side
- Font: 16px, line-height 1.6

**Special Message Types:**

1. **Code Blocks:**
   - Syntax highlighting (react-syntax-highlighter with vscDarkPlus theme)
   - Copy button (top-right corner)
   - Language badge
   - Full-width within message bubble

2. **Math Equations:**
   - Should use KaTeX or MathJax (not yet implemented)
   - Inline: `$equation$`
   - Block: `$$equation$$`

3. **Step-by-Step Solutions:**
   - Numbered steps with icons
   - Collapsible sections
   - Final answer highlighted in accent-green

4. **Interactive Elements:**
   - Inline quiz cards with radio buttons
   - Instant feedback on submit
   - Progress indicators

### User Message Bubbles

**Styling:**
- Background: Gradient `from-blue-600 to-blue-700`
- Text: White
- Border-radius: 12px
- Padding: 12px 16px
- Max-width: 75%
- Align: Right side
- Shadow: `0 2px 4px rgba(0,48,171,0.2)`

### Message Actions

Hover over any AI message shows action buttons:
- 👍 Helpful (feedback)
- 👎 Not helpful (feedback)
- ⭐ Save to favorites
- 📋 Copy to clipboard
- 🔄 Regenerate response (AI messages only)

## Responsive Design Strategy

### Desktop (>1024px)
- Chat: 60-70% width (left)
- Sidebar: 320px fixed (right)
- Toolbar: All 15 icons visible, bottom fixed
- Max container width: 1600px centered
- Generous spacing and padding

### Tablet (768-1024px)
- Chat: 100% width
- Sidebar: Collapsible/overlay from right (swipe to open)
- Toolbar: All icons visible, slightly smaller
- Two-column layouts become single column
- Touch-optimized (48px minimum tap targets)

### Mobile (<768px)
- Chat: Full screen
- Sidebar: Hidden by default, swipe from right to reveal
- Toolbar: Horizontal scroll OR grid overlay (tap "+" button)
- Input area: Sticky bottom
- Larger tap targets (44px minimum)
- Camera/voice input prominent (typing harder on mobile)

**Mobile Gestures:**
- Swipe right on chat → Open sidebar
- Swipe down on modal → Close
- Swipe left/right on toolbar → Navigate tools
- Pull to refresh conversation list

## Routing & Navigation

**Routes:**
- `/` - Landing page (hero, features, tool showcase, CTA)
- `/chat` - Main chat interface

**Navigation Flow:**
1. User lands on `/` (beautiful landing page)
2. Clicks "Get Started" button
3. Navigates to `/chat`
4. Automatically creates first conversation or shows empty state
5. User starts chatting immediately (no sign-up required)

**Landing Page (`/`):**
- Animated hero with logo (rotating sparkle ✨)
- Floating gradient background blobs
- Main CTA: "Get Started - It's Free!"
- 15 tools showcase (grid with hover animations)
- 6 feature cards (AI-powered, safe, tools, etc.)
- Final CTA section with gradient background
- Footer with copyright

**Chat Page (`/chat`):**
- Full chat interface as described above
- If no conversation: Shows welcome screen with "Start Learning Now" button
- With conversation: Shows full chat + sidebar + toolbar

## Common Development Patterns

### Adding a New Tool Implementation

1. Tool definitions are in `src/pages/Chat.jsx` in the `tools` array
2. When a tool is clicked, `activeToolId` is set
3. `ToolModal.jsx` displays based on `activeToolId`
4. Implement tool logic inside the modal component
5. Tools can send special prompts to Claude by modifying message content

**Tool Activation Behaviors:**

**Option 1 - Modal Overlay** (current implementation):
- Modal slides up from bottom (300ms ease)
- Height: 85% of screen
- Dimmed background (chat visible but darker)
- Close: [X] button or click outside or ESC key

**Option 2 - Side Panel** (for future tools):
- Panel slides in from right (replaces sidebar)
- Width: 400px
- Chat remains visible and functional
- Close: [←] back button

**Option 3 - Floating Widget** (for utility tools):
- Small floating window (timer, calculator)
- Draggable, resizable
- Minimizes to toolbar badge
- Always on top, doesn't block chat

### Modifying Content Moderation

Edit `backend/utils/contentModeration.js`:
- Add patterns to `blockedPatterns` object (blocks request)
- Add patterns to `flaggedTopics` object (logs but allows)
- Modify `getSystemPrompt()` to change Claude's behavior per age group

### Handling Conversation History

Claude receives last 20 messages as context (see `chatController.js:sendMessage:148`). If you need more history:
1. Increase `.limit(20)` in the Supabase query
2. Be mindful of token limits (4096 max tokens response)

### Working with Supabase

The Supabase client is initialized in `backend/utils/supabaseClient.js`. It uses the service role key for full access (bypassing RLS, though RLS policies are permissive anyway).

**Important**: This is a public app with no authentication. All RLS policies use `USING (true)` to allow all operations.

## Important Notes

### Message Regeneration
The frontend supports regenerating Claude's last response via the "Regenerate" button. This:
1. Appends instruction to system prompt about providing a fresh perspective
2. Does NOT delete the previous assistant message from DB
3. Sends `isRegeneration: true` in request body

### Rate Limiting
Backend uses `express-rate-limit` middleware on message sending (200/hour per IP). This is to prevent API abuse and control Anthropic costs.

### CORS Configuration
Development: Backend allows all origins (`origin: '*'`)
Production: Should restrict to your domain in `server.js:23`

### PM2 Process Management
Configuration in `ecosystem.config.cjs`:
- Logs to `backend/logs/` directory
- Auto-restarts on crash (max 10 restarts)
- Memory limit: 500MB (restarts if exceeded)
- Single instance (fork mode, not cluster)

### Tailwind Customization
Custom colors defined in `tailwind.config.js`:
- Primary purple: `#7C3AED`
- Primary blue: `#0030AB`
- Font: Montserrat (weights 400-900)

### Framer Motion Usage
All animations use Framer Motion. Key patterns:
- `<AnimatePresence>` for mount/unmount animations
- `motion.div` with `initial`, `animate`, `exit` props
- Tool buttons have 3D hover effects with `whileHover` scale transforms

## Troubleshooting

### "Module not found" errors in frontend
Run `npm install --legacy-peer-deps` (React 19 requires this flag)

### SSE streaming not working
Check CORS headers in `server.js` and nginx configuration. SSE requires proper `Content-Type: text/event-stream` header.

### Database connection failures
Verify Supabase credentials in `.env`. Use service role key (not anon key) for backend operations.

### Conversations not loading
Session ID is based on IP + user agent. If behind proxy/load balancer, ensure `app.set('trust proxy', true)` is enabled (it is by default).

### Port conflicts
Backend runs on 3000, frontend on 5173. If ports are in use, change in `.env` files or kill processes:
```bash
lsof -ti:3000 | xargs kill
lsof -ti:5173 | xargs kill
```

## Key Architectural Decisions

### Why Session-Based (No Authentication)?
- **Faster onboarding**: Students start learning immediately, no sign-up friction
- **Privacy-first**: No personal data collection required
- **Simpler architecture**: No auth tokens, session management, password resets
- **Focus on learning**: Not about user accounts, about AI tutoring
- **Trade-off**: Conversations tied to device/browser (acceptable for MVP)

### Why SSE Instead of WebSockets?
- **Simpler implementation**: One-way streaming (server → client) is all we need
- **Better for our use case**: We don't need client → server streaming
- **Easier debugging**: Standard HTTP, works with all proxies
- **Built-in reconnection**: Browser handles reconnects automatically
- **Less overhead**: No WebSocket handshake for each message

### Why Right Sidebar (Not Left)?
- **Differentiation**: Opposite of ChatGPT = unique brand identity
- **Reading optimization**: Chat on left matches left-to-right reading
- **Content priority**: Main content (chat) gets primary position
- **Natural flow**: Eyes start left (chat), then move right (navigation)

### Why Bottom Toolbar (Not Hidden Menu)?
- **Always visible**: No hunting for tools in menus
- **macOS dock pattern**: Familiar, delightful interaction
- **Visual appeal**: Vibrant icons make interface memorable
- **Discoverability**: Students see all 15 tools immediately
- **Touch-friendly**: Bottom = easy thumb reach on mobile

### Why React 19?
- **Latest features**: Concurrent rendering, automatic batching
- **Better performance**: Improved streaming, suspense
- **Future-proof**: Stay on cutting edge
- **Note**: Requires `--legacy-peer-deps` flag for some packages

## Performance Optimization

### Current Optimizations
1. **Virtual scrolling**: Not yet implemented, but needed for long chat histories
2. **Code splitting**: Vite handles this automatically
3. **Image optimization**: Should compress uploads before sending
4. **Lazy loading**: Tool modals load on-demand
5. **Memoization**: Should use React.memo for expensive components

### Load Time Targets
- Initial load: <2s on 3G
- Chat history: <500ms
- Tool activation: <300ms
- Message send/receive: <1s (excluding AI generation time)

### Animation Performance
- Use CSS transforms (GPU accelerated)
- Avoid animating width/height (use transform scale instead)
- Use `will-change` sparingly
- RequestAnimationFrame for JavaScript animations
- Reduce motion preference support

## Accessibility Considerations

### Keyboard Navigation
- Tab through all interactive elements
- Enter/Space to activate buttons
- Escape to close modals
- Arrow keys for toolbar navigation
- Cmd+K for search (not yet implemented)

### Screen Reader Support
- Semantic HTML (`<nav>`, `<main>`, `<aside>`, `<article>`)
- ARIA labels on all icon buttons
- Alt text on images
- Live regions for new messages
- Skip to content link

### Visual Accessibility
- High contrast mode support (needs work)
- Font size adjustment (not yet implemented)
- Color blind friendly (don't rely solely on color)
- Focus indicators (blue outline on all focusable elements)
- Minimum 4.5:1 contrast ratio for text

### Audio Accessibility
- Optional sound effects (not yet implemented)
- Text-to-speech for AI responses (future feature)

## Future Enhancements (Not Yet Implemented)

### Planned Features
1. **User Accounts** (optional): Save across devices, sync progress
2. **Tool Implementations**: Most tools show "Coming Soon" - need full implementations
3. **File Uploads**: Images, PDFs for homework help
4. **Voice Input**: Speech-to-text for hands-free learning
5. **Export**: Download conversations as PDF/Markdown
6. **Analytics**: Track study time, quiz scores, progress over time
7. **Collaboration**: Share conversations with teachers/peers
8. **Notifications**: Study reminders, goal milestones
9. **Mobile App**: React Native version
10. **API Access**: For third-party integrations

### Technical Debt
1. **Math equation rendering**: Need to add KaTeX/MathJax support
2. **Virtual scrolling**: For performance with long histories
3. **Proper error boundaries**: Catch and handle React errors gracefully
4. **Unit tests**: Currently no test coverage
5. **E2E tests**: Need Playwright/Cypress tests
6. **TypeScript**: Consider migrating for better type safety
7. **State management**: May need Zustand/Redux for complex state
8. **Caching**: Add Redis for frequently accessed data
9. **CDN**: Serve static assets from CDN in production
10. **Monitoring**: Add Sentry/LogRocket for error tracking

## Success Metrics

### User Experience Goals
- Students describe it as "completely different from ChatGPT" ✅
- "Fun to use" feedback from students ✅
- <5 seconds to first message sent ✅
- 60fps animations throughout ✅
- Works flawlessly on mobile ✅

### Technical Goals
- <2s initial load time ✅
- 99.9% uptime (production)
- <100ms API response time (excluding AI)
- <1% error rate
- Zero security vulnerabilities

### Business Goals
- Students engage with multiple tools (not just chat)
- High retention (students return daily)
- Positive word-of-mouth sharing
- Teacher adoption for classroom use

## Important: Current State vs. Vision

**What's Built:**
- ✅ Full chat interface (chat left, sidebar right, toolbar bottom)
- ✅ 15 tool icons with animations
- ✅ SSE streaming from Claude
- ✅ Content moderation system
- ✅ Age-appropriate filtering
- ✅ Conversation management (CRUD)
- ✅ Beautiful landing page
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Search functionality
- ✅ Message actions (thumbs up/down, save, copy)

**What's Framework-Only (Needs Implementation):**
- ⏳ Most tool modals (show basic UI but not fully functional)
- ⏳ Notes sync feature
- ⏳ Study planner AI generation
- ⏳ Habit tracker persistence
- ⏳ File upload for images
- ⏳ Voice input
- ⏳ Math equation rendering

**Remember:** When working on this project, prioritize making it feel DIFFERENT and DELIGHTFUL. Every interaction should spark joy while helping students learn effectively. This isn't just another chat UI - it's the Apple of AI education.
