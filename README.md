# BWA News Frontend

A modern news portal frontend application built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS**. This application provides a complete content management system with public-facing news articles and an admin dashboard.

## Features

### 🌐 Public Pages

- **Homepage** - Display featured and latest news articles
- **Category Pages** - Browse news by category
- **Content Detail** - Read full articles with author information
- **All Content** - Browse all published articles

### 🔐 Authentication

- User login with JWT token-based authentication
- Protected dashboard routes using Next.js middleware

### 📊 Admin Dashboard

- **Content Management** - Create, edit, and delete news articles
- **Category Management** - Manage news categories
- **User Management** - Admin user controls

## Tech Stack

| Technology                                    | Version   | Purpose                         |
| --------------------------------------------- | --------- | ------------------------------- |
| [Next.js](https://nextjs.org/)                | 15.0.3    | React framework with App Router |
| [React](https://react.dev/)                   | 19.0.0-rc | UI library                      |
| [TypeScript](https://www.typescriptlang.org/) | 5.x       | Type safety                     |
| [Tailwind CSS](https://tailwindcss.com/)      | 3.4.1     | Utility-first CSS               |
| [Radix UI](https://www.radix-ui.com/)         | Various   | Accessible UI components        |
| [TanStack Table](https://tanstack.com/table)  | 8.21.3    | Data tables                     |
| [Axios](https://axios-http.com/)              | 1.13.4    | HTTP client                     |
| [Zod](https://zod.dev/)                       | 4.3.6     | Schema validation               |
| [SweetAlert2](https://sweetalert2.github.io/) | 11.26.17  | Alert dialogs                   |

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Authentication pages
│   │   └── login/        # Login page
│   ├── (main)/           # Public-facing pages
│   │   ├── category/     # Category listing
│   │   ├── content-all/  # All content listing
│   │   └── page.tsx      # Homepage
│   ├── dashboard/        # Admin dashboard
│   │   ├── (home)/       # Dashboard modules
│   │   │   ├── category/ # Category management
│   │   │   ├── content/  # Content management
│   │   │   └── user/     # User management
│   │   └── layout.tsx    # Dashboard layout
│   ├── globals.css       # Global styles
│   └── layout.tsx        # Root layout
├── components/
│   ├── ui/               # Reusable UI components
│   │   ├── alert.tsx
│   │   ├── button.tsx
│   │   ├── data-table.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   └── textarea.tsx
│   ├── footer.tsx
│   └── navbar.tsx
├── lib/
│   └── utils.ts          # Utility functions
├── model/                # TypeScript interfaces
│   ├── ApiResponse.ts
│   ├── Category.ts
│   ├── Content.ts
│   └── User.ts
└── middleware.ts         # Route protection
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd bwanews-fe
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

4. Configure your `.env` file:
   ```env
   APP_ENV='development'
   NEXT_PUBLIC_API_URL=<your-api-url>
   ```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

Create a production build:

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

### Linting

Run ESLint:

```bash
npm run lint
```

## Environment Variables

| Variable              | Description                                           | Required |
| --------------------- | ----------------------------------------------------- | -------- |
| `APP_ENV`             | Application environment (`development`, `production`) | Yes      |
| `NEXT_PUBLIC_API_URL` | Backend API base URL                                  | Yes      |

## API Integration

The application connects to a backend API for:

- User authentication
- Content CRUD operations
- Category management
- User management

API calls are handled through a configured Axios instance located in `lib/axios.ts`.

## Scripts

| Script          | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Deployment

The easiest way to deploy this Next.js app is using the [Vercel Platform](https://vercel.com/):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

For other platforms, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
