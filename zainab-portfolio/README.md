# Zainab Muneer Portfolio (React + Vite + TS + GSAP)
```
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```
- Edit all content in `src/data.ts` (email, projects, links). Add your photo to `public/` and replace the `.frame` block in `src/App.tsx`.
- Contact form validates but sends nothing. To deliver messages, create a Formspree form (or EmailJS) and `fetch()` POST the values inside `submit` in `src/components/Contact.tsx`.
- Animations use `gsap.context`/`matchMedia`, are cleaned up on unmount, respect reduced motion, and the pinned project sequence runs only at 900px and wider.
