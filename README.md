# Caesar Ferdiana Suwandi — Personal Portfolio

> *"I don't just build applications. I build experiences that people remember."*

A world-class, highly interactive personal portfolio website built with modern web technologies. Featuring a **Dark Luxury Glassmorphism** design language, Three.js 3D backgrounds, Framer Motion scroll animations, and smooth Lenis scrolling.

---

## ✨ Features

- **Interactive 3D Hero** — WebGL particle field & floating geometry (React Three Fiber)
- **Smooth Scrolling** — Buttery Lenis scroll with spring easing
- **Full-Screen Mobile Nav** — Animated overlay menu for mobile devices
- **Glassmorphism Cards** — Frosted glass UI with depth and blur
- **Animated Section Dividers** — Gradient wave transitions between every section
- **Real Tech Stack Logos** — Devicons CDN logos with hover glow effects
- **3D Card Tilt** — Perspective hover effects on skill and project cards
- **Animated Counters** — Intersection-Observer-based stat counters
- **Infinite Cert Slider** — Auto-scrolling certification badge carousel
- **Contact Form** — Animated glass form with gradient submit button
- **Custom Scrollbar** — Branded blue scrollbar
- **SEO Ready** — Custom metadata, OG tags, semantic HTML

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion, GSAP |
| 3D Graphics | Three.js, React Three Fiber, Drei |
| Smooth Scroll | Lenis |
| Icons | Lucide React, Devicons CDN |
| Fonts | Space Grotesk (headings), Inter (body) |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css        # Tailwind v4 theme, custom scrollbar, glass utilities
│   ├── layout.tsx         # Root layout with fonts & smooth scroll wrapper
│   └── page.tsx           # Main page — composes all sections
│
├── components/
│   ├── Navbar.tsx          # Sticky nav with mobile full-screen overlay
│   ├── Hero.tsx            # Full-screen hero with CTA
│   ├── Hero3D.tsx          # Three.js canvas (Stars, floating spheres)
│   ├── SmoothScrolling.tsx # Lenis wrapper
│   ├── SectionDivider.tsx  # Animated gradient wave between sections
│   ├── About.tsx           # 4-card storytelling layout
│   ├── Skills.tsx          # Skill cards with progress bars + tech logo wall
│   ├── TechStack.tsx       # Devicon logo grid with hover glow
│   ├── Experience.tsx      # 3-column timeline (Education/Work/Org)
│   ├── Projects.tsx        # Premium glass project cards
│   ├── GitHub.tsx          # Animated stat counters
│   ├── Certifications.tsx  # Infinite-scroll cert badge slider
│   ├── Services.tsx        # Service offering cards
│   ├── Contact.tsx         # Glassmorphism contact form
│   └── Footer.tsx          # Minimal footer with nav and socials
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Ferdiana07/Portofolio.git
cd Portofolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## 📸 Sections

| # | Section | Description |
|---|---|---|
| 1 | **Hero** | Full-screen with Three.js background, available badge, CTA |
| 2 | **About** | 4-card storytelling — Who, Passion, Vision, Values |
| 3 | **Skills** | Progress cards + Devicon logo wall |
| 4 | **Experience** | Education, Internships & Organizations timeline |
| 5 | **Projects** | SINAUWU, Exercise AI, SEAPEDIA, IoT Dashboard & more |
| 6 | **GitHub** | Animated stat counters & repo link |
| 7 | **Certifications** | IBM Skillsbuild, Oracle, Dicoding badge slider |
| 8 | **Services** | Web, Backend, AI, Database, UI/UX, Automation |
| 9 | **Contact** | Interactive glass form + social links |

---

## 🎨 Color Palette

| Role | Hex |
|---|---|
| Background | `#050816` |
| Primary (Blue) | `#2563EB` |
| Accent (Sky) | `#38BDF8` |
| Secondary (Purple) | `#7C3AED` |
| Highlight (Cyan) | `#00E5FF` |
| Muted Text | `#94A3B8` |

---

## 📄 License

MIT License — feel free to use this as inspiration for your own portfolio!

---

<p align="center">Crafted with ❤️ by <strong>Caesar Ferdiana Suwandi</strong></p>
<p align="center">
  <a href="https://github.com/Ferdiana07">GitHub</a> ·
  <a href="https://linkedin.com/in/ferdianacaesar">LinkedIn</a> ·
  <a href="mailto:ferdianacaesar@gmail.com">Email</a>
</p>
