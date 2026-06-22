import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Clock, MapPin, ChevronRight, Check, Sparkles, CalendarDays, ArrowRight,
} from "lucide-react";
import Page from "@/components/common/Page";
import SEO from "@/seo/SEO";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/common/Reveal";
import { Stagger, StaggerItem } from "@/components/common/Reveal";
import InquiryForm from "@/components/forms/InquiryForm";
import NotFoundPage from "./NotFoundPage";
import { signatureFlagships, getSignatureFlagship } from "@/data/signature";
import { cloudinaryOptimize } from "@/utils/cloudinary";

const tierColors: Record<string, string> = {
  Luxury: "bg-accent/10 text-accent border-accent/30",
  Premium: "bg-secondary/10 text-secondary border-secondary/30",
  Comfort: "bg-primary/5 text-primary border-primary/20",
};

export default function SignatureFlagshipPage() {
  const { slug } = useParams();
  const flagship = slug ? getSignatureFlagship(slug) : undefined;
  const [activeImg, setActiveImg] = useState(0);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  if (!flagship) return <NotFoundPage />;

  const others = signatureFlagships.filter((f) => f.slug !== flagship.slug).slice(0, 3);

  const packageLabel = `${flagship.name} — Signature Collection`;

  return (
    <Page>
      <SEO
        title={`${flagship.name} — Signature Collection`}
        description={flagship.tagline}
        path={`/signature/${flagship.slug}`}
        image={flagship.image}
        type="article"
      />

      {/* HERO */}
      <section className="relative flex min-h-[65vh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={cloudinaryOptimize(flagship.image, 1400)} alt={flagship.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/55 to-primary/25" />
        </div>
        <Container className="relative z-10 pb-14 pt-36">
          <nav className="mb-5 flex flex-wrap items-center gap-1 text-xs font-medium text-white/60">
            <Link to="/" className="hover:text-accent">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/signature" className="hover:text-accent">Signature Collection</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{flagship.name}</span>
          </nav>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Signature {flagship.number}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl"
          >
            {flagship.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-3 max-w-2xl font-display text-lg italic text-white/75"
          >
            {flagship.tagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-2 text-sm text-white/85"
          >
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-accent" />
              {flagship.duration}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-accent" />
              {flagship.route}
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8"
          >
            <Button onClick={() => setInquiryOpen(true)} variant="secondary" size="md">
              Request a Private Quote
            </Button>
          </motion.div>
        </Container>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* MAIN COLUMN */}
            <div className="lg:col-span-2 space-y-16">

              {/* GALLERY */}
              <Reveal>
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={cloudinaryOptimize(flagship.gallery[activeImg], 1200)}
                    alt={flagship.name}
                    className="aspect-[16/9] w-full object-cover"
                  />
                </div>
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {flagship.gallery.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`overflow-hidden rounded-lg ring-2 transition ${
                        activeImg === i ? "ring-secondary" : "ring-transparent"
                      }`}
                    >
                      <img src={cloudinaryOptimize(g, 200)} alt="" className="aspect-square w-full object-cover" />
                    </button>
                  ))}
                </div>
              </Reveal>

              {/* WHO THIS IS FOR */}
              <Reveal>
                <SectionHeading eyebrow="Who this is for" title="Is this journey right for you?" />
                <Stagger className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {flagship.audience.map((point, i) => (
                    <StaggerItem key={i}>
                      <div className="flex items-start gap-3 rounded-lg border border-sand-200 bg-sand p-4">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary/10">
                          <Check className="h-3.5 w-3.5 text-secondary" />
                        </span>
                        <p className="text-sm leading-relaxed text-ink">{point}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </Reveal>

              {/* DAY-BY-DAY ITINERARY */}
              <Reveal>
                <SectionHeading eyebrow="The journey" title="Day by day" />
                <div className="mt-8 space-y-0">
                  {flagship.itinerary.map((day, i) => (
                    <div
                      key={i}
                      className="relative flex gap-5 pb-10 last:pb-0"
                    >
                      {/* Timeline line */}
                      {i < flagship.itinerary.length - 1 && (
                        <div className="absolute left-[18px] top-9 bottom-0 w-px bg-sand-300" />
                      )}
                      {/* Day number badge */}
                      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white ring-4 ring-white">
                        {day.day}
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="font-display text-lg font-bold text-primary">{day.title}</h4>
                        <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-muted">
                          {day.meta}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-ink">{day.description}</p>
                        {day.signature && (
                          <div className="mt-4 flex items-start gap-3 rounded-r-lg border-l-4 border-accent bg-accent/5 px-4 py-3">
                            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            <p className="text-sm font-semibold text-primary">{day.signature}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* SUGGESTED PROPERTIES */}
              <Reveal>
                <SectionHeading eyebrow="Where you'll stay" title="Suggested properties" />
                <div className="mt-6 overflow-hidden rounded-xl border border-sand-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-sand border-b border-sand-200">
                        <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-muted">Tier</th>
                        <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-muted">Suggested property</th>
                        <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-muted hidden sm:table-cell">Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {flagship.properties.map((prop, i) => (
                        <tr key={i} className="border-b border-sand-100 last:border-0 bg-white">
                          <td className="px-5 py-4">
                            <span className={`inline-block rounded border px-2.5 py-1 text-xs font-bold ${tierColors[prop.tier]}`}>
                              {prop.tier}
                            </span>
                          </td>
                          <td className="px-5 py-4 font-medium text-primary">{prop.property}</td>
                          <td className="px-5 py-4 text-muted hidden sm:table-cell">{prop.location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-muted italic">
                  Indicative tier placeholders — final properties and rates confirmed at contracting.
                </p>
              </Reveal>

              {/* SEASONALITY */}
              <Reveal>
                <div className="rounded-xl border border-sand-200 bg-sand p-6 lg:p-8">
                  <p className="eyebrow mb-4">Seasonality intelligence</p>
                  <h3 className="font-display text-xl font-bold text-primary mb-5">When to go</h3>
                  <ul className="space-y-4">
                    {flagship.seasonality.map((s, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                        <p className="text-sm leading-relaxed text-ink">{s}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* THE LUMINYX DIFFERENCE */}
              <Reveal>
                <div className="rounded-xl bg-primary p-6 lg:p-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent mb-1">
                    The Luminyx difference
                  </p>
                  <h3 className="font-display text-xl font-bold text-white mb-6">
                    Why book this journey with us
                  </h3>
                  <ul className="space-y-4">
                    {flagship.differences.map((d, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20">
                          <Check className="h-3.5 w-3.5 text-accent" />
                        </span>
                        <p className="text-sm leading-relaxed text-white/85">{d}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* STICKY SIDEBAR */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-5">
                {/* CTA Card */}
                <Reveal>
                  <div className="rounded-xl border border-sand-200 bg-white p-6 shadow-soft">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary mb-1">
                      Signature {flagship.number}
                    </p>
                    <h3 className="font-display text-xl font-bold text-primary">{flagship.name}</h3>
                    <div className="mt-4 space-y-2 text-sm text-muted">
                      <p className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-secondary shrink-0" />
                        {flagship.duration}
                      </p>
                      <p className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        {flagship.route}
                      </p>
                    </div>
                    <div className="mt-5 space-y-3">
                      <Button onClick={() => setInquiryOpen(true)} variant="secondary" size="md" fullWidth>
                        Request a Private Quote
                      </Button>
                      <Button to="/contact" variant="ghost" size="md" fullWidth>
                        Speak with a Specialist
                      </Button>
                    </div>
                    <p className="mt-4 text-center text-[11px] text-muted">
                      No payment required to enquire
                    </p>
                  </div>
                </Reveal>

                {/* Other flagships */}
                <Reveal delay={0.1}>
                  <div className="rounded-xl border border-sand-200 bg-sand p-5">
                    <p className="eyebrow mb-4">Other signature journeys</p>
                    <ul className="space-y-3">
                      {others.map((other) => (
                        <li key={other.id}>
                          <Link
                            to={`/signature/${other.slug}`}
                            className="group flex items-center gap-3 rounded-lg bg-white p-3 shadow-soft transition hover:shadow-lift"
                          >
                            <img
                              src={other.image}
                              alt={other.name}
                              className="h-12 w-12 shrink-0 rounded object-cover"
                            />
                            <span className="flex-1 min-w-0">
                              <span className="block text-[10px] font-bold uppercase tracking-widest text-accent/70">
                                {other.number}
                              </span>
                              <span className="block text-sm font-semibold text-primary group-hover:text-secondary truncate">
                                {other.name}
                              </span>
                              <span className="block text-xs text-muted">{other.duration}</span>
                            </span>
                            <ArrowRight className="h-4 w-4 shrink-0 text-muted group-hover:text-secondary transition" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/signature"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:opacity-80"
                    >
                      View all journeys <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CLOSING CTA BAND */}
      <section className="bg-primary py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Sparkles className="mx-auto mb-4 h-8 w-8 text-accent" />
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Ready to make it yours?
              </h2>
              <p className="mt-4 text-base text-white/75">
                Every Signature journey is fully private. Tell us who's travelling, when, and how you'd like to experience Kenya — we'll handle everything else.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button onClick={() => setInquiryOpen(true)} variant="secondary" size="lg">
                  Request a Private Quote
                </Button>
                <Button to="/signature" variant="white" size="lg">
                  View All Journeys
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* INQUIRY MODAL */}
      {inquiryOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            onClick={() => setInquiryOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="h-1 w-full bg-gradient-to-r from-secondary via-secondary/60 to-accent" />
            <div className="flex items-start justify-between border-b border-sand-200 px-6 py-5">
              <div>
                <h2 className="font-display text-xl font-bold text-primary">Request a Private Quote</h2>
                <p className="mt-1 text-xs text-muted">
                  For: <span className="font-semibold text-secondary">{flagship.name}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setInquiryOpen(false)}
                className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-sand-200 hover:text-primary"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="max-h-[75vh] overflow-y-auto px-6 py-5">
              <InquiryForm
                packageName={packageLabel}
                onSuccess={() => setInquiryOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </Page>
  );
}
