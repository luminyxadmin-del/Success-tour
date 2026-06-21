import { useSearchParams } from "react-router-dom";
import { Clock, ShieldCheck, Sparkles, ThumbsUp } from "lucide-react";
import Page from "@/components/common/Page";
import SEO from "@/seo/SEO";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/common/Reveal";
import QuoteForm from "@/components/forms/QuoteForm";
import { IMG } from "@/data/images";

const perks = [
  { icon: Clock, title: "24-hour response", text: "A tailored proposal in your inbox within one working day." },
  { icon: Sparkles, title: "Fully bespoke", text: "Every itinerary designed from scratch around you." },
  { icon: ShieldCheck, title: "No obligation", text: "Free quote, no pressure, no payment to enquire." },
  { icon: ThumbsUp, title: "Expert guidance", text: "Honest advice from East Africa specialists." },
];

export default function QuotePage() {
  const [params] = useSearchParams();
  const defaultDestination = params.get("destination") ?? undefined;

  return (
    <Page>
      <SEO
        title="Request a Free Quote"
        description="Tell us about your dream East Africa trip and receive a free, tailor-made proposal within 24 hours. No obligation — just expert planning from Luminyx Travel."
        path="/quote"
      />
      <PageHero
        eyebrow="No obligation"
        title="Request a Quote"
        subtitle="Share a few details and our travel designers will craft a bespoke proposal — completely free."
        image={IMG.kilimanjaro}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Request a Quote" }]}
      />

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr]">
            {/* Perks */}
            <Reveal>
              <p className="eyebrow mb-3">Why request a quote?</p>
              <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl">Your dream trip starts here</h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                There are no silly questions and no commitment. The more you tell us, the more precisely we can
                tailor your journey — but even a rough idea is enough to get started.
              </p>
              <div className="mt-8 space-y-5">
                {perks.map((p) => (
                  <div key={p.title} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary"><p.icon className="h-5 w-5" /></span>
                    <div>
                      <h3 className="font-display text-base font-bold text-primary">{p.title}</h3>
                      <p className="text-sm text-muted">{p.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.1}>
              <div className="rounded-xl border border-sand-200 bg-white p-7 shadow-lift sm:p-9">
                <h3 className="mb-6 font-display text-2xl font-bold text-primary">Tell us about your trip</h3>
                <QuoteForm defaultDestination={defaultDestination} />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </Page>
  );
}
