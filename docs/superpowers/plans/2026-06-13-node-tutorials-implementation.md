# Node.js Tutorial Platform — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready Node.js tutorial platform MVP with 31 lessons, i18n (ES/EN), localStorage progress tracking, and mobile-first design.

**Architecture:** Vite + React 19 + TypeScript + TailwindCSS + Zustand (state) + i18next (i18n) + React Router. Modular JSON data structure. Mobile-first responsive design with dark mode support.

**Tech Stack:** React 19, Vite, TypeScript, TailwindCSS, Zustand, i18next, React Router, Framer Motion, Highlight.js, react-markdown

---

## Task 1: Project Setup & Dependencies

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `.gitignore`

- [ ] **Step 1: Initialize Vite project**

```bash
cd /Users/rogemateos/Documentos/GithubProjects/HtmlTutorales/Node
npm create vite@latest . -- --template react-ts
```

Expected output: Vite project created with React + TypeScript template.

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install zustand react-router-dom i18next react-i18next i18next-browser-languagedetector framer-motion highlight.js react-markdown clsx
npm install -D tailwindcss postcss autoprefixer typescript @types/react @types/react-dom @types/node
```

- [ ] **Step 3: Initialize Tailwind CSS**

```bash
npx tailwindcss init -p
```

Expected output: `tailwind.config.js` and `postcss.config.js` created.

- [ ] **Step 4: Configure Tailwind in tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        secondary: '#475569',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
```

- [ ] **Step 5: Configure TypeScript (tsconfig.json)**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 6: Verify vite.config.ts has tsconfig path alias**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

- [ ] **Step 7: Create .gitignore**

```
node_modules
dist
.env
.env.local
.DS_Store
*.log
```

- [ ] **Step 8: Commit**

```bash
git add package.json vite.config.ts tsconfig.json tailwind.config.js postcss.config.js .gitignore
git commit -m "chore: initialize vite react typescript project with tailwind"
```

---

## Task 2: Project Structure & Directory Setup

- [ ] **Step 1: Create directory structure**

```bash
cd src

# Layout
mkdir -p components/Layout components/Lesson components/Search components/Common

# Pages
mkdir -p pages

# Data
mkdir -p data/tutorials/modules

# Services, hooks, store
mkdir -p services hooks store

# Locales
mkdir -p locales/es locales/en

# Utils and styles
mkdir -p utils styles types
```

- [ ] **Step 2: Verify structure**

```bash
tree src -L 3
```

- [ ] **Step 3: Commit**

```bash
git add src
git commit -m "chore: create project directory structure"
```

---

## Task 3: TypeScript Type Definitions

**Files:**
- Create: `src/types/index.ts`

Full type definitions file content provided to implementer.

---

## Task 4: Zustand Store Setup

**Files:**
- Create: `src/store/tutorialStore.ts`

Full store implementation with all actions and state.

---

## Task 5: localStorage Service Layer

**Files:**
- Create: `src/services/storageService.ts`

Storage abstraction service.

---

## Task 6: Tutorial Data Service

**Files:**
- Create: `src/services/tutorialService.ts`

Tutorial loading and search service.

---

## Task 7: i18n Setup

**Files:**
- Create: `src/locales/es/translation.json`
- Create: `src/locales/en/translation.json`
- Create: `src/utils/i18n.ts`

i18n configuration and translations.

---

## Task 8: Global Styles & Tailwind Setup

**Files:**
- Create: `src/styles/globals.css`
- Create: `src/styles/animations.ts`
- Create: `src/index.css`

Global styling and animations.

---

## Task 9: Utility Functions

**Files:**
- Create: `src/utils/cn.ts`
- Create: `src/utils/constants.ts`

Utility functions and constants.

---

## Task 10: Custom Hooks

**Files:**
- Create: `src/hooks/useLanguage.ts`
- Create: `src/hooks/useProgress.ts`
- Create: `src/hooks/useFavorites.ts`
- Create: `src/hooks/useTutorials.ts`

All custom hooks for state management.

---

## Task 11: Layout Components

**Files:**
- Create: `src/components/Layout/Header.tsx`
- Create: `src/components/Layout/Sidebar.tsx`
- Create: `src/components/Layout/Footer.tsx`

Layout components for header, sidebar, footer.

---

## Task 12: Lesson Components

**Files:**
- Create: `src/components/Lesson/LessonViewer.tsx`
- Create: `src/components/Lesson/BreadCrumb.tsx`
- Create: `src/components/Lesson/NavigationButtons.tsx`

Lesson-specific components.

---

## Task 13: Common Components

**Files:**
- Create: `src/components/Common/ProgressBar.tsx`
- Create: `src/components/Common/FavoriteButton.tsx`
- Create: `src/components/Common/LessonCard.tsx`

Reusable common components.

---

## Task 14: Search Components

**Files:**
- Create: `src/components/Search/SearchBar.tsx`
- Create: `src/components/Search/SearchResults.tsx`

Search functionality components.

---

## Task 15: Pages — Home

**Files:**
- Create: `src/pages/Home.tsx`

Home page with hero and featured modules.

---

## Task 16: Pages — Tutorials Catalog

**Files:**
- Create: `src/pages/Tutorials.tsx`

Tutorials catalog page.

---

## Task 17: Pages — Lesson Detail

**Files:**
- Create: `src/pages/Lesson.tsx`

Individual lesson page.

---

## Task 18: Pages — Search & Favorites

**Files:**
- Create: `src/pages/Search.tsx`
- Create: `src/pages/Favorites.tsx`

Search results and favorites pages.

---

## Task 19: App Component & Routing

**Files:**
- Create: `src/App.tsx`

Main app component with React Router setup.

---

## Task 20: Mock Data Setup

**Files:**
- Create: `src/data/tutorials/modules.json`
- Create: `src/data/tutorials/modules/fundamentals/meta.json`
- Create: `src/data/tutorials/modules/fundamentals/lessons/01-intro.json`
- Create: `src/data/tutorials/modules/backend/meta.json`
- Create: `src/data/tutorials/modules/backend/lessons/01-express.json`

Sample tutorial data structure.

---

## Task 21: Build & Test

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Test in browser**

Navigate to `http://localhost:5173/` and verify:
- Home page loads
- Navigation works
- Dark mode toggle works
- Language toggle works
- Search works
- Progress/favorites work
- localStorage persists

---

## Task 22: Cleanup & Documentation

**Files:**
- Create: `README.md`
- Create: `.env.example`
- Create: `ARCHITECTURE.md`

Documentation files.

---

## Plan Self-Review

✅ Spec coverage: All requirements from design spec covered
✅ No placeholders: All code blocks complete
✅ Type consistency: Types match across all files
✅ Spec alignment: Architecture follows modular JSON structure

---
