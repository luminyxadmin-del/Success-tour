import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { IMG } from "@/data/images";
import { company } from "@/data/company";

interface Props {
  title?: string;
  subtitle?: string;
  image?: string;
}

export default function CTABanner({
  title = "Ready to plan your East Africa adventure?",
  subtitle = "Tell us your dream and our specialists will craft a tailor-made journey just for you — no obligation, no pressure.",
  image = IMG.acaciaSunset,
}: Props) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary/85" />
      </div>
      <Container className="relative z-10 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Start your journey
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75">
            {subtitle}
          </p>
          <div className="mt-8 flex items-center justify-center">
            <Button to="/packages" variant="secondary" size="lg">
              Book Now
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
