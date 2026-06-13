# 🏠 RoamHeavn

A full-stack room listing web application — find, list, and review places to stay.

---

## 📌 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## About

RoamHeavn is a full-stack web application that allows users to browse, create, and manage room/accommodation listings. Users can sign up, log in, post their own listings with photos, leave reviews, and explore listings posted by others — all with a clean, responsive UI.

---

## Features

- 🔐 **User Authentication** — Sign up, log in, and log out securely using Passport.js (local strategy)
- 🏡 **Listing Management** — Create, edit, and delete your own room listings
- 📸 **Image Uploads** — Upload listing photos via Cloudinary
- 🗺️ **Geocoding** — Automatically maps listing locations using node-geocoder
- ⭐ **Reviews** — Authenticated users can leave and delete reviews on listings
- 🤖 **AI Integration** — Google Generative AI (`@google/generative-ai`) integrated for smart features
- 🔒 **Input Validation** — Server-side schema validation with Joi
- 🛡️ **Authorization Middleware** — Route protection for authenticated and authorized actions
- 💾 **Persistent Sessions** — Sessions stored in MongoDB via connect-mongo
- ⚡ **Flash Messages** — User-friendly feedback using connect-flash

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 18.18.0 |
| Framework | Express.js v5 |
| Templating | EJS + ejs-mate |
| Database | MongoDB + Mongoose |
| Authentication | Passport.js (Local Strategy) |
| File Uploads | Multer + Cloudinary |
| Geocoding | node-geocoder |
| AI | Google Generative AI |
| Validation | Joi |
| Session Store | connect-mongo |
| Deployment | Render / Vercel |

---

## Project Structure

```
RoamHeavn/
├── controllers/        # Route handler logic
├── init/               # DB seed / initialization scripts
├── models/             # Mongoose data models
├── public/             # Static assets (CSS, JS, images)
├── routes/             # Express route definitions
├── utils/              # Helper utilities (error handling, etc.)
├── views/              # EJS templates
├── app.js              # App entry point
├── cloudConfig.js      # Cloudinary configuration
├── middleware.js        # Custom middleware (auth, authorization)
├── schema.js           # Joi validation schemas
├── render.yaml         # Render deployment config
├── vercel.json         # Vercel deployment config
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18.18.0
- MongoDB (local or Atlas)
- Cloudinary account
- Google Generative AI API key

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/SumiT-2201/RoamHeavn.git
cd RoamHeavn

# 2. Install dependencies
npm install

# 3. Set up environment variables (see below)
cp .env.example .env

# 4. (Optional) Seed the database
node init/index.js

# 5. Start the development server
npm run dev
# or
node app.js
```

The app will be running at `http://localhost:3000` (or whichever port is configured).

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Session
SECRET=your_session_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Geocoding
GEOCODER_API_KEY=your_geocoder_api_key

# Google Generative AI
GEMINI_API_KEY=your_google_ai_api_key
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

## Deployment

The project includes configuration for two platforms:

**Render** (`render.yaml`): Push to your Render service with the start command `node app.js`.

**Vercel** (`vercel.json`): Deploy via the Vercel CLI or GitHub integration. Ensure environment variables are set in the Vercel project dashboard.

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add some feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is licensed under the ISC License.
