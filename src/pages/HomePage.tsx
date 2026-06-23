import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, ShieldCheck, Award, HeartHandshake, Leaf,
} from "lucide-react";
import Page from "@/components/common/Page";
import SEO, { organizationSchema } from "@/seo/SEO";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal, { Stagger, StaggerItem } from "@/components/common/Reveal";
import PackageSearch from "@/components/common/PackageSearch";
import CTABanner from "@/components/common/CTABanner";
import PackageCard from "@/components/cards/PackageCard";
import DestinationCard from "@/components/cards/DestinationCard";
import BlogCard from "@/components/cards/BlogCard";

import { destinations } from "@/data/destinations";
import { getDestinationHero } from "@/data/destinationImages";
import { packages, isDestinationInRoutes } from "@/data/packages";
import { blogs } from "@/data/blogs";
import { galleryImages } from "@/data/gallery";
import { cloudinaryOptimize } from "@/utils/cloudinary";

const whyChoose = [
  { icon: ShieldCheck, title: "17 Years of Expertise", text: "Nearly two decades crafting seamless, safe East Africa journeys for travellers worldwide." },
  { icon: HeartHandshake, title: "Tailor-Made, Always", text: "Every itinerary is private and personalised — your pace, your interests, your budget." },
  { icon: Award, title: "Award-Winning Guides", text: "KPSGA gold-rated driver-guides who turn every game drive into a masterclass." },
  { icon: Leaf, title: "Travel That Gives Back", text: "We partner with conservancies and communities so your trip protects what you came to see." },
];

const experiences = [
  {
    title: "The Great Migration",
    text: "Witness over a million wildebeest brave the Mara River.",
    // wildebeest migration image from the Maasai Mara package gallery
    image: "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781980695/zebras-wildebeest-migration-wildlife-animals-mammals-savanna-grassland-maasai-mara-national-game-res_ewjapy.webp",
  },
  {
    title: "Beneath Kilimanjaro",
    text: "Photograph giant elephant herds against Africa's highest peak.",
    // best Amboseli image: elephant herd with Kilimanjaro backdrop
    image: getDestinationHero("amboseli", ""),
  },
  {
    title: "Indian Ocean Bliss",
    text: "Unwind on the powder-white sands of the East African coast.",
    // coastal/ocean image from the project's package gallery
    image: "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781979556/sea-with-seagulls-flying-it-with-greenery-wall_jal770.webp",
  },
  {
    title: "Living Culture",
    text: "Share stories and song with Maasai and Samburu communities.",
    // Samburu National Reserve image (Samburu is referenced in the card text)
    image: getDestinationHero("samburu", ""),
  },
];

export default function HomePage() {
  const featuredDestinations = destinations
    .filter((d) => isDestinationInRoutes(d.routeKeyword ?? d.name))
    .slice(0, 6);
  const popularPackages = [...packages].sort((a, b) => b.rating - a.rating).slice(0, 6);
  const latestBlogs = blogs.slice(0, 3);
  const galleryPreview = galleryImages.slice(0, 8);

  return (
    <Page>
      <SEO
        title="Luxury East Africa Safaris & Tailor-Made Tours"
        description="Luminyx Travel crafts bespoke luxury safaris, beach escapes and cultural journeys across East Africa — Kenya, Uganda and Tanzania. Maasai Mara, Amboseli, Bwindi and beyond. Plan your dream trip today."
        path="/"
        structuredData={organizationSchema}
      />

      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              zIndex: 0,
            }}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ zIndex: 1, background: 'rgba(0,0,0,0.15)' }} />
        </div>

        <Container className="relative z-20 pt-28 pb-16">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display text-4xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
            >
              East Africa, <span className="text-accent">unforgettably</span> yours.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
            >
              From the thunder of the Great Migration to the hush of the Indian Ocean at dawn —
              we design private, luxurious safaris tailored entirely to you.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button to="/packages" variant="secondary" size="lg">Explore Packages <ArrowRight className="h-4 w-4" /></Button>
            </motion.div>

          </div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-12 max-w-3xl"
          >
            <PackageSearch />
          </motion.div>
        </Container>
      </section>

      {/* FEATURED DESTINATIONS */}
      <section className="bg-white py-8 lg:py-10">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Where to go"
              title="Featured destinations"
              subtitle="Extraordinary destinations across Kenya, Uganda and Tanzania — from the big-cat plains of the Mara to the gorilla forests of Bwindi."
            />
            <Link to="/destinations" className="link-underline hidden text-sm font-semibold text-secondary sm:inline-flex sm:items-center sm:gap-1.5">
              View all destinations <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredDestinations.map((d) => (
              <StaggerItem key={d.id} className="aspect-[4/3]">
                <DestinationCard destination={d} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* POPULAR PACKAGES */}
      <section className="bg-sand py-8 lg:py-10">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Most loved journeys"
            title="Popular tour packages"
            subtitle="Hand-crafted itineraries our guests rate most highly — ready to book or fully customisable."
            className="mb-12"
          />
          <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popularPackages.map((p) => (
              <StaggerItem key={p.id} className="h-full"><PackageCard pkg={p} /></StaggerItem>
            ))}
          </Stagger>
          <div className="mt-12 text-center">
            <Button to="/packages" variant="primary" size="lg">View All {packages.length} Packages <ArrowRight className="h-4 w-4" /></Button>
          </div>
        </Container>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-white py-8 lg:py-10">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Why Luminyx Travel"
            title="The difference is in the detail"
            subtitle="We're not a booking engine. We're a team of East Africa specialists obsessed with crafting the trip of your life."
            className="mb-14"
          />
          <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map((w) => (
              <StaggerItem key={w.title}>
                <div className="card-hover h-full rounded-lg border border-sand-200 bg-white p-7 shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <w.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-primary">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{w.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* EXPERIENCE KENYA */}
      <section className="bg-primary py-12 lg:py-16">
        <Container>
          <SectionHeading
            light
            align="center"
            eyebrow="Experience East Africa"
            title="Moments that stay with you forever"
            subtitle="Three extraordinary countries, a lifetime of experiences. Here's a taste of what awaits."
            className="mb-14"
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {experiences.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.08} className="aspect-[3/4]">
                <div className="group relative h-full overflow-hidden rounded-lg">
                  <img src={cloudinaryOptimize(e.image, 800)} alt={e.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-xl font-bold text-white">{e.title}</h3>
                    <p className="mt-1 text-sm text-white/75">{e.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="bg-white py-8 lg:py-10">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="In pictures" title="A glimpse of the magic" subtitle="Real moments from across our journeys throughout East Africa." />
            <Link to="/gallery" className="link-underline hidden text-sm font-semibold text-secondary sm:inline-flex sm:items-center sm:gap-1.5">
              View full gallery <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {galleryPreview.map((g, i) => (
              <Reveal key={g.id} delay={i * 0.04} className="aspect-[4/3]">
                <Link to="/gallery" className="group block h-full overflow-hidden rounded-lg">
                  <img src={cloudinaryOptimize(g.src, 800)} alt={g.caption} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* LATEST BLOGS */}
      <section className="bg-sand py-8 lg:py-10">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Travel journal" title="Stories & travel inspiration" subtitle="Tips, guides and tales from the field to fuel your East African wanderlust." />
            <Link to="/blog" className="link-underline hidden text-sm font-semibold text-secondary sm:inline-flex sm:items-center sm:gap-1.5">
              Read the blog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Stagger className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {latestBlogs.map((b) => (
              <StaggerItem key={b.id}><BlogCard post={b} /></StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <CTABanner />
    </Page>
  );
}
