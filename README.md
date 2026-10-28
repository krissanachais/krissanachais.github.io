# krissanachais.github.io

> Personal portfolio website of **Krissanachai Sararam (กฤษณชัย สาระรัมย์)**  
> นักวิชาการคอมพิวเตอร์ปฏิบัติการ · สำนักงานสถิติแห่งชาติ (NSO Thailand)

🌐 **Live:** https://krisscode.dev · https://krissanachais.github.io

---

## About

Portfolio website showcasing professional experience, technical skills, and
open-source projects. Designed with a modern Meelo-inspired layout, a full
**dark / light theme**, and bilingual (Thai + English) content.

---

## Features

- 🎨 **Design system** follows [elayadesign/ai-design-skills](https://github.com/elayadesign/ai-design-skills)
  (`landing-page-design`, Part B): Tailwind type scale, fixed spacing tokens,
  Tailwind radii, flat backgrounds, one motion curve
- 🌗 **Dark / light mode** with `localStorage` persistence and a crossfade switch
- 🧭 **Floating pill navigation**, full height mobile menu with staggered links
- ✨ **Tagline reveal**: words light up one at a time on scroll (Thai segmented with `Intl.Segmenter`)
- 🕸️ **Interactive constellation** behind the hero, line mask heading reveals,
  typewriter role, count up stats, card tilt, magnetic buttons, custom cursor
- ✅ **Inline form validation** with specific, calm messages
- ♿ Skip link, visible focus rings, `prefers-reduced-motion` support,
  readable without JavaScript
- 🔒 Content Security Policy, Subresource Integrity, no inline scripts
- 📄 Branded 404 page, privacy page, 1200×630 social share image

---

## Tech Stack

| Layer     | Tools                                                                                                                                         |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Structure | HTML5                                                                                                                                          |
| Styling   | CSS3 (custom properties, grid, flexbox, `color-mix`)                                                                                          |
| Behaviour | Vanilla JavaScript (ES6+) — `IntersectionObserver`, `requestAnimationFrame`                                                                   |
| Fonts     | [Poppins](https://fonts.google.com/specimen/Poppins) for Latin · [Prompt](https://fonts.google.com/specimen/Prompt) for Thai glyphs |
| Icons     | [Phosphor Icons 2.1.2](https://phosphoricons.com/) |
| Hosting   | GitHub Pages (custom domain `krisscode.dev`)                                                                                                  |

---

## Project Structure

```
.
├── index.html            # Markup only (CSS & JS are external)
├── 404.html              # Branded not found page
├── privacy.html          # Privacy notice
├── asset/
│   ├── css/style.css     # All styles, light + dark themes
│   ├── js/theme-init.js  # Applies saved theme before first paint
│   ├── js/script.js      # Core behaviour (theme, nav, form, reveals)
│   ├── js/fx.js          # Visual effects (constellation, tagline, cursor)
│   └── img/              # Photos, logos (KS current, KRISSCODE previous), favicon
│       └── brand/        # Original KS logo source files (light/dark, horizontal/stacked)
├── CNAME                 # Custom domain → krisscode.dev
└── README.md
```

---

## Sections

| Section        | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| **Hero**       | Introduction, rotating role, one primary CTA, photo slideshow |
| **Stats**      | Key numbers (years, agencies, commits, technologies)         |
| **About**      | Background and personal profile                              |
| **Skills**     | Primary & Secondary skill groups + animated tech marquee     |
| **Focus**      | Three focus areas: Web app · Data & statistics · Automation  |
| **Tagline**    | Large type statement, words reveal on scroll                 |
| **Projects**   | Live GitHub profile summary and private NSO projects         |
| **Experience** | Work history timeline (NSO, กรมประมง, สดช.)                  |
| **Contact**    | Email, GitHub, Telegram, X links + message form              |

---

## Skills Overview

### Primary Skills

- **TypeScript · Next.js · Node.js** — Internal web applications (notification, meeting-room booking, survey, and HR systems)
- **PHP · Laravel · Blade** — Backend services and web apps (URL shortener, information publishing, event sites)
- **Government Systems** — CRM, repair-request, and online form systems

### Secondary Skills

- **API Integration** — LINE Messaging API, Telegram Bot, Discord.js
- **Business Systems Development** — Internal tools, booking, survey systems
- **SQL · Data Processing** — Python data pipelines, database management
- **Security · CodeQL · CI/CD** — GitHub Actions, static analysis

---

## Open Source Repos

| Repo                                                                                | Description    |
| ----------------------------------------------------------------------------------- | -------------- |
| [krissanachais.github.io](https://github.com/krissanachais/krissanachais.github.io) | This portfolio |

> Private work (NSO internal systems) lives in private repositories under
> [@krissanachais](https://github.com/krissanachais).

---

## Local Development

No build step — it's a static site. Serve the folder with any static server:

```bash
npx http-server . -p 4321 -c-1
```

Then open http://localhost:4321.

---

## Contact

- 📧 krissanachai.s [at] nso [dot] mail [dot] go [dot] th — or use the contact form at [krisscode.dev](https://krisscode.dev/#contact)
- 💬 Telegram: [@krissanachai16](https://t.me/krissanachai16)
- 🐦 X: [@MogItPure](https://x.com/MogItPure)
- 🐙 GitHub: [krissanachais](https://github.com/krissanachais)
