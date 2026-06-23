import { motion } from "framer-motion";
import { Target, Eye, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Page from "@/components/common/Page";
import SEO, { organizationSchema } from "@/seo/SEO";
import Container from "@/components/ui/Container";
import Reveal from "@/components/common/Reveal";
import CTABanner from "@/components/common/CTABanner";
import { IMG } from "@/data/images";

// Cinematic hero: safari car with wildebeest in the Masai Mara
const HERO_IMAGE =
  "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781980933/safari-concept-safari-car-with-wildebeests-african-savannah-masai-mara-national-park-kenya_jlcxit.webp";
// Intro pair: safari jeeps at Amboseli | elephant beneath Kilimanjaro
const INTRO_IMG_LEFT =
  "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781980074/tourists-safari-jeeps-watching-taking-photos-big-wild-elephant-crossing-dirt-road-amboseli-national-park-kenya-panorama_hkmhhl.webp";
const INTRO_IMG_RIGHT =
  "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781978672/view-kilimanjaro-elephant-amboseli-national-park-kenya-africa_zvm5ob.jpg";

const CORMORANT = "'Cormorant Garamond', 'Playfair Display', Georgia, serif";
const GOLD = "#C9933A";
const NAVY = "#0D1B2A";

const PRINCIPLES = [
  "Integrity in every relationship we build.",
  "Excellence in every journey we design.",
  "Partnership with trusted professionals across Africa.",
  "Innovation in creating travel experiences that inspire and connect.",
];

const COMMITMENTS = [
  "Creating memorable journeys tailored to every traveller.",
  "Showcasing the incredible diversity, culture and natural beauty of Africa.",
  "Delivering seamless travel solutions with professionalism and reliability.",
  "Supporting responsible and sustainable tourism that benefits local communities and protects Africa's unique heritage.",
];

export default function AboutPage() {
  return (
    <Page>
      <SEO
        title="About Us"
        description="Meet Luminyx Travel — a team of East Africa travel specialists crafting bespoke, responsible safaris across Kenya, Uganda and Tanzania since 2008. Discover our story, mission, values and people."
        path="/about"
        structuredData={organizationSchema}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Safari landscape"
            className="h-full w-full object-cover animate-kenburns"
          />
          {/* Multi-layer dark overlay for cinematic depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-transparent" />
        </div>

        <Container className="relative z-10 pb-24 pt-44">
          {/* Breadcrumbs */}
          <nav className="mb-10 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
            <Link to="/" className="transition hover:text-accent">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/80">About</span>
          </nav>

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-[11px] font-semibold uppercase tracking-[0.38em] text-accent"
          >
            Our Story
          </motion.p>

          {/* Heading — cinematic Cormorant Garamond */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="font-bold leading-[1.05] text-white"
            style={{ fontFamily: CORMORANT, fontSize: "clamp(3rem, 6vw, 5rem)" }}
          >
            Experience Africa<br />with Confidence.
          </motion.h1>

          {/* Animated gold underline */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "5.5rem", opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="mt-6 h-[3px] rounded-full"
            style={{ background: `linear-gradient(to right, ${GOLD}, #F59E0B)` }}
          />

          {/* Subtitle — thin weight */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-7 max-w-xl text-lg font-light leading-relaxed text-white/65"
          >
            Africa is not one destination — it's a collection of extraordinary experiences waiting to be discovered.
          </motion.p>
        </Container>
      </section>

      {/* ── INTRO ─────────────────────────────────────────────────────────── */}
      <section className="py-28" style={{ backgroundColor: "#FAF7F2" }}>
        <Container>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

            {/* Dual image with gold divider */}
            <Reveal>
              <div className="relative flex items-stretch gap-4">
                {/* Gold vertical line */}
                <div
                  className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2"
                  style={{
                    background: `linear-gradient(to bottom, transparent 5%, ${GOLD} 30%, ${GOLD} 70%, transparent 95%)`,
                  }}
                />
                <img
                  src={INTRO_IMG_LEFT}
                  alt="Safari jeeps at Amboseli"
                  className="w-[calc(50%-8px)] rounded-2xl object-cover"
                  style={{ height: "420px", boxShadow: "0 20px 60px rgba(15,23,42,0.18)" }}
                />
                <img
                  src={INTRO_IMG_RIGHT}
                  alt="Elephant beneath Kilimanjaro"
                  className="w-[calc(50%-8px)] rounded-2xl object-cover"
                  style={{ height: "420px", boxShadow: "0 20px 60px rgba(15,23,42,0.18)" }}
                />
              </div>
            </Reveal>

            {/* Body text */}
            <Reveal delay={0.12}>
              <div
                className="space-y-5"
                style={{ lineHeight: "1.9", fontSize: "1.05rem", color: "#2C2C2C" }}
              >
                <p>
                  At Luminyx Travel Africa, we specialise in designing journeys that go beyond sightseeing. As part of the Success Tours family, we combine international travel expertise with deep local knowledge to create authentic African experiences for leisure travellers, corporates, educational institutions and travel partners worldwide.
                </p>
                <p>
                  We create exceptional travel experiences for leisure travellers, corporate groups, MICE, educational institutions and tour operators looking to discover Africa through carefully curated journeys. From iconic wildlife safaris and breathtaking landscapes to cultural immersions, luxury escapes and business travel, every itinerary is designed with authenticity, comfort and attention to detail.
                </p>
                <p>
                  Our strength lies in our local presence. We work directly with trusted partners, hotels, transport providers and experienced guides across Africa, allowing us to deliver seamless experiences while maintaining the highest standards of quality, safety and service.
                </p>
                <p>
                  Whether you are planning an unforgettable safari, a corporate incentive programme, a destination wedding or a tailor-made holiday, Luminyx Travel Africa ensures every journey is professionally managed from arrival to departure.
                </p>
                <p>
                  From witnessing the Great Migration in Kenya and Tanzania to exploring Rwanda's mountain gorillas, the vineyards of South Africa, the waterways of Botswana and the pristine beaches of Zanzibar, every itinerary is thoughtfully crafted around your interests.
                </p>
                {/* Signature quote */}
                <p
                  className="mt-8 text-xl italic"
                  style={{ fontFamily: CORMORANT, color: GOLD, lineHeight: "1.5" }}
                >
                  Discover Africa. Experience it the way it was meant to be.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── LEADERSHIP PHILOSOPHY ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-28"
        style={{ backgroundColor: NAVY }}
      >
        {/* Dot-grid texture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(201,147,58,0.25) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            opacity: 0.18,
          }}
        />
        {/* Edge vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />

        <Container className="relative z-10">
          {/* Heading */}
          <Reveal>
            <div className="mb-16 text-center">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.38em] text-accent">
                What drives us
              </p>
              <h2
                className="text-4xl font-bold text-white sm:text-5xl"
                style={{ fontFamily: CORMORANT }}
              >
                Our Leadership Philosophy
              </h2>
              <div
                className="mx-auto mt-5 h-[3px] w-20 rounded-full"
                style={{ background: `linear-gradient(to right, ${GOLD}, #F59E0B)` }}
              />
            </div>
          </Reveal>

          <div className="mx-auto max-w-3xl">
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed" style={{ color: "#CBD5E1" }}>
                At Luminyx Travel Africa, leadership is not measured by the destinations we offer, but by the trust we build.
              </p>
              <p className="mt-4 text-base" style={{ color: "#94A3B8" }}>
                Our approach is guided by four core principles:
              </p>
            </Reveal>

            {/* Principles with gold diamond icons */}
            <div className="mt-12 space-y-9">
              {PRINCIPLES.map((text, i) => (
                <Reveal key={i} delay={0.15 + i * 0.09}>
                  <div className="flex items-start gap-6">
                    <span
                      className="mt-0.5 shrink-0 select-none text-2xl leading-none"
                      style={{ color: GOLD }}
                    >
                      ✦
                    </span>
                    <p className="text-lg leading-relaxed" style={{ color: "#CBD5E1" }}>
                      {text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.6}>
              <p className="mt-12 text-base italic" style={{ color: "#64748B" }}>
                These principles define who we are and shape every experience we deliver.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── VISION & MISSION ──────────────────────────────────────────────── */}
      <section className="py-28" style={{ backgroundColor: "#FAF7F2" }}>
        <Container>
          {/* Section heading */}
          <Reveal>
            <div className="mb-16 text-center">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.38em] text-secondary">
                Purpose & Direction
              </p>
              <h2
                className="text-4xl font-bold sm:text-5xl"
                style={{ fontFamily: CORMORANT, color: NAVY }}
              >
                Vision &amp; Mission
              </h2>
              <div
                className="mx-auto mt-5 h-[3px] w-20 rounded-full"
                style={{ background: `linear-gradient(to right, ${GOLD}, #F59E0B)` }}
              />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Vision card */}
            <Reveal>
              <div
                className="h-full rounded-2xl bg-white"
                style={{
                  borderTop: `4px solid ${GOLD}`,
                  padding: "48px",
                  boxShadow: "0 18px 60px rgba(15,23,42,0.10)",
                }}
              >
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "rgba(201,147,58,0.1)" }}
                >
                  <Eye className="h-7 w-7" style={{ color: GOLD }} />
                </span>
                <h3
                  className="mt-6 text-3xl font-bold"
                  style={{ fontFamily: CORMORANT, color: NAVY }}
                >
                  Our Vision
                </h3>
                <div className="mt-5 space-y-4 text-base leading-relaxed" style={{ color: "#4A5568" }}>
                  <p>
                    To become Africa's most trusted travel and destination management partner, connecting travellers from around the world with authentic, sustainable and unforgettable African experiences.
                  </p>
                  <p>
                    We envision a future where travel inspires meaningful connections between people, cultures and destinations while contributing positively to local communities and responsible tourism across the continent.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Mission card */}
            <Reveal delay={0.12}>
              <div
                className="h-full rounded-2xl bg-white"
                style={{
                  borderTop: "4px solid #0EA5A4",
                  padding: "48px",
                  boxShadow: "0 18px 60px rgba(15,23,42,0.10)",
                }}
              >
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "rgba(14,165,164,0.1)" }}
                >
                  <Target className="h-7 w-7 text-secondary" />
                </span>
                <h3
                  className="mt-6 text-3xl font-bold"
                  style={{ fontFamily: CORMORANT, color: NAVY }}
                >
                  Our Mission
                </h3>
                <div className="mt-5 space-y-4 text-base leading-relaxed" style={{ color: "#4A5568" }}>
                  <p>Our mission is to deliver world-class travel experiences through exceptional service, local expertise and personalised planning.</p>
                  <p>We are committed to:</p>
                  {/* Gold-bordered bullet list */}
                  <ul className="mt-2 space-y-4">
                    {COMMITMENTS.map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div
                          className="mt-2 h-5 w-[3px] shrink-0 rounded-full"
                          style={{ backgroundColor: GOLD }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTABanner image={IMG.lodgeTent} />
    </Page>
  );
}
