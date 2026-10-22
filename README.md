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

- 🌗 **Dark / Light mode** — toggle with `localStorage` persistence, respects
  `prefers-color-scheme`, no flash on load
- 📊 **Scroll progress bar** + **scrollspy** active-nav highlighting
- 🌌 **Animated aurora** hero background & **typewriter** rotating role
- 🔢 **Count-up** animated statistics
- 🖱️ **3D card tilt + cursor spotlight** micro-interactions
- ⬆️ **Back-to-top** button, staggered scroll-reveal animations
- ♿ Honours `prefers-reduced-motion`, responsive down to mobile
- ⚡ Lazy-loaded images with explicit dimensions (reduced layout shift)

---

## Tech Stack

| Layer     | Tools                                                                                                                                         |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Structure | HTML5                                                                                                                                          |
| Styling   | CSS3 (custom properties, grid, flexbox, `color-mix`)                                                                                          |
| Behaviour | Vanilla JavaScript (ES6+) — `IntersectionObserver`, `requestAnimationFrame`                                                                   |
| Fonts     | [Noto Sans Thai](https://fonts.google.com/noto/specimen/Noto+Sans+Thai) · [Cabinet Grotesk](https://www.fontshare.com/fonts/cabinet-grotesk) |
| Icons     | [Bootstrap Icons 1.11.3](https://icons.getbootstrap.com/)                                                                                     |
| Hosting   | GitHub Pages (custom domain `krisscode.dev`)                                                                                                  |

---

## Project Structure

```
.
├── index.html            # Markup only (CSS & JS are external)
├── asset/
│   ├── css/style.css     # All styles, light + dark themes
│   ├── js/script.js      # All behaviour
│   └── img/              # Profile photos & banner
├── CNAME                 # Custom domain → krisscode.dev
└── README.md
```

---

## Sections

| Section        | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| **Hero**       | Introduction, rotating role, CTA buttons, photo slideshow    |
| **Stats**      | Key numbers (years, agencies, commits, technologies)         |
| **About**      | Background and personal profile                              |
| **Skills**     | Primary & Secondary skill groups + animated tech marquee     |
| **Focus**      | Three focus areas: Web App · Data & Statistics · Automation  |
| **Git Work**   | Live GitHub profile summary and private NSO projects         |
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
