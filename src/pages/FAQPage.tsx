import { Link } from "react-router-dom";
import Page from "@/components/common/Page";
import SEO from "@/seo/SEO";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/common/Accordion";
import Button from "@/components/ui/Button";
import Reveal from "@/components/common/Reveal";
import { generalFaqs } from "@/data/faqs";
import { IMG } from "@/data/images";

export default function FAQPage() {
  return (
    <Page>
      <SEO
        title="Frequently Asked Questions"
        description="Answers to common questions about travelling in East Africa with Luminyx Travel — visas, health, safety, best times to visit, booking, packing and more."
        path="/faq"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: generalFaqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
      <PageHero
        eyebrow="Good to know"
        title="FAQ"
        subtitle="Everything you might want to know before you travel. Can't find your answer? Just ask us."
        image={IMG.giraffe}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "FAQ" }]}
      />

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              align="center"
              eyebrow="Your questions, answered"
              title="Frequently asked questions"
              className="mb-12"
            />
            <Reveal><Accordion items={generalFaqs} /></Reveal>

            <div className="mt-12 rounded-xl border border-sand-200 bg-sand p-8 text-center">
              <h3 className="font-display text-xl font-bold text-primary">Still have a question?</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                Our team is happy to help with anything at all — no question is too small.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button to="/contact" variant="primary" size="md">Contact Us</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Page>
  );
}
