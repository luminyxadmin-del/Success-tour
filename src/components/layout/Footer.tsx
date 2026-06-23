import { Link } from "react-router-dom";
import { Compass, Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { company } from "@/data/company";
import { destinations } from "@/data/destinations";
import { isDestinationInRoutes } from "@/data/packages";

const exploreLinks = [
  { label: "Destinations", to: "/destinations" },
  { label: "Tour Packages", to: "/packages" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Travel Blog", to: "/blog" },
];
const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
  { label: "FAQ", to: "/faq" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white/80">
      <div className="container-max grid grid-cols-1 gap-10 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link to="/" className="mb-4 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded bg-secondary text-white"><Compass className="h-5 w-5" /></span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-bold text-white">Luminyx Travel</span>
            </span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-white/60">
            From the lion-filled plains of the Maasai Mara and elephant herds of Amboseli, to the flamingo shores of Nakuru and the white sands of Diani — we craft journeys that are entirely, unforgettably yours.
          </p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href={Object.values(company.socials)[i]} target="_blank" rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded border border-white/15 transition hover:border-accent hover:bg-accent hover:text-primary">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            {exploreLinks.map((l) => (
              <li key={l.to}><Link to={l.to} className="transition hover:text-accent">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Company</h4>
          <ul className="space-y-2.5 text-sm">
            {companyLinks.map((l) => (
              <li key={l.to}><Link to={l.to} className="transition hover:text-accent">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Get in Touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />{company.address}</li>
            <li className="flex items-center gap-2.5"><Phone className="h-4 w-4 shrink-0 text-secondary" /><a href={`tel:${company.phone.replace(/\s/g, "")}`} className="hover:text-accent">{company.phone}</a></li>
            <li className="flex items-center gap-2.5"><Mail className="h-4 w-4 shrink-0 text-secondary" /><a href={`mailto:${company.email}`} className="hover:text-accent">{company.email}</a></li>
          </ul>
          <form className="mt-5" onSubmit={(e) => e.preventDefault()}>
            <label className="mb-2 block text-xs uppercase tracking-wider text-white/60">Newsletter</label>
            <div className="flex overflow-hidden rounded border border-white/15">
              <input type="email" required placeholder="Your email" aria-label="Email address"
                className="w-full bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/40" />
              <button type="submit" aria-label="Subscribe" className="flex items-center bg-accent px-3 text-primary transition hover:bg-accent-light">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-max flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p className="flex flex-wrap items-center gap-1">
            Popular: {destinations
              .filter((d) => isDestinationInRoutes(d.routeKeyword ?? d.name))
              .slice(0, 3)
              .map((d, i) => (
                <span key={d.id}>
                  <Link to={`/destinations/${d.slug}`} className="hover:text-accent">{d.name}</Link>
                  {i < 2 && <span className="mx-1">·</span>}
                </span>
              ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
