import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Car, Clock, Users, Leaf, Check, ChevronRight,
} from "lucide-react";
import Page from "@/components/common/Page";
import SEO from "@/seo/SEO";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/common/Reveal";
import { Stagger, StaggerItem } from "@/components/common/Reveal";
import { signatureFlagships } from "@/data/signature";
import { IMG } from "@/data/images";

const conservancyUnlocks = [
  {
    icon: Car,
    title: "Off-road driving",
    body: "Get close to a leopard in the riverine forest, not stuck on a track 200 metres away.",
  },
  {
    icon: Clock,
    title: "Night game drives",
    body: "A completely different cast: aardvark, bushbaby, genet, and hunting big cats after dark.",
  },
  {
    icon: Users,
    title: "Walking safaris",
    body: "Track on foot with an armed Maasai guide, reading the bush the way it was meant to be read.",
  },
  {
    icon: Car,
    title: "Vehicle caps",
    body: "Typically one guest per 350 acres, so a sighting is yours — not a traffic jam.",
  },
  {
    icon: Leaf,
    title: "Direct community benefit",
    body: "Your spend pays Maasai landowners directly — a story worth telling.",
  },
];

const facts = [
  { label: "Vehicle Caps", value: "~1 guest / 350 acres", icon: Car },
  { label: "Best Time", value: "Jul–Oct peak · Jan–Mar calving", icon: Clock },
  { label: "Community", value: "Spend pays Maasai landowners directly", icon: Leaf },
];

const signatureSortOptions = [
  { label: "Featured order", value: "featured" },
  { label: "Duration: short first", value: "duration-asc" },
  { label: "Duration: long first", value: "duration-desc" },
];

export default function SignatureHubPage() {
  const [activeFlagship, setActiveFlagship] = useState(0);
  const [sort, setSort] = useState("featured");
  const featured = signatureFlagships[activeFlagship];

  const sortedFlagships = useMemo(() => {
    const list = [...signatureFlagships];
    if (sort === "duration-asc") return list.sort((a, b) => a.nights - b.nights);
    if (sort === "duration-desc") return list.sort((a, b) => b.nights - a.nights);
    return list;
  }, [sort]);

  return (
    <Page>
      <SEO
        title="Signature Collection — Four Private Conservancy Journeys"
        description="Four conservancy-led journeys where the wild is private and the wilderness is yours alone. Off-road drives, night safaris, walking experiences and direct community benefit — impossible in the national parks."
        path="/signature"
        image={IMG.lion}
      />

      {/* HERO BAND */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMG.savanna}
            alt="Signature Collection — Kenya's private conservancies"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/25" />
        </div>
        <Container className="relative z-10 pb-16 pt-36">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
          >
            Signature Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Four conservancy-led journeys
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 max-w-xl font-display text-lg italic text-white/80"
          >
            Where the wild is private, and the wilderness is yours alone
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button to="/packages" variant="secondary" size="md">
              Inquire Now
            </Button>
            <Button href="#collection" variant="white" size="md">
              Explore the Collection
            </Button>
          </motion.div>
        </Container>
      </section>

      {/* WHY THESE ARE DIFFERENT */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Why these are different"
                title="A safari that feels genuinely private"
                subtitle=""
              />
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
                <p>
                  Most Kenya safaris run the same route through the same crowded national reserve, where a single lion sighting can draw thirty vehicles. These four journeys do the opposite. They are built around Kenya's private conservancies — Maasai-owned wilderness bordering the famous parks, where vehicle numbers are strictly capped, off-road driving is permitted, and night drives and walking safaris are possible.
                </p>
                <p>
                  The result is a safari that feels genuinely private: fewer vehicles, closer wildlife, and experiences the national parks simply cannot offer. This is where discerning travellers — and the agents who serve them — find real value.
                </p>
              </div>
            </Reveal>

            {/* What conservancies unlock */}
            <Reveal delay={0.1}>
              <div className="rounded-xl border border-sand-200 bg-sand p-6 lg:p-8">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-secondary">
                  What conservancies unlock that national parks cannot
                </p>
                <ul className="space-y-4">
                  {conservancyUnlocks.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <Check className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-primary">{item.title}</span>
                        <span className="block text-sm text-muted">{item.body}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* COLLECTION PICKER */}
      <section id="collection" className="bg-sand py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The collection"
              title="Choose your journey"
              subtitle="Four conservancy-led flagships, each with its own character, route and wildlife focus."
              align="center"
            />
          </Reveal>

          {/* Sort / results bar */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-sand-200 pb-5">
            <p className="text-sm text-muted">
              Showing{" "}
              <strong className="text-primary">{sortedFlagships.length}</strong>{" "}
              signature {sortedFlagships.length === 1 ? "journey" : "journeys"}
            </p>
            <div className="flex items-center gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded border border-sand-300 bg-white px-3 py-2 text-sm text-ink outline-none"
                aria-label="Sort signature journeys"
              >
                {signatureSortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[200px_1fr_320px]">
            {/* LEFT RAIL */}
            <Reveal delay={0.05} className="hidden lg:block">
              <nav className="sticky top-28 space-y-1">
                {signatureFlagships.map((f, i) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFlagship(i)}
                    className={`w-full rounded-lg px-4 py-3 text-left text-sm font-semibold transition-all ${
                      activeFlagship === i
                        ? "bg-accent/10 text-primary ring-1 ring-accent/40"
                        : "text-muted hover:bg-white hover:text-primary"
                    }`}
                  >
                    <span className="block text-xs font-bold uppercase tracking-widest text-accent/70 mb-0.5">
                      {f.number}
                    </span>
                    {f.name}
                  </button>
                ))}
              </nav>
            </Reveal>

            {/* CENTRE GRID */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {sortedFlagships.map((f, i) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Link
                    to={`/signature/${f.slug}`}
                    className="group block overflow-hidden rounded-xl border border-sand-200 bg-white shadow-soft transition-shadow hover:shadow-lift"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={f.image}
                        alt={f.name}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                      <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                        {f.number}
                      </span>
                      <div className="absolute bottom-0 p-4">
                        <p className="font-display text-lg font-bold leading-tight text-white">{f.name}</p>
                        <p className="mt-0.5 text-xs text-white/75 line-clamp-1">{f.tagline}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-4 text-xs text-muted">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-secondary" />
                          {f.duration}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-muted line-clamp-1">{f.route}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-secondary group-hover:gap-2 transition-all">
                        Explore Journey <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* RIGHT FEATURED CARD */}
            <Reveal delay={0.1} className="hidden lg:block">
              <div className="sticky top-28">
                <Link
                  to={`/signature/${featured.slug}`}
                  className="group block overflow-hidden rounded-xl shadow-lift"
                >
                  <div className="relative min-h-[320px] overflow-hidden">
                    <img
                      src={featured.gallery[1] ?? featured.image}
                      alt={featured.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 min-h-[320px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
                    <div className="absolute inset-x-0 top-4 flex justify-center">
                      <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                        Explore Now
                      </span>
                    </div>
                    <div className="absolute bottom-0 p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                        Featured · {featured.number}
                      </p>
                      <p className="font-display text-xl font-bold text-white">{featured.name}</p>
                      <p className="mt-1 text-xs text-white/75">{featured.tagline}</p>
                    </div>
                  </div>
                  <div className="bg-primary px-5 py-4">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-accent transition-colors">
                      Explore journey <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
                <div className="mt-3 flex gap-1">
                  {signatureFlagships.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveFlagship(i)}
                      className={`h-1.5 flex-1 rounded-full transition-all ${
                        activeFlagship === i ? "bg-accent" : "bg-sand-300"
                      }`}
                      aria-label={`Show flagship ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* FACTS TRIO */}
      <section className="bg-primary py-14">
        <Container>
          <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {facts.map((fact, i) => (
              <StaggerItem key={i}>
                <div className="flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur">
                  <fact.icon className="h-8 w-8 text-accent mb-3" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50 mb-1">{fact.label}</p>
                  <p className="text-sm font-semibold text-white">{fact.value}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* PROPERTIES DISCLAIMER + CTA */}
      <section className="bg-sand py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-secondary">
                A note on properties
              </p>
              <p className="text-sm leading-relaxed text-muted">
                Lodge names shown across these itineraries are well-known, real camps included as tier placeholders to illustrate the standard intended. Final properties and rates are confirmed through our vendor contracting process. They are indicative, not committed.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-12">
              <SectionHeading
                eyebrow="Begin your journey"
                title="Ready to explore the private side of Kenya?"
                subtitle="Every Signature itinerary is fully private and tailored to you. Book now and we'll build your conservancy journey from the ground up."
                align="center"
              />
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button to="/packages" variant="secondary" size="lg">
                  Inquire Now
                </Button>
                <Button to="/contact" variant="ghost" size="lg">
                  Speak with a Specialist
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* BREADCRUMB NAV */}
      <div className="border-t border-sand-200 bg-white py-4">
        <Container>
          <nav className="flex items-center gap-1 text-xs text-muted">
            <Link to="/" className="hover:text-secondary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary font-medium">Signature Collection</span>
          </nav>
        </Container>
      </div>
    </Page>
  );
}
