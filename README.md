# ⚛️ React Concepts — Interactive Reference Guide

A single-page React application that teaches React concepts by **actually using them live**, not just showing code snippets. Every topic in the sidebar has a working, clickable demonstration built directly into the app.

## 🌐 Live Demo

🔗 **Live Website:** https://shahzebfaisal5649.github.io/React-Concepts/

🔗 **GitHub Repository:** https://github.com/ShahzebFaisal5649/React-Concepts

---

## 🚀 Features

* 23+ React concepts explained with live demonstrations
* Interactive examples instead of static code snippets
* React Router protected and public routes
* Context API for global state management
* Local Storage, Session Storage, and Cookies demos
* Fetch API and Axios examples
* React Hooks demonstrations
* Performance optimization examples
* Responsive dashboard-style UI
* Notes page with persistent storage
* Dark/Light theme support

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/ShahzebFaisal5649/React-Concepts.git

# Open project
cd React-Concepts

# Install dependencies
npm install

# Start development server
npm run dev
```

Open:

http://localhost:5173

---

## 🎯 Purpose

Most React learning resources explain concepts theoretically. This project focuses on **learning by interaction**. Every concept includes a practical demonstration so users can observe React behavior directly inside the application.

Whether you're a beginner learning React or someone revising concepts before interviews, this project serves as an interactive React reference guide.


## 📚 What It Teaches (23 Topics)

### Group 1 — React Fundamentals
| Topic | What You Will See |
|---|---|
| What is Reconciliation? | Open console → click topics → sidebar log never fires again |
| Virtual DOM vs Real DOM | Header render counter stays frozen when switching topics |
| Single Page Application | Network tab shows zero new document requests on navigation |
| Why React? | One `<TopicItem>` component renders 23+ times from a data array |

### Group 2 — Components
| Topic | What You Will See |
|---|---|
| React Components | Reuse a button component with different props side-by-side |
| Higher Order Components | `withLogger` HOC fires a console log on every topic mount |
| Stateless vs Stateful | Side-by-side: dumb badge reads props, smart counter holds state |
| Styled Components | Inspect button in DevTools → see auto-hashed class names |
| JSX vs JS Syntax | Two counters: one in JSX, one in `React.createElement()` — identical |
| JSX vs JS (compiled) | Side-by-side code blocks of source JSX and compiled JS output |

### Group 3 — Data Flow
| Topic                        | What You Will See                                             |
| ------------------------------| ---------------------------------------------------------------|
| Parent ↔ Child Communication | Child input updates parent state label in real-time           |
| What is State?               | Lightbulb switch toggles `true/false`, room changes instantly |
| What is Props?               | Slider sends size prop to child, child text resizes live      |

### Group 4 — Hooks
| Topic | What You Will See |
|---|---|
| What is a Hook? | Simulated rule-violation screen with the exact React error |
| Types of Hooks | Table linking every hook to the exact file it lives in |
| `useState` | Counter with +, −, and reset buttons |
| `useEffect` | Local tabs update the browser tab title dynamically |
| `useRef` | Click "Focus Field" button → input focused without re-render |
| `useCallback` | Toggle checkbox: child renders stop when callback is memoized |
| `useMemo` | Filter list logs only on search change, not unrelated clicks |
| `useContext` | Theme switcher and user profile — no prop drilling at all |

### Group 5 — Storage
| Topic | What You Will See |
|---|---|
| `localStorage` | Save text → refresh page → text is still there |
| `sessionStorage` | Save text → refresh → still there; close tab → gone |
| Cookie Storage | Set cookie → open DevTools Application → see it listed |
| Storage Comparison | Three boxes side-by-side; test all lifetimes live |

### Group 6 — Routing
| Topic | What You Will See |
|---|---|
| React Router DOM | URL changes on navigation; paste URL in new tab → opens same page |
| Public vs Private Routes | Log out → try `/notes` → redirected to login page |

### Group 7 — Dashboard Layout
| Topic | What You Will See |
|---|---|
| Dashboard Layout | Click wireframe segments to understand Header/Sidebar/Outlet roles |

### Group 8 — Performance & Networking
| Topic | What You Will See |
|---|---|
| Preload | Click button → Network tab shows high-priority image request instantly |
| Prefetch | Hover over zone → low-priority JSON request fires in Network tab |
| Preflight (CORS) | Click DELETE button → Network tab shows OPTIONS request before DELETE |
| Preload vs Prefetch vs Preflight | Side-by-side comparison cards |

### Group 9 — API Calls
| Topic | What You Will See |
|---|---|
| Fetch API | GET, POST, DELETE buttons to jsonplaceholder — response displayed |
| Axios | Same CRUD buttons — interceptor logs fire in console before each call |
| Fetch vs Axios (404) | Both hit a broken URL — Fetch resolves, Axios throws immediately |
| Axios + Preflight | Axios auth header triggers OPTIONS preflight in Network tab |

---

## 🗂️ Project Structure

```
src/
├── data/
│   └── topics.js               # All 23 topic definitions (summary, code, outcomes)
├── context/
│   ├── ThemeContext.jsx         # Global dark/light theme (stored in cookies)
│   └── UserContext.jsx          # Mock user fetched from jsonplaceholder API
├── hooks/
│   └── useLocalStorage.js       # Custom hook: syncs state ↔ localStorage
├── utils/
│   └── cookies.js               # setCookie / getCookie / deleteCookie helpers
├── services/
│   ├── axiosInstance.js         # Axios with baseURL, request/response interceptors
│   ├── axiosService.js          # GET, POST, PUT, PATCH, DELETE via Axios
│   └── fetchService.js          # GET, POST, PUT, PATCH, DELETE via native fetch
├── components/
│   ├── Header.jsx               # Top bar: search, theme toggle, user, render counter
│   ├── Sidebar.jsx              # Left nav: styled-components, React.memo, useLocation
│   ├── TopicPage.jsx            # Content viewer: withLogger HOC, useRef history
│   └── PrivateRoute.jsx         # Auth guard using <Navigate> and <Outlet>
└── pages/
    ├── LoginPage.jsx            # Fake login gate for the private route
    ├── NotesPage.jsx            # Protected study notebook (localStorage)
    └── topics/
        ├── Group1Fundamentals.jsx
        ├── Group2Components.jsx
        ├── Group3DataFlow.jsx
        ├── Group4Hooks.jsx
        ├── Group5Storage.jsx
        ├── Group6Routing.jsx
        ├── Group7Layout.jsx
        ├── Group8Performance.jsx
        └── Group9ApiCalls.jsx
```

---

## 🔑 Key Concepts Demonstrated Live In the App Itself

| Concept | Where to See It |
|---|---|
| `React.memo` | `Sidebar.jsx` — prevents re-render on unrelated state changes |
| `useCallback` | `App.jsx` — `handleTopicSelect` wrapped so Sidebar is stable |
| `useMemo` | `App.jsx` — topic filter only recalculates when search query changes |
| `useContext` | `Header.jsx`, `Sidebar.jsx` — read theme and user with no prop drilling |
| `useRef` | `Header.jsx` (render counter), `TopicPage.jsx` (previous topic), `/` key focus |
| `useEffect` cleanup | `Header.jsx` — removes keydown listener on unmount |
| `styled-components` | `Sidebar.jsx` — all sidebar elements use CSS-in-JS with auto-scoped classes |
| `AbortController` | `UserContext.jsx` — cancels in-flight fetch on component unmount |
| HOC pattern | `TopicPage.jsx` — `withLogger(RawTopicPage)` wraps page before export |
| Private routing | `App.jsx` + `PrivateRoute.jsx` — `/notes` redirects to `/login` if logged out |
| Cookie persistence | `ThemeContext.jsx` — theme preference stored with 7-day expiry |
| Session persistence | `Header.jsx` — search query survives page refresh via `sessionStorage` |
| LocalStorage persistence | `App.jsx` — last visited topic restored on reload via `useLocalStorage` hook |

---

## 🧪 Manual Verification Checklist

Open the app and work through these checks:

- [ ] **Console:** Open DevTools, clear logs, navigate topics → `Sidebar Component Rendered!` fires only **once** per search change, not on every topic click
- [ ] **Header render counter:** Click topics → counter stays **frozen**; toggle theme → counter increments by 1
- [ ] **`/` key shortcut:** Press `/` from anywhere → search bar auto-focuses
- [ ] **Reading history:** Click Topic A, then Topic B → bottom of Topic B shows _"Previously reading: [A]"_
- [ ] **Theme cookie:** Toggle theme → DevTools → Application → Cookies → see `app_theme` cookie
- [ ] **Private route:** Log out → visit `/notes` → redirected to `/login`; log in → `/notes` loads
- [ ] **localStorage restore:** Select a topic → refresh page → same topic opens automatically
- [ ] **sessionStorage search:** Type in search → refresh page (F5) → search text remains; close tab → text gone
- [ ] **Preflight:** Group 8 → click "Trigger Complex DELETE" → Network tab shows OPTIONS before DELETE
- [ ] **Axios interceptor:** Group 9 → click any Axios button → console shows `[Axios Request Interceptor]` log

---

## 📦 Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^19 | UI library |
| `react-dom` | ^19 | DOM rendering |
| `react-router-dom` | ^7 | SPA routing, URL matching |
| `axios` | ^1 | HTTP client with interceptors |
| `styled-components` | ^6 | CSS-in-JS scoped styling |
| `vite` | ^8 | Build tool and dev server |

---

## 💡 Code Style Notes

This codebase is intentionally written in **student style**:
- Simple variable names — no clever abstractions
- Short comments explaining **why**, not just what
- Small focused functions rather than long chains
- No one-liners — everything written the long, readable way
- Patterns a beginner can follow without prior React experience

---

## 🌐 External APIs Used

- **[JSONPlaceholder](https://jsonplaceholder.typicode.com)** — Free fake REST API for demos. No API key required.
  - `GET /users/1` — Loads mock user profile into `UserContext`
  - `GET /posts/1` — Used in Fetch & Axios demo panels
  - `POST /posts` — Create demo
  - `DELETE /posts/1` — Triggers CORS preflight demo
