# Mohamed Ali Sayed - Junior Flutter Developer Portfolio

A responsive, high-performance static portfolio website built with **vanilla HTML5, CSS3, and modern JavaScript (ES6+)** using a clean, data-first JSON architecture. No frameworks or heavy build tools required!

## ✨ Features

- **JSON-Driven Architecture**: Skills, Projects, and Education/Timeline sections are dynamically rendered at runtime from JSON data files via native `fetch()`.
- **Modular JavaScript**: Decomposed domain-specific scripts for Theme Toggling, Mobile Navigation, Contact Form Handling, Smooth Scrolling, and Scroll Animations.
- **Dynamic Theming**: Smooth light/dark mode switching with localStorage persistence.
- **Micro-Animations**: IntersectionObserver-based scroll fade-in animations that dynamically re-attach to rendered items.
- **FormSubmit Integration**: AJAX contact form submission with built-in validation and graceful fallback to `mailto:`.
- **Responsive & Accessible**: Fully adaptive layout with semantic HTML and ARIA accessibility roles, optimized for all screen sizes and RTL support.

---

## 🚀 How to Run Locally

Because this project uses native JavaScript `fetch()` to load JSON data files (`projects.json`, `skills.json`, `timeline.json`), browser CORS policies prevent fetching files directly from the local file system (using `file://`).

To run the project locally, serve it using a simple local HTTP server such as **[serve](https://github.com/vercel/serve)**:

```bash
# Using npx (requires Node.js installed)
npx serve .
```

Then open your browser and navigate to `http://localhost:3000` (or the port displayed in your terminal).

---

## 🛠 How to Extend & Add New Content

Adding a new project, skill category, or timeline experience requires **zero modifications** to HTML or JavaScript files. Simply update the corresponding JSON file in the `/data/` folder:

### 1. Adding a New Project (`data/projects.json`)
Add a new object to the array in `data/projects.json`:

```json
{
  "id": "new-project-id",
  "emoji": "📱",
  "title": "My New Flutter App",
  "badge": "New Feature",
  "featured": false,
  "image": "images/my-app.png",
  "description": "A brief description of what the project does and its core problem solved.",
  "features": [
    "Feature point 1",
    "Feature point 2",
    "Feature point 3"
  ],
  "tech": [
    "Flutter",
    "Dart",
    "Firebase"
  ],
  "github": "https://github.com/MooAli49/my-app"
}
```
*(Note: If `"badge"` is set to `null` or omitted, no header badge will be displayed. If `"featured"` is `true`, the card will receive highlighted accent border styling).*

### 2. Adding a New Skill Category (`data/skills.json`)
Add a new object to the array in `data/skills.json`:

```json
{
  "category": "Cloud & DevOps",
  "tags": [
    "Docker",
    "CI/CD",
    "AWS"
  ]
}
```

### 3. Adding a New Timeline Item (`data/timeline.json`)
Add a new object to the array in `data/timeline.json`:

```json
{
  "type": "experience",
  "date": "2026 – Present",
  "title": "Flutter Developer",
  "subtitle": "Company Name",
  "description": "Description of responsibilities and achievements."
}
```
*(Note: `"date"` and `"subtitle"` can be set to `null` if not applicable, such as for certificate or language listings).*

---

## 📂 File Structure

```
MoAli_Portfolio/
├── index.html                 # Main static HTML wrapper
├── README.md                  # Project documentation & usage guide
├── Flutter_Developer_Mohamed_Ali.pdf  # Downloadable CV
├── css/
│   └── style.css              # Vanilla CSS design system & styles
├── data/
│   ├── projects.json          # Projects data collection
│   ├── skills.json            # Skills & technologies data collection
│   └── timeline.json          # Education, experience & certifications data
├── images/                    # Image assets for profile and projects
└── js/
    ├── theme.js               # Dark/Light theme switching & persistence
    ├── nav.js                 # Mobile menu toggle & scroll spy link highlighting
    ├── contact-form.js        # Form validation & FormSubmit API submission
    ├── smooth-scroll.js       # Offset anchor link scrolling
    ├── observer.js            # IntersectionObserver scroll fade-in animation
    ├── render.js              # JSON fetching and dynamic DOM renderer
    └── main.js                # Main script entry point & developer console greeting
```
