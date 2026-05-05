# MAMA California — mama-california.org

A full-stack web application for MAMA California (Mothers Against Media Addiction).

- **Backend**: Ruby on Rails 7.1 API (PostgreSQL)
- **Frontend**: React + Vite

---

## Project Structure

```
mama-california/
├── backend/          # Rails API
│   ├── app/
│   │   ├── controllers/
│   │   │   └── api/v1/        # Public + admin API endpoints
│   │   └── models/            # Member, Event, NewsItem, Resource, Chapter, Speaker
│   ├── config/
│   │   ├── routes.rb
│   │   └── database.yml
│   └── db/
│       ├── migrate/           # All table migrations
│       └── seeds.rb           # Sample data
│
└── frontend/         # React + Vite
    └── src/
        ├── pages/             # Home, About, GetInvolved, Events, Resources, News
        ├── components/        # Navbar, Footer
        └── api.js             # Axios API calls
```

---

## Backend Setup

### Prerequisites
- Ruby 3.3+
- PostgreSQL
- Bundler

### Steps

```bash
cd backend

# Install gems
bundle install

# Set up database
rails db:create db:migrate db:seed

# Start server
rails s -p 3000
```

### Environment variables (optional)
```
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
SECRET_KEY_BASE=your_secret
FRONTEND_URL=http://localhost:5173
```

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/v1/events | Upcoming published events |
| GET | /api/v1/news | Published news items |
| GET | /api/v1/resources | Published resources (filterable by topic/type) |
| GET | /api/v1/chapters | Active chapters |
| POST | /api/v1/members/signup | Register new member |
| POST | /api/v1/contact | Submit contact/interest form |
| POST | /api/v1/auth/login | Admin login (returns JWT) |
| GET/POST/PUT/DELETE | /api/v1/admin/* | Admin CRUD (JWT required, is_admin) |

---

## Frontend Setup

### Prerequisites
- Node.js 18+

### Steps

```bash
cd frontend

# Install dependencies
npm install

# Copy env file
cp .env.example .env

# Start dev server
npm run dev
```

Open http://localhost:5173

### Build for production
```bash
npm run build
# Output in dist/
```

---

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, stats, mission intro, CTA |
| `/about` | About | Mission, values, chapters, leadership |
| `/get-involved` | Get Involved | Ways to help, legislator CTA, contact form |
| `/resources` | Resources | Studies, guides, articles (filterable) |
| `/events` | Events | Upcoming events with RSVP links |
| `/news` | News | Press coverage and litigation updates |

---

## Branding

Matches wearemama.org:
- **Primary color**: `#C0392B` (MAMA red)
- **Display font**: Playfair Display (serif, editorial)
- **Body font**: Source Sans 3
- **Tone**: Warm, serious, community-focused

---

## Integrations

The app is designed to work alongside:
- **EveryAction** — Legislator contact forms (link out)
- **Mobilize** — Event RSVP (`mobilize_url` field on events)

---

## Deployment

### Backend (Render / Heroku / Fly.io)
```bash
# Set env vars, then:
rails db:migrate
rails db:seed
```

### Frontend (Vercel / Netlify)
```bash
npm run build
# Deploy dist/ directory
# Set VITE_API_URL to your production API URL
```
