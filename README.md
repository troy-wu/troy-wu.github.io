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

While an entry is open, a row of dots along the top of the screen fills in as you scroll, to show how far through it you are.

Point at one of the dot-pattern covers (or tap the banner over an open entry) and its pattern drifts slowly, like ripples on water.

The note at the top of that file lists what you can use (pull quotes, section breaks, pictures, covers, "Soon:" placeholders, drafts). Pictures go in `journal/images/`. The text above the first title in that file is the note about me beside the list.

### In the editor

https://troy-wu.github.io/journal/edit/ is a small editor for the journal: sign in, type, add photos, then **Save draft** or **Publish**. It works on a phone. Entries written there are kept in the database, not in `entries.md`, and the journal page shows both together, newest first. See "The journal editor" below for how it is set up.

### In VS Code

```
git clone -b gh-pages https://github.com/troy-wu/troy-wu.github.io.git
code troy-wu.github.io
```

Edit `journal/entries.md`, then commit and push from the Source Control panel. Run `git pull` first if changes were pushed from elsewhere.

## What is where

- `index.html` holds the home page: the content, the styles, and the script for the toys.
- `journal/index.html` lays out the journal; `journal/marked.min.js` is the Markdown renderer it uses (marked, MIT licence).
- `journal/edit/index.html` is the editor, and `journal/db.js` is the small piece both pages use to read entries and photos from the database.
- `images/troy.jpg` is the portrait, and `images/logos/` holds the four employer logos.
- `fonts/` holds the three self-hosted fonts (SIL Open Font License, see `fonts/LICENSE.txt`).
- `resume.pdf` is what the Resume link opens.

To preview locally, run `python3 -m http.server` in this folder and open http://localhost:8000.

The toys in the corner (the letters T, R, O, Y, a big donut, a ball and a star, plus whatever you add) are soft bodies: two rings of particles each, held together with position-based dynamics, and drawn as shaded characters in the manner of donut.c. Their shapes and tuning constants are at the top of the `Sim` function in `index.html`. Double-tap any toy and it hops and flips; type T R O Y on the keyboard and the letters hop in a wave. Tap the empty floor and a puff of air blows the nearby toys away from that spot. The "Heart" button drops a soft heart, the classic heart curve walked in even steps like the letters. The arrow keys bump the corner like a pinball table: left and right shove the toys sideways, up makes them jump, and down thumps them flat. Flip the light/dark switch and the toys jump in surprise.

The employer logos are trademarks of their owners and are used only to identify where I worked.

There is a small game behind the "Play basketball" button: shots at a hoop on the right wall, with three lives. Each miss costs a life, and the round ends when they run out. The ball has to be let go behind the dotted line, the front of the rim is a solid obstacle, and the net moves when the ball falls through it. A shot that touches neither the rim nor the backboard pops up "Swish!", and makes in a row are counted ("3 in a row"). Each shot leaves a dotted trail of its path, which turns to stars when it goes in. The "Sound" button beside "Stop" turns on small sounds made in the browser (a clank off the rim, a swish through the net, a low buzz for a miss); it starts off, and the choice is kept in localStorage key `hoopsSound`. Shots made, lives left and the best round show in big type over the court. When a round ends, a top-3 leaderboard appears, and a score that makes it lets the player write their name. The leaderboard and best score are kept in the visitor's own browser (localStorage keys `hoopsBoard` and `bestHoops`), so each visitor has their own. "Stop" brings the letters and the donut back.

## The shared leaderboard

The basketball top 3 is kept in the visitor's browser until `BOARD_URL` in `index.html` is set. To share one board between everyone, it uses a Firebase Realtime Database through its plain web address (no library):

1. At https://console.firebase.google.com create a project (the free Spark plan is enough), then Build > Realtime Database > Create database.
2. On the database's Rules tab, paste the rules below and publish.
3. Copy the database address shown on the Data tab, for example `https://your-project-default-rtdb.firebaseio.com`.
4. In `index.html` set `var BOARD_URL = 'https://your-project-default-rtdb.firebaseio.com/hoops';` and push.

```json
{
  "rules": {
    "hoops": {
      ".read": true,
      ".indexOn": ["s"],
      "$entry": {
        ".write": "!data.exists()",
        ".validate": "newData.hasChildren(['n', 's', 't'])",
        "n": { ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 12" },
        "s": { ".validate": "newData.isNumber() && newData.val() >= 1 && newData.val() <= 500 && newData.val() % 1 === 0" },
        "t": { ".validate": "newData.isNumber() && newData.val() <= now && newData.val() > now - 60000" },
        "$other": { ".validate": false }
      }
    }
  }
}
```

These rules let anyone read the board and add a new entry (a name of up to 12 characters and a whole-number score from 1 to 500), and let nobody change or delete entries. To remove an entry, delete it on the Data tab in the Firebase console.

## The journal editor

The editor at `/journal/edit/` keeps entries in the same Firebase Realtime Database as the leaderboard, as plain text:

- `journal/drafts/<id>` is the working copy of every entry (`title`, `date`, `body`, and when it was saved). Only the owner can read or write it.
- `journal/published/<id>` is the copy visitors see. **Publish** writes it; **Save draft** never touches it, so a published entry can be reworked in private and published again when ready. **Unpublish** removes it and keeps the draft.
- `journal/images/<id>` holds one photo each. The editor shrinks a photo to at most 1600 pixels on its long side (usually 100 to 400 KB) before storing it, and puts a line like `![](db:<id>)` in the text where the photo goes.

The `body` is the text exactly as typed (Markdown works, the same as in `entries.md`), so it can be restyled or moved later without losing anything.

Anyone can open the editor page, but it can do nothing without signing in as the owner: the database rules below are what keep everyone else out, not the page. To switch it on (once):

1. In the Firebase console for the `troy-wu` project, go to Build > Authentication > Get started, and turn on the **Email/Password** sign-in method.
2. On the Authentication > Users tab, press **Add user**, and enter your email and a password you choose. Copy the **User UID** shown beside the new user.
3. On Realtime Database > Rules, replace the rules with the ones below, putting your User UID in place of `YOUR_USER_UID` (three places), and publish. The `hoops` part is the leaderboard's, unchanged.
4. In Project settings > General, copy the **Web API Key**, set `var API_KEY = '...';` near the bottom of `journal/edit/index.html`, and push. The key only names the project, so it is fine for it to be public.

```json
{
  "rules": {
    "hoops": {
      ".read": true,
      ".indexOn": ["s"],
      "$entry": {
        ".write": "!data.exists()",
        ".validate": "newData.hasChildren(['n', 's', 't'])",
        "n": { ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 12" },
        "s": { ".validate": "newData.isNumber() && newData.val() >= 1 && newData.val() <= 500 && newData.val() % 1 === 0" },
        "t": { ".validate": "newData.isNumber() && newData.val() <= now && newData.val() > now - 60000" },
        "$other": { ".validate": false }
      }
    },
    "journal": {
      "drafts": {
        ".read": "auth != null && auth.uid === 'YOUR_USER_UID'",
        ".write": "auth != null && auth.uid === 'YOUR_USER_UID'"
      },
      "published": {
        ".read": true
      },
      "images": {
        "$image": {
          ".read": true,
          ".validate": "newData.isString() && newData.val().length < 1500000 && newData.val().beginsWith('data:image/')"
        }
      },
      ".write": "auth != null && auth.uid === 'YOUR_USER_UID'"
    }
  }
}
```

With these rules, visitors can read published entries and load a photo whose address they have been given, and nothing else; drafts, and every kind of saving, need your sign-in. Other people could create an account on the project once Email/Password is on, but an account that is not yours can read and write nothing. To stop that as well, untick "Enable create (sign-up)" under Authentication > Settings > User actions.

Until step 3 is done the journal page simply shows `entries.md` on its own.

The free plan allows 1 GB stored and 10 GB downloaded a month, which is room for a few thousand photos. Deleting an entry in the editor deletes its photos too; a photo removed from the text of an entry that is kept stays in the database until the entry is deleted.
