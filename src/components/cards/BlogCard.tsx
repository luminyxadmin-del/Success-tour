import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/types";
import { formatDate } from "@/utils/format";
import Badge from "@/components/ui/Badge";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="card-hover group flex h-full flex-col overflow-hidden rounded-lg border border-sand-200 bg-white shadow-soft">
      <Link to={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <img src={post.image} alt={post.title} loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute left-3 top-3"><Badge tone="accent">{post.category}</Badge></div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDate(post.date)}</span>
          <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
        </div>
        <h3 className="font-display text-lg font-bold leading-snug text-primary">
          <Link to={`/blog/${post.slug}`} className="transition hover:text-secondary">{post.title}</Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{post.description}</p>
        <p className="mt-4 text-xs font-medium text-muted">By {post.author}</p>
      </div>
    </article>
  );
}
