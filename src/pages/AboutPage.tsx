import { Target, Eye, Check } from "lucide-react";
import Page from "@/components/common/Page";
import SEO, { organizationSchema } from "@/seo/SEO";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/common/Reveal";
import StatCounter from "@/components/common/StatCounter";
import CTABanner from "@/components/common/CTABanner";
import { achievements } from "@/data/stats";
import { IMG } from "@/data/images";

export default function AboutPage() {
  return (
    <Page>
      <SEO
        title="About Us"
        description="Meet Luminyx Travel — a team of East Africa travel specialists crafting bespoke, responsible safaris across Kenya, Uganda and Tanzania since 2008. Discover our story, mission, values and people."
        path="/about"
        structuredData={organizationSchema}
      />
      <PageHero
        eyebrow="Our story"
        title="Experience Africa with Confidence."
        subtitle="Africa is not one destination—it's a collection of extraordinary experiences waiting to be discovered."
        image={IMG.acaciaSunset}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
      />

      {/* Intro */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="flex items-stretch gap-4">
                <img src={IMG.safariJeep} alt="Safari guide" className="h-[420px] w-1/2 rounded-lg object-cover" />
                <img src={IMG.maasaiCulture} alt="Maasai culture" className="h-[420px] w-1/2 rounded-lg object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4 text-base leading-relaxed text-muted">
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
                <p className="font-semibold text-primary">Discover Africa. Experience it the way it was meant to be.</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Leadership Philosophy */}
      <section className="bg-sand py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading align="center" title="Our Leadership Philosophy" className="mb-8" />
            <div className="mx-auto max-w-3xl">
              <p className="text-base leading-relaxed text-muted">
                At Luminyx Travel Africa, leadership is not measured by the destinations we offer, but by the trust we build.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted">Our approach is guided by four core principles:</p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3 text-base leading-relaxed text-muted">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-secondary" />
                  <span>Integrity in every relationship we build.</span>
                </li>
                <li className="flex items-start gap-3 text-base leading-relaxed text-muted">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-secondary" />
                  <span>Excellence in every journey we design.</span>
                </li>
                <li className="flex items-start gap-3 text-base leading-relaxed text-muted">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-secondary" />
                  <span>Partnership with trusted professionals across Africa.</span>
                </li>
                <li className="flex items-start gap-3 text-base leading-relaxed text-muted">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-secondary" />
                  <span>Innovation in creating travel experiences that inspire and connect.</span>
                </li>
              </ul>
              <p className="mt-4 text-base leading-relaxed text-muted">
                These principles define who we are and shape every experience we deliver.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-lg border border-sand-200 bg-white p-8 shadow-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/15 text-accent-dark">
                  <Eye className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold text-primary">Our Vision</h3>
                <div className="mt-3 space-y-3 text-base leading-relaxed text-muted">
                  <p>
                    To become Africa's most trusted travel and destination management partner, connecting travellers from around the world with authentic, sustainable and unforgettable African experiences.
                  </p>
                  <p>
                    We envision a future where travel inspires meaningful connections between people, cultures and destinations while contributing positively to local communities and responsible tourism across the continent.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-lg border border-sand-200 bg-white p-8 shadow-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <Target className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold text-primary">Our Mission</h3>
                <div className="mt-3 space-y-3 text-base leading-relaxed text-muted">
                  <p>Our mission is to deliver world-class travel experiences through exceptional service, local expertise and personalised planning.</p>
                  <p>We are committed to:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-secondary" />
                      <span>Creating memorable journeys tailored to every traveller.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-secondary" />
                      <span>Showcasing the incredible diversity, culture and natural beauty of Africa.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-secondary" />
                      <span>Delivering seamless travel solutions with professionalism and reliability.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-secondary" />
                      <span>Supporting responsible and sustainable tourism that benefits local communities and protects Africa's unique heritage.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Achievements */}
      <section className="bg-primary py-16">
        <Container>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {achievements.map((a) => <StatCounter key={a.label} stat={a} light />)}
          </div>
        </Container>
      </section>

<CTABanner image={IMG.lodgeTent} />
    </Page>
  );
}
