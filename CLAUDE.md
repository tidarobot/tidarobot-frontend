# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TidaroBotFrontend is an Angular 21 SPA for the TidaroBot system — a parking reservation automation tool for the Tidaro platform. It communicates with the Spring Boot REST API backend (see `../tidaroBot/CLAUDE.md` for backend details).

Key user flows:
- Register with Tidaro credentials (stored for bot automation), await admin approval
- Login → dashboard with reservations, profile, stats
- Admin panel for approving/rejecting PENDING users

---

## Commands

```bash
ng serve          # dev server at http://localhost:4200 (hot reload)
ng build          # production build → dist/
ng test           # run tests with Vitest
ng generate component pages/<name>/<name>   # scaffold new page
```

---

## Architecture

### Standalone Components (no NgModules)

All components are standalone. The `MaterialModule` in `shared/material/` is a legacy leftover — do **not** use it. Import Angular Material modules directly in each component's `imports` array.

### Routing & Lazy Loading

`app.routes.ts` defines all routes. Every page uses `loadComponent()` for lazy loading. Route guards are not yet implemented — all routes are currently open.

```
''         → MainPage (dashboard layout)
'login'    → Login
'register' → Register
'**'       → redirects to ''
```

### Core Layer (`src/app/core/`)

| File | Purpose |
|---|---|
| `services/auth.ts` | `login()` / `register()` — returns `Observable<AuthResponse>` |
| `interceptors/auth.ts` | `HttpInterceptorFn` — reads JWT from `localStorage` and attaches `Authorization: Bearer` header to every request |
| `models/auth-response.ts` | `{ token: string }` |

The interceptor is registered in `app.config.ts` via `withInterceptors([authInterceptor])`.

### API (`src/app/shared/api-endpoints.ts`)

Base URL is hardcoded to `http://localhost:8080/api`. All endpoint paths live here — update this file when adding new backend calls, not inline in services.

### Styling

- `src/styles.scss` — global styles: animated gradient auth background, glassmorphism auth card, Material theme color overrides for auth pages
- `src/material-theme.scss` — Angular Material custom theme (cyan primary, orange tertiary, light scheme)
- Component `.css` files contain layout-specific rules; auth page styles are intentionally in the global file so both login and register share them

---

## Backend Contract (relevant to frontend)

See `../tidaroBot/CLAUDE.md` for full API reference. Key points:

- All non-auth requests require `Authorization: Bearer <token>` (handled by the interceptor)
- New users start as `PENDING` — they can register and get a token but **cannot log in** until an admin approves them (`status == APPROVED` enables the account)
- `POST /auth/register` accepts: `username`, `email`, `password`, `loginTidaro`, `passwordTidaro`
- `POST /auth/login` returns `{ token }` only when account is APPROVED
- Parking floors: `MINUS_1`, `MINUS_2`, `OUTDOOR`; cities: `CRACOW`, `WARSAW` (Warsaw not yet implemented in backend)

---

## Known Gaps / TODOs

- No route guards — authenticated routes are unprotected on the frontend
- No token refresh logic; token TTL is 24 h (set in backend)
- No environment files; API base URL is hardcoded in `api-endpoints.ts`
- Admin panel page does not exist yet (sidenav link is a placeholder)
- Reservations and Profile pages do not exist yet (dashboard cards are placeholders)
- Stats page not yet implemented