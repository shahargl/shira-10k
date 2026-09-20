# Shira's 10K Roadmap

A private-data-safe, static training calendar for Shira's October 28, 2026 10K.

The plan is based on aggregate patterns from recent training. No Strava routes,
coordinates, activity IDs, credentials, or raw exports are included.

## Local preview

```bash
npm run serve
```

Open <http://localhost:4173>.

## Validation

```bash
npm test
```

## Deployment

Pushes to `main` deploy the contents of `site/` to GitHub Pages through
`.github/workflows/pages.yml`.

Completion state and workout notes stay in the visitor's browser via
`localStorage`; there is no backend.
