import type { BlogPost } from "@/types";
import { IMG } from "./images";
import { slugify } from "@/utils/slugify";

interface Seed {
  title: string; description: string; author: string; authorRole: string;
  date: string; readTime: string; category: string; image: string;
  tags: string[]; content: string[];
}

const seeds: Seed[] = [
  {
    title: "The Best Time to Visit Kenya for Safari",
    description: "Migration, calving, green season or dry — here's how to choose the perfect month for your Kenyan adventure.",
    author: "Amani Wanjiru", authorRole: "Head of Safari Experiences", date: "2026-05-18", readTime: "7 min read",
    category: "Travel Tips", image: IMG.savanna, tags: ["Planning", "Safari", "Seasons"],
    content: [
      "Kenya rewards visitors year-round, but the experience shifts dramatically with the seasons. Understanding the rhythm of the rains, the migration and the calving season helps you match your trip to the wildlife moments that matter most to you.",
      "The long dry season from June to October is the classic safari window. Vegetation thins, wildlife concentrates around water, and from July the Great Migration thunders into the Maasai Mara — the single most dramatic time to witness river crossings.",
      "January and February offer a quieter, equally rewarding dry spell, with excellent big-cat sightings and the calving season on the southern plains. The green seasons of March–May and November bring lush landscapes, fewer visitors and lower prices, ideal for photographers and birders.",
      "Our advice: decide what you most want to see, then let the calendar follow. Our specialists will help you balance wildlife, weather, crowds and budget for the perfect departure date.",
    ],
  },
  {
    title: "Witnessing the Great Migration: A Complete Guide",
    description: "Everything you need to know about the wildebeest migration and how to see the legendary Mara River crossings.",
    author: "David Kiprop", authorRole: "Senior Safari Guide", date: "2026-05-02", readTime: "9 min read",
    category: "Wildlife", image: IMG.wildebeest, tags: ["Migration", "Maasai Mara", "Wildlife"],
    content: [
      "Often called the greatest wildlife show on Earth, the Great Migration sees over 1.5 million wildebeest, along with zebra and gazelle, move in a vast clockwise circuit between the Serengeti and the Maasai Mara in search of fresh grazing.",
      "The herds typically arrive in the Mara between July and October. The headline act is the river crossing, where columns of wildebeest brave crocodile-filled waters in chaotic, heart-stopping surges. Timing is unpredictable — patience and an expert guide are everything.",
      "To maximise your chances, base yourself near the Mara River for several nights and keep your schedule flexible. Crossings can happen at any time of day, so being positioned and ready is key.",
      "Beyond the crossings, the sheer density of predators following the herds makes this the finest time for big-cat action anywhere in Africa.",
    ],
  },
  {
    title: "Bush to Beach: The Perfect Kenya Itinerary",
    description: "Why combining a Maasai Mara safari with the Indian Ocean coast is the ultimate Kenyan journey.",
    author: "Grace Achieng", authorRole: "Travel Designer", date: "2026-04-21", readTime: "6 min read",
    category: "Itineraries", image: IMG.beach, tags: ["Beach", "Safari", "Honeymoon"],
    content: [
      "There is a reason the bush-to-beach itinerary is Kenya's most beloved combination. After the adrenaline and early starts of safari, the warm Indian Ocean is the perfect place to decompress and reflect.",
      "A typical journey spends three to four nights on safari — usually the Maasai Mara or Amboseli — before a short flight to the coast at Diani, Watamu or Lamu for three or more nights of barefoot relaxation.",
      "The contrast is the magic: dusty plains and roaring lions give way to coral reefs, dhow sunsets and fresh seafood. It works beautifully for honeymooners, families and first-time visitors alike.",
      "Our designers handle the seamless light-aircraft connections so the transition feels effortless — one moment you're tracking cheetah, the next you're snorkelling over a reef.",
    ],
  },
  {
    title: "Big Five Photography: Tips from Our Guides",
    description: "Field-tested advice for capturing lions, leopards, elephants, rhino and buffalo like a pro.",
    author: "Samuel Otieno", authorRole: "Photographic Guide", date: "2026-04-09", readTime: "8 min read",
    category: "Photography", image: IMG.lion, tags: ["Photography", "Big Five", "Tips"],
    content: [
      "Great wildlife photography is less about expensive gear and more about light, patience and understanding animal behaviour. Our photographic guides share the fundamentals that make the difference.",
      "Shoot in the golden hours just after dawn and before dusk, when low light flatters the savanna and animals are most active. Get low — eye-level with your subject creates intimacy and impact.",
      "Use a fast shutter speed for action, anticipate behaviour rather than chasing it, and don't neglect the wider scene: an elephant dwarfed by Kilimanjaro tells a bigger story than a tight portrait.",
      "Above all, be patient. The best moments reward those who wait quietly at a sighting, ready for the instant everything aligns.",
    ],
  },
  {
    title: "Responsible Tourism: How Your Safari Protects Kenya",
    description: "How well-planned travel funds conservation and supports the communities who safeguard Kenya's wildlife.",
    author: "Faith Njeri", authorRole: "Sustainability Lead", date: "2026-03-28", readTime: "7 min read",
    category: "Conservation", image: IMG.elephants, tags: ["Conservation", "Community", "Sustainability"],
    content: [
      "Tourism is one of the most powerful forces for conservation in Kenya. Park fees, conservancy leases and community partnerships give wildlife a tangible economic value — and a reason to be protected.",
      "Private conservancies in Laikipia, the Mara and beyond pay local landowners to keep their land open for wildlife, directly funding schools, clinics and ranger salaries.",
      "As a traveller, you can amplify this impact: choose operators with genuine conservation credentials, respect wildlife distances, minimise plastic and support community-owned lodges and crafts.",
      "Every journey we design channels a share of its value back into the landscapes and communities that make Kenya extraordinary.",
    ],
  },
  {
    title: "A First-Timer's Guide to Kenyan Safari Etiquette",
    description: "What to wear, how to behave at sightings and the unwritten rules of a respectful, rewarding safari.",
    author: "David Kiprop", authorRole: "Senior Safari Guide", date: "2026-03-15", readTime: "5 min read",
    category: "Travel Tips", image: IMG.safariJeep, tags: ["First Safari", "Etiquette", "Planning"],
    content: [
      "A few simple courtesies make every safari safer, calmer and more rewarding — for you, your fellow travellers and the wildlife.",
      "Wear neutral colours, keep your voice low at sightings and never stand up or hang out of the vehicle. Always follow your guide's instructions: they read the bush far better than any visitor.",
      "Pack light, layered clothing for cool mornings and warm afternoons, plus a wide-brimmed hat, sunscreen and binoculars. Soft duffel bags are essential for light-aircraft transfers.",
      "Finally, embrace the pace. Safari is about presence, not ticking boxes — some of the finest moments come from simply watching and waiting.",
    ],
  },
  {
    title: "Meet the Maasai: Culture on the Plains",
    description: "An introduction to the proud pastoralist people whose stewardship has shaped the Mara for centuries.",
    author: "Grace Achieng", authorRole: "Travel Designer", date: "2026-03-01", readTime: "6 min read",
    category: "Culture", image: IMG.acaciaSunset, tags: ["Culture", "Maasai", "Community"],
    content: [
      "No visit to southern Kenya is complete without an encounter with the Maasai, whose vivid red shukas and deep connection to the land are inseparable from the Mara's identity.",
      "Traditionally semi-nomadic cattle herders, the Maasai have long coexisted with wildlife, and today many communities are central partners in conservancy conservation.",
      "A respectful village visit offers insight into Maasai customs, from the adumu jumping dance to fire-making and beadwork — and, increasingly, into how tourism revenue is supporting education and healthcare.",
      "Approach these encounters with curiosity and respect, buy crafts directly from artisans, and you'll come away with a far richer understanding of the landscape.",
    ],
  },
  {
    title: "Diani vs Watamu vs Lamu: Choosing Your Coast",
    description: "A side-by-side guide to Kenya's three most beloved beach destinations.",
    author: "Amani Wanjiru", authorRole: "Head of Safari Experiences", date: "2026-02-18", readTime: "7 min read",
    category: "Itineraries", image: IMG.beachAerial, tags: ["Beach", "Coast", "Planning"],
    content: [
      "Kenya's coastline offers three distinct flavours of paradise, each suited to a different kind of traveller.",
      "Diani is the all-rounder — lively, well-serviced and home to world-class watersports and resorts. It suits families, honeymooners and first-timers who want plenty to do.",
      "Watamu is quieter and more nature-focused, with a protected marine park, turtle conservation and the mangroves of Mida Creek. It's ideal for divers and those seeking calm.",
      "Lamu is the dreamer's choice — a car-free UNESCO town of dhows, donkeys and timeless Swahili culture. Choose it for atmosphere, history and serene seclusion.",
    ],
  },
  {
    title: "Packing for Safari: The Essential Checklist",
    description: "Exactly what to bring (and what to leave at home) for a comfortable, hassle-free safari.",
    author: "Faith Njeri", authorRole: "Sustainability Lead", date: "2026-02-05", readTime: "5 min read",
    category: "Travel Tips", image: IMG.lodgeTent, tags: ["Packing", "Planning", "First Safari"],
    content: [
      "Packing smart for safari means thinking in layers, neutrals and soft luggage. Here's the short version of our tried-and-tested list.",
      "Clothing: lightweight neutral shirts and trousers, a warm fleece for chilly mornings, a waterproof layer, a wide-brimmed hat and comfortable closed shoes.",
      "Essentials: binoculars, sunscreen, insect repellent, a reusable water bottle, any personal medication and a good camera with spare batteries.",
      "Remember light-aircraft luggage limits — typically 15kg in a soft bag. Pack less than you think you need; lodges offer laundry, and you'll spend most days in the same comfortable safari wear.",
    ],
  },
  {
    title: "Family Safaris: Making Memories with Kids",
    description: "How to plan a safari that delights children and keeps parents relaxed from start to finish.",
    author: "Grace Achieng", authorRole: "Travel Designer", date: "2026-01-24", readTime: "6 min read",
    category: "Family Travel", image: IMG.elephantClose, tags: ["Family", "Kids", "Planning"],
    content: [
      "A family safari can be one of the most bonding experiences you'll ever share — with a little thoughtful planning to keep everyone comfortable and engaged.",
      "Choose family-friendly lodges with pools, flexible meal times and interconnecting rooms, and build in downtime so younger children don't tire of long drives.",
      "Interactive experiences keep kids enthralled: junior-ranger activities, the elephant orphanage and Giraffe Centre in Nairobi, and guides who turn every drive into a treasure hunt.",
      "Many camps welcome children from a certain age; we'll match you with properties and guides experienced in making safari magical for the whole family.",
    ],
  },
  {
    title: "The Magic of a Hot-Air Balloon Safari",
    description: "Drifting silently over the Mara at dawn is a bucket-list experience like no other. Here's what to expect.",
    author: "Samuel Otieno", authorRole: "Photographic Guide", date: "2026-01-10", readTime: "5 min read",
    category: "Experiences", image: IMG.acaciaSunset, tags: ["Balloon", "Maasai Mara", "Experiences"],
    content: [
      "There are few experiences as serene and surreal as floating over the Maasai Mara as the sun rises, the plains unfurling beneath you in soft golden light.",
      "Flights launch before dawn and last around an hour, drifting low over rivers and herds before climbing for sweeping panoramic views of the savanna.",
      "The flight traditionally ends with a champagne bush breakfast on the plains — a celebratory finale to an unforgettable morning.",
      "It's a popular addition to any Mara safari and a perennial highlight for honeymooners and photographers; book early, as spaces are limited.",
    ],
  },
  {
    title: "Honeymoon in Kenya: Romance in the Wild",
    description: "From candle-lit bush dinners to private plunge pools, why Kenya is a peerless honeymoon destination.",
    author: "Amani Wanjiru", authorRole: "Head of Safari Experiences", date: "2025-12-20", readTime: "6 min read",
    category: "Honeymoon", image: IMG.beachResort, tags: ["Honeymoon", "Romance", "Luxury"],
    content: [
      "Kenya was made for honeymoons — a place where adventure and indulgence meet under enormous skies.",
      "Picture private game drives followed by sundowners on a ridge, candle-lit dinners in the bush and nights in a tented suite with your own deck over the plains.",
      "Then there's the coast: barefoot beach villas, couples' spa rituals and dhow cruises into the sunset. The bush-to-beach honeymoon delivers the best of both worlds.",
      "We specialise in the thoughtful touches — surprise celebrations, flower-strewn beds and complete privacy — that turn a trip into a once-in-a-lifetime memory.",
    ],
  },
  {
    title: "Conservancies Explained: Beyond the National Parks",
    description: "Why private and community conservancies often deliver the most exclusive safari experiences.",
    author: "Faith Njeri", authorRole: "Sustainability Lead", date: "2025-12-06", readTime: "7 min read",
    category: "Conservation", image: IMG.giraffes, tags: ["Conservancies", "Conservation", "Luxury"],
    content: [
      "While national parks protect Kenya's most famous landscapes, the country's private and community conservancies offer something special: exclusivity, flexibility and tangible conservation impact.",
      "With limited vehicle numbers and the freedom to walk, drive at night and go off-road, conservancies deliver a more intimate, immersive safari than busy park hotspots.",
      "Crucially, they generate income for local communities who lease their land for wildlife, aligning conservation with livelihoods and reducing human-wildlife conflict.",
      "For travellers seeking privacy and purpose, a conservancy stay is often the highlight of the entire journey.",
    ],
  },
  {
    title: "Climbing Mount Kenya: What to Expect",
    description: "A trekker's guide to reaching Point Lenana on Africa's second-highest mountain.",
    author: "David Kiprop", authorRole: "Senior Safari Guide", date: "2025-11-22", readTime: "8 min read",
    category: "Adventure", image: IMG.kilimanjaro, tags: ["Trekking", "Mount Kenya", "Adventure"],
    content: [
      "Mount Kenya is a magnificent and often-overlooked trekking destination, its trekkers' summit, Point Lenana (4,985m), reachable without technical climbing skills.",
      "The classic route ascends the gentle Sirimon trail and descends the dramatic Chogoria, passing through bamboo forest, alpine moorland, glacial tarns and otherworldly giant lobelias.",
      "Acclimatisation is key: a measured pace, good hydration and time to adjust dramatically improve both your summit success and your enjoyment.",
      "Summit morning means a pre-dawn start to reach the peak for sunrise — a cold but utterly rewarding finale to a spectacular equatorial mountain.",
    ],
  },
  {
    title: "Why Kenya Should Top Your 2026 Travel List",
    description: "Iconic wildlife, stunning beaches, rich culture and world-class hospitality — Kenya has it all.",
    author: "Grace Achieng", authorRole: "Travel Designer", date: "2025-11-08", readTime: "6 min read",
    category: "Inspiration", image: IMG.savanna, tags: ["Inspiration", "Kenya", "Planning"],
    content: [
      "Few destinations pack as much variety into a single country as Kenya. In one trip you can track the Big Five, summit an equatorial mountain, dive a coral reef and immerse yourself in living culture.",
      "The wildlife alone is reason enough — the Great Migration, vast elephant herds beneath Kilimanjaro and some of the highest predator densities on Earth.",
      "Add the white-sand beaches of the Indian Ocean coast, the warmth of Kenyan hospitality and an outstanding range of lodges and camps, and the appeal is undeniable.",
      "With improving conservancy models and ever more sustainable options, 2026 is the perfect year to experience Kenya responsibly and unforgettably.",
    ],
  },
];

export const blogs: BlogPost[] = seeds.map((s, i) => ({
  id: `b${i + 1}`,
  slug: slugify(s.title),
  ...s,
}));

export const getBlog = (slug: string) => blogs.find((b) => b.slug === slug);
export const blogCategories = Array.from(new Set(blogs.map((b) => b.category)));
