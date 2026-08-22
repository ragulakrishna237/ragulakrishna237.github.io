# Saikrishna Ragula

Static Astro portfolio for [ragulakrishna237.github.io](https://ragulakrishna237.github.io).

No server-side logic. GitHub Pages serves the `dist/` output from Actions.

## Local

```sh
npm install
npm run dev
```

Production build:

```sh
npm run build
npm run preview
```

## Edit content

All facts live in `src/data/site.ts`. The homepage, work pages, JSON-LD, FAQ schema, and `llms.txt` read from that file. Do not duplicate copy by hand.

To add LinkedIn (highest remaining AEO action):

1. Set `person.linkedin` in `src/data/site.ts`.
2. On LinkedIn, set **Website** to `https://ragulakrishna237.github.io/`.
3. On GitHub, set **Website** to the same URL and use the same headline as `person.jobTitle`.

## Deploy

Push `main`. GitHub Actions builds and deploys Pages. In the repo, set Pages source to **GitHub Actions**.
