# 🍽️ Restaurant Web App

> A modern, full-stack restaurant web application built with Next.js 16, Supabase, and NextAuth.js.

---

## 📌 About

This project is a modern web application designed to manage a restaurant's digital presence. By combining Next.js 16's App Router architecture, Supabase's powerful database services, and NextAuth.js's flexible authentication system, it delivers features such as menu management, user session handling, and real-time data synchronization.

---

## 🚀 Tech Stack

### Frontend

| Technology       | Description                                                                           |
| ---------------- | ------------------------------------------------------------------------------------- |
| **Next.js 16**   | App Router, Server Components, and Turbopack for an ultra-fast development experience |
| **TypeScript**   | Type-safe codebase (96.4% TypeScript coverage)                                        |
| **Tailwind CSS** | Utility-first CSS framework for rapid and consistent styling                          |
| **shadcn/ui**    | Radix UI-based, accessible and customizable component library                         |

### Backend & Database

| Technology                   | Description                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------ |
| **Supabase**                 | Open-source Firebase alternative powered by PostgreSQL — real-time data and storage        |
| **NextAuth.js (Auth.js v5)** | Flexible and secure authentication for Next.js — email/password and OAuth provider support |
| **Supabase Realtime**        | WebSocket-based real-time data synchronization for instant updates                         |

### Developer Tooling

| Tool           | Description                                              |
| -------------- | -------------------------------------------------------- |
| **ESLint**     | Static analysis for code quality and consistency         |
| **PostCSS**    | CSS processing pipeline for Tailwind                     |
| **Geist Font** | Next.js's official font family with optimized typography |

---

## 📁 Project Structure

```
📦 Nextjs-16-Supabase-restaurant-web-app
 ┣ 📂 app/                  # Next.js App Router — pages and layouts
 ┃ ┣ 📂 (auth)/             # Authentication pages (login, register)
 ┃ ┣ 📂 (dashboard)/        # Admin dashboard pages
 ┃ ┣ 📄 layout.tsx          # Root layout — global HTML structure
 ┃ ┗ 📄 page.tsx            # Home page
 ┣ 📂 components/           # Reusable UI components
 ┃ ┣ 📂 ui/                 # shadcn/ui base components
 ┃ ┗ 📂 ...                 # Custom application components
 ┣ 📂 lib/                  # Utility functions and configurations
 ┃ ┣ 📄 supabase.ts         # Supabase client setup
 ┃ ┣ 📄 auth.ts             # NextAuth.js configuration (providers, callbacks)
 ┃ ┗ 📄 utils.ts            # General utility functions
 ┣ 📄 components.json       # shadcn/ui component configuration
 ┣ 📄 next.config.ts        # Next.js configuration
 ┣ 📄 tailwind.config.ts    # Tailwind CSS configuration
 ┣ 📄 tsconfig.json         # TypeScript configuration
 ┗ 📄 package.json          # Dependencies and scripts
```

---

## ✨ Features

- 🔐 **Authentication** — Secure sign-in/sign-up and session management via NextAuth.js (email/password & OAuth)
- 🍕 **Menu Management** — Dynamic listing of food categories and items
- ⚡ **Server Components** — Optimal server-side rendering with Next.js 16 App Router
- 🎨 **Modern UI** — Responsive and accessible interface with shadcn/ui + Tailwind CSS
- 🔄 **Real-time Data** — Instant data synchronization powered by Supabase Realtime
- 📱 **Fully Responsive** — Mobile, tablet, and desktop-friendly layout
- 🛡️ **Type Safety** — End-to-end TypeScript support

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.17 or higher
- npm / yarn / pnpm / bun
- A [Supabase](https://supabase.com) account

### 1. Clone the Repository

```bash
git clone https://github.com/hasan-isufov/Nextjs-16-Supabase-restaurant-web-app.git
cd Nextjs-16-Supabase-restaurant-web-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key

# OAuth provider example (Google)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

> To generate a **`NEXTAUTH_SECRET`**, run the following in your terminal: `openssl rand -base64 32`

### 4. Start the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 🗄️ Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the following SQL in the SQL Editor to create the required tables:

```sql
-- Menu categories table
create table categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  created_at timestamp with time zone default now()
);

-- Menu items table
create table menu_items (
  id uuid default gen_random_uuid() primary key,
  category_id uuid references categories(id),
  name text not null,
  description text,
  price numeric(10,2) not null,
  image_url text,
  is_available boolean default true,
  created_at timestamp with time zone default now()
);
```

3. Configure Row Level Security (RLS) policies according to your requirements.

---

## 📦 Key Dependencies

```json
{
  "next": "^16.x",
  "react": "^19.x",
  "typescript": "^5.x",
  "next-auth": "^5.x",
  "@supabase/supabase-js": "^2.x",
  "tailwindcss": "^3.x",
  "shadcn/ui": "latest",
  "lucide-react": "latest"
}
```

---

## 🚀 Deployment

### Deploy on Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/hasan-isufov/Nextjs-16-Supabase-restaurant-web-app)

1. Sign in to your [Vercel](https://vercel.com) account
2. Import your GitHub repository
3. Add the following environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXTAUTH_URL` (your deployed URL)
   - `NEXTAUTH_SECRET`
4. Click Deploy — automatic CI/CD will be activated!

---

## 🤝 Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'feat: add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## 📄 License

This project is distributed under the MIT License.

---

<div align="center">

**Next.js 16** × **Supabase** × **NextAuth.js** × **TypeScript** × **Tailwind CSS** × **shadcn/ui**

Built with ❤️

</div>
