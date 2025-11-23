🌟 Portfolio Website — React + TypeScript + Vite + Tailwind v4

A fast, modern, and responsive personal portfolio built using React, TypeScript, Vite, and TailwindCSS v4.
This project showcases your skills, projects, experience, and personal brand in a beautifully designed interface.

🚀 Tech Stack
Frontend

⚛️ React 18 (TypeScript)

⚡ Vite — Super-fast dev server & bundler

🎨 TailwindCSS v4 — Next-gen styling

🌗 Dark/Light mode support (optional)

🎞️ Smooth animations (Framer Motion optional)

Build & Deployment

🔧 Vite Build

☁️ Deploy-ready for Vercel, Netlify, or GitHub Pages

📁 Folder Structure
/
├── public/            # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── sections/       # Portfolio sections (Home, About, Projects, Contact)
│   ├── assets/         # Local images & media
│   ├── App.tsx         # App root
│   ├── main.tsx        # App entry
│   └── styles.css      # Tailwind styles
├── index.html
├── vite.config.ts
└── package.json

🔧 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/your-portfolio.git
cd your-portfolio

2️⃣ Install dependencies
npm install

3️⃣ Start development server
npm run dev

4️⃣ Build for production
npm run build

5️⃣ Preview production build
npm run preview

🔑 Environment Variables (Optional)

Create a .env file in the root:

VITE_API_KEY=your_key_here


Use in React:

const apiKey = import.meta.env.VITE_API_KEY;

📦 Deployment
▶ Deploy to Vercel (Recommended)

Push your project to GitHub

Go to https://vercel.com

Import your repo

Set build settings:

Build Command: npm run build

Output Directory: dist

Deploy 🎉

▶ Deploy to Netlify

Build command: npm run build

Publish directory: dist

▶ Deploy to GitHub Pages
npm install gh-pages --save-dev
npm run deploy

✨ Features
🌐 Modern UI + Smooth UX

Fully responsive

Lightweight and fast

Clean and minimal design

🖼 Portfolio Sections

Hero Banner

About Me

Skills

Projects

Experience

Contact

⚙️ Developer Friendly

Reusable components

Typed with TypeScript

Organized folder structure

Easy to customize

🖼 Assets & Images

All images stored locally under /src/assets

Optimized for performance

Supports .jpg, .png, .webp

Can use WhatsApp images after downloading locally

Example:

import myPhoto from "@/assets/myphoto.jpg";

<img src={myPhoto} alt="My Photo" />


📜 License

This project is licensed under the MIT License — feel free to use and customize it.

🙌 Author
Anurag sharma 
