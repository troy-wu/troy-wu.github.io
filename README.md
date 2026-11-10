# troy-wu.github.io

Personal site. One static page, no build step.

- `index.html` holds everything: the content, the styles, and the script for the donut.
- `images/troy-1bit.png` is the dithered portrait and `images/troy.jpg` is the colour photo shown on hover.
- `fonts/` holds the three self-hosted fonts (SIL Open Font License, see `fonts/LICENSE.txt`).
- `resume.pdf` is what the Resume link opens.

To change the text, edit `index.html` and push. To preview locally, run `python3 -m http.server` in this folder and open http://localhost:8000.

The donut is a soft body: two rings of particles held together with position-based dynamics, drawn as shaded characters in the manner of donut.c. Its tuning constants are at the top of the `Sim` function in `index.html`.
