# Portfolio Web Application

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/) [![Vite](https://img.shields.io/badge/Vite-5.1.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/) [![MUI](https://img.shields.io/badge/MUI-5.15.12-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)

Personal portfolio site for Abigail Ranson. Single-page React app with anchor-based navigation, built with Vite and Material UI.

## Stack

- **React 18** with hooks (`useState`, `useMemo`, `useEffect`)
- **Vite 5** — build tooling and dev server (proxies `/api` to `localhost:8080`)
- **MUI 5** — component library and theming (`@mui/material`, `@mui/icons-material`)
- **react-final-form** — contact form state and validation
- **react-intersection-observer** — scroll-driven nav highlight
- **Firebase Hosting** — production deployment via `firebase.json`

## Prerequisites

- Node.js (LTS version recommended)
- npm

## Installation

```bash
git clone https://github.com/ranson21/portfolio-web
cd portfolio-web/apps/web/portfolio
npm install
```

## Development

```bash
npm run dev
```

Opens the app at `http://localhost:5173`. API calls to `/api/*` are proxied to `http://localhost:8080` (see `vite.config.js`).

## Build

```bash
npm run build
```

Output goes to `dist/`. Firebase Hosting serves from `dist/` per `firebase.json`.

```bash
npm run preview   # preview the production build locally
```

## Linting

```bash
npm run lint
```

Uses ESLint with `--max-warnings 0` — zero warnings allowed.

## Project Structure

```
apps/web/portfolio/
├── src/
│   ├── components/     # Shared UI components (AppBar, FormControls, etc.)
│   ├── containers/     # Layout wrappers (Screen)
│   ├── content/        # All copy and data (portfolioContent.js)
│   ├── screens/        # Page-level components (Home, About, Projects, Contact)
│   ├── styles/         # MUI theme and shared style utilities
│   ├── utils/          # Validator and helpers
│   └── index.jsx       # App entry point
├── public/             # Static assets (img/, docs/, robots.txt, etc.)
├── index.html          # HTML shell with meta/SEO tags
├── firebase.json       # Firebase Hosting config
└── vite.config.js      # Vite config with path aliases and proxy
```

## Environment Variables

Create a `.env` file at the app root:

```env
VITE_APP_API=http://localhost:8080/api/contact_me
```

The contact form POST target is read from `VITE_APP_API` at runtime.

## Deployment

Hosted on Firebase Hosting (Google Cloud). All routes rewrite to `/index.html` for SPA navigation.

```bash
firebase login
firebase deploy --only hosting
```

## Author

Abigail Ranson — [abbyranson.com](https://abbyranson.com) · [@ranson21](https://github.com/ranson21)
