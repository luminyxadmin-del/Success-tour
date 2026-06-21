import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import Page from "@/components/common/Page";
import SEO, { organizationSchema } from "@/seo/SEO";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/common/Reveal";
import ContactForm from "@/components/forms/ContactForm";
import { company } from "@/data/company";
import { IMG } from "@/data/images";

export default function ContactPage() {
  const wa = company.whatsapp.replace(/[^0-9]/g, "");
  const details = [
    { icon: MapPin, label: "Visit us", value: company.address, sub: company.poBox || undefined },
    { icon: Phone, label: "Call us", value: company.phone, sub: company.phoneAlt !== company.phone ? company.phoneAlt : undefined, href: `tel:${company.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: "Email us", value: company.email, sub: company.salesEmail !== company.email ? company.salesEmail : undefined, href: `mailto:${company.email}` },
    { icon: Clock, label: "Working hours", value: company.hours },
  ];

  return (
    <Page>
      <SEO
        title="Contact Us"
        description="Get in touch with Luminyx Travel. Call, email, WhatsApp or visit our office — our East Africa travel specialists are ready to plan your perfect journey."
        path="/contact"
        structuredData={organizationSchema}
      />
      <PageHero
        eyebrow="Get in touch"
        title="Contact Us"
        subtitle="Questions, ideas or ready to book? Our Nairobi-based team would love to hear from you."
        image={IMG.nairobi}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Info */}
            <Reveal>
              <p className="eyebrow mb-3">We'd love to help</p>
              <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl">Let's plan something unforgettable</h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Whether you know exactly what you want or you're just starting to dream, reach out however suits
                you best. We typically reply within a few hours during working days.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {details.map((d) => (
                  <div key={d.label} className="rounded-lg border border-sand-200 bg-sand p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary"><d.icon className="h-5 w-5" /></span>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted">{d.label}</p>
                    {d.href ? (
                      <a href={d.href} className="mt-1 block text-sm font-semibold text-primary hover:text-secondary">{d.value}</a>
                    ) : (
                      <p className="mt-1 text-sm font-semibold text-primary">{d.value}</p>
                    )}
                    {d.sub && <p className="mt-1 text-xs text-muted">{d.sub}</p>}
                  </div>
                ))}
              </div>

              <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-white transition hover:bg-secondary-dark">
                <MessageCircle className="h-5 w-5" /> Chat with us on WhatsApp
              </a>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.1}>
              <div className="rounded-xl border border-sand-200 bg-white p-7 shadow-lift sm:p-9">
                <h3 className="mb-6 font-display text-2xl font-bold text-primary">Send us a message</h3>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Map placeholder */}
      <section className="bg-sand pb-20 lg:pb-28">
        <Container>
          <div className="overflow-hidden rounded-xl border border-sand-200 shadow-soft">
            <div className="relative aspect-[21/9] w-full bg-primary/5">
              <img src={IMG.nairobi} alt="Map location — Nairobi" className="h-full w-full object-cover opacity-60" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary shadow-lift">
                  <MapPin className="h-7 w-7" />
                </span>
                <p className="mt-3 font-display text-lg font-bold text-primary">{company.address}</p>
                <p className="text-sm text-muted">Interactive map placeholder — embed Google Maps here in production.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Page>
  );
}
