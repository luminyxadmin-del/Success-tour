# Luminyx Travel Kenya

A complete, production-ready, multi-page luxury travel & tours website for **Luminyx Travel Kenya** — bespoke Kenyan safaris, beach escapes and cultural journeys.

Built with **React + TypeScript + Vite**, **TailwindCSS**, **React Router**, **Framer Motion**, **React Hook Form + Zod**, **React Helmet Async**, and **Lucide** icons.

---

## ✨ Highlights

- **16 fully-built routes** — Home, Destinations + details, Packages + details, Services, About, Gallery, Blog + details, Contact, Request a Quote, FAQ, Privacy, Terms, and a custom 404.
- **24 tour packages** and **7 destinations** with rich, realistic Kenyan content (Maasai Mara, Amboseli, Diani, Nairobi, Tsavo, Lake Nakuru, Samburu) — no Lorem Ipsum.
- **Advanced packages page** — filter by experience type, duration, price and rating; sort; paginate; mobile filter drawer; URL-param prefill from the hero search.
- **Package details** — image gallery, day-by-day itinerary, included/excluded, FAQs, sticky price card and an inquiry form.
- **Forms** with React Hook Form + Zod validation and success states (Contact, Quote, Inquiry).
- **Animations** throughout via Framer Motion — hero Ken-Burns, scroll reveals, staggered grids, page transitions, animated stat counters.
- **SEO-ready** — per-page `<title>`, meta description, canonical, Open Graph, Twitter cards and JSON-LD structured data (Organization, Product, BlogPosting, FAQPage, TouristDestination).
- **Gallery lightbox** with keyboard navigation.
- **Responsive, mobile-first** luxury editorial design ("Azure & Amber" — navy, teal & amber; Playfair Display + Montserrat).

---

## 🚀 Getting started

> Requires **Node.js 18+** and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Build for production (output in /dist)
npm run build

# 4. Preview the production build locally
npm run preview
```

---

## 📁 Project structure

```
src/
├── assets/                 # static assets
├── components/
│   ├── cards/              # PackageCard, DestinationCard, BlogCard, TestimonialCard
│   ├── common/             # Reveal, PageHero, CTABanner, Accordion, Lightbox,
│   │                       #   StatCounter, PackageSearch, Page, ScrollToTop, FloatingContact
│   ├── forms/              # ContactForm, QuoteForm, InquiryForm  (RHF + Zod)
│   ├── layout/             # Navbar, MegaMenu, Footer
│   └── ui/                 # Button, Container, SectionHeading, Badge, Rating
├── data/                   # All site content (typed): packages, destinations, blogs,
│                           #   testimonials, services, team, stats, faqs, gallery, images, company
├── layouts/                # MainLayout (Navbar + Outlet + Footer)
├── pages/                  # 16 route pages
├── routes/                 # AppRoutes
├── seo/                    # SEO component + schema helpers
├── types/                  # TypeScript interfaces
├── utils/                  # cn, slugify, format helpers
├── App.tsx
├── main.tsx
└── index.css               # Tailwind layers + component classes
```

---

## 🎨 Design system

| Token        | Value                         | Use                     |
| ------------ | ----------------------------- | ----------------------- |
| `primary`    | `#0F172A` (deep navy)         | Text, dark sections     |
| `secondary`  | `#0EA5A4` (teal)              | Accents, links, icons   |
| `accent`     | `#F59E0B` (amber)             | CTAs, highlights         |
| `sand`       | `#FBF9F8`                     | Soft section surfaces   |
| Display font | Playfair Display              | Headings                |
| Body font    | Montserrat                    | Body copy & UI          |

Theme tokens live in `tailwind.config.js`; reusable classes (`.container-max`, `.eyebrow`, `.input-field`, etc.) live in `src/index.css`.

---

## 🛠️ Customising content

All content is centralised and typed in `src/data/`. To edit copy, prices, itineraries, images or company details, update the relevant file there — no component changes needed. Imagery is served from the Unsplash CDN via `src/data/images.ts`; swap the IDs/URLs to use your own assets.

Update business details (name, phone, email, address, socials, mission/vision/values) in `src/data/company.ts`.

---

## 📦 Tech stack

| Concern        | Library                          |
| -------------- | -------------------------------- |
| Framework      | React 18 + TypeScript            |
| Build tool     | Vite 5                           |
| Styling        | TailwindCSS 3                    |
| Routing        | React Router DOM 6               |
| Animation      | Framer Motion 11                 |
| Forms          | React Hook Form 7 + Zod          |
| SEO            | React Helmet Async               |
| Icons          | Lucide React                     |

---

## 📝 Notes

- The contact, quote and inquiry forms simulate submission on the client. Wire them to your backend / email service (e.g. Formspree, a serverless function, or your CRM) in the `onSubmit` handlers.
- The contact page map is a styled placeholder — drop in a Google Maps embed for production.
- `react-router-dom` uses `BrowserRouter`; configure your host to rewrite all routes to `index.html` for SPA deep-linking (e.g. Netlify `_redirects`, Vercel rewrites).

---

© Luminyx Travel Kenya. Built as a complete demonstration site.
