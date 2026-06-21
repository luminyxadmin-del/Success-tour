import Page from "@/components/common/Page";
import SEO from "@/seo/SEO";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/ui/Container";
import { company } from "@/data/company";
import { IMG } from "@/data/images";

const sections = [
  {
    h: "1. Booking & Deposits",
    p: [
      "A booking is confirmed once we receive your deposit and written acceptance of your itinerary and these terms. A deposit of 25% of the total trip cost is required to secure your reservation, with the balance due 45 days before departure.",
    ],
  },
  {
    h: "2. Pricing",
    p: [
      "All prices are quoted per person in US Dollars unless otherwise stated and are based on rates and exchange rates at the time of quoting. Prices may be subject to change due to factors beyond our control, such as park fees, fuel surcharges or currency fluctuations, until your booking is fully confirmed.",
    ],
  },
  {
    h: "3. Cancellations & Refunds",
    p: [
      "Cancellation charges vary by season and supplier and will be set out clearly in your booking confirmation. We strongly recommend comprehensive travel insurance covering cancellation, medical expenses and repatriation.",
    ],
  },
  {
    h: "4. Changes to Your Itinerary",
    p: [
      "We will do everything reasonable to operate your trip as planned, but itineraries may occasionally change due to weather, wildlife movements, road conditions or supplier availability. We reserve the right to make minor adjustments in the interest of safety and quality.",
    ],
  },
  {
    h: "5. Travel Documents & Health",
    p: [
      "You are responsible for holding a valid passport, the correct visas and any required vaccinations. We provide guidance, but it remains your responsibility to ensure you meet all entry and health requirements.",
    ],
  },
  {
    h: "6. Liability",
    p: [
      "We act as an agent for the suppliers who provide your transport, accommodation and activities. While we select partners with great care, we are not liable for loss, injury or damage arising from circumstances beyond our reasonable control.",
    ],
  },
  {
    h: "7. Governing Law",
    p: [
      "These terms are governed by the laws of Kenya. Any disputes shall be subject to the exclusive jurisdiction of the Kenyan courts.",
    ],
  },
  {
    h: "8. Contact",
    p: [
      `For any questions about these Terms & Conditions, please contact us at ${company.email}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <Page>
      <SEO
        title="Terms & Conditions"
        description="The terms and conditions governing bookings and travel arrangements with Luminyx Travel Kenya."
        path="/terms"
        noIndex
      />
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        subtitle="The terms that govern bookings and travel arrangements with us."
        image={IMG.savanna}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Terms & Conditions" }]}
      />
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-muted">Last updated: January 2026</p>
            <div className="mt-8 space-y-10">
              {sections.map((s) => (
                <div key={s.h}>
                  <h2 className="font-display text-xl font-bold text-primary sm:text-2xl">{s.h}</h2>
                  {s.p.map((para, i) => (
                    <p key={i} className="mt-3 text-base leading-relaxed text-muted">{para}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </Page>
  );
}
