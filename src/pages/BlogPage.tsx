import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BlogPost } from "@/types";
import Page from "@/components/common/Page";
import SEO from "@/seo/SEO";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/ui/Container";
import BlogCard, { BlogCardSkeleton } from "@/components/cards/BlogCard";
import { Stagger, StaggerItem } from "@/components/common/Reveal";
import { blogs, blogCategories } from "@/data/blogs";
import { IMG } from "@/data/images";
import { cn } from "@/utils/cn";
import { fetchBlogs } from "@/lib/api";

const PAGE_SIZE = 6;

/** Returns page numbers with "..." placeholders for large page counts. */
function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  if (left > 2) pages.push("...");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("...");
  pages.push(total);
  return pages;
}

const fetchBlogPosts = async (category: string, signal: AbortSignal) => {
  if (signal.aborted) {
    throw new DOMException("Request aborted", "AbortError");
  }
  try {
    const result = await fetchBlogs(category);
    if (signal.aborted) throw new DOMException("Request aborted", "AbortError");
    if (result.length > 0) return result;
  } catch (e) {
    if ((e as Error).name === "AbortError") throw e;
    // fall through to local fallback
  }
  // Local fallback
  if (signal.aborted) throw new DOMException("Request aborted", "AbortError");
  return category === "All" ? blogs : blogs.filter((post) => post.category === category);
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [allPosts, setAllPosts] = useState<BlogPost[]>(blogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);

  const categories = useMemo(() => ["All", ...blogCategories], []);

  // Pagination derived values
  const totalPages = Math.ceil(allPosts.length / PAGE_SIZE);
  const pagePosts = allPosts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const controller = new AbortController();
    const requestId = ++requestRef.current;
    const category = selectedCategory;

    setLoading(true);
    setError(null);

    fetchBlogPosts(category, controller.signal)
      .then((filtered) => {
        if (controller.signal.aborted || requestId !== requestRef.current) return;
        setAllPosts(filtered);
        setCurrentPage(1);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError("Unable to load blog posts. Please try again.");
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [selectedCategory]);

  const noPostsFound = !loading && !error && allPosts.length === 0;

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

      <section ref={sectionRef} className="bg-white py-16 lg:py-24">
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          ) : noPostsFound ? (
            <div className="rounded-xl border border-sand-200 bg-sand-50 p-8 text-center text-sm font-medium text-muted">
              No posts found for “{selectedCategory}”. Please choose another category.
            </div>
          ) : (
            <>
              <Stagger key={`${selectedCategory}-${currentPage}`} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {pagePosts.map((post) => (
                  <StaggerItem key={post.id}>
                    <BlogCard post={post} />
                  </StaggerItem>
                ))}
              </Stagger>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <nav
                  aria-label="Blog pagination"
                  className="mt-12 flex flex-wrap items-center justify-center gap-2"
                >
                  {/* Previous */}
                  <button
                    type="button"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Go to previous page"
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition",
                      currentPage === 1
                        ? "cursor-not-allowed bg-sand-100 text-muted opacity-50"
                        : "bg-sand-200 text-primary hover:bg-sand-300"
                    )}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  {/* Page numbers */}
                  {pageNumbers.map((page, idx) =>
                    page === "..." ? (
                      <span
                        key={`ellipsis-${idx}`}
                        className="px-1 text-sm text-muted"
                        aria-hidden="true"
                      >
                        &hellip;
                      </span>
                    ) : (
                      <button
                        key={page}
                        type="button"
                        onClick={() => goToPage(page)}
                        aria-label={`Go to page ${page}`}
                        aria-current={currentPage === page ? "page" : undefined}
                        className={cn(
                          "h-9 w-9 rounded-full text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                          currentPage === page
                            ? "bg-primary text-white shadow-sm"
                            : "bg-sand-200 text-primary hover:bg-sand-300"
                        )}
                      >
                        {page}
                      </button>
                    )
                  )}

                  {/* Next */}
                  <button
                    type="button"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Go to next page"
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition",
                      currentPage === totalPages
                        ? "cursor-not-allowed bg-sand-100 text-muted opacity-50"
                        : "bg-sand-200 text-primary hover:bg-sand-300"
                    )}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </nav>
              )}
            </>
          )}
        </Container>
      </section>
    </Page>
  );
}
