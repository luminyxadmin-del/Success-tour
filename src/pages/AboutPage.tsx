import { Target, Eye, Check } from "lucide-react";
import Page from "@/components/common/Page";
import SEO, { organizationSchema } from "@/seo/SEO";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal, { Stagger, StaggerItem } from "@/components/common/Reveal";
import StatCounter from "@/components/common/StatCounter";
import CTABanner from "@/components/common/CTABanner";
import { company } from "@/data/company";
import { team } from "@/data/team";
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
        title="About Luminyx Travel"
        subtitle="East Africa-born, traveller-obsessed and conservation-minded — crafting journeys that change how you see the world since 2008."
        image={IMG.acaciaSunset}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
      />

      {/* Story */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="grid grid-cols-2 gap-4">
                <img src={IMG.safariJeep} alt="Safari guide" className="aspect-[3/4] w-full rounded-lg object-cover" />
                <img src={IMG.maasaiCulture} alt="Maasai culture" className="mt-8 aspect-[3/4] w-full rounded-lg object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="eyebrow mb-3">Since {company.founded}</p>
              <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl">A passion for East Africa, shared with the world</h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
                <p>
                  Luminyx Travel was founded in {company.founded} by a small team of Nairobi-based
                  guides with one conviction: that an East Africa safari, done right, can change a life — both the
                  traveller's and the communities who call this land home.
                </p>
                <p>
                  Nearly two decades later, we've welcomed over twelve thousand guests from every corner of the
                  globe across Kenya, Uganda and Tanzania, yet we've never lost our founding spirit. Every itinerary
                  is still designed by hand, every guide hand-picked, and every journey built to give back to the
                  wildlife and people of East Africa.
                </p>
                <p>
                  We're not the biggest operator — and we never want to be. We're the one that remembers your name,
                  anticipates your needs, and turns a holiday into the story you'll tell for the rest of your life.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="bg-sand py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-lg border border-sand-200 bg-white p-8 shadow-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary"><Target className="h-6 w-6" /></span>
                <h3 className="mt-5 font-display text-2xl font-bold text-primary">Our mission</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{company.mission}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-lg border border-sand-200 bg-white p-8 shadow-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/15 text-accent-dark"><Eye className="h-6 w-6" /></span>
                <h3 className="mt-5 font-display text-2xl font-bold text-primary">Our vision</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{company.vision}</p>
              </div>
            </Reveal>
          </div>

          {/* Values */}
          <div className="mt-16">
            <SectionHeading align="center" eyebrow="What we stand for" title="Our values" className="mb-12" />
            <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {company.values.map((v) => (
                <StaggerItem key={v.title}>
                  <div className="h-full rounded-lg bg-white p-6 shadow-soft">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-white"><Check className="h-5 w-5" /></span>
                    <h4 className="mt-4 font-display text-lg font-bold text-primary">{v.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{v.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
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

      {/* Team */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="The people behind the journeys"
            title="Meet our team"
            subtitle="Guides, designers and dreamers who pour their hearts into every trip we create."
            className="mb-14"
          />
          <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <StaggerItem key={m.id}>
                <div className="card-hover group overflow-hidden rounded-lg border border-sand-200 bg-white shadow-soft">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-primary">{m.name}</h3>
                    <p className="text-xs font-semibold uppercase tracking-wide text-secondary">{m.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{m.bio}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <CTABanner image={IMG.lodgeTent} />
    </Page>
  );
}
