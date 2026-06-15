# Node.js Tutorial Platform

A modern, mobile-first learning platform for Node.js tutorials built with React, Vite, TypeScript, and TailwindCSS.

## Features

- 📚 Tutorial modules with lessons organized by topic
- 🌍 Bilingual support (Spanish/English)
- 🌓 Dark mode support
- 📱 Mobile-first responsive design
- ⭐ Favorite lessons
- ✅ Progress tracking (localStorage)
- 🔍 Full-text search
- ⚡ Lightning-fast with Vite + React

## Tech Stack

- **Frontend:** React 19, Vite, TypeScript
- **Styling:** TailwindCSS, Framer Motion
- **State:** Zustand
- **i18n:** i18next
- **Routing:** React Router
- **Build:** Vite

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Server runs on `http://localhost:5173`

### Build

```bash
npm run build
```

Optimized production build in `dist/`

## Project Structure

```
src/
  components/     # Reusable React components
  pages/          # Page-level components
  hooks/          # Custom React hooks
  store/          # Zustand global state
  services/       # Business logic services
  data/           # Tutorial content (JSON)
  locales/        # i18n translations
  styles/         # Global styles
  types/          # TypeScript definitions
  utils/          # Utility functions
```

## Adding Tutorials

1. Create lesson JSON in `src/data/tutorials/modules/{module-id}/lessons/{lesson-id}.json`
2. Follow the Lesson type structure (see `src/types/index.ts`)
3. Include bilingual content (es/en)
4. App automatically discovers and loads new lessons

## Features

### Current (MVP)
- ✅ Browse tutorials by module
- ✅ View individual lessons with full content
- ✅ Mark lessons as completed
- ✅ Save favorite lessons
- ✅ Search lessons by title
- ✅ Switch between Spanish/English
- ✅ Toggle dark mode
- ✅ localStorage persistence for progress and favorites

### Future
- 🔄 User authentication
- 🔄 Cloud sync for progress
- 🔄 User comments/discussions
- 🔄 Video lessons
- 🔄 Interactive code sandboxes
- 🔄 Certificates/badges
- 🔄 CMS integration

## Development

### TypeScript

Strict mode enabled. Run type-checking:

```bash
npm run type-check
```

### Styling

Uses TailwindCSS with dark mode support. Custom colors and fonts configured in `tailwind.config.js`.

### State Management

Global state managed with Zustand in `src/store/tutorialStore.ts`. Components access state via hooks:
- `useTutorialStore()` — raw store access
- `useLanguage()` — language switching
- `useProgress()` — lesson completion tracking
- `useFavorites()` — favorite lesson management
- `useTutorials()` — tutorial data loading

### i18n

Translations in `src/locales/{lang}/translation.json`. Component usage:

```typescript
const { t } = useTranslation();
<h1>{t('home.title')}</h1>
```

## Performance

- Code splitting via Vite
- Lazy loading of modules
- Optimized Tailwind builds
- No unnecessary dependencies

## License

MIT
