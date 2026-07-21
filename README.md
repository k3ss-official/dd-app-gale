# dd-app-gale

Interactive V2 field-operations prototype for Donkey Dumpster, a junk-removal business serving Columbus, Ohio.

This pass is built around the owner’s stated operational pain: scheduling crews and making sure every job is properly completed. It includes a responsive dispatch board, job-status workflow, crew view, quick job entry, completion checklist, and a shareable feedback flow.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Production build

```bash
npm run build
```

## Prototype boundary

All jobs, customers, addresses, prices, and crew assignments are sample data. Nothing is transmitted or persisted. A production release should connect authenticated staff accounts, durable job storage, photo uploads, route/map services, SMS, payments, and role-based permissions.

Brand artwork and fleet imagery in `public/brand/` are sourced from Donkey Dumpster’s public website for this business prototype.
