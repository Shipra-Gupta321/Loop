# LOOP — AI Feedback Analytics Platform

A multi-tenant SaaS feedback analytics platform with AI/RAG features, built as a major project.

**Live demo mode:** the app runs entirely on seeded mock data (`src/lib/mock-data.ts`), so it
deploys to Vercel with **zero configuration** — no database required to explore every screen.
Add an `ANTHROPIC_API_KEY` to unlock the real AI calls; without it, each AI feature falls back to
a rule-based/local version so nothing ever breaks in a demo.

## Tech stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Prisma ORM · PostgreSQL (Supabase/Neon) ·
NextAuth-ready · Anthropic Claude API · pgvector · Recharts · Vercel

## Features

1. **Structured classification** — new feedback is classified into sentiment, priority, and theme
   via `/api/classify`, using a Zod schema to validate the model's JSON output, with a rule-based
   fallback if no API key is set. See `src/lib/ai.ts`.
2. **Theme clustering & trends** — `/trends` shows AI-assigned themes with week-over-week movement.
3. **Ask LOOP (RAG chat)** — `/ask-loop` retrieves the most relevant feedback (keyword overlap in
   demo mode; swap in pgvector cosine similarity once the DB is wired up) and asks Claude to answer
   using only that context, citing sources. See `/api/ask-loop`.
4. **Auto-generated reports** — `/reports` computes all stats in code (`/api/report`) and asks
   Claude only to write the narrative prose around those facts, never to invent numbers.

## Architecture notes

- **Multi-tenancy:** shared database with `organizationId`/`workspaceId` isolation (see
  `prisma/schema.prisma`) rather than a database-per-tenant — simpler ops, still enforced at the
  query layer once real auth is wired in.
- **RBAC:** three roles (Admin / Analyst / Viewer) meant to be enforced **server-side** in API
  routes and Server Components, not just hidden in the UI. The current demo auth
  (`src/lib/auth-store.ts`) is a client-side mock for presentation purposes — swap in NextAuth.js
  with real session checks before this goes anywhere near production data.
- **No Docker, no Kafka** — deliberately avoided as over-engineering for this project's scale.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Any email/password logs you into the demo workspace.

## Connecting a real database

1. Create a free Postgres database on [Supabase](https://supabase.com) or [Neon](https://neon.tech)
   and enable the `pgvector` extension (needed for the `Embedding` model).
2. Set `DATABASE_URL` in `.env`.
3. `npx prisma migrate dev --name init`
4. Replace the mock-data reads in `src/lib/mock-data.ts` / API routes with Prisma queries scoped
   by `workspaceId`.
5. Swap `src/lib/auth-store.ts` for real NextAuth.js sessions.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it into [Vercel](https://vercel.com/new).
3. (Optional but recommended) add an `ANTHROPIC_API_KEY` environment variable to enable live AI
   responses instead of demo-mode fallbacks.
4. Deploy — no other configuration needed for the demo-mode version.
