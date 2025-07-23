# 💬 DM Genie

**AI-powered LinkedIn message generator for job seekers**

DM Genie is a modern web application that helps job seekers craft personalized LinkedIn messages using AI. Whether you're reaching out to recruiters, hiring managers, or professionals in your field, DM Genie generates effective and tailored messages based on your resume and job details.

Built with **Next.js 15** and powered by **Google Gemini**, it streamlines your job outreach strategy with speed, precision, and customization.

## ✨ Features

- 🤖 **AI-Powered Message Generation** using Google Gemini API
- 🔐 **Secure Authentication** with Clerk
- 📄 **Resume Parsing** to understand your profile better
- 📌 **Job Management** — add, edit, delete job entries
- 💬 **LinkedIn Message Creation** based on job + resume
- 💾 **Save & Manage Messages** for every job
- 👤 **Editable Profile Section** with resume re-upload
- 📜 **Legal Pages**: Privacy Policy, Terms of Service, and Contact
- 💅 **Modern UI** built with Tailwind CSS + shadcn

## 🧪 Test Credentials

To explore the app without signing up, use the following dummy account:

```
Email: jane+clerk_test@gmail.com
Password: Test@424242
```

> ✅ This account works in test mode with Clerk. Useful for demos and development.

## 🧱 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS, shadcn/ui |
| **Forms** | React Hook Form + Zod |
| **Auth** | Clerk |
| **Database** | PostgreSQL (via Neon) |
| **ORM** | Drizzle ORM |
| **AI Integration** | Google Gemini API |
| **Actions** | next-safe-action |
| **Notifications** | Sonner |

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mdarfatwork/dmgenie.git
cd dmgenie
```

### 2. Install Dependencies

Using pnpm (recommended):

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file and copy from `.env.example`. Replace the placeholders:

#### 🔐 Authentication - Clerk
Get keys from [https://clerk.com](https://clerk.com)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

#### 🗄️ Database - Neon
Get connection string from [https://neon.tech](https://neon.tech)
- `DATABASE_URL`

#### 🤖 AI Integration - Google Gemini
Get API key from [https://aistudio.google.com](https://aistudio.google.com)
- `GEMINI_API_KEY`

> ⚠️ **Important:** Never commit `.env.local` to Git. It's already in `.gitignore`.

### 4. Run the App Locally

```bash
pnpm dev
```

Visit: [http://localhost:3000](http://localhost:3000)

## 🌐 Routes Overview

### Public Pages
- `/` — Landing Page
- `/contact` — Contact Info
- `/terms` — Terms of Service
- `/privacy` — Privacy Policy

### Non-Authenticated
- `/sign-in`
- `/sign-up`

### Authenticated Routes
- `/job` — View/Add Jobs
- `/job/[id]` — Job Details + Generate Message
- `/profile` — Resume Upload and Edit

> All authenticated routes are protected by Clerk middleware.

## 🚀 Deployment

### Recommended: Vercel

1. Push repo to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

Also compatible with:
- Railway
- Netlify
- Render

## 🙋 FAQ

### 🔐 Why Clerk?
Clerk makes secure authentication simple with email/password and social login options. Perfect for modern, fast-moving applications.

### 🤖 Why Gemini?
Google Gemini delivers high-quality message generation, ideal for personalized outreach in professional settings.

## 🛡️ Disclaimer

DM Genie is a personal project built for educational and demonstration purposes. It uses:
- **Clerk** for authentication
- **Neon** for cloud PostgreSQL
- **Google Gemini** for AI content generation

None of your data is used for any commercial purpose.

## 📄 License

MIT License

You are free to use, modify, and distribute this project for personal or commercial use.

## 📬 Contact

For feedback or questions, visit the **Contact Page** on the site or open an issue on GitHub.

---

## 👨‍💻 Made by

**Mohammed Arfat** — Full Stack Developer  
GitHub: [@mdarfatwork](https://github.com/mdarfatwork)
LinkedIn: [Momin Mohammed Arfat](https://www.linkedin.com/in/momin-mohammed-arfat/)

---

<div align="center">
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
