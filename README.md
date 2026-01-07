# mweenda97 - Professional Portfolio & Lead Generation Engine

A production-grade portfolio for **Christopher Kawanga** showcasing expertise in **AI**, **Full-Stack Development**, and **Network Security (CCNA)**.

## 🎯 Strategic Vision

mweenda97 is designed as a **high-conversion lead generation engine** that moves beyond a static resume site. It captures recruiter interest through:

- **Lead Magnet:** Gated technical content (Network Security Audit Checklist, Gemini API Integration Guide)
- **Value Proposition:** "Bridging the gap between secure network infrastructure and AI-driven software solutions"
- **Primary CTA:** Download Technical CV
- **Secondary CTA:** View AI Lab

## 🏗️ Architecture

**Monorepo Structure:** PNPM + Turborepo for scalability and shared type safety.

```
mweenda97/
├── apps/
│   ├── web/          # React + Vite frontend (Lighthouse 90+)
│   └── functions/    # Firebase Cloud Functions backend
├── packages/
│   ├── api/          # Shared tRPC router & procedures
│   ├── db/           # Shared Zod schemas & validation
│   ├── ui/           # Shadcn/UI components
│   └── config/       # Shared ESLint, Prettier, TSConfig
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + Vite + Tailwind CSS + Shadcn/UI |
| **API** | tRPC with end-to-end type safety |
| **Backend** | Firebase Cloud Functions |
| **Database** | Firestore (Principle-of-Least-Privilege) |
| **Validation** | Zod (shared schemas) |
| **Testing** | Vitest (unit) + Playwright (E2E) |
| **Animation** | Framer Motion |
| **Styling** | Tailwind CSS + CVA (Class Variance Authority) |

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- PNPM 9.0+

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev          # Start all apps in dev mode (web + functions emulator)
pnpm build        # Build all packages
pnpm lint         # Run linters
pnpm format       # Format code with Prettier
pnpm type-check   # TypeScript validation
pnpm test         # Run unit tests
pnpm test:e2e     # Run E2E tests
```

## 📋 Features Roadmap

### Phase 1: Foundation ✅
- [x] Monorepo setup (PNPM + Turborepo)
- [x] Root configuration (tsconfig, ESLint, Prettier)
- [x] Zod schema validation (`@mweenda97/db`)
- [x] tRPC API setup (`@mweenda97/api`)
- [x] UI components foundation (`@mweenda97/ui`)
- [x] React + Vite frontend scaffold (`apps/web`)
- [x] Firebase Cloud Functions scaffold (`apps/functions`)

### Phase 2: Core Features
- [ ] **Bento-Box Project Grid** - Motion-enhanced grid with Framer Motion
- [ ] **Interactive Terminal** - Cisco CLI-style React component
- [ ] **Lead Magnet Flow** - Email capture + PDF download
- [ ] **AI Project Deep-Dive** - Live Gemini API playground
- [ ] **Infrastructure Map** - Visual hosting architecture diagram
- [ ] **Blog Section** - Technical articles with Firestore CMS

### Phase 3: Polish & DevX
- [ ] E2E tests with Playwright
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Firebase security rules
- [ ] Analytics & PostHog integration
- [ ] Lighthouse optimization (90+ score)
- [ ] Performance monitoring

## 🔐 Security & Quality

1. **Type Safety:** `strict: true` in TypeScript
2. **No `any` types** - Strict linting rules enforced
3. **Firestore Security Rules** - Principle-of-least-privilege
4. **Zero-Regression Policy** - All PRs must pass lint, format, and test gates
5. **Accessibility (a11y)** - 100% keyboard navigable with ARIA compliance

## 📊 Success Metrics

- **Lighthouse Score:** 90+ (Performance, Accessibility, Best Practices, SEO)
- **Lead Conversion Rate:** Track "Time to CTA Click" and "PDF Downloads"
- **Performance:** <1s Time-to-Interactive on desktop, <3s on mobile

## 🔧 Configuration Files

- `tsconfig.json` - Root TypeScript configuration (strict mode)
- `turbo.json` - Turborepo pipeline configuration with remote caching
- `.eslintrc.json` - Monorepo-wide linting rules
- `.prettierrc.json` - Code formatting standards
- `.firebaserc` - Firebase project configuration
- `pnpm-workspace.yaml` - PNPM workspace declaration

## 📝 Development Guidelines

### Adding a Feature

1. **Type definitions** - Add Zod schema to `packages/db`
2. **API procedures** - Add tRPC router to `packages/api`
3. **UI components** - Create components in `packages/ui`
4. **Integration** - Wire up in `apps/web` or `apps/functions`
5. **Tests** - Unit tests in Vitest, E2E tests in Playwright
6. **Lint & Format** - Run `pnpm lint && pnpm format`

### Commit Standards

- No commits with TypeScript errors
- All files must pass Prettier formatting
- Meaningful commit messages describing the change

## 📚 Resources

- [tRPC Documentation](https://trpc.io)
- [Shadcn/UI Components](https://ui.shadcn.com)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Firebase Cloud Functions](https://firebase.google.com/docs/functions)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/start)

## 📧 Contact & Lead Generation

**Primary CTA:** [Download Technical CV](/cv.pdf)  
**Secondary CTA:** [View AI Lab](/ai-lab)  
**Email:** contact@christopherkawanga.com

---

**Built with production-grade engineering standards for Christopher Kawanga's professional portfolio.**
