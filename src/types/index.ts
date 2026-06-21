export type TripType = "Safari" | "Beach" | "Adventure" | "Family" | "Honeymoon" | "Cultural" | "Luxury";

export interface Destination {
  id: string;
  slug: string;
  name: string;
  region: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  activities: string[];
  bestTime: string;
  highlights: string[];
  relatedPackages: string[]; // package slugs
  routeKeyword?: string; // search term for matching packages by route; defaults to name
}

export interface ItineraryDay {
  day: string;
  title: string;
  description: string;
  route?: string;
  meals?: string;
}

export interface TourPackage {
  id: string;
  slug: string;
  name: string;
  destinationName: string;
  locations: string[];
  duration: string;
  days: number;
  groupSize: string;
  price: number;
  rating: number;
  reviews: number;
  type: TripType;
  image: string;
  gallery: string[];
  shortDescription: string;
  overview: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  included: string[];
  excluded: string[];
  faqs: FAQ[];
  nextDeparture: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string[];
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  avatar: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string; // lucide icon name
  features: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  category: string;
  caption: string;
}

export interface SignatureDay {
  day: number;
  title: string;
  meta: string;
  description: string;
  signature?: string;
}

export interface SignaturePropertyTier {
  tier: "Luxury" | "Premium" | "Comfort";
  property: string;
  location: string;
}

export interface SignatureFlagship {
  id: string;
  slug: string;
  number: string;
  name: string;
  tagline: string;
  duration: string;
  nights: number;
  route: string;
  image: string;
  gallery: string[];
  audience: string[];
  itinerary: SignatureDay[];
  properties: SignaturePropertyTier[];
  seasonality: string[];
  differences: string[];
}
