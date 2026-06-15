# Node.js Tutorial Platform — Design Specification

**Date:** 2026-06-13  
**Status:** Design Approved  
**Scope:** MVP with 31 lessons across multiple modules, i18n (ES/EN), localStorage progress tracking

---

## Goal

Build a modern, mobile-first learning platform for Node.js tutorials. Professional, clean design inspired by freeCodeCamp, JavaScript.info, and Raycast. Scalable architecture to grow from 31 lessons to hundreds without refactor.

## Tech Stack

- **Frontend:** React 19 + Vite + TypeScript
- **State:** Zustand (global state + localStorage persistence)
- **Styling:** TailwindCSS + Framer Motion (animations)
- **Routing:** React Router (hash-based)
- **i18n:** i18next for ES/EN support
- **Code Highlighting:** Highlight.js + react-markdown

---

## Architecture

### Folder Structure

```
src/
  components/
    Layout/
      Header.tsx              ← Navigation, language toggle, theme switch
      Sidebar.tsx             ← Module/lesson tree with progress indicators
      Footer.tsx
    Lesson/
      LessonViewer.tsx        ← Main lesson content renderer
      BreadCrumb.tsx          ← Navigation path
      NavigationButtons.tsx   ← Previous/Next lesson
    Search/
      SearchBar.tsx           ← Global search (header)
      SearchResults.tsx       ← Search results page
    Common/
      ProgressBar.tsx         ← User progress visualization
      FavoriteButton.tsx      ← Toggle favorite status
      LessonCard.tsx          ← Lesson card in catalog

  pages/
    Home.tsx                  ← Landing page with highlights
    Tutorials.tsx             ← Full catalog (all modules/lessons)
    Lesson.tsx                ← Individual lesson view
    Search.tsx                ← Search results page
    Favorites.tsx             ← User's favorite lessons

  data/
    tutorials/
      modules.json            ← List of all modules with metadata
      modules/
        fundamentals/
          meta.json           ← Module metadata (title, description, order)
          lessons/
            01-intro.json
            02-async.json
            ...
        backend/
          meta.json
          lessons/
            01-express.json
            ...

  hooks/
    useLanguage.ts            ← i18n language switching
    useProgress.ts            ← Read/write progress from localStorage
    useFavorites.ts           ← Manage favorites
    useTutorials.ts           ← Load and structure tutorials

  services/
    tutorialService.ts        ← Logic to load/parse tutorials
    storageService.ts         ← localStorage abstraction (progress, favorites)

  store/
    tutorialStore.ts          ← Zustand global store

  locales/
    es/translation.json       ← UI strings (Spanish)
    en/translation.json       ← UI strings (English)

  styles/
    globals.css               ← Tailwind base + custom variables
    animations.ts             ← Framer Motion animation definitions
```

### Data Structure

#### `modules.json`

```json
{
  "modules": [
    {
      "id": "fundamentals",
      "order": 1,
      "es": {
        "title": "Fundamentos de Node.js",
        "description": "Aprende lo básico"
      },
      "en": {
        "title": "Node.js Fundamentals",
        "description": "Learn the basics"
      }
    },
    {
      "id": "backend",
      "order": 2,
      "es": {
        "title": "Backend con Node.js y Express",
        "description": "Crea servidores web"
      },
      "en": {
        "title": "Backend with Node.js and Express",
        "description": "Build web servers"
      }
    }
  ]
}
```

#### `modules/{module-id}/meta.json`

```json
{
  "id": "fundamentals",
  "lessonCount": 8
}
```

#### `modules/{module-id}/lessons/{lesson-id}.json`

```json
{
  "id": "01-intro",
  "type": "lesson",
  "order": 1,
  "es": {
    "title": "Introducción a Node.js",
    "sections": [
      {
        "type": "introduction",
        "content": "<h2>¿Qué es Node.js?</h2><p>...</p>"
      },
      {
        "type": "learning-goals",
        "content": "<ul><li>...</li></ul>"
      },
      {
        "type": "explanation",
        "content": "<h2>Explicación</h2><p>...</p>"
      },
      {
        "type": "examples",
        "content": "<pre><code>...</code></pre>"
      },
      {
        "type": "best-practices",
        "content": "<h2>Buenas prácticas</h2><ul>...</ul>"
      },
      {
        "type": "common-mistakes",
        "content": "<h2>Errores comunes</h2><ul>...</ul>"
      },
      {
        "type": "exercise",
        "content": "<h2>Ejercicio</h2><p>...</p>"
      },
      {
        "type": "solution",
        "content": "<pre><code>...</code></pre>"
      },
      {
        "type": "summary",
        "content": "<h2>Resumen</h2><ul>...</ul>"
      },
      {
        "type": "resources",
        "content": "<h2>Recursos</h2><ul><li><a href='...'>...</a></li></ul>"
      }
    ]
  },
  "en": {
    "title": "Introduction to Node.js",
    "sections": [...]
  }
}
```

**Exam lessons** (optional `type: "exam"`):
```json
{
  "id": "exam-fundamentals",
  "type": "exam",
  "order": 9,
  "es": {
    "title": "Examen: Fundamentos de Node.js",
    "sections": [
      {
        "type": "questions",
        "content": "<div class='questions'>...</div>"
      }
    ]
  },
  "en": {...}
}
```

---

## Component Behavior

### Layout Structure

```
┌─────────────────────────────────────────────┐
│ Header (Logo, Search, Language, Theme)       │
├──────────────────┬──────────────────────────┤
│                  │                           │
│  Sidebar         │  Content Area             │
│  (Modules/       │  (Lesson or Page)         │
│   Lessons)       │                           │
│                  │                           │
│                  │                           │
└──────────────────┴──────────────────────────┘
```

**Responsive:**
- Desktop: Sidebar always visible
- Tablet: Sidebar collapsible via hamburger
- Mobile: Sidebar hidden by default, swipe to open

### Zustand Store

```typescript
interface TutorialStore {
  // Data
  tutorials: Module[];
  language: 'es' | 'en';
  currentLesson: Lesson | null;

  // User state (persisted to localStorage)
  progress: Record<string, boolean>;     // { "lesson-id": true/false }
  favorites: string[];                   // ["lesson-id-1", "lesson-id-2"]

  // Actions
  setTutorials: (tutorials: Module[]) => void;
  setLanguage: (lang: 'es' | 'en') => void;
  setCurrentLesson: (lesson: Lesson) => void;
  toggleProgress: (lessonId: string) => void;
  toggleFavorite: (lessonId: string) => void;
  loadFromStorage: () => void;
  saveToStorage: () => void;
}
```

### Data Flow

**On App Start:**
```
App.tsx
  → useEffect: loadFromStorage() (restore progress/favorites)
  → useEffect: loadTutorials() (fetch modules.json + structure)
  → Zustand store populated
  → Components re-render with data
```

**On Language Change:**
```
Header: Language toggle → setLanguage('en')
  → Zustand language state updates
  → All components re-render with new language content
  → localStorage updated
```

**On Navigate to Lesson:**
```
URL: /lesson/fundamentals/01-intro
  → Router extracts module ID + lesson ID
  → Load lesson JSON from src/data/tutorials/modules/{module}/lessons/{lesson}.json
  → setCurrentLesson(lesson)
  → LessonViewer renders content from lesson.en or lesson.es
```

**On Toggle Progress/Favorite:**
```
User clicks checkbox or favorite button
  → toggleProgress(lessonId) or toggleFavorite(lessonId)
  → Zustand state updates (UI reflects immediately)
  → saveToStorage() persists to localStorage
```

### Pages

#### Home
- Hero section with title "Aprende Node.js"
- Search bar (with focus)
- Grid of featured modules (4-6 cards)
- User stats (if progress exists): "3 lecciones completadas", "2 favoritos"
- Call-to-action: "Ver todos los tutoriales"

#### Tutorials (Catalog)
- Full sidebar visible (all modules/lessons)
- Main area shows all lessons grid (or list)
- Each card: title, module, difficulty (future), progress indicator

#### Lesson
- Breadcrumb: Home > Module > Lesson
- Sidebar visible (highlight current lesson)
- Main content: LessonViewer (renders lesson sections)
- Right sidebar (future): Table of contents or related lessons
- Bottom buttons: Previous Lesson | Next Lesson
- Buttons: ⭐ Favorite | ✓ Completado

#### Search
- Query in header search box
- Results: lessons matching query (by title + content)
- Filters: by module, difficulty (future)
- No results state: "No encontramos lecciones"

#### Favorites
- List/grid of favorite lessons only
- Empty state: "No tienes favoritos aún"

---

## Features (MVP)

### Implemented
- ✅ Home page with highlights
- ✅ Tutorials catalog (all modules/lessons)
- ✅ Individual lesson view (full content)
- ✅ i18n (ES/EN) for lessons + UI strings
- ✅ Language switcher (Header)
- ✅ Dark/Light theme toggle (Header)
- ✅ Progress tracking (localStorage)
- ✅ Favorites (localStorage)
- ✅ Search (by title)
- ✅ Sidebar navigation with progress indicators
- ✅ Previous/Next lesson buttons
- ✅ Breadcrumb navigation
- ✅ Mobile-first responsive design
- ✅ Smooth animations (Framer Motion)

### Future (Post-MVP)
- Backend authentication + cloud progress sync
- User comments on lessons
- Personal notes per lesson
- Advanced search (filters, difficulty)
- CMS integration (Contentful, Sanity)
- Code sandbox / interactive examples
- Video lessons
- Certificates/badges

---

## Design Principles

### Mobile First
- Every component works perfectly on 320px+ screens
- Desktop features progressive enhancement

### Performance
- Lazy load lesson content (not all lessons at once)
- Code splitting by route
- Images optimized (future)
- No unnecessary re-renders (Zustand selectors)

### Accessibility
- Semantic HTML (h1, h2, nav, article, etc.)
- ARIA labels where needed
- Keyboard navigation (tabs, enter, arrows)
- Color contrast WCAG AA

### Code Quality
- TypeScript strict mode
- Components small and focused (single responsibility)
- Custom hooks for logic reuse
- No prop drilling (Zustand for state)
- DRY: reusable utility functions

---

## File Convention

**Naming:**
- Files: camelCase (e.g., `tutorialStore.ts`, `useTutorials.ts`)
- Components: PascalCase (e.g., `LessonViewer.tsx`)
- JSON: kebab-case IDs (e.g., `01-intro.json`, `fundamentals`)

**Imports:**
```typescript
// External libraries first
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Zustand/hooks
import useTutorialStore from '@/store/tutorialStore';
import useLanguage from '@/hooks/useLanguage';

// Components
import LessonViewer from '@/components/Lesson/LessonViewer';

// Utilities
import { parseMarkdown } from '@/utils/markdown';

// Styles
import '@/styles/globals.css';
```

---

## Scope Boundaries

**In Scope (MVP):**
- Rendering tutorials from JSON
- Navigation and search
- Basic progress tracking (localStorage)
- i18n for 2 languages
- Mobile-first responsive design

**Out of Scope (Future):**
- User authentication
- Backend database
- Comments/discussions
- Video content
- Advanced analytics
- Third-party integrations

---

## Success Criteria

- ✅ All 31 lessons load and display correctly (ES/EN)
- ✅ Navigation works smoothly (no lag)
- ✅ Progress/favorites persist across sessions
- ✅ Mobile view perfect on iPhone 12 and up
- ✅ Language switch instant (no page reload)
- ✅ Search finds lessons by title
- ✅ Code blocks styled with syntax highlight
- ✅ Dark mode looks professional
- ✅ TypeScript strict mode passes
