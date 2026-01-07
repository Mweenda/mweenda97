# mweenda97 Development Guidelines

## Project Overview
mweenda97 is a professional portfolio for Christopher Kawanga built as a lead-generation engine. It showcases expertise in AI, Full-Stack Development, and Network Security (CCNA).

## Tech Stack
- **Monorepo:** PNPM + Turborepo
- **Frontend:** React + Vite + Tailwind CSS + Shadcn/UI
- **Backend:** Firebase Cloud Functions + tRPC
- **Database:** Firestore with Principle-of-Least-Privilege security
- **API:** tRPC with end-to-end type safety
- **Validation:** Zod schemas (shared across frontend & backend)
- **Testing:** Vitest (unit) + Playwright (E2E)
- **Styling:** Tailwind CSS + Framer Motion

## Core Values
1. **Type Safety:** `strict: true` in tsconfig.json, no `any` types allowed
2. **Accessibility:** 100% keyboard navigable with Radix UI + Shadcn/UI
3. **Performance:** Target Lighthouse scores of 90+
4. **Lead Generation:** Primary CTA is "Download Technical CV", Secondary CTA is "View AI Lab"
5. **Zero-Regression Policy:** All PRs must pass lint, format, and test gates

## Project Structure
```
mweenda97/
├── apps/
│   ├── web/          # React + Vite frontend
│   └── functions/    # Firebase Cloud Functions backend
├── packages/
│   ├── api/          # Shared tRPC router & procedures
│   ├── db/           # Shared Zod schemas & validation
│   ├── ui/           # Shared UI components (Shadcn/UI)
│   └── config/       # Shared ESLint, Prettier, TSConfig
└── [config files]    # Root turbo.json, tsconfig.json, etc.
```

## Development Workflow

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm dev          # Start all apps in dev mode
pnpm build        # Build all packages
pnpm lint         # Run linters across monorepo
pnpm format       # Format code with Prettier
pnpm type-check   # TypeScript type checking
pnpm test         # Run unit tests
pnpm test:e2e     # Run E2E tests
```

## Key Features to Implement
1. **Bento-Box Project Grid** - Motion-enhanced grid with Framer Motion
2. **Interactive Terminal** - Cisco CLI-style React component
3. **AI Project Deep-Dive** - Live Gemini API playground
4. **Lead Magnet** - Gated technical content (PDF downloads)
5. **Infrastructure Map** - Visual hosting architecture diagram
6. **CI/CD Pipeline** - Automated testing on GitHub Actions

## Coding Standards
- Always use TypeScript with strict mode enabled
- No `any` types—use proper type definitions
- Use Zod for all schema validation
- All public APIs must be typed
- All components must be accessible (ARIA labels, keyboard navigation)
- Format code with Prettier before committing
- Add tests for all features (unit + E2E)

## Current Checklist
- [ ] Verify root-level configuration files created
- [ ] Scaffold packages/db with Zod schemas
- [ ] Scaffold packages/api with tRPC setup
- [ ] Scaffold packages/ui with Shadcn/UI
- [ ] Scaffold packages/config with shared ESLint/Prettier
- [ ] Scaffold apps/web with React + Vite
- [ ] Scaffold apps/functions with Firebase Cloud Functions
- [ ] Set up CI/CD pipeline
- [ ] Implement Interactive Terminal component
- [ ] Implement Bento-Box Project Grid
- [ ] Implement Lead Magnet flow
- [ ] Implement AI Deep-Dive playground
