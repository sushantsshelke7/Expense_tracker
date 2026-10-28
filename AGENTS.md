# Agent guide

## Stack and layout
- React 19, Vite, JavaScript, Vitest, React Testing Library, and Cypress.
- `src/App.jsx` owns application state; `src/components/` contains one component per file; `src/lib/` contains pure logic.
- `cypress/e2e/` contains browser journeys.

## Commands
- Install: `npm install`
- Run locally: `npm run dev`
- Production build: `npm run build`
- Unit/component tests: `npx vitest run`
- Coverage: `npx vitest run --coverage`
- Cypress: `npm run cy:open` or `npm run cy:run` (start `npm run dev` first).

## Conventions
- Keep shared application state in `App` and pass values/handlers as props.
- Use one component per file. Add a short component comment describing its props and state contract.
- No new dependencies without asking first.
- Work on a branch, never directly on `main`. Summarize changes and verification in the PR.
- Prefer semantic HTML and stable `data-cy` selectors for end-to-end tests.
