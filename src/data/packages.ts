import type { TourPackage, TripType, ItineraryDay, FAQ } from "@/types";
import { IMG, galleryPool } from "./images";
import { slugify } from "@/utils/slugify";

const defaultIncluded = [
  "Airport transfers (JKIA / Wilson) on arrival and departure",
  "Transport in a custom 4×4 private safari land cruiser or safari minivan with pop-up roof for game viewing",
  "Services of a professional English-speaking driver-guide throughout",
  "Accommodation as specified (lodge or tented camp) on the chosen tier",
  "All meals as per itinerary (B = breakfast, L = lunch, D = dinner)",
  "All park and reserve entrance fees for the destinations listed",
  "All game drives as detailed in the itinerary",
  "500 ml mineral water in the safari vehicle during game drives and transfers",
  "Government taxes and tourism levies",
];

const defaultExcluded = [
  "International airfares and Kenya eVisa fees",
  "Travel and medical insurance (strongly recommended)",
  "Optional activities: hot air balloon safari, cultural village visits, boat safaris, Hell's Gate, Crescent Island (unless specified)",
  "Domestic flights between parks (road-based itineraries; fly-in option quoted separately on request)",
  "Drinks, alcoholic and soft beverages, unless stated as included",
  "Personal expenses: laundry, telephone, curios, tips and gratuities",
  "Tips for driver-guide and camp/lodge staff (USD 10–15 per guest per day suggested)",
  "Any meals not specified in the itinerary",
  "Items of a personal nature and anything not expressly listed under inclusions",
];

export const bookingNotes: { title?: string; note: string }[] = [
  { note: "For East Africa, Yellow Fever vaccination certificate is mandatory for travel." },
  {
    title: "Accommodation tiers",
    note: "Each package can be quoted at three levels — Budget (tented camps), Mid-range (lodges/tented camps), and Luxury (premium camps). Rates vary accordingly.",
  },
  {
    title: "Pricing basis",
    note: "Quoted per person on twin/double sharing. Single supplement applies. Child rates available when sharing with two adults.",
  },
  {
    title: "Seasonality",
    note: "High season (Jul–Oct, Dec–Mar); Low/Green season (Apr–Jun, Nov). Migration in the Mara is typically Jul–Oct.",
  },
  {
    title: "Fly-in option",
    note: "Any road itinerary can be converted to a fly-in (Wilson Airport to park airstrips) to reduce driving time — quoted on request.",
  },
  {
    title: "Group size",
    note: "Rates improve with group size. FIT (1–6 pax) and group (7+ pax) pricing available.",
  },
  {
    title: "Validity",
    note: "Confirm current-season rates and park fees at time of booking; park fees are revised periodically by the Kenya Wildlife Service and county authorities.",
  },
];

const defaultFaqs: FAQ[] = [
  {
    question: "Is this tour suitable for first-time safari-goers?",
    answer:
      "Absolutely. Our driver-guides tailor the pace and game-viewing to your experience level, and our vehicles are comfortable for all ages and fitness levels.",
  },
  {
    question: "What is the best time to take this trip?",
    answer:
      "Each itinerary notes its peak window, but Kenya offers rewarding game viewing year-round. We're happy to advise on timing for the Great Migration, calving season or quieter shoulder periods.",
  },
  {
    question: "Can the itinerary be customised?",
    answer:
      "Yes — every journey we operate is private and fully flexible. Book now and we'll adapt lodges, dates, pacing and activities to your wishes.",
  },
  {
    question: "What deposit is required to confirm?",
    answer:
      "A 25% deposit secures your booking, with the balance due 45 days before departure. No payment is required to receive a quote.",
  },
  {
    question: "Can I upgrade accommodation mid-trip?",
    answer:
      "Yes. Each package can be quoted at Budget, Mid-range or Luxury tier, and it's possible to mix tiers across different legs of the same journey.",
  },
];

interface Seed {
  name: string;
  destinationName: string;
  locations: string[];
  days: number;
  groupSize: string;
  price: number;
  rating: number;
  reviews: number;
  type: TripType;
  image: string;
  gallery?: string[];
  shortDescription: string;
  overview: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  nextDeparture: string;
}

const build = (s: Seed, i: number): TourPackage => ({
  id: `p${i + 1}`,
  slug: slugify(s.name),
  duration: `${s.days} Days / ${s.days - 1} Nights`,
  gallery: s.gallery ?? [
    s.image,
    galleryPool[i % galleryPool.length],
    galleryPool[(i + 3) % galleryPool.length],
    galleryPool[(i + 6) % galleryPool.length],
  ],
  included: defaultIncluded,
  excluded: defaultExcluded,
  faqs: defaultFaqs,
  ...s,
});

const it = (
  day: string,
  title: string,
  description: string,
  route?: string,
  meals?: string
): ItineraryDay => ({
  day,
  title,
  description,
  ...(route && { route }),
  ...(meals && { meals }),
});

const seeds: Seed[] = [
  // ── 1 ──────────────────────────────────────────────────────────────────────
  {
    name: "Masai Mara Explorer",
    destinationName: "Masai Mara",
    locations: ["Nairobi", "Masai Mara"],
    days: 4,
    groupSize: "Private group",
    price: 1890,
    rating: 4.8,
    reviews: 42,
    type: "Safari",
    image: "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781978378/herd-impalas-aepyceros-melampus-grassy-field-masai-mara-kenya_bs6icd.jpg",
    gallery: [
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781978277/elephant-walking-tsavo-east-national-park-kenya-africa_imvbdb.webp",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781978378/herd-impalas-aepyceros-melampus-grassy-field-masai-mara-kenya_bs6icd.jpg",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781978499/two-cheetahs-with-full-stomach-antelopes-gnus-savannah-masai-mara-national-park-kenya_broxed.webp",
    ],
    shortDescription:
      "The fastest route to Kenya's most iconic reserve — ideal for first-timers or those short on time who still want the Big Five and, in season, the Great Migration.",
    overview:
      "The Masai Mara Explorer is the definitive introduction to Kenya's most celebrated wildlife reserve. In four days you experience the full drama of the Mara — big-cat game drives across sweeping savanna plains, and in season (July–October) the spectacle of the Great Migration river crossings. The scenic drive from Nairobi via the Great Rift Valley escarpment viewpoint sets the scene before your first afternoon game drive.",
    highlights: [
      "Big Five game drives in the Mara",
      "Rift Valley escarpment viewpoint en route",
      "Mara River — seasonal Migration crossings",
      "Optional Maasai cultural village visit",
      "Optional hot air balloon safari (extra cost)",
    ],
    itinerary: [
      it(
        "Day 1",
        "Arrive in the Masai Mara",
        "Morning pickup from Nairobi hotel or JKIA. Scenic drive via the Great Rift Valley escarpment viewpoint and Narok town. Arrive at camp for lunch. Afternoon game drive in the Mara.",
        "Nairobi → Masai Mara (~265 km, 5–6 hrs)",
        "L, D"
      ),
      it(
        "Day 2",
        "Full day in the reserve",
        "Full day in the reserve with morning and afternoon game drives in search of lion, leopard, cheetah, elephant and buffalo. Optional Maasai village visit. Picnic lunch in the bush available.",
        "Full day — Masai Mara",
        "B, L, D"
      ),
      it(
        "Day 3",
        "Migration & balloon day",
        "Optional early-morning hot air balloon safari (extra cost). Continued game viewing across the plains and along the Mara River — prime spot for Migration crossings July–October.",
        "Full day — Masai Mara",
        "B, L, D"
      ),
      it(
        "Day 4",
        "Morning drive & return to Nairobi",
        "Morning game drive en route to the gate. After breakfast, depart for Nairobi. Arrive afternoon for drop-off at hotel or JKIA for onward flight.",
        "Masai Mara → Nairobi (5–6 hrs)",
        "B"
      ),
    ],
    nextDeparture: "2026-07-10",
  },
  // ── 2 ──────────────────────────────────────────────────────────────────────
  {
    name: "Amboseli Under Kilimanjaro",
    destinationName: "Amboseli",
    locations: ["Nairobi", "Amboseli"],
    days: 4,
    groupSize: "Private group",
    price: 1790,
    rating: 4.8,
    reviews: 38,
    type: "Safari",
    image: "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781978672/view-kilimanjaro-elephant-amboseli-national-park-kenya-africa_zvm5ob.jpg",
    gallery: [
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781978672/view-kilimanjaro-elephant-amboseli-national-park-kenya-africa_zvm5ob.jpg",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781978799/zebras-field-covered-grass-sunlight-sunset_t6cl7t.webp",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781978744/giraffe-acacia-trees-with-mount-kilimanjaro-background-beautiful-african-landscape-with-savannah-animals-mountains_ipvpmz.webp",
    ],
    shortDescription:
      "Kenya's classic elephant-and-Kilimanjaro experience — unmatched scenery and large, relaxed elephant herds against Africa's highest peak.",
    overview:
      "Amboseli Under Kilimanjaro delivers the most iconic image in African photography: vast elephant herds crossing dusty plains with Mount Kilimanjaro towering behind. Lower predator density than the Mara, but the scale of the elephant herds and the mountain backdrop are unrivalled anywhere on the continent. Two full days give you unhurried time with the giants, golden-hour photography at Observation Hill, and authentic Maasai culture through the conservancy partnership.",
    highlights: [
      "Big-tusker elephant herds against Kilimanjaro",
      "Observation Hill panoramic viewpoint",
      "Over 400 bird species in the swamps",
      "Optional Maasai cultural village visit",
      "Clearest mountain views at dawn",
    ],
    itinerary: [
      it(
        "Day 1",
        "Drive south to Amboseli",
        "Morning departure from Nairobi. Drive south through Maasai country. Arrive at lodge for lunch. Afternoon game drive with views of Mt. Kilimanjaro at dusk.",
        "Nairobi → Amboseli (~240 km, 4–5 hrs)",
        "L, D"
      ),
      it(
        "Day 2",
        "Elephant herds & Observation Hill",
        "Morning and afternoon game drives. Amboseli is famed for big-tusker elephants, plus lion, cheetah, giraffe and over 400 bird species. Visit Observation Hill for panoramic views.",
        "Full day — Amboseli",
        "B, L, D"
      ),
      it(
        "Day 3",
        "Sunrise Kilimanjaro & culture",
        "Sunrise game drive when Kilimanjaro is at its clearest. Optional Maasai cultural visit. Afternoon at leisure or further game viewing around the swamps.",
        "Full day — Amboseli",
        "B, L, D"
      ),
      it(
        "Day 4",
        "Morning drive & return to Nairobi",
        "Early game drive, breakfast, then return drive to Nairobi. Arrive midday for hotel drop-off or JKIA departure.",
        "Amboseli → Nairobi (4–5 hrs)",
        "B"
      ),
    ],
    nextDeparture: "2026-06-26",
  },
  // ── 3 ──────────────────────────────────────────────────────────────────────
  {
    name: "Mara & Nakuru Classic",
    destinationName: "Masai Mara & Lake Nakuru",
    locations: ["Nairobi", "Lake Nakuru", "Masai Mara"],
    days: 5,
    groupSize: "Private group",
    price: 2490,
    rating: 4.8,
    reviews: 55,
    type: "Safari",
    image: "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781979088/elephant-wildlife-animals-savanna-grassland-wilderness-maasai-mara-national-park-kenya-east-african_kuclx5.webp",
    gallery: [
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781979088/elephant-wildlife-animals-savanna-grassland-wilderness-maasai-mara-national-park-kenya-east-african_kuclx5.webp",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781979141/group-young-lions-hill-national-park-kenya-tanzania-masai-mara-serengeti_1_qhxfaa.webp",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781978994/pink-flamingos-flock-nakuru-lake-kenya_wdevff.webp",
    ],
    shortDescription:
      "Combines the rhino sanctuary and flamingo lake of Nakuru with the Mara's predator action — a well-balanced Rift Valley and savannah introduction.",
    overview:
      "The Mara & Nakuru Classic pairs two of Kenya's most distinctive ecosystems. Lake Nakuru's alkaline shores — rimmed with flamingos and home to both black and white rhino — provide a perfect contrast to the Masai Mara's open, predator-rich savannah. With two full days in the Mara, this five-day journey delivers a complete Kenyan wildlife experience in a compact, efficient itinerary.",
    highlights: [
      "Black and white rhino in Nakuru sanctuary",
      "Flamingo-pink lakeshores at Nakuru",
      "Rare Rothschild's giraffe",
      "Big Five game drives in the Mara",
      "Seasonal Migration river crossings",
    ],
    itinerary: [
      it(
        "Day 1",
        "Nairobi to Lake Nakuru",
        "Depart Nairobi after breakfast. Drive via the Rift Valley viewpoint to Lake Nakuru National Park. Lunch at lodge. Afternoon game drive — both black and white rhino, plus flamingos and Rothschild giraffe.",
        "Nairobi → Lake Nakuru (~160 km, 3 hrs)",
        "L, D"
      ),
      it(
        "Day 2",
        "Nakuru to Masai Mara",
        "Morning game drive in Nakuru. After breakfast, scenic transfer to the Masai Mara. Arrive for lunch, followed by an afternoon game drive.",
        "Lake Nakuru → Masai Mara (~210 km, 4 hrs)",
        "B, L, D"
      ),
      it(
        "Day 3",
        "Full day in the Mara",
        "Full day exploring the Mara with morning and afternoon drives. Optional balloon safari (extra cost) and Maasai village visit.",
        "Full day — Masai Mara",
        "B, L, D"
      ),
      it(
        "Day 4",
        "Mara river crossings day",
        "Another full day in the reserve. Maximise Big Five sightings and, in season (Jul–Oct), river-crossing action along the Mara River.",
        "Full day — Masai Mara",
        "B, L, D"
      ),
      it(
        "Day 5",
        "Morning drive & return to Nairobi",
        "Morning game drive, breakfast, then return to Nairobi. Afternoon arrival for drop-off.",
        "Masai Mara → Nairobi (5–6 hrs)",
        "B"
      ),
    ],
    nextDeparture: "2026-07-18",
  },
  // ── 4 ──────────────────────────────────────────────────────────────────────
  {
    name: "Samburu & Nakuru Northern Trail",
    destinationName: "Samburu & Lake Nakuru",
    locations: ["Nairobi", "Samburu", "Lake Nakuru"],
    days: 5,
    groupSize: "Private group",
    price: 2390,
    rating: 4.7,
    reviews: 29,
    type: "Safari",
    image: "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781979323/animals-wild-reticulated-giraffes-samburu-national-reserve-north-kenya_yv7flo.webp",
    gallery: [
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781979323/animals-wild-reticulated-giraffes-samburu-national-reserve-north-kenya_yv7flo.webp",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781979494/zebra-wildlife-animals-mammals-savanna-grassland-maasai-mara-national-game-reserve-park-narok-county_qkbdg6.webp",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781979556/sea-with-seagulls-flying-it-with-greenery-wall_jal770.webp",
    ],
    shortDescription:
      "Showcases the arid north's Samburu Special Five — species not found in the southern parks — paired with Nakuru's rhino sanctuary.",
    overview:
      "The Samburu & Nakuru Northern Trail is the definitive introduction to Kenya's arid north. The Samburu Special Five — Grevy's zebra, reticulated giraffe, Somali ostrich, gerenuk and beisa oryx — are found almost nowhere else in Kenya, and the palm-fringed Ewaso Nyiro riverbanks add dramatic scenery to exceptional game viewing. Paired with Lake Nakuru's rhino sanctuary and flamingo shores, this five-day journey covers two completely contrasting ecosystems.",
    highlights: [
      "Samburu Special Five — unique northern species",
      "Ewaso Nyiro river game drives",
      "Black and white rhino at Lake Nakuru",
      "Equator crossing near Nanyuki",
      "Optional Samburu cultural village visit",
    ],
    itinerary: [
      it(
        "Day 1",
        "Drive north to Samburu",
        "Early departure north past Mt. Kenya foothills and Nanyuki (equator crossing). Arrive Samburu for lunch. Afternoon game drive along the Ewaso Nyiro river.",
        "Nairobi → Samburu (~325 km, 6 hrs)",
        "L, D"
      ),
      it(
        "Day 2",
        "Full day in Samburu",
        "Morning and afternoon game drives seeking the Samburu Special Five, plus elephant, lion and leopard. Optional Samburu cultural village visit.",
        "Full day — Samburu",
        "B, L, D"
      ),
      it(
        "Day 3",
        "Samburu to Lake Nakuru",
        "Morning game drive, then long scenic transfer south through the Rift Valley to Lake Nakuru. Arrive late afternoon. Evening at leisure.",
        "Samburu → Lake Nakuru (~300 km, 5–6 hrs)",
        "B, L, D"
      ),
      it(
        "Day 4",
        "Full day in Lake Nakuru",
        "Full day in Nakuru — rhino tracking, flamingos, pelicans and tree-climbing lions. Visit Makalia Falls and lake viewpoints.",
        "Full day — Lake Nakuru",
        "B, L, D"
      ),
      it(
        "Day 5",
        "Morning drive & return to Nairobi",
        "Morning game drive, breakfast, return to Nairobi by midday for drop-off.",
        "Lake Nakuru → Nairobi (3 hrs)",
        "B"
      ),
    ],
    nextDeparture: "2026-07-24",
  },
  // ── 5 ──────────────────────────────────────────────────────────────────────
  {
    name: "Rift Valley & Mara Discovery",
    destinationName: "Rift Valley & Masai Mara",
    locations: ["Nairobi", "Lake Nakuru", "Lake Naivasha", "Masai Mara"],
    days: 6,
    groupSize: "Private group",
    price: 2990,
    rating: 4.8,
    reviews: 47,
    type: "Safari",
    image: "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781979718/elephant-loxodonta-africana-masai-mara-national-2026-03-25-00-58-50-utc_tzukwb.jpg",
    gallery: [
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781979718/elephant-loxodonta-africana-masai-mara-national-2026-03-25-00-58-50-utc_tzukwb.jpg",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781979730/view-from-sani-pass-back-towards-south-african-bor-2026-03-16-06-12-07-utc_a1lc1a.jpg",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781979730/view-from-sani-pass-back-towards-south-african-bor-2026-03-16-06-12-07-utc_a1lc1a.jpg",
    ],
    shortDescription:
      "Adds Lake Naivasha's boat safari and Crescent Island walking safari to the classic Nakuru–Mara circuit — a strong mix of water, walking and game-drive experiences.",
    overview:
      "The Rift Valley & Mara Discovery builds on the classic Nakuru–Mara circuit by adding the freshwater world of Lake Naivasha — papyrus-fringed shores, resident hippos and the Crescent Island walking safari where you move among giraffe and zebra on foot. An optional Hell's Gate cycling detour adds an adventurous dimension before two full days in the Masai Mara deliver the wildlife crescendo.",
    highlights: [
      "Lake Naivasha boat safari & hippo pods",
      "Crescent Island walking safari",
      "Optional Hell's Gate cycling in the gorge",
      "Black and white rhino at Lake Nakuru",
      "Two full days in the Masai Mara",
    ],
    itinerary: [
      it(
        "Day 1",
        "Nairobi to Lake Nakuru",
        "Depart Nairobi, drive to Lake Nakuru. Lunch at lodge, afternoon game drive featuring rhino and flamingos.",
        "Nairobi → Lake Nakuru (~160 km, 3 hrs)",
        "L, D"
      ),
      it(
        "Day 2",
        "Nakuru to Lake Naivasha",
        "Morning game drive in Nakuru, then short transfer to Lake Naivasha. Afternoon boat safari and optional Crescent Island walking safari among giraffe and zebra.",
        "Lake Nakuru → Lake Naivasha (~70 km, 1.5 hrs)",
        "B, L, D"
      ),
      it(
        "Day 3",
        "Naivasha to Masai Mara",
        "Optional morning visit to Hell's Gate National Park (cycling/walking). After lunch, transfer to the Masai Mara. Evening arrival.",
        "Lake Naivasha → Masai Mara (~230 km, 4–5 hrs)",
        "B, L, D"
      ),
      it(
        "Day 4",
        "Full day in the Mara",
        "Full day of game drives across the reserve. Optional balloon safari (extra cost).",
        "Full day — Masai Mara",
        "B, L, D"
      ),
      it(
        "Day 5",
        "Mara — Big Five & Migration",
        "Continued exploration, Big Five and Migration crossings in season (Jul–Oct). Optional Maasai village visit.",
        "Full day — Masai Mara",
        "B, L, D"
      ),
      it(
        "Day 6",
        "Morning drive & return to Nairobi",
        "Morning game drive, breakfast, return drive to Nairobi. Afternoon drop-off.",
        "Masai Mara → Nairobi (5–6 hrs)",
        "B"
      ),
    ],
    nextDeparture: "2026-08-06",
  },
  // ── 6 ──────────────────────────────────────────────────────────────────────
  {
    name: "Amboseli, Naivasha & Mara",
    destinationName: "Amboseli, Naivasha & Masai Mara",
    locations: ["Nairobi", "Amboseli", "Lake Naivasha", "Masai Mara"],
    days: 6,
    groupSize: "Private group",
    price: 3190,
    rating: 4.9,
    reviews: 63,
    type: "Safari",
    image: "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781980074/tourists-safari-jeeps-watching-taking-photos-big-wild-elephant-crossing-dirt-road-amboseli-national-park-kenya-panorama_hkmhhl.webp",
    gallery: [
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781980074/tourists-safari-jeeps-watching-taking-photos-big-wild-elephant-crossing-dirt-road-amboseli-national-park-kenya-panorama_hkmhhl.webp",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781979926/hippos-lake-naivasha-national-park-naivasha_etzmqr.jpg",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781980001/two-giraffes-two-zebras-masai-mara-kenya_lt7m8s.webp",
    ],
    shortDescription:
      "A scenic loop pairing Amboseli's Kilimanjaro elephants with Naivasha's lake activities and the Mara's predators — one of the most popular mid-length combinations.",
    overview:
      "Amboseli, Naivasha & Mara traces a classic Kenyan loop through three utterly distinct ecosystems. Iconic Kilimanjaro elephant photography at Amboseli, a boat safari on the papyrus-fringed shores of Lake Naivasha, and two full days of big-cat and Migration game viewing in the Masai Mara: each day delivers a completely different experience. A favourite combination for clients wanting maximum variety in a compact six-day window.",
    highlights: [
      "Kilimanjaro elephant photography at Amboseli",
      "Lake Naivasha boat safari & hippo pod",
      "Crescent Island walking safari (optional)",
      "Big Five in the Masai Mara",
      "Scenic Rift Valley escarpment drives",
    ],
    itinerary: [
      it(
        "Day 1",
        "Nairobi to Amboseli",
        "Morning departure to Amboseli. Lunch at lodge. Afternoon game drive with Kilimanjaro backdrop.",
        "Nairobi → Amboseli (~240 km, 4–5 hrs)",
        "L, D"
      ),
      it(
        "Day 2",
        "Full day in Amboseli",
        "Full day of game drives — big elephant herds, predators and birdlife. Sunrise mountain views.",
        "Full day — Amboseli",
        "B, L, D"
      ),
      it(
        "Day 3",
        "Amboseli to Lake Naivasha",
        "Long but scenic transfer skirting Nairobi up into the Rift Valley. Arrive Naivasha late afternoon. Evening at leisure by the lake.",
        "Amboseli → Lake Naivasha (~330 km, 6 hrs via Nairobi)",
        "B, L, D"
      ),
      it(
        "Day 4",
        "Naivasha to Masai Mara",
        "Morning boat safari on Lake Naivasha. After lunch, transfer to the Masai Mara. Evening arrival.",
        "Lake Naivasha → Masai Mara (~230 km, 4–5 hrs)",
        "B, L, D"
      ),
      it(
        "Day 5",
        "Full day in the Mara",
        "Full day of game drives. Optional balloon safari and Maasai cultural visit.",
        "Full day — Masai Mara",
        "B, L, D"
      ),
      it(
        "Day 6",
        "Morning drive & return to Nairobi",
        "Morning game drive, breakfast, return to Nairobi for afternoon drop-off.",
        "Masai Mara → Nairobi (5–6 hrs)",
        "B"
      ),
    ],
    nextDeparture: "2026-08-14",
  },
  // ── 7 ──────────────────────────────────────────────────────────────────────
  {
    name: "Classic Kenya Safari",
    destinationName: "Samburu, Nakuru & Masai Mara",
    locations: ["Nairobi", "Samburu", "Lake Nakuru", "Masai Mara"],
    days: 7,
    groupSize: "Private group",
    price: 3890,
    rating: 4.9,
    reviews: 74,
    type: "Safari",
    image: "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781980217/beautiful-lion-with-safari-car-background-kenya-africa_p6xlbg.jpg",
    gallery: [
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781980217/beautiful-lion-with-safari-car-background-kenya-africa_p6xlbg.jpg",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781980234/giraffe-is-standing-grass-with-car-background_p74hfi.jpg",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781980393/wild-giraffe-wildebeest-near-safari-car-masai-mara-national-park-kenya-safari-concept-african-travel-landscape_ksruor.webp",
    ],
    shortDescription:
      "The definitive northern-to-southern circuit — Samburu's special species, Nakuru's rhinos and the Mara's predators in one flagship journey.",
    overview:
      "The Classic Kenya Safari is the flagship itinerary for serious wildlife clients — a north-to-south arc covering the dramatic arid landscapes of Samburu, the flamingo-pink shores of Lake Nakuru and the predator-rich savannah of the Masai Mara. Each ecosystem is distinct, each delivers its own specialities, and with two full days in the Mara the total wildlife tally is exceptional. This is the tour that shows clients the full breadth of Kenya.",
    highlights: [
      "Samburu Special Five — unique northern species",
      "Rhino and flamingo at Lake Nakuru",
      "Two full days in the Masai Mara",
      "Equator crossing near Nanyuki",
      "Seasonal Migration river crossings",
    ],
    itinerary: [
      it(
        "Day 1",
        "Drive north to Samburu",
        "Drive north past Mt. Kenya and the equator. Arrive Samburu for lunch. Afternoon game drive by the river.",
        "Nairobi → Samburu (~325 km, 6 hrs)",
        "L, D"
      ),
      it(
        "Day 2",
        "Full day in Samburu",
        "Morning and afternoon drives for the Special Five, elephant and big cats. Optional cultural visit.",
        "Full day — Samburu",
        "B, L, D"
      ),
      it(
        "Day 3",
        "Samburu to Lake Nakuru",
        "Morning game drive, then scenic transfer south to Lake Nakuru. Late afternoon arrival.",
        "Samburu → Lake Nakuru (~300 km, 5–6 hrs)",
        "B, L, D"
      ),
      it(
        "Day 4",
        "Nakuru to Masai Mara",
        "Morning rhino and flamingo viewing in Nakuru. After breakfast, transfer to the Masai Mara. Afternoon game drive.",
        "Lake Nakuru → Masai Mara (~210 km, 4 hrs)",
        "B, L, D"
      ),
      it(
        "Day 5",
        "Full day in the Mara",
        "Full day of game drives. Optional balloon safari (extra cost).",
        "Full day — Masai Mara",
        "B, L, D"
      ),
      it(
        "Day 6",
        "Mara — Big Five & river crossings",
        "Continued exploration, Big Five and seasonal river crossings. Maasai village visit optional.",
        "Full day — Masai Mara",
        "B, L, D"
      ),
      it(
        "Day 7",
        "Morning drive & return to Nairobi",
        "Morning game drive, breakfast, return to Nairobi for afternoon drop-off.",
        "Masai Mara → Nairobi (5–6 hrs)",
        "B"
      ),
    ],
    nextDeparture: "2026-08-20",
  },
  // ── 8 ──────────────────────────────────────────────────────────────────────
  {
    name: "Mara, Nakuru, Naivasha & Amboseli",
    destinationName: "Masai Mara, Nakuru, Naivasha & Amboseli",
    locations: ["Nairobi", "Masai Mara", "Lake Nakuru", "Lake Naivasha", "Amboseli"],
    days: 7,
    groupSize: "Private group",
    price: 3990,
    rating: 4.8,
    reviews: 51,
    type: "Safari",
    image: "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781980563/beautiful-kilimanjaro-mountain-zebras-kenya-amboseli-national-park-africa_ekndxu.webp",
    gallery: [
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781980563/beautiful-kilimanjaro-mountain-zebras-kenya-amboseli-national-park-africa_ekndxu.webp",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781980695/zebras-wildebeest-migration-wildlife-animals-mammals-savanna-grassland-maasai-mara-national-game-res_ewjapy.webp",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781980546/flock-pink-african-flamingos-walking-around-blue-lagoon-background-bright-sky-sunny-day_rkw8w2.jpg",
    ],
    shortDescription:
      "A comprehensive southern-and-Rift loop covering four marquee destinations — maximum landscape variety without the long northern drive to Samburu.",
    overview:
      "Mara, Nakuru, Naivasha & Amboseli delivers the full southern Kenya circuit — the four marquee destinations in a single, cohesive seven-day journey. Starting with the Mara's dramatic big cats, moving through Nakuru's flamingo lake and rhino sanctuary, pausing for a Naivasha boat safari, and ending with Amboseli's iconic Kilimanjaro elephants, this itinerary maximises variety of landscape and species without the long driving day north to Samburu.",
    highlights: [
      "Two nights in the Masai Mara",
      "Rhino and flamingo at Lake Nakuru",
      "Naivasha boat safari & Crescent Island walk",
      "Kilimanjaro elephant photography at Amboseli",
      "Four distinct ecosystems in seven days",
    ],
    itinerary: [
      it(
        "Day 1",
        "Nairobi to Masai Mara",
        "Morning departure to the Mara. Lunch at camp. Afternoon game drive.",
        "Nairobi → Masai Mara (~265 km, 5–6 hrs)",
        "L, D"
      ),
      it(
        "Day 2",
        "Full day in the Mara",
        "Full day of game drives. Optional balloon safari and Maasai cultural visit.",
        "Full day — Masai Mara",
        "B, L, D"
      ),
      it(
        "Day 3",
        "Mara to Lake Nakuru",
        "Morning game drive, then transfer to Lake Nakuru. Afternoon game drive — rhino and flamingos.",
        "Masai Mara → Lake Nakuru (~210 km, 4 hrs)",
        "B, L, D"
      ),
      it(
        "Day 4",
        "Nakuru to Lake Naivasha",
        "Morning in Nakuru, then short transfer to Naivasha. Afternoon boat safari and Crescent Island walk.",
        "Lake Nakuru → Lake Naivasha (~70 km, 1.5 hrs)",
        "B, L, D"
      ),
      it(
        "Day 5",
        "Naivasha to Amboseli",
        "Long scenic transfer south to Amboseli. Late afternoon arrival, evening at leisure.",
        "Lake Naivasha → Amboseli (~330 km, 6 hrs via Nairobi)",
        "B, L, D"
      ),
      it(
        "Day 6",
        "Full day in Amboseli",
        "Full day of game drives, elephants and Kilimanjaro views. Sunrise mountain photography.",
        "Full day — Amboseli",
        "B, L, D"
      ),
      it(
        "Day 7",
        "Morning drive & return to Nairobi",
        "Morning game drive, breakfast, return to Nairobi for afternoon drop-off.",
        "Amboseli → Nairobi (4–5 hrs)",
        "B"
      ),
    ],
    nextDeparture: "2026-09-04",
  },
  // ── 9 ──────────────────────────────────────────────────────────────────────
  {
    name: "Grand Northern & Mara Safari",
    destinationName: "Samburu, Rift Valley & Masai Mara",
    locations: ["Nairobi", "Samburu", "Lake Nakuru", "Lake Naivasha", "Masai Mara"],
    days: 8,
    groupSize: "Private group",
    price: 4690,
    rating: 4.9,
    reviews: 46,
    type: "Safari",
    image: "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781980933/safari-concept-safari-car-with-wildebeests-african-savannah-masai-mara-national-park-kenya_jlcxit.webp",
    gallery: [
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781980933/safari-concept-safari-car-with-wildebeests-african-savannah-masai-mara-national-park-kenya_jlcxit.webp",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781980993/animal-watching-wild-african-safari-group-female-impala-massai-mara_naaiqu.webp",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781980871/african-rhinoceroses-diceros-bicornis-minor-masai-mara-national-reserve-safari_kzksbm.webp",
    ],
    shortDescription:
      "An extended premium circuit blending the arid north, three Rift Valley parks and the Mara — ideal for clients wanting depth, variety and a relaxed pace.",
    overview:
      "The Grand Northern & Mara Safari is the definitive extended circuit for clients who want to experience the full breadth of Kenya at a relaxed pace. From Samburu's arid wilderness and Special Five, through the Rift Valley's lake sequence — rhinos at Nakuru, hippos and boat safaris at Naivasha — to the grand finale of two full days in the Masai Mara, this eight-day journey covers more ground, more ecosystems and more wildlife than any shorter circuit.",
    highlights: [
      "Samburu Special Five in the arid north",
      "Equator crossing near Nanyuki",
      "Rhino tracking and flamingos at Lake Nakuru",
      "Lake Naivasha boat safari and Crescent Island",
      "Two full days in the Masai Mara",
    ],
    itinerary: [
      it(
        "Day 1",
        "Drive north to Samburu",
        "Drive north past Mt. Kenya and the equator. Arrive Samburu for lunch. Afternoon game drive.",
        "Nairobi → Samburu (~325 km, 6 hrs)",
        "L, D"
      ),
      it(
        "Day 2",
        "Full day in Samburu",
        "Full day of game drives for the Special Five and big cats. Optional cultural visit.",
        "Full day — Samburu",
        "B, L, D"
      ),
      it(
        "Day 3",
        "Samburu to Lake Nakuru",
        "Morning game drive, scenic transfer south to Lake Nakuru. Late afternoon arrival.",
        "Samburu → Lake Nakuru (~300 km, 5–6 hrs)",
        "B, L, D"
      ),
      it(
        "Day 4",
        "Full day in Lake Nakuru",
        "Full day in Nakuru — rhino tracking, flamingos, tree-climbing lions and lake viewpoints.",
        "Full day — Lake Nakuru",
        "B, L, D"
      ),
      it(
        "Day 5",
        "Nakuru to Lake Naivasha",
        "Short transfer to Naivasha. Afternoon boat safari and Crescent Island walking safari.",
        "Lake Nakuru → Lake Naivasha (~70 km, 1.5 hrs)",
        "B, L, D"
      ),
      it(
        "Day 6",
        "Naivasha to Masai Mara",
        "Optional Hell's Gate visit in the morning. After lunch, transfer to the Mara. Evening arrival.",
        "Lake Naivasha → Masai Mara (~230 km, 4–5 hrs)",
        "B, L, D"
      ),
      it(
        "Day 7",
        "Full day in the Mara",
        "Full day of game drives. Optional balloon safari and Maasai village visit.",
        "Full day — Masai Mara",
        "B, L, D"
      ),
      it(
        "Day 8",
        "Morning drive & return to Nairobi",
        "Morning game drive, breakfast, return to Nairobi for afternoon drop-off.",
        "Masai Mara → Nairobi (5–6 hrs)",
        "B"
      ),
    ],
    nextDeparture: "2026-09-12",
  },
  // ── 10 ─────────────────────────────────────────────────────────────────────
  {
    name: "Ultimate Kenya Wildlife",
    destinationName: "Amboseli, Samburu, Naivasha & Masai Mara",
    locations: ["Nairobi", "Amboseli", "Samburu", "Lake Naivasha", "Masai Mara"],
    days: 8,
    groupSize: "Private group",
    price: 4890,
    rating: 4.9,
    reviews: 58,
    type: "Safari",
    image: "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781981158/few-elephants-near-kilimanjaro-mountain_aqqzar.jpg",
    gallery: [
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781981158/few-elephants-near-kilimanjaro-mountain_aqqzar.jpg",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781981167/zebras-wildlife-animals-mammals-wild-donkey-nairobi-national-park-kenya-east-africa-landscape_iukqek.jpg",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781981146/closeup-shot-elephants-standing-near-lake-sunset_tfsdei.jpg",
    ],
    shortDescription:
      "The most complete loop on offer — four contrasting ecosystems plus a Rift Valley lake, designed for clients who want to see everything Kenya is famous for in one trip.",
    overview:
      "Ultimate Kenya Wildlife is the most comprehensive single-circuit itinerary in our range, combining four contrasting ecosystems in an eight-day journey. From the Kilimanjaro elephant plains of Amboseli in the south, north through the arid red-earth wilderness of Samburu, down through the hippo-rich world of Lake Naivasha, and culminating in two full days in the Masai Mara — this is the trip for clients who want to see everything Kenya is famous for without compromise.",
    highlights: [
      "Kilimanjaro elephant herds at Amboseli",
      "Samburu Special Five in the arid north",
      "Lake Naivasha boat safari & hippos",
      "Two full days in the Masai Mara",
      "Four ecosystems in eight days",
    ],
    itinerary: [
      it(
        "Day 1",
        "Nairobi to Amboseli",
        "Morning drive to Amboseli. Lunch at lodge. Afternoon game drive with Kilimanjaro backdrop.",
        "Nairobi → Amboseli (~240 km, 4–5 hrs)",
        "L, D"
      ),
      it(
        "Day 2",
        "Full day in Amboseli",
        "Full day of game drives, elephants, predators and birdlife. Sunrise mountain views.",
        "Full day — Amboseli",
        "B, L, D"
      ),
      it(
        "Day 3",
        "Amboseli to Samburu",
        "Long transfer day north with rest stops. Arrive Samburu in late afternoon. Evening at leisure.",
        "Amboseli → Samburu (~480 km, 7–8 hrs via Nairobi)",
        "B, L, D"
      ),
      it(
        "Day 4",
        "Full day in Samburu",
        "Full day for the Samburu Special Five, elephant and leopard. Optional cultural visit.",
        "Full day — Samburu",
        "B, L, D"
      ),
      it(
        "Day 5",
        "Samburu to Lake Naivasha",
        "Morning game drive, then scenic transfer to Lake Naivasha. Late afternoon arrival.",
        "Samburu → Lake Naivasha (~350 km, 6 hrs)",
        "B, L, D"
      ),
      it(
        "Day 6",
        "Naivasha to Masai Mara",
        "Morning boat safari on Lake Naivasha. After lunch, transfer to the Mara. Evening arrival.",
        "Lake Naivasha → Masai Mara (~230 km, 4–5 hrs)",
        "B, L, D"
      ),
      it(
        "Day 7",
        "Full day in the Mara",
        "Full day of game drives. Optional balloon safari and Maasai cultural visit.",
        "Full day — Masai Mara",
        "B, L, D"
      ),
      it(
        "Day 8",
        "Morning drive & return to Nairobi",
        "Morning game drive, breakfast, return to Nairobi for afternoon drop-off.",
        "Masai Mara → Nairobi (5–6 hrs)",
        "B"
      ),
    ],
    nextDeparture: "2026-10-02",
  },
];

export const packages: TourPackage[] = seeds.map(build);

export const getPackage = (slug: string) =>
  packages.find((p) => p.slug === slug);

export const getPackagesBySlugs = (slugs: string[]) =>
  packages.filter((p) => slugs.includes(p.slug));

export const getPackagesByRouteKeyword = (keyword: string) =>
  packages.filter((p) =>
    p.itinerary.some((d) => d.route?.toLowerCase().includes(keyword.toLowerCase()))
  );

const _allRouteText = packages
  .flatMap((p) => p.itinerary.map((d) => d.route ?? ""))
  .join("\n")
  .toLowerCase();

export const isDestinationInRoutes = (keyword: string): boolean =>
  _allRouteText.includes(keyword.toLowerCase());
