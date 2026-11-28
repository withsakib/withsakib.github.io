# Sa Kib portfolio

Personal portfolio of Abdullah Al Sakib. Plain HTML, CSS and JavaScript, no build step and no libraries.

**To run it:** open `index.html` in a browser. To put it online, upload the whole folder to Netlify, GitHub Pages or any static host.

## Folder layout

```
sa-kib-portfolio/
├── index.html              the whole page
├── assets/
│   ├── images/             portrait.jpg, about-working.gif
│   └── icons/              tech and social SVG logos
├── css/
│   ├── base/               tokens (colours, fonts), reset, typography, layout helpers
│   ├── components/         buttons, header, footer, card glow
│   ├── sections/           hero, about, skills, projects, contact
│   └── motion.css          scroll reveals and hero entrance (loaded last)
└── js/
    ├── utils.js            shared helper (reduced-motion check)
    ├── typing.js           typing line in the hero
    ├── reveal.js           fade-in on scroll
    ├── header.js           progress bar, hide on scroll, mobile menu, active link
    ├── interactions.js     card glow and copy-email button
    └── contact-form.js     opens the mail app from the form
```

## Where to change things

| I want to change…                     | Edit                                  |
| ------------------------------------- | ------------------------------------- |
| Colours, fonts, shadows               | `css/base/tokens.css`                 |
| The words typed in the hero           | `words` list in `js/typing.js`        |
| About text, skills, project, contact  | `index.html`                          |
| Name in the header (top-left logo)    | `.logo` link in `index.html` (`Sa Kib`) |
| Browser tab title                     | `<title>` in `index.html`             |
| Email address                         | `index.html` and `js/contact-form.js`, `js/interactions.js` |
| Portrait photo                        | replace `assets/images/portrait.jpg` (keep roughly the same shape) |

## Font weights

Only the section titles use the heavy Anton font. Everything else steps down:
600 for card titles and bold words, 500 for nav, buttons and facts, 400 for paragraphs and labels,
300 for the first name in the hero.

## Script order

`index.html` loads `utils.js` first because the other scripts use `reduceMotion` from it.
The scripts are normal (not modules) so the site also works when opened straight from the file system.
