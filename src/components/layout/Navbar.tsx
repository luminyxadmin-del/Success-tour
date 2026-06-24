import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";
import { company } from "@/data/company";
import Button from "@/components/ui/Button";
import MegaMenu from "./MegaMenu";

const navLinks = [
  { label: "Destinations", to: "/destinations", mega: true },
  { label: "Packages", to: "/packages" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setMegaOpen(false); }, [location]);

  const solid = scrolled || !isHome || mobileOpen;

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300",
      solid ? "bg-white/95 shadow-soft backdrop-blur" : "bg-transparent")}>
      <nav className="container-max flex h-[96px] items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="https://res.cloudinary.com/dtg3lepr4/image/upload/v1782321273/Luminyx_Travel_Final_Logo-01-01_oxk0rv.png"
            alt="Luminyx Travel"
            className="h-24 w-auto object-contain"
          />
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <li key={l.to} className={l.mega ? "" : "relative"}
              onMouseEnter={() => l.mega && setMegaOpen(true)}
              onMouseLeave={() => l.mega && setMegaOpen(false)}>
              <NavLink to={l.to}
                className={({ isActive }) => cn(
                  "flex items-center gap-1 text-sm font-medium transition link-underline",
                  solid ? "text-primary/80 hover:text-primary" : "text-white/90 hover:text-white",
                  isActive && (solid ? "!text-secondary" : "!text-accent")
                )}>
                {l.label}{l.mega && <ChevronDown className="h-3.5 w-3.5" />}
              </NavLink>
              <AnimatePresence>{l.mega && megaOpen && <MegaMenu onNavigate={() => setMegaOpen(false)} />}</AnimatePresence>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Button to="/packages" variant="secondary" size="sm">Book Now</Button>
        </div>

        <button onClick={() => setMobileOpen((v) => !v)} className="lg:hidden" aria-label="Toggle menu">
          {mobileOpen ? <X className={cn("h-6 w-6", solid ? "text-primary" : "text-white")} />
            : <Menu className={cn("h-6 w-6", solid ? "text-primary" : "text-white")} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-sand-200 bg-white lg:hidden">
            <ul className="container-max flex flex-col py-4">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to}
                    className={({ isActive }) => cn("block border-b border-sand-100 py-3 text-sm font-medium",
                      isActive ? "text-secondary" : "text-primary")}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
              <li className="mt-4 flex gap-3">
                <Button to="/packages" variant="secondary" size="sm" fullWidth>Book Now</Button>
              </li>
              <li className="mt-3 text-center text-xs text-muted">Call us: {company.phone}</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
