# Muyi's Portfolio

A hand-drawn style portfolio site collecting my **Critical Computation** coursework at Parsons School of Design (Design & Technology BFA) — from the first P5.js sketches in CC Lab to the HTML, CSS, JavaScript and API projects of Advanced CC.

**Live site → [2751833085.github.io/Muyi-s-Portfolio](https://2751833085.github.io/Muyi-s-Portfolio/)**

> "A website is like a tree, which needs to be cultivated." This site keeps growing as the coursework does.

## Where to go

| Page | What you will find | Live | Source |
| --- | --- | --- | --- |
| Home | Entry point with navigation to every section | [Open](https://2751833085.github.io/Muyi-s-Portfolio/) | [`index.html`](index.html) |
| About Me | Who I am, my skills, and how this site came together | [Open](https://2751833085.github.io/Muyi-s-Portfolio/About%20Me%20Page/about.html) | [`About Me Page/`](About%20Me%20Page) |
| CC-Lab Works | Five early P5.js projects: Dream, Time, Identity, Control, Game | [Open](https://2751833085.github.io/Muyi-s-Portfolio/CC-Lab%20Pages/cc-lab.html) | [`CC-Lab Pages/`](CC-Lab%20Pages) |
| Advanced CC Works | Index of the five Advanced CC projects below | [Open](https://2751833085.github.io/Muyi-s-Portfolio/Advanced%20CC%20Pages/advanced-cc.html) | [`Advanced CC Pages/`](Advanced%20CC%20Pages) |

### Advanced CC projects

| # | Project | Summary | Live | Source |
| --- | --- | --- | --- | --- |
| I | Portfolio Website 2.0 | This website itself, redesigned | [Open](https://2751833085.github.io/Muyi-s-Portfolio/) | [`index.html`](index.html) |
| II | Words in Motion | *Minimize*, *Procrastinate* and *Irony*, each interpreted through three P5.js motion sketches, plus three final works | [Open](https://2751833085.github.io/Muyi-s-Portfolio/Advanced%20CC%20Pages/Assignment%202/assignment2.html) | [`Assignment 2/`](Advanced%20CC%20Pages/Assignment%202) |
| III | Experimental Camera | A retro Soviet EL surveillance interface with hand-tracked interaction | [Open](https://2751833085.github.io/Muyi-s-Portfolio/Advanced%20CC%20Pages/Experimental%20Camera/experimental-camera.html) | [`Experimental Camera/`](Advanced%20CC%20Pages/Experimental%20Camera) |
| IV | Community Tool | Phantopteryx Toolbox by Oneiron v0.1.0 — a lightweight browser toolbox for image editing and divination | [Open](https://2751833085.github.io/Muyi-s-Portfolio/Advanced%20CC%20Pages/Community%20Tool/community-tool.html) | [`Community Tool/`](Advanced%20CC%20Pages/Community%20Tool) |
| V | Digital Divination | The toolbox rebuilt into a desktop-style image editing workspace hosted on Firebase | [Open](https://2751833085.github.io/Muyi-s-Portfolio/Advanced%20CC%20Pages/Digital%20Divination/digital-divination.html) | [`Digital Divination/`](Advanced%20CC%20Pages/Digital%20Divination) |

### Related links

- [Phantopteryx Toolbox (final project, live)](https://phantopteryx-toolbox.web.app/)
- [Phantopteryx Toolbox by Oneiron — source repository](https://github.com/2751833085/Phantopteryx-Toolbox-by-Oneiron)
- [Advanced CC Works — source repository](https://github.com/2751833085/Advanced-CC-Works)
- [Toolbox prototype preserved in this repo](https://2751833085.github.io/Muyi-s-Portfolio/Phantopteryx-Toolbox/toolbox.html) ([`Phantopteryx-Toolbox/`](Phantopteryx-Toolbox))
- [My GitHub profile](https://github.com/2751833085)

## Features

- **Loading animation only when it matters.** The lemniscate particle loader plays when you enter the site or refresh a page. Moving between pages inside the site uses native cross-document view transitions, with a short fade as the fallback.
- **Fast navigation.** Internal links are real `<a>` elements, prefetched with speculation rules when you hover them. The hero artwork ships as WebP with a PNG fallback and is skipped entirely on the mobile layout.
- **Accessible by default.** Landmarks, `aria-current` on the active nav item, `rem`-based type that follows browser and OS text-size settings, and no horizontal overflow at 150% text.
- **Animated hover underlines.** Navigation links and card titles draw their underline in from the left on hover or keyboard focus, and slide it out to the right on leave.
- **Click-to-load sketches.** P5.js sketches stay unloaded until you ask for them, so pages with many sketches open fast.
- **Desktop and mobile layouts.** The home page switches to a compact card layout on small screens.
- **Respects reduced motion.** Page transitions, underline animations and the loader's breathing motion are disabled when the system asks for less motion.

## Project structure

```text
.
├── index.html               Home page
├── style.css                Home page styles
├── loading-particle.js      Loading animation and page transitions (shared by every page)
├── RES/                     Fonts and artwork
├── About Me Page/           About page
├── CC-Lab Pages/            CC Lab archive
├── Advanced CC Pages/       Advanced CC index and the per-project pages
└── Phantopteryx-Toolbox/    Preserved community-tool prototype and its demo apps
```

## Run locally

The site is plain HTML, CSS and JavaScript with no build step. Serve the folder with any static server:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Built with

HTML · CSS · JavaScript · [p5.js](https://p5js.org/), following [Modern Web Guidance 1.0](https://developer.chrome.com/docs/modern-web-guidance)

## Acknowledgements

Thanks to Matías Piña Aguilera for continuous support and guidance throughout the course.
