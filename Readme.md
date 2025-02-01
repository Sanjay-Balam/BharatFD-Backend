# BharatFD Backend API 🌐

[![GitHub Repository](https://img.shields.io/badge/🚀_GitHub-Repository-2ea44f?style=for-the-badge)](https://github.com/Sanjay-Balam/BharatFD-Backend)
[![Docker Image](https://img.shields.io/docker/pulls/sanjaybalam2003/bharatfd-backend?style=for-the-badge)](https://hub.docker.com/r/sanjaybalam2003/bharatfd-backend/tags)

Multi-language FAQ management system with Redis caching 🌟 and automatic translations using Google Cloud 🌍


## ✨ Key Features
- 🚀 **Multi-language Support** - Automatic translations for 100+ languages
- ⚡ **Redis Caching** - 1-hour expiration for high performance
- 🔄 **Real-time Updates** - Automatic cache invalidation
- 📦 **Docker Ready** - Pre-built image & compose setup
- ✅ **Validation Middleware** - Zod-based request validation
- 📊 **Admin Dashboard** - Built with AdminJS
- 🧪 **Testing Suite** - 90% test coverage (Mocha/Chai/Sinon)

## 🛠 Tech Stack
| Layer               | Technology                          |
|---------------------|-------------------------------------|
| **Runtime**         | ![Bun](https://img.shields.io/badge/Bun-🧭-black) |
| **Framework**       | ![Express](https://img.shields.io/badge/Express-🚀-lightgrey) |
| **Database**        | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-🐘-blue) |
| **Cache**           | ![Redis](https://img.shields.io/badge/Redis-🧠-red) |
| **ORM**             | ![Prisma](https://img.shields.io/badge/Prisma-💎-2D3748) |
| **Translation**     | ![GCP](https://img.shields.io/badge/Google_Cloud-☁️-4285F4) |

## 🚀 Getting Started
## Local Development 🖥️

### Prerequisites
- Node.js v18+
- Bun v1.0+
- PostgreSQL
- Redis
- Google Cloud API Key

### Setup

## Using Docker Deployment 🐳

1. Pull the Image Locally
```js
docker run -p 3000:3000 \
-e DATABASE_URL=postgresql://user:pass@host:5432/db \
-e REDIS_URL=redis://localhost:6379 \
-e GOOGLE_TRANSLATE_API_KEY=your_key \
sanjaybalam2003/bharatfd-backend
```

2. Build the Application using Docker Compose

``` 
docker-compose up --build
```


## Environment Variables 🔧

| Variable                 | Required | Description                |
|-------------------------|----------|----------------------------|
| `DATABASE_URL`          | Yes      | PostgreSQL connection URL |
| `REDIS_URL`             | Yes      | Redis connection URL       |
| `GOOGLE_TRANSLATE_API_KEY` | Yes   | GCP translation key       |
| `TARGET_LANGUAGES`      | No       | Comma-separated languages  |




## Using Git hub

1. Clone repository: ```git clone https://github.com/Sanjay-Balam/BharatFD-Backend.git```

2. Install dependencies: ```bun install```

3. Create `.env` file:

```js
DATABASE_URL="postgresql://user:pass@localhost:5432/db"
REDIS_URL="redis://localhost:6379"
GOOGLE_TRANSLATE_API_KEY="your-key"
SERVER_PORT = 3000
```

4. Database setup:
```
bunx prisma generate
bunx prisma migrate dev
```


5. Start server:

```
bun run dev
```