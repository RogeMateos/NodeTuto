# Architecture Document

## Overview

Node.js Tutorial Platform is a frontend-only React app for learning Node.js. It uses client-side state management and localStorage for persistence.

## State Management

### Zustand Store (`src/store/tutorialStore.ts`)

Global state for:
- `tutorials` — Loaded modules and lessons
- `language` — Current language (es/en)
- `currentLesson` — Active lesson being viewed
- `searchQuery` — Current search text
- `progress` — Completed lessons: `{ lessonId: boolean }`
- `favorites` — Favorite lesson IDs: `string[]`

Actions automatically persist progress and favorites to localStorage.

## Data Flow

### Tutorial Loading

1. `useTutorials()` hook calls `tutorialService.loadModules()`
2. `loadModules()` loads `modules.json` metadata
3. For each module, `loadLessons(moduleId)` is called
4. Lessons are hydrated into `module.lessons` array
5. Store updated with full module tree
6. Components re-render with data

### Language Switching

1. User clicks language toggle in Header
2. `useLanguage().change()` called
3. i18next language changed
4. Zustand store updated
5. Components re-render with new language

### Progress/Favorites

1. User clicks completion button or favorite button
2. Hook calls `toggleProgress()` or `toggleFavorite()`
3. Zustand updates state
4. `saveToStorage()` auto-called
5. localStorage updated
6. Components re-render

## Directory Structure

```
src/
├── components/
│   ├── Layout/        # Header, Sidebar, Footer
│   ├── Lesson/        # LessonViewer, BreadCrumb, NavigationButtons
│   ├── Search/        # SearchBar, SearchResults
│   └── Common/        # ProgressBar, FavoriteButton, LessonCard
├── pages/             # Route-level components
├── hooks/             # Custom React hooks (useLanguage, useProgress, etc.)
├── store/             # Zustand store
├── services/          # tutorialService, storageService
├── data/
│   └── tutorials/     # JSON tutorial data
├── locales/           # i18n translation files
├── types/             # TypeScript interfaces
├── utils/             # Utility functions (cn, constants, i18n config)
└── styles/            # Global CSS and animations
```

## Key Decisions

### Why Zustand over Redux?
- Simpler API for MVP
- Less boilerplate
- Smaller bundle size
- Easy to add later without major refactor

### Why localStorage over IndexedDB?
- MVP doesn't need large storage
- Simpler to implement
- localStorage sufficient for progress/favorites
- Can migrate to backend sync later

### Why Vite over Create React App?
- Faster dev server
- Faster builds
- Native ES modules
- Better DX

## Future Improvements

### Backend Authentication
Add authentication layer:
- Login page
- Session management
- Cloud progress sync

### CMS Integration
Replace static JSON with:
- Contentful API
- Sanity CMS
- Custom headless CMS

### Analytics
Track:
- Lesson completion rates
- Time spent per lesson
- Search queries
- Popular topics

### Interactive Features
Add:
- Code sandbox for lessons
- Live quiz questions
- Video embedding
- Discussion comments

## Performance Considerations

1. **Code Splitting** — Each page lazy-loaded via React Router
2. **Bundle Size** — Minimal dependencies (Zustand is tiny)
3. **Rendering** — useCallback memoization on frequently accessed hooks
4. **localStorage** — All data fits comfortably (progress + favorites < 1KB)

## Security Notes

- All content is public (no auth required for MVP)
- No sensitive data stored locally
- localStorage is HTTP-only by default
- No API calls to untrusted sources

## Testing Strategy

For future:
- Unit tests on hooks (`useProgress`, `useFavorites`, etc.)
- Integration tests on components
- E2E tests with Cypress
- Lighthouse audits for performance
