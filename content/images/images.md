---
file: images/images.md
purpose: Image manifest. Every image on the site is listed here with its exact file name, placement and alt text. The build uses the alt text word for word.
---

# Image manifest

| File name | Page | Placement | Alt text | Source | Status |
|---|---|---|---|---|---|
| hashtype-logo.png | All | Header lockup, footer, favicon, Open Graph, Home hero mark | HashType logo | Supplied | In use |
| og-image.png | — | Social share preview (1200 × 630) | HashType — AI-first automation | Generated from the logo on black | In use |
| [project images] | Projects | One per project card | Added per project | Own photos, with permission | Per project |

## Not using photos (by design)
- **Home hero:** animated circuit-trace background in the logo colours.
- **Solutions:** an animated line icon for each of the five solutions.
- **Industries:** an animated interface sketch for each of the six industries, labelled "Illustration".

The earlier Unsplash shortlist (hero port cranes, circuit board, six industry photos) is retired.

## Rules for project photos
- File names are lower case, with hyphens. Save each into `src/assets/photos/` and reference the name in the project's `image` field.
- Use only photos you own or have permission to publish.
- Export at about 1600 px wide, under 300 KB.
- Add the alt text to `src/content/images.js` and to this table.
