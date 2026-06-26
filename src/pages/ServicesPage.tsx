import {
  Telescope, BedDouble, Plane, Users, Heart, Briefcase,
  Gem, Building2, Trophy, GraduationCap,
  Check, ArrowRight, type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import Page from "@/components/common/Page";
import SEO from "@/seo/SEO";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import CTABanner from "@/components/common/CTABanner";
import { services as localServices } from "@/data/services";
import { IMG } from "@/data/images";
import { fetchServices } from "@/lib/api";
import { useSupabaseData } from "@/hooks/useSupabaseData";

const iconMap: Record<string, LucideIcon> = {
  Telescope, BedDouble, Plane, Users, Heart, Briefcase,
  Gem, Building2, Trophy, GraduationCap,
};

const process = [
  { step: "01", title: "Tell us your dream", text: "Share your travel dates, interests and budget — by form, phone or email." },
  { step: "02", title: "We design your trip", text: "Our specialists craft a tailor-made itinerary and refine it until it's perfect." },
  { step: "03", title: "Relax & explore", text: "Travel with total confidence, backed by 24/7 on-the-ground support." },
];

export default function ServicesPage() {
  const { data: services } = useSupabaseData(fetchServices, localServices);
  return (
    <Page>
      <SEO
        title="Our Services"
        description="Full-service East Africa travel across Kenya, Uganda and Tanzania: safari tours, hotel & lodge booking, airport transfers, visa assistance, group tours, honeymoon packages and corporate travel — all handled by Luminyx Travel."
        path="/services"
      />
      <PageHero
        eyebrow="How we help"
        title="Our Services"
        subtitle="Everything you need for a seamless East Africa journey — Kenya, Uganda or Tanzania — handled end to end by people who care about the detail."
        image={IMG.lodgeTent}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
      />

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="What we offer"
            title="A complete travel partner"
            subtitle="From the first flicker of an idea to your final sundowner, we take care of every moving part."
            className="mb-14"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = iconMap[s.icon] ?? Telescope;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="flex"
                >
                  <div className="group flex w-full flex-col overflow-hidden rounded-xl border border-sand-200 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                    {/* Gradient accent bar */}
                    <div className="h-1 w-full shrink-0 bg-gradient-to-r from-secondary via-secondary/60 to-accent" />
                    <div className="flex flex-1 flex-col p-7">
                      <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/20 to-accent/10 text-secondary ring-1 ring-secondary/20">
                        <Icon className="h-7 w-7" />
                      </span>
                      <h3 className="mt-5 font-display text-xl font-bold text-primary">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{s.longDescription}</p>
                      <ul className="mt-4 space-y-1.5">
                        {s.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-ink">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-sand py-20 lg:py-28">
        <Container>
          <SectionHeading align="center" eyebrow="Simple & stress-free" title="How it works" className="mb-14" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {process.map((p) => (
              <div key={p.step} className="relative text-center">
                <span className="font-display text-5xl font-bold text-accent/40">{p.step}</span>
                <h3 className="mt-3 font-display text-xl font-bold text-primary">{p.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">{p.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Button to="/packages" variant="secondary" size="lg">Inquire Now <ArrowRight className="h-4 w-4" /></Button>
          </div>
        </Container>
      </section>

      <CTABanner image={IMG.beachResort} />
    </Page>
  );
}
