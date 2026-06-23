/**
 * Supabase API — centralised fetch functions for all content tables.
 * Each function maps DB snake_case columns → App camelCase types.
 * On error, the calling hook falls back to local data automatically.
 */

import { supabase } from "@/lib/supabase";
import type {
  TourPackage, Destination, BlogPost, Testimonial,
  Service, TeamMember, Stat, FAQ, TripType,
} from "@/types";

// ─── Type mappers ─────────────────────────────────────────────────────────────

function mapPackage(r: Record<string, unknown>): TourPackage {
  return {
    id:               String(r.id),
    slug:             String(r.slug),
    name:             String(r.name),
    destinationName:  String(r.destination_name ?? ""),
    locations:        Array.isArray(r.locations)  ? (r.locations  as string[])                    : [],
    duration:         String(r.duration ?? ""),
    days:             Number(r.days ?? 0),
    groupSize:        String(r.group_size ?? ""),
    price:            Number(r.price),
    rating:           Number(r.rating ?? 0),
    reviews:          Number(r.reviews_count ?? 0),
    type:             String(r.trip_type) as TripType,
    image:            String(r.image ?? ""),
    gallery:          Array.isArray(r.gallery)    ? (r.gallery    as string[])                    : [],
    shortDescription: String(r.short_description ?? ""),
    overview:         String(r.overview ?? ""),
    highlights:       Array.isArray(r.highlights) ? (r.highlights as string[])                    : [],
    itinerary:        Array.isArray(r.itinerary)  ? (r.itinerary  as TourPackage["itinerary"])    : [],
    included:         Array.isArray(r.included)   ? (r.included   as string[])                    : [],
    excluded:         Array.isArray(r.excluded)   ? (r.excluded   as string[])                    : [],
    faqs:             Array.isArray(r.faqs)        ? (r.faqs       as TourPackage["faqs"])         : [],
    nextDeparture:    String(r.next_departure ?? ""),
  };
}

function mapDestination(r: Record<string, unknown>): Destination {
  return {
    id:              String(r.id),
    slug:            String(r.slug),
    name:            String(r.name),
    region:          String(r.region ?? ""),
    tagline:         String(r.tagline ?? ""),
    description:     String(r.description ?? ""),
    longDescription: String(r.long_description ?? ""),
    image:           String(r.image ?? ""),
    gallery:         Array.isArray(r.gallery)         ? (r.gallery         as string[]) : [],
    activities:      Array.isArray(r.activities)      ? (r.activities      as string[]) : [],
    bestTime:        String(r.best_time ?? ""),
    highlights:      Array.isArray(r.highlights)      ? (r.highlights      as string[]) : [],
    relatedPackages: Array.isArray(r.related_packages) ? (r.related_packages as string[]) : [],
    routeKeyword:    r.route_keyword ? String(r.route_keyword) : undefined,
  };
}

function mapBlog(r: Record<string, unknown>): BlogPost {
  return {
    id:          String(r.id),
    slug:        String(r.slug),
    title:       String(r.title),
    description: String(r.description ?? ""),
    content:     Array.isArray(r.content) ? (r.content as string[]) : [],
    author:      String(r.author ?? ""),
    authorRole:  String(r.author_role ?? ""),
    date:        String(r.published_at ?? ""),
    readTime:    String(r.read_time ?? ""),
    category:    String(r.category ?? ""),
    image:       String(r.image ?? ""),
    tags:        Array.isArray(r.tags) ? (r.tags as string[]) : [],
  };
}

function mapTestimonial(r: Record<string, unknown>): Testimonial {
  return {
    id:       String(r.id),
    name:     String(r.name),
    role:     String(r.role ?? ""),
    location: String(r.location ?? ""),
    quote:    String(r.quote),
    rating:   Number(r.rating),
    avatar:   String(r.avatar ?? ""),
  };
}

function mapService(r: Record<string, unknown>): Service {
  return {
    id:              String(r.id),
    slug:            String(r.slug),
    title:           String(r.title),
    description:     String(r.description ?? ""),
    longDescription: String(r.long_description ?? ""),
    icon:            String(r.icon ?? ""),
    features:        Array.isArray(r.features) ? (r.features as string[]) : [],
  };
}

function mapTeamMember(r: Record<string, unknown>): TeamMember {
  return {
    id:    String(r.id),
    name:  String(r.name),
    role:  String(r.role ?? ""),
    bio:   String(r.bio ?? ""),
    image: String(r.image ?? ""),
  };
}

function mapStat(r: Record<string, unknown>): Stat {
  return {
    label:  String(r.label),
    value:  String(r.value),
    suffix: r.suffix ? String(r.suffix) : undefined,
  };
}

function mapFaq(r: Record<string, unknown>): FAQ {
  return {
    question: String(r.question),
    answer:   String(r.answer),
  };
}

// ─── Fetch functions ──────────────────────────────────────────────────────────

export async function fetchPackages(): Promise<TourPackage[]> {
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("is_published", true)
    .order("sort_order");
  if (error) throw error;
  return (data ?? []).map((r) => mapPackage(r as Record<string, unknown>));
}

export async function fetchPackageBySlug(slug: string): Promise<TourPackage | null> {
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data ? mapPackage(data as Record<string, unknown>) : null;
}

export async function fetchDestinations(): Promise<Destination[]> {
  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .eq("is_published", true)
    .order("sort_order");
  if (error) throw error;
  return (data ?? []).map((r) => mapDestination(r as Record<string, unknown>));
}

export async function fetchDestinationBySlug(slug: string): Promise<Destination | null> {
  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data ? mapDestination(data as Record<string, unknown>) : null;
}

export async function fetchBlogs(category?: string): Promise<BlogPost[]> {
  let query = supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });
  if (category && category !== "All") {
    query = query.eq("category", category);
  }
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map((r) => mapBlog(r as Record<string, unknown>));
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data ? mapBlog(data as Record<string, unknown>) : null;
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  if (error) throw error;
  return (data ?? []).map((r) => mapTestimonial(r as Record<string, unknown>));
}

export async function fetchServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("is_published", true)
    .order("sort_order");
  if (error) throw error;
  return (data ?? []).map((r) => mapService(r as Record<string, unknown>));
}

export async function fetchTeam(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  if (error) throw error;
  return (data ?? []).map((r) => mapTeamMember(r as Record<string, unknown>));
}

export async function fetchStats(): Promise<Stat[]> {
  const { data, error } = await supabase
    .from("site_stats")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []).map((r) => mapStat(r as Record<string, unknown>));
}

export async function fetchFaqs(): Promise<FAQ[]> {
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  if (error) throw error;
  return (data ?? []).map((r) => mapFaq(r as Record<string, unknown>));
}
