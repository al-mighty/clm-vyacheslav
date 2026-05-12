# CLM Portfolio Presentation

Interactive portfolio presentation built as a Closed-Loop Marketing detail aid. Ten themed slides with parallax effects, swipe navigation, autoplay, and full EN/RU localization.

**Live:** [cheslav.space](https://cheslav.space)

## Tech Stack

- **Vue 3** SFC + Composition API
- **Vite** dev server & production build
- **i18n** English / Russian toggle
- **CSS Variables** design tokens, parallax layers
- Touch swipe (horizontal + vertical) & keyboard navigation
- Autoplay with configurable interval

## Slides

| # | Slide | Description |
|---|-------|-------------|
| 01 | Cover | Animated intro with start button |
| 02 | Overview | Professional summary |
| 03 | Pillars | Core competencies with expandable cards |
| 04 | Timeline | Career history with animated entries |
| 05 | Stack | Tech stack with animated progress bars |
| 06 | DNA | Engineering values and principles |
| 07 | Architecture | Interactive SVG hotspots |
| 08 | Skills | Categorized skill matrix |
| 09 | Demos | Live project showcase |
| 10 | Contact | Links and contact info |

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
```

### Production Build

```bash
npm run build      # output -> dist/
npm run preview    # preview production build
```

## Project Structure

```
clm-vyacheslav/
├── src/
│   ├── slides/            # 10 Vue SFC slide components
│   ├── components/        # Shared: navigation, hotspots, topbar, bars
│   ├── composables/       # useSlideNav, useSwipe, useVeevaTracking
│   ├── i18n/              # en.js, ru.js locale files
│   ├── styles/            # Global styles and design tokens
│   ├── assets/            # Images, SVGs, fonts
│   ├── App.vue            # Root component with slide engine
│   └── main.js            # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## Controls

- **Arrow keys** or **swipe** — navigate between slides
- **Dots / sidebar** — jump to specific slide
- **START button** — begin autoplay from cover
- **Language toggle** — switch EN/RU

## Author

Vyacheslav Kovalev — [GitHub](https://github.com/al-mighty) · [cheslav.space](https://cheslav.space)
