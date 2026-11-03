# Justine Cua - Portfolio

Personal portfolio of **Justine Cua**, a mobile and web app developer from Iligan City, Philippines.

**Live site:** [justinecua.online](https://justinecua.online)

It shows my projects, blog posts, certificates and website prototypes, with a live chat for visitors and an admin dashboard for managing the content.

## Features

- **Projects** - mobile apps and web systems, with a featured project and GitHub activity
- **Blog** - posts with a table of contents, reading progress bar and older/newer navigation
- **Certificates** - filterable by category
- **Prototypes** - website concepts for local businesses
- **Live chat** - visitors can message me in real time over WebSockets
- **Admin dashboard** - manage projects, posts and certificates, and reply to chats
- **Light and dark theme**
- **SEO** - per-page meta tags, Open Graph previews, JSON-LD structured data and an auto-generated sitemap

## Tech stack

| Part     | Tools                                                        |
| -------- | ------------------------------------------------------------ |
| Frontend | React 19, React Router 7, Vite 7, Tailwind CSS 4             |
| Backend  | Django 4.2, Django REST Framework, Channels (Daphne), Redis  |
| Database | PostgreSQL                                                   |
| Deploy   | Docker Compose                                               |

## Project structure

```
.
├── frontend/          React app (Vite)
│   ├── public/        robots.txt, sitemap.xml, icons, social preview image
│   ├── scripts/       sitemap generator (runs before each build)
│   └── src/           pages, components, hooks, API clients
├── backend/           Django API
│   ├── core/          models, REST views, chat WebSocket consumer
│   └── portfolio/     settings, URLs, ASGI config
└── docker-compose.yml frontend, API and Redis services
```

## Running locally

### With Docker

```bash
docker compose up --build
```

- Frontend: http://localhost:5175
- API: http://localhost:8007/api/

### Without Docker

**Backend**

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8007
```

The chat needs Redis running on `localhost:6379` (or set `REDIS_URL`).

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

## Environment variables

**`backend/.env`**

| Variable                          | Purpose                                    |
| --------------------------------- | ------------------------------------------ |
| `SECRET_KEY`                      | Django secret key                          |
| `DEBUG`                           | `True` or `False`                          |
| `ALLOWED_HOSTS`                   | Comma-separated hostnames                  |
| `CORS_ALLOWED_ORIGINS`            | Comma-separated frontend origins           |
| `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` | PostgreSQL connection |
| `REDIS_URL`                       | Redis for the chat (optional locally)      |

**`frontend/.env`**

| Variable              | Purpose                                         |
| --------------------- | ----------------------------------------------- |
| `VITE_API_BASE_URL`   | API base URL, ending in `/api/` (also used for the chat WebSocket) |
| `VITE_GITHUB_TOKEN`   | GitHub token for the activity graph             |

## Building

```bash
cd frontend
npm run build
```

This first writes `public/sitemap.xml`, listing the main pages and every blog post from the API, then builds the site into `dist/`.

## Contact

- Website: [justinecua.online](https://justinecua.online)
- GitHub: [@justinecua](https://github.com/justinecua)
- LinkedIn: [Justine Cua](https://www.linkedin.com/in/justine-cua-886701303/)
- X: [@jazzzztin](https://x.com/jazzzztin)

## License

[MIT](LICENSE)
