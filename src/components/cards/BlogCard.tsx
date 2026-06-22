import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/types";
import { formatDate } from "@/utils/format";
import Badge from "@/components/ui/Badge";
import { cloudinaryOptimize } from "@/utils/cloudinary";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="card-hover group flex h-full flex-col overflow-hidden rounded-lg border border-sand-200 bg-white shadow-soft">
      <Link to={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <img
          src={cloudinaryOptimize(post.image, 720)}
          srcSet={`${cloudinaryOptimize(post.image, 400)} 400w, ${cloudinaryOptimize(post.image, 720)} 720w, ${cloudinaryOptimize(post.image, 960)} 960w`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={post.title}
          loading="lazy"
          decoding="async"
          width={720}
          height={450}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
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

export function BlogCardSkeleton() {
  return (
    <article className="flex h-full animate-pulse flex-col overflow-hidden rounded-lg border border-sand-200 bg-white shadow-soft">
      <div className="aspect-[16/10] bg-sand-200" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex gap-4">
          <div className="h-3 w-20 rounded bg-sand-200" />
          <div className="h-3 w-16 rounded bg-sand-200" />
        </div>
        <div className="h-5 w-3/4 rounded bg-sand-200" />
        <div className="h-4 w-full rounded bg-sand-200" />
        <div className="h-4 w-5/6 rounded bg-sand-200" />
        <div className="mt-auto h-3 w-24 rounded bg-sand-200" />
      </div>
    </article>
  );
}
