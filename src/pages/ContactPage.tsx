import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, MessageCircle, ChevronRight } from "lucide-react";
import Page from "@/components/common/Page";
import SEO, { organizationSchema } from "@/seo/SEO";
import Container from "@/components/ui/Container";
import Reveal from "@/components/common/Reveal";
import ContactForm from "@/components/forms/ContactForm";
import { company } from "@/data/company";

const CORMORANT = "'Cormorant Garamond', 'Playfair Display', Georgia, serif";
const GOLD = "#C9933A";
const NAVY = "#0D1B2A";

export default function ContactPage() {
  const wa = company.whatsapp.replace(/[^0-9]/g, "");

  const details = [
    {
      icon: MapPin,
      label: "Visit us",
      value: company.address,
      sub: company.poBox || undefined,
    },
    {
      icon: Phone,
      label: "Call us",
      value: company.phone,
      sub: company.phoneAlt !== company.phone ? company.phoneAlt : undefined,
      href: `tel:${company.phone.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      label: "Email us",
      value: company.email,
      sub: company.salesEmail !== company.email ? company.salesEmail : undefined,
      href: `mailto:${company.email}`,
    },
    {
      icon: Clock,
      label: "Working hours",
      value: company.hours,
    },
  ];

  return (
    <Page>
      <SEO
        title="Contact Us"
        description="Get in touch with Luminyx Travel. Call, email, WhatsApp or visit our office — our East Africa travel specialists are ready to plan your perfect journey."
        path="/contact"
        structuredData={organizationSchema}
      />

      {/* ── HERO — dark navy gradient, no image ─────────────────────────── */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${NAVY} 0%, #1a2f45 100%)`,
          paddingTop: "160px",
          paddingBottom: "100px",
        }}
      >
        {/* Subtle warm dot-grid texture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(201,147,58,0.18) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            opacity: 0.5,
          }}
        />
        {/* Edge vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

        <Container className="relative z-10">
          {/* Breadcrumbs */}
          <nav className="mb-10 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
            <Link to="/" className="transition hover:text-accent">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/70">Contact</span>
          </nav>

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 text-[11px] font-semibold uppercase tracking-[0.38em]"
            style={{ color: GOLD }}
          >
            Get in touch
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.07 }}
            className="font-bold leading-[1.05] text-white"
            style={{ fontFamily: CORMORANT, fontSize: "clamp(3rem, 6vw, 4.75rem)" }}
          >
            Contact Us
          </motion.h1>

          {/* Animated gold underline */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "5rem", opacity: 1 }}
            transition={{ duration: 1, delay: 0.55, ease: "easeOut" }}
            className="mt-5 h-[3px] rounded-full"
            style={{ background: `linear-gradient(to right, ${GOLD}, #F59E0B)` }}
          />

          {/* Punchline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-6 max-w-lg text-lg font-light leading-relaxed text-white/60"
          >
            Every great African journey begins with a single conversation. Let&apos;s start yours.
          </motion.p>
        </Container>
      </section>

      {/* ── MAIN CONTACT SECTION ────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: "100px 0" }}>
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">

            {/* ── Left: contact cards + WhatsApp ──────────────────────── */}
            <Reveal>
              <h2
                className="mb-10 text-3xl font-bold sm:text-4xl"
                style={{ fontFamily: CORMORANT, color: NAVY }}
              >
                We&apos;d love to hear from you
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {details.map((d, i) => (
                  <Reveal key={d.label} delay={0.07 + i * 0.08}>
                    <div
                      className="flex h-full flex-col rounded-xl p-6"
                      style={{
                        backgroundColor: NAVY,
                        borderTop: `3px solid ${GOLD}`,
                        boxShadow: "0 16px 48px rgba(0,0,0,0.20)",
                      }}
                    >
                      {/* Icon */}
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: "rgba(201,147,58,0.15)" }}
                      >
                        <d.icon className="h-5 w-5" style={{ color: GOLD }} />
                      </span>

                      {/* Label */}
                      <p
                        className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em]"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        {d.label}
                      </p>

                      {/* Value */}
                      {d.href ? (
                        <a
                          href={d.href}
                          className="mt-1.5 text-sm font-medium leading-relaxed text-white transition-opacity hover:opacity-75"
                        >
                          {d.value}
                        </a>
                      ) : (
                        <p className="mt-1.5 text-sm font-medium leading-relaxed text-white">
                          {d.value}
                        </p>
                      )}

                      {/* Sub-value */}
                      {d.sub && (
                        <p
                          className="mt-1 text-xs leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.38)" }}
                        >
                          {d.sub}
                        </p>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <Reveal delay={0.45}>
                <a
                  href={`https://wa.me/${wa}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-9 inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold text-white transition-all duration-200 hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                  style={{
                    backgroundColor: "#22C55E",
                    boxShadow: "0 4px 24px rgba(34,197,94,0.30)",
                  }}
                >
                  <MessageCircle className="h-5 w-5 shrink-0" />
                  Chat with us on WhatsApp
                </a>
              </Reveal>
            </Reveal>

            {/* ── Right: contact form ──────────────────────────────────── */}
            <Reveal delay={0.14}>
              <div
                className="contact-form-gold rounded-2xl bg-white p-8 sm:p-10"
                style={{
                  boxShadow:
                    "0 4px 6px rgba(0,0,0,0.04), 0 24px 80px rgba(15,23,42,0.10)",
                  border: "1px solid rgba(201,147,58,0.12)",
                }}
              >
                <h3
                  className="mb-2 text-3xl font-bold"
                  style={{ fontFamily: CORMORANT, color: NAVY }}
                >
                  Send us a message
                </h3>
                <p className="mb-8 text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                  Fill in the form and our team will reply within 24 hours.
                </p>
                <ContactForm />
              </div>
            </Reveal>

          </div>
        </Container>
      </section>
    </Page>
  );
}
