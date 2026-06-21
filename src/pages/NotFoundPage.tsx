import { Link } from "react-router-dom";
import { Home, Compass, ArrowRight } from "lucide-react";
import Page from "@/components/common/Page";
import SEO from "@/seo/SEO";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { IMG } from "@/data/images";

export default function NotFoundPage() {
  return (
    <Page>
      <SEO title="Page Not Found" description="The page you're looking for can't be found." noIndex />
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.acaciaSunset} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <Container className="relative z-10 text-center">
          <p className="font-display text-7xl font-bold text-accent sm:text-9xl">404</p>
          <h1 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">You've wandered off the trail</h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/75">
            The page you're looking for doesn't exist or may have moved. Let's get you back to the adventure.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button to="/" variant="secondary" size="lg"><Home className="h-4 w-4" /> Back Home</Button>
            <Button to="/packages" variant="white" size="lg"><Compass className="h-4 w-4" /> Browse Packages</Button>
          </div>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-accent">
            Need help? Contact us <ArrowRight className="h-4 w-4" />
          </Link>
        </Container>
      </section>
    </Page>
  );
}
