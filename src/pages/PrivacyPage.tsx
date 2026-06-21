import Page from "@/components/common/Page";
import SEO from "@/seo/SEO";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/ui/Container";
import { company } from "@/data/company";
import { IMG } from "@/data/images";

const sections = [
  {
    h: "1. Introduction",
    p: [
      `${company.name} ("we", "us", "our") is committed to protecting your privacy. This policy explains what information we collect when you use our website or services, how we use it, and the choices you have.`,
    ],
  },
  {
    h: "2. Information We Collect",
    p: [
      "We collect information you provide directly — such as your name, email address, phone number, country, travel preferences and any details you share when requesting a quote or contacting us.",
      "We also collect limited technical information automatically, such as your browser type, device and pages visited, to help us improve the website experience.",
    ],
  },
  {
    h: "3. How We Use Your Information",
    p: [
      "We use your information to respond to enquiries, prepare and deliver travel proposals, process bookings, provide customer support and, where you have consented, send occasional travel inspiration and offers.",
      "We never sell your personal information to third parties.",
    ],
  },
  {
    h: "4. Sharing With Trusted Partners",
    p: [
      "To deliver your trip, we may share necessary details with carefully selected suppliers such as lodges, camps, airlines and ground operators. These partners are only given the information required to fulfil your booking.",
    ],
  },
  {
    h: "5. Data Security & Retention",
    p: [
      "We apply appropriate technical and organisational measures to protect your data. We retain personal information only as long as necessary for the purposes described here or as required by law.",
    ],
  },
  {
    h: "6. Your Rights",
    p: [
      "You may request access to, correction of, or deletion of your personal data, and you may opt out of marketing communications at any time by contacting us.",
    ],
  },
  {
    h: "7. Contact Us",
    p: [
      `If you have any questions about this Privacy Policy or how we handle your data, please contact us at ${company.email} or write to us at ${company.poBox}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <Page>
      <SEO
        title="Privacy Policy"
        description="How Luminyx Travel collects, uses and protects your personal information."
        path="/privacy-policy"
        noIndex
      />
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use and protect your personal information."
        image={IMG.riftValley}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Privacy Policy" }]}
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
