# troy-wu.github.io

Personal site. Static files, no build step. **The live site is served from the `gh-pages` branch**, so edit files on that branch; a push goes live in about a minute.

## Writing in the journal (the "More about me" page)

All entries live in one file: `journal/entries.md`. Add a new entry at the top:

```
# The title
Nov 11, 2026

The entry, in Markdown.
```

Edit it in the browser here: https://github.com/troy-wu/troy-wu.github.io/edit/gh-pages/journal/entries.md

The note at the top of that file lists what you can use (pull quotes, section breaks, pictures, covers, "Soon:" placeholders, drafts). Pictures go in `journal/images/`. The text above the first title in that file is the note about me beside the list.

### In VS Code

```
git clone -b gh-pages https://github.com/troy-wu/troy-wu.github.io.git
code troy-wu.github.io
```

Edit `journal/entries.md`, then commit and push from the Source Control panel. Run `git pull` first if changes were pushed from elsewhere.

## What is where

- `index.html` holds the home page: the content, the styles, and the script for the toys.
- `journal/index.html` lays out the journal; `journal/marked.min.js` is the Markdown renderer it uses (marked, MIT licence).
- `images/troy.jpg` is the portrait, and `images/logos/` holds the four employer logos.
- `fonts/` holds the three self-hosted fonts (SIL Open Font License, see `fonts/LICENSE.txt`).
- `resume.pdf` is what the Resume link opens.

To preview locally, run `python3 -m http.server` in this folder and open http://localhost:8000.

The toys in the corner (the letters T, R, O, Y, a big donut, a ball and a star, plus whatever you add) are soft bodies: two rings of particles each, held together with position-based dynamics, and drawn as shaded characters in the manner of donut.c. Their shapes and tuning constants are at the top of the `Sim` function in `index.html`.

The employer logos are trademarks of their owners and are used only to identify where I worked.

There is a small game behind the "Play basketball" button: shots at a hoop on the right wall, with three lives. Each miss costs a life, and the round ends when they run out. The ball has to be let go behind the dotted line, the front of the rim is a solid obstacle, and the net moves when the ball falls through it. Shots made, lives left and the best round show in big type over the court. When a round ends, a top-3 leaderboard appears, and a score that makes it lets the player write their name. The leaderboard and best score are kept in the visitor's own browser (localStorage keys `hoopsBoard` and `bestHoops`), so each visitor has their own. "Stop" brings the letters and the donut back.
