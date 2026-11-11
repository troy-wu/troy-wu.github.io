# troy-wu.github.io

Personal site. One static page, no build step.

- `index.html` holds everything: the content, the styles, and the script for the donut.
- `images/troy.jpg` is the portrait, and `images/logos/` holds the four employer logos.
- `fonts/` holds the three self-hosted fonts (SIL Open Font License, see `fonts/LICENSE.txt`).
- `resume.pdf` is what the Resume link opens.

To change the text, edit `index.html` and push. To preview locally, run `python3 -m http.server` in this folder and open http://localhost:8000.

The toys in the corner (donut, ball, box, star) are soft bodies: two rings of particles each, held together with position-based dynamics, and drawn as shaded characters in the manner of donut.c. Their shapes and tuning constants are at the top of the `Sim` function in `index.html`.

The employer logos are trademarks of their owners and are used only to identify where I worked.
