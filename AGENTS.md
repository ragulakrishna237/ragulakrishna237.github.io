# AGENTS.md

Maintain this personal portfolio. Public copy is first person.

## Priorities

1. Keep identity, headline, and facts identical across HTML, JSON-LD, and `llms.txt`.
2. Stay static. No SSR, endpoints at runtime, databases, or auth.
3. Prefer readable HTML over visual novelty. Recruiters and language models should parse the page without executing JavaScript.

## Site shape

- Astro at the repository root. `output: 'static'`.
- GitHub Pages for `https://ragulakrishna237.github.io/`.
- One source of truth for identity and handwritten work: `src/data/site.ts`.
- CI fetches public GitHub repos at build time (`scripts/sync-github-repos.mjs`) and appends unknown non-fork repos. Handwritten catalog wins. Featured flags stay in `site.ts`. The live site stays static HTML.
- Layouts only share document shell: metadata, nav, footer.

## Content

- Write all public copy in first person. Name is identity; biography is I / my.
- Write outcome-shaped project lines. Name the system, the constraint, and the proof.
- Do not invent employers, dates, or metrics.
- Do not add a LinkedIn or email URL unless it is confirmed.
- Keep navigation to Home and Work unless a new section has real content.
- Recruiter FAQs live on the homepage. Each public repo gets `/work/<slug>/`.

## UI

Follow better-ui: concentric radii, shadows for elevation, borders for structure, `scale(0.96)` on press, named transition properties, stagger only on first-load chunks, respect `prefers-reduced-motion`.
