import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types";
import Page from "@/components/common/Page";
import SEO from "@/seo/SEO";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import BlogCard from "@/components/cards/BlogCard";
import { Stagger, StaggerItem } from "@/components/common/Reveal";
import { blogs, blogCategories } from "@/data/blogs";
import { formatDate } from "@/utils/format";
import { IMG } from "@/data/images";
import { cn } from "@/utils/cn";

const fetchBlogPosts = async (category: string, signal: AbortSignal) => {
  if (signal.aborted) {
    throw new DOMException("Request aborted", "AbortError");
  }

  await Promise.resolve();

  if (signal.aborted) {
    throw new DOMException("Request aborted", "AbortError");
  }

  const filtered = category === "All" ? blogs : blogs.filter((post) => post.category === category);
  return filtered;
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [featuredPost, setFeaturedPost] = useState<BlogPost | undefined>(blogs[0]);
  const [visiblePosts, setVisiblePosts] = useState<BlogPost[]>(blogs.slice(1));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestRef = useRef(0);

  const categories = useMemo(() => ["All", ...blogCategories], []);

  useEffect(() => {
    const controller = new AbortController();
    const requestId = ++requestRef.current;
    const category = selectedCategory;

    console.log(`[BlogPage] selected category: ${category}`);
    console.log(`[BlogPage] request start: ${category} (request ${requestId})`);

    setLoading(true);
    setError(null);

    fetchBlogPosts(category, controller.signal)
      .then((filtered) => {
        if (controller.signal.aborted) {
          console.log(`[BlogPage] request aborted after response: ${category} (request ${requestId})`);
          return;
        }

        if (requestId !== requestRef.current) {
          console.log(`[BlogPage] stale response ignored: ${category} (request ${requestId})`);
          return;
        }

        console.log(`[BlogPage] response received: ${category}, filtered posts count: ${filtered.length}`);

        if (filtered.length === 0) {
          setFeaturedPost(undefined as any);
          setVisiblePosts([]);
        } else {
          setFeaturedPost(filtered[0]);
          setVisiblePosts(filtered.slice(1));
        }

        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log(`[BlogPage] request aborted: ${category} (request ${requestId})`);
          return;
        }

        console.error(`[BlogPage] request error: ${category} (request ${requestId})`, err);
        setError("Unable to load blog posts. Please try again.");
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [selectedCategory]);

  const noPostsFound = !loading && !error && visiblePosts.length === 0 && !featuredPost;

  return (
    <Page>
      <SEO
        title="Travel Blog & East Africa Safari Guides"
        description="Expert East Africa travel tips, safari guides, wildlife stories and itinerary inspiration from the Luminyx Travel team. Plan smarter and travel deeper."
        path="/blog"
      />
      <PageHero
        eyebrow="Travel journal"
        title="The Blog"
        subtitle="Guides, tips and tales from the field to inspire and inform your East African adventure."
        image={IMG.acaciaSunset}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Blog" }]}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="mt-14 mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-sand-200 text-primary hover:bg-sand-300"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-sm font-medium text-red-700">
              {error}
            </div>
          ) : loading ? (
            <div className="rounded-xl border border-sand-200 bg-sand-50 p-8 text-center text-sm font-medium text-primary">
              Loading posts for “{selectedCategory}”...
            </div>
          ) : noPostsFound ? (
            <div className="rounded-xl border border-sand-200 bg-sand-50 p-8 text-center text-sm font-medium text-muted">
              No posts found for “{selectedCategory}”. Please choose another category.
            </div>
          ) : (
            <>
              {featuredPost && (
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="group grid grid-cols-1 overflow-hidden rounded-xl border border-sand-200 shadow-soft lg:grid-cols-2"
                >
                  <div className="aspect-[16/10] overflow-hidden lg:aspect-auto">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center bg-sand p-8 lg:p-12">
                    <Badge tone="accent" className="self-start">
                      {featuredPost.category}
                    </Badge>
                    <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-primary transition group-hover:text-secondary sm:text-3xl">
                      {featuredPost.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{featuredPost.description}</p>
                    <div className="mt-5 flex items-center gap-4 text-xs text-muted">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(featuredPost.date)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary">
                      Read article <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              )}

              <Stagger key={selectedCategory} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visiblePosts.map((post) => (
                  <StaggerItem key={post.id}>
                    <BlogCard post={post} />
                  </StaggerItem>
                ))}
              </Stagger>
            </>
          )}
        </Container>
      </section>
    </Page>
  );
}
