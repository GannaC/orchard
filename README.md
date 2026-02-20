# U.S. States Dashboard

Interactive single-page dashboard for all 50 U.S. states with:
- Population
- Land area
- Total area
- Population density
- Animated bars and sortable/filterable table
- State flags

Data source: U.S. Census Bureau TIGERweb (`POP100`, `AREALAND`, `AREAWATER`).

## Run locally

```bash
cd "/Users/anna/Documents/New project"
python3 -m http.server 8080
```

Open: `http://localhost:8080/index.html`

## Publish as shareable animated website (GitHub Pages)

This repo includes a GitHub Actions workflow that deploys `index.html` to GitHub Pages from the `main` branch.

After pushing to GitHub:
1. Open repository `Settings` -> `Pages`
2. Under `Build and deployment`, set `Source` to `GitHub Actions`
3. Push to `main` (or re-run workflow)

Your live URL will be:
- `https://gannac.github.io/orchard/`

## Notes

- Open the live URL (not the raw GitHub file view) to preserve JavaScript and animations.
- If updates do not appear immediately, hard refresh your browser.
