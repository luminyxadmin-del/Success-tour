import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, ChevronRight, Tag, ArrowLeft } from "lucide-react";
import Page from "@/components/common/Page";
import SEO from "@/seo/SEO";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/ui/SectionHeading";
import BlogCard from "@/components/cards/BlogCard";
import CTABanner from "@/components/common/CTABanner";
import NotFoundPage from "./NotFoundPage";
import { getBlog, blogs } from "@/data/blogs";
import { formatDate } from "@/utils/format";

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const post = slug ? getBlog(slug) : undefined;

  if (!post) return <NotFoundPage />;

  const related = blogs.filter((b) => b.id !== post.id && b.category === post.category).slice(0, 3);
  const fallback = blogs.filter((b) => b.id !== post.id).slice(0, 3);
  const suggestions = related.length >= 3 ? related : fallback;

  return (
    <Page>
      <SEO
        title={post.title}
        description={post.description}
        path={`/blog/${post.slug}`}
        image={post.image}
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          image: post.image,
          datePublished: post.date,
          author: { "@type": "Person", name: post.author },
        }}
      />

      {/* Hero */}
      <section className="relative flex min-h-[55vh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/55 to-primary/30" />
        </div>
        <Container className="relative z-10 pb-12 pt-32">
          <nav className="mb-4 flex flex-wrap items-center gap-1 text-xs font-medium text-white/70">
            <Link to="/" className="hover:text-accent">Home</Link><ChevronRight className="h-3 w-3" />
            <Link to="/blog" className="hover:text-accent">Blog</Link><ChevronRight className="h-3 w-3" />
            <span className="text-white">{post.category}</span>
          </nav>
          <Badge tone="accent">{post.category}</Badge>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight text-white sm:text-5xl">{post.title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
            <span>By <strong className="text-white">{post.author}</strong>, {post.authorRole}</span>
            <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4 text-accent" />{formatDate(post.date)}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-accent" />{post.readTime}</span>
          </div>
        </Container>
      </section>

      {/* Article */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-lg font-medium leading-relaxed text-primary">{post.description}</p>
            <div className="mt-8 space-y-6">
              {post.content.map((para, i) => (
                <p key={i} className="text-base leading-[1.8] text-muted">{para}</p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-sand-200 pt-6">
              <Tag className="h-4 w-4 text-secondary" />
              {post.tags.map((t) => (
                <span key={t} className="rounded-full bg-sand-200 px-3 py-1 text-xs font-medium text-primary">{t}</span>
              ))}
            </div>

            <Link to="/blog" className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-secondary-dark">
              <ArrowLeft className="h-4 w-4" /> Back to all articles
            </Link>
          </div>
        </Container>
      </section>

      {/* Related */}
      {suggestions.length > 0 && (
        <section className="bg-sand py-20 lg:py-28">
          <Container>
            <SectionHeading align="center" eyebrow="Keep reading" title="Related articles" className="mb-12" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {suggestions.map((b) => <BlogCard key={b.id} post={b} />)}
            </div>
          </Container>
        </section>
      )}

      <CTABanner />
    </Page>
  );
}
