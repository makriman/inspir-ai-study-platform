# inspir - Revolutionary AI Study Platform

![inspir Logo](https://img.shields.io/badge/inspir-AI%20Study%20Platform-blue)
![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![Claude](https://img.shields.io/badge/Claude-Sonnet%204.5-7C3AED)

**The most revolutionary AI study companion powered by Claude Sonnet 4.5**

## 🌟 Revolutionary Design

inspir breaks the mold of traditional AI chat interfaces:

- ✨ **Chat on LEFT** (opposite of ChatGPT) - Main conversation area
- 📊 **Navigation on RIGHT** - Organization, history, notes, planner
- 🎯 **15 Tools at BOTTOM** - Vibrant, animated toolbar like macOS dock
- 🎨 **Beautiful Animations** - Powered by Framer Motion
- 🛡️ **Age-Appropriate Filtering** - Safe content for all students

## 🚀 Features

### 15 Revolutionary Study Tools

1. 🎨 **Draw/Sketch** - Visual learning canvas
2. 📝 **Quiz Generator** - Create instant practice quizzes
3. 🃏 **Flashcards** - Interactive flashcard study mode
4. 📊 **Practice Tests** - Full-length practice exams
5. ⏰ **Study Timer** - Pomodoro timer for focused study
6. ✅ **Habit Tracker** - Track daily study habits & streaks
7. 💡 **Explain Concept** - Deep dive explanations
8. 🎵 **Study Music** - Focus-enhancing music player
9. 📸 **Image Analysis** - Upload homework for help
10. 🧮 **Math Solver** - Step-by-step math solutions
11. 🔬 **Science Lab** - Virtual experiments & simulations
12. 🌍 **Visual Learning** - Interactive diagrams & maps
13. 📓 **Notes Sync** - Cornell note-taking system
14. 📅 **AI Planner** - Smart study schedule generator
15. 🎯 **Goal Setter** - Track progress toward goals

### Core Features

- **AI-Powered**: Claude Sonnet 4.5 for intelligent tutoring
- **Real-Time Streaming**: Live word-by-word AI responses
- **Content Moderation**: Age-appropriate filtering & safety
- **Conversation Management**: Full CRUD operations
- **Search**: Full-text search across all conversations
- **No Authentication**: Public access, session-based
- **Responsive**: Works on desktop, tablet, and mobile

## 📋 Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **Vite 5** - Lightning-fast build tool
- **Tailwind CSS 3.4** - Utility-first styling
- **Framer Motion 11** - Smooth animations
- **React Router 6** - Client-side routing
- **Axios** - HTTP requests
- **React Markdown** - Markdown rendering
- **React Syntax Highlighter** - Code highlighting
- **Heroicons & Lucide React** - Beautiful icons

### Backend
- **Node.js + Express** - RESTful API
- **Claude API** - AI chat powered by Sonnet 4.5
- **Supabase** - PostgreSQL database
- **Server-Sent Events** - Real-time streaming
- **Express Rate Limit** - API protection
- **Content Moderation** - Safety filtering

### Infrastructure
- **Nginx** - Reverse proxy & load balancing
- **PM2** (optional) - Process management

## 🏗️ Architecture

```
inspir/
├── backend/              # Node.js + Express API
│   ├── controllers/      # Business logic
│   ├── routes/          # API endpoints
│   ├── utils/           # Helper functions
│   └── server.js        # Main server file
├── frontend/            # React 19 + Vite
│   ├── src/
│   │   ├── pages/       # Landing & Chat pages
│   │   ├── components/  # Reusable components
│   │   │   ├── chat/    # Chat-specific components
│   │   │   └── landing/ # Landing page components
│   │   └── utils/       # API & helpers
│   └── vite.config.js
├── nginx.conf           # Nginx configuration
└── database-schema.sql  # Supabase schema
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Nginx installed
- Supabase account
- Anthropic API key

### 1. Database Setup

1. Create a Supabase project at https://supabase.com
2. Go to SQL Editor
3. Run the entire `database-schema.sql` file
4. Verify tables created in Table Editor

### 2. Backend Setup

```bash
cd backend

# Copy environment template
cp .env.example .env

# Edit .env with your credentials
nano .env

# Install dependencies
npm install

# Start backend (development)
npm run dev

# Or start backend (production)
npm start
```

**Required Environment Variables:**
- `ANTHROPIC_API_KEY` - Get from https://console.anthropic.com
- `SUPABASE_URL` - From Supabase project settings
- `SUPABASE_SERVICE_ROLE_KEY` - From Supabase project settings
- `SUPABASE_ANON_KEY` - From Supabase project settings

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Or build for production
npm run build
```

### 4. Nginx Configuration

```bash
# Copy nginx config
sudo cp nginx.conf /etc/nginx/sites-available/inspir

# Enable site
sudo ln -s /etc/nginx/sites-available/inspir /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

### 5. Access Application

- **Frontend**: http://localhost/ or http://YOUR_SERVER_IP/
- **Backend API**: http://localhost/api/
- **Health Check**: http://localhost/api/chat/conversations

## 🎨 Design Philosophy

### Why This Design is Revolutionary

1. **Chat on LEFT** - Opposite of every AI chat tool
   - More natural for reading (left-to-right)
   - Maximizes content area on wide screens

2. **Navigation on RIGHT** - Inspired by modern IDEs
   - Keep context visible while chatting
   - Quick access to history, notes, planner

3. **Tools at BOTTOM** - Like macOS dock
   - Always accessible, never hidden
   - Vibrant, animated 3D icons
   - Hover tooltips with descriptions

4. **Minimal Scrolling** - Information density
   - Smart layout reduces vertical scrolling
   - Horizontal toolbar for tools
   - Collapsible sidebar

### Color Palette

- **Primary Purple**: `#7C3AED` (purple-600)
- **Primary Blue**: `#0030AB` (custom)
- **Accent Green**: `#10B981` (green-500)
- **Accent Orange**: `#F59E0B` (amber-500)
- **Accent Red**: `#EF4444` (red-500)

### Typography

- **Font Family**: Montserrat
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold), 900 (black)

## 🔐 Security & Safety

### Content Moderation

- Jailbreak detection
- Blocked keywords (violence, explicit, drugs, etc.)
- Flagged topics (mental health, academic integrity)
- Age-appropriate system prompts

### Age Filters

- **Under 14** 🛡️ - Strict filtering, simple language
- **Teen (13-17)** 🎓 - Moderate filtering, clear language
- **Adult (18+)** 🎯 - Minimal filtering, advanced concepts

### Rate Limiting

- 20 messages per hour per session
- Prevents abuse & controls costs

## 📊 API Endpoints

### Conversations

- `POST /api/chat/conversations` - Create new conversation
- `GET /api/chat/conversations` - List all conversations
- `GET /api/chat/conversations/:id` - Get messages
- `PATCH /api/chat/conversations/:id` - Update conversation
- `DELETE /api/chat/conversations/:id` - Delete conversation

### Messages

- `POST /api/chat/conversations/:id/messages` - Send message (SSE streaming)

### Search

- `GET /api/chat/search?query=...` - Search messages

## 🎯 Roadmap

### Phase 1 (Current) ✅
- [x] Chat interface with Claude Sonnet 4.5
- [x] 15 study tools (framework)
- [x] Content moderation
- [x] Conversation management
- [x] Landing page

### Phase 2 (Coming Soon)
- [ ] Full tool implementations
- [ ] File upload (images, PDFs)
- [ ] Voice input (speech-to-text)
- [ ] Export conversations
- [ ] User accounts (optional)

### Phase 3 (Future)
- [ ] Mobile app (React Native)
- [ ] Collaboration features
- [ ] Analytics dashboard
- [ ] API access for developers
- [ ] Browser extension

## 🐛 Troubleshooting

### Backend Issues

**Error: Missing Supabase credentials**
- Check `.env` file has all required variables
- Verify credentials from Supabase dashboard

**Error: Anthropic API key invalid**
- Get new key from https://console.anthropic.com
- Check for extra spaces in `.env` file

**Port 3000 already in use**
- Change `PORT=3001` in `.env`
- Or kill existing process: `lsof -ti:3000 | xargs kill`

### Frontend Issues

**Module not found**
- Run `npm install --legacy-peer-deps` again
- Clear node_modules: `rm -rf node_modules && npm install --legacy-peer-deps`

**Cannot connect to API**
- Check `VITE_API_URL` in `.env`
- Verify backend is running: `curl http://localhost:3000/health`

**Streaming not working**
- Check CORS settings in backend
- Verify nginx configuration

### Database Issues

**Tables not found**
- Re-run `database-schema.sql` in Supabase
- Check SQL Editor for errors

**RLS policy blocking**
- Verify policies allow public access
- Check Supabase logs

## 📝 License

MIT License - Feel free to use for personal or commercial projects

## 🙏 Acknowledgments

- **Anthropic** - For Claude Sonnet 4.5 AI
- **Supabase** - For amazing database platform
- **Vercel** - For Vite & tooling
- **Tailwind Labs** - For Tailwind CSS
- **Framer** - For Framer Motion

## 📧 Support

For issues, questions, or feature requests, please open an issue on GitHub.

---

**Built with ❤️ for students everywhere. Study smarter with inspir!**
