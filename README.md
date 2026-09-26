# cheafver.github.io

Portfolio site for Ajo Wijaja, Network & Cloud Network Engineer.

Live at https://cheafver.github.io

## Updating content

All content lives in one file: [`src/content/site.yaml`](src/content/site.yaml).
Edit it on GitHub and commit; the site rebuilds and redeploys automatically in about two minutes.
See [`docs/EDITING.md`](docs/EDITING.md) for a step-by-step guide.

## Local development

Requires Node 20.3 or newer (CI uses Node 22).

```bash
npm ci
npm run dev        # local dev server, http://localhost:4321
npm run validate   # check site.yaml only
npm test           # validate + build + type check + output checks
```

Built with Astro 5 (pinned to 5.18.2). Deployed by `.github/workflows/deploy.yml` to GitHub Pages.
