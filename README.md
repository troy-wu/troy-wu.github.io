# troy-wu.github.io

Personal site. Static files, no build step. **The live site is served from the `gh-pages` branch**, so edit files on that branch; a push goes live in about a minute.

## Writing in the journal

All entries live in one file: `journal/entries.md`. Add a new entry at the top:

```
# The title
Nov 11, 2026

The entry, in Markdown.
```

Edit it in the browser here: https://github.com/troy-wu/troy-wu.github.io/edit/gh-pages/journal/entries.md

The note at the top of that file lists what you can use (pull quotes, section breaks, pictures, drafts). Pictures go in `journal/images/`.

## What is where

- `index.html` holds the home page: the content, the styles, and the script for the toys.
- `journal/index.html` lays out the journal; `journal/marked.min.js` is the Markdown renderer it uses (marked, MIT licence).
- `images/troy.jpg` is the portrait, and `images/logos/` holds the four employer logos.
- `fonts/` holds the three self-hosted fonts (SIL Open Font License, see `fonts/LICENSE.txt`).
- `resume.pdf` is what the Resume link opens.

To preview locally, run `python3 -m http.server` in this folder and open http://localhost:8000.

The toys in the corner (donut, ball, box, star) are soft bodies: two rings of particles each, held together with position-based dynamics, and drawn as shaded characters in the manner of donut.c. Their shapes and tuning constants are at the top of the `Sim` function in `index.html`.

The employer logos are trademarks of their owners and are used only to identify where I worked.
