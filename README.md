# West Coast National Parks

Standalone single-page website focused on West Coast U.S. national parks, built with:
- semantic HTML
- modern responsive CSS
- a small TypeScript module for tabbed comparisons

The page compares six parks using official National Park Service data:
- 2024 recreation visits
- acreage
- establishment year
- selected park facts

## Files

- `index.html` renders the page structure
- `styles.css` contains the visual system and responsive layout
- `app.ts` is the TypeScript source for the interactive comparison tabs
- `app.js` is the browser-ready module loaded by the page

## Run locally

```bash
cd "/Users/anna/Documents/New project"
python3 -m http.server 8080
```

Open [http://localhost:8080/index.html](http://localhost:8080/index.html)

## Data sources

The page links directly to official NPS sources in its Sources section, including:
- NPS IRMA annual park visitation report for 2024
- park homepages
- park statistics pages
- NPS inventory and geodiversity references
