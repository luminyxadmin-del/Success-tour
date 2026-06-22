import type { SignatureFlagship } from "@/types";
import { IMG, galleryPool } from "./images";

export const signatureFlagships: SignatureFlagship[] = [
  {
    id: "sf1",
    slug: "big-cat-conservancy",
    number: "01",
    name: "The Big Cat Conservancy",
    tagline: "The highest lion density on earth — without another vehicle in sight",
    duration: "6 Days / 5 Nights",
    nights: 5,
    route: "Nairobi → Olare Motorogi → Mara Naboisho → Nairobi",
    image: IMG.lion,
    gallery: [IMG.lion, IMG.cheetah, IMG.savanna, IMG.safariJeep, IMG.acaciaSunset],
    audience: [
      "Repeat safari-goers who have 'done' the Mara reserve and want something rarer",
      "Photographers and big-cat enthusiasts who need off-road access and time at sightings",
      "Couples and small private groups willing to pay for exclusivity over volume",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive into the private Mara",
        meta: "Fly-in: Nairobi (Wilson) → Mara North airstrip, 45 min · light aircraft",
        description:
          "Skip the long road. A scenic light-aircraft flight lifts you over the Rift Valley and sets you down in the heart of big-cat country — Olare Motorogi Conservancy, one of only a handful of safari areas in the entire Mara permitting just five camps across its plains. Your Maasai guide meets you at the airstrip, and the first game drive begins on the transfer to camp. By sundowner hour you are watching the light fade over a landscape where the only other living things in view are wild.",
        signature: "Arrival game drive straight from the airstrip — no wasted hours on transfer roads",
      },
      {
        day: 2,
        title: "Olare Motorogi — lions at dawn and after dark",
        meta: "Full day · morning, afternoon and night game drives",
        description:
          "Olare Motorogi holds one of the highest concentrations of lion in Africa. With strict vehicle caps — often just three or four cars at a sighting against thirty in the reserve — you have time and space. Off-road driving means your guide can position you exactly where the light and the action are. After dinner, a night drive reveals the nocturnal Mara: spring hares, genets, hunting hyena, and, if fortune holds, a leopard on the move.",
        signature: "After-dark night drive — impossible inside the Maasai Mara National Reserve",
      },
      {
        day: 3,
        title: "On foot in the wilderness",
        meta: "Walking safari at dawn · afternoon game drive",
        description:
          "There is no substitute for standing in the bush on your own two feet. At first light, an armed Maasai guide leads a walking safari — tracking, reading dung and prints, understanding the smaller life that vehicles roll straight past. It recalibrates the whole safari. The afternoon returns you to the vehicle for big game as the heat softens.",
        signature: "Guided walking safari with a Maasai tracker — a privilege reserved for conservancies",
      },
      {
        day: 4,
        title: "Cross into Naboisho — coming together",
        meta: "Road transfer to Mara Naboisho Conservancy, 1.5 hrs · afternoon drive",
        description:
          "Naboisho means 'coming together' in Maa — over 500 Maasai landowners pooled their land to create this wildlife corridor. Its acacia valleys funnel prey into predictable hunting grounds, and the resident prides know exactly where to wait. This is leopard and cheetah country as much as lion. A new landscape, a new set of stories, and the Mara Lion Project's research base nearby.",
        signature: "Named-pride tracking — guides here know individual lions by name and history",
      },
      {
        day: 5,
        title: "The reserve day — or stay private",
        meta: "Optional day-trip into Maasai Mara National Reserve (seasonal) · or full Naboisho day",
        description:
          "In migration season (roughly July–October), today is your window for the Mara River crossings — the famous spectacle that happens inside the reserve, not the conservancies. A full-day excursion with picnic lunch puts you on the riverbank. Outside crossing season, you stay in Naboisho where the wildlife is just as rich and far less watched, perhaps an afternoon at a hide, or fly-camping under canvas for the truly adventurous.",
        signature: "Seasonal river-crossing day-trip, timed precisely to the herds' movement",
      },
      {
        day: 6,
        title: "A last dawn, then home",
        meta: "Morning drive · fly Naboisho → Nairobi Wilson",
        description:
          "One final morning drive while the light is gold and the cats are active, then breakfast and a light-aircraft flight back to Nairobi in time for international connections. Your client leaves with something most safari travellers never get: the memory of a wilderness that felt entirely their own.",
      },
    ],
    properties: [
      { tier: "Luxury", property: "Mahali Mzuri / Mara Plains Camp", location: "Olare Motorogi Conservancy" },
      { tier: "Premium", property: "Kicheche Valley Camp", location: "Mara Naboisho Conservancy" },
      { tier: "Comfort", property: "Basecamp / Eco-camp tier", location: "Conservancy-adjacent" },
    ],
    seasonality: [
      "July–October: peak — Mara River crossings accessible via the reserve day-trip; book early, lodges fill",
      "January–March: calving season — 250,000 wildebeest move into the conservancies; high predator action, fewer crowds, better rates",
      "April–June: green season — lowest prices, lush landscapes, excellent value for photographers, some camps close in heavy rains",
    ],
    differences: [
      "We position clients in conservancies first, reserve second — the opposite of budget operators who dump everyone in the crowded park",
      "Fly-in transfers remove the brutal 5–6 hour road drive that ruins day one of most Mara trips",
      "Every itinerary funds Maasai landowners directly — a conservation story your client can feel good telling",
    ],
  },
  {
    id: "sf2",
    slug: "north-of-the-equator",
    number: "02",
    name: "North of the Equator",
    tagline: "The last northern white rhinos on Earth — and a safari with a purpose",
    duration: "7 Days / 6 Nights",
    nights: 6,
    route: "Nairobi → Samburu → Ol Pejeta / Laikipia → Nairobi",
    image: "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1782070003/pexels-tkirkgoz-15307431_duuzdh.jpg",
    gallery: [
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1782070003/pexels-tkirkgoz-15307431_duuzdh.jpg",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1782070097/pexels-marie-lemaistre-215839-2751693_bce3xz.jpg",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1782069979/pexels-dianne-magbanua-negado-226641712-12029294_nzjy5y.jpg",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1782069927/pexels-twilightkenya-18000463_jmt9kw.jpg",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1782070336/pexels-anna-chyzh-1030565088-24390365_jctrd4.jpg",
    ],
    audience: [
      "Conservation-minded travellers who want their safari to mean something",
      "Repeat visitors seeking species and landscapes the southern parks don't offer",
      "Families and curious travellers — Ol Pejeta's chimp sanctuary and rhino story engage every age",
    ],
    itinerary: [
      {
        day: 1,
        title: "North to Samburu's red earth",
        meta: "Road or fly: Nairobi → Samburu, 6 hrs / 1 hr flight",
        description:
          "Cross the equator and watch the highlands give way to the arid, ochre-coloured north. Samburu is a different Kenya — palm-fringed riverbanks, dramatic kopjes, and species found nowhere in the south. Arrive for lunch and an afternoon drive along the Ewaso Nyiro river, where elephant herds come down to drink.",
        signature: "Crossing the equator with a stop at the marked line — a small ritual clients love",
      },
      {
        day: 2,
        title: "The Samburu Special Five",
        meta: "Full day · morning and afternoon game drives",
        description:
          "Samburu's signature is its 'Special Five' — Grevy's zebra, reticulated giraffe, Somali ostrich, gerenuk and beisa oryx, none of which you'll see in the Mara or Amboseli. Add elephant, lion and the famously elusive leopard along the river, and Samburu rewards the patient. An optional visit to a Samburu manyatta offers genuine cultural contact, the Samburu being cousins to the Maasai with their own distinct dress and custom.",
        signature: "The Special Five — a species set unique to Kenya's north",
      },
      {
        day: 3,
        title: "Into Laikipia — Ol Pejeta",
        meta: "Road transfer Samburu → Ol Pejeta, 2–3 hrs · afternoon drive",
        description:
          "Descend onto the Laikipia plateau and into Ol Pejeta Conservancy — 90,000 acres at the foot of Mount Kenya, and one of Africa's great conservation success stories. Big Five territory, the largest black rhino sanctuary in East Africa, and a private conservancy that means night drives and bush walks are on the table. The mountain dominates the southern horizon.",
      },
      {
        day: 4,
        title: "The rhinos and the chimps",
        meta: "Full day · rhino sanctuary, chimp sanctuary, night drive",
        description:
          "This is the emotional heart of the journey. Visit the enclosure protecting the last two northern white rhinos on the planet — mother and daughter, guarded around the clock. Then the Sweetwaters Chimpanzee Sanctuary, the only place in Kenya to see chimps, home to orphans and rescues from the bush-meat trade. After dark, a spotlit night drive turns up a cast you cannot see by day: aardvark, porcupine, bushbaby, and hunting cats.",
        signature: "Standing metres from the last two northern white rhinos on Earth — found nowhere else",
      },
      {
        day: 5,
        title: "Laikipia on foot and by saddle",
        meta: "Full day · bush walk, optional horse or camel ride, lion tracking",
        description:
          "Ol Pejeta offers what almost no national park can: variety of activity. A guided bush walk with armed rangers, optional horseback or camel safari across plains teeming with game, or lion tracking with the conservancy's research team. The pace is yours. Lunch at the famous Morani centre, or a quiet picnic at the Ewaso Nyiro marsh viewpoint where the birdlife is extraordinary and the tourists are absent.",
        signature: "Lion tracking alongside the conservancy's research team — conservation you participate in",
      },
      {
        day: 6,
        title: "Mount Kenya morning",
        meta: "Morning drive · afternoon at leisure",
        description:
          "A final Laikipia morning with the mountain clear behind you. Spend the afternoon at leisure — Ol Pejeta is a place that rewards slowing down. Optional second visit to the chimps or a return to a favourite sighting.",
      },
      {
        day: 7,
        title: "Return to Nairobi",
        meta: "Road or fly: Ol Pejeta → Nairobi, 3.5 hrs / 45 min flight",
        description:
          "An unhurried return to Nairobi, your client carrying a safari that was as much about meaning as it was about wildlife — the rare north, the last rhinos, and a genuine sense of having been part of something larger.",
      },
    ],
    properties: [
      { tier: "Luxury", property: "Kifaru House (Lewa) / premium Samburu lodge", location: "Lewa · Samburu" },
      { tier: "Premium", property: "Porini Rhino Camp / Sweetwaters Serena", location: "Ol Pejeta Conservancy" },
      { tier: "Comfort", property: "Serena tier / tented camps", location: "Samburu · Laikipia" },
    ],
    seasonality: [
      "Year-round destination — unlike the Mara, Ol Pejeta and Samburu don't depend on migration timing",
      "June–October & January–February: dry seasons, best game viewing and most comfortable",
      "A strong choice for clients who can't time a trip to the Mara migration — sell it as the 'any-season' premium safari",
    ],
    differences: [
      "A conservation narrative no beach-and-bush operator can match — the last rhinos, the chimp rescue, the research you join",
      "Species and landscapes 90% of Kenya itineraries skip entirely — genuine differentiation for repeat clients",
      "Activity variety (walking, riding, night drives) that keeps families and active travellers engaged for days",
    ],
  },
  {
    id: "sf3",
    slug: "kilimanjaro-and-big-cats",
    number: "03",
    name: "Kilimanjaro & Big Cats",
    tagline: "Elephants beneath Africa's highest peak, then the private Mara",
    duration: "7 Days / 6 Nights",
    nights: 6,
    route: "Nairobi → Amboseli (Selenkay) → Mara Naboisho → Nairobi",
    image: "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1782068820/pexels-laukevtravel-26924191_lga8hc.jpg",
    gallery: [
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1782068820/pexels-laukevtravel-26924191_lga8hc.jpg",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1782069017/jurgen_bierlein-giraffes-7435122_1920_lewh8n.jpg",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1782068849/pexels-paul-jousseau-406314056-14918401_vmzp3b.jpg",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1782068792/pexels-maurits-bausenhart-1112663191-26052410_agxjyz.jpg",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1782069263/pexels-fatih-turan-63325184-12167300_dhkiu4.jpg",
    ],
    audience: [
      "First-time-to-Kenya clients who want the two iconic images — Kilimanjaro elephants and Mara big cats — done properly",
      "Photographers chasing the postcard shot: a tusker framed against a snow-capped mountain",
      "Honeymoon and special-occasion travellers wanting scenery and exclusivity together",
    ],
    itinerary: [
      {
        day: 1,
        title: "Beneath the mountain",
        meta: "Road: Nairobi → Amboseli region, 4–5 hrs · or fly-in",
        description:
          "Drive south through Maasai country to the Amboseli ecosystem, where Africa's highest mountain rises across the border in Tanzania and dominates every horizon. Rather than the busy national park, you stay in the private Selenkay Conservancy on the ecosystem's edge — a community conservancy that allows the off-park experiences the KWS park forbids. Afternoon drive as Kilimanjaro emerges from its afternoon cloud.",
        signature: "Staying in a private conservancy beside Amboseli — not the crowded park itself",
      },
      {
        day: 2,
        title: "Big tuskers and the white mountain",
        meta: "Full day · Amboseli National Park game drive + conservancy night drive",
        description:
          "A full day split between two worlds. Inside Amboseli National Park, the great elephant herds — including some of the largest-tusked bulls left in Africa — move across the swamps with Kilimanjaro behind them. This is the iconic Kenya photograph. Back in the conservancy after dark, a night drive (impossible inside the park) reveals nocturnal Amboseli.",
        signature: "Dawn at Observation Hill for the clearest Kilimanjaro light, then a night drive few clients ever get",
      },
      {
        day: 3,
        title: "Cultural Amboseli",
        meta: "Morning drive · Maasai cultural visit · afternoon at leisure",
        description:
          "A gentler day. Morning game viewing while the mountain is sharp, then a genuine Maasai cultural visit hosted through the conservancy's community partnership — not a staged performance but real contact, the way community conservancies are designed to enable. Afternoon to rest before the next leg.",
        signature: "Community-hosted Maasai visit — authentic because the conservancy is Maasai-owned",
      },
      {
        day: 4,
        title: "Fly to the private Mara",
        meta: "Fly: Amboseli → Mara Naboisho airstrip, ~1.5 hrs via Wilson",
        description:
          "A light-aircraft transfer — far better than the punishing full-day road alternative — carries you from the mountain to the Mara's big-cat country. By staying in Mara Naboisho Conservancy rather than the reserve, you trade crowds for one of the highest lion densities in the entire ecosystem. Afternoon drive on arrival.",
      },
      {
        day: 5,
        title: "Naboisho's big cats",
        meta: "Full day · morning, afternoon and night game drives",
        description:
          "A full conservancy day. Naboisho's acacia valleys are prime hunting ground — lion prides, leopards working the forest edges, cheetah on the open stretches. Off-road access means real photographic positioning. A night drive after dinner adds the after-dark dimension the reserve can never offer.",
        signature: "Off-road big-cat photography and a night drive — the conservancy advantage in full",
      },
      {
        day: 6,
        title: "On foot, and the reserve option",
        meta: "Walking safari · optional reserve day-trip in season",
        description:
          "Dawn walking safari with a Maasai guide, then — in migration season — the option of a day-trip into the Maasai Mara reserve for river crossings. Outside season, a second full Naboisho day, which regulars often prefer to the crowded park.",
        signature: "Walking safari at first light — the bush on foot, as it should be experienced",
      },
      {
        day: 7,
        title: "Last light, then home",
        meta: "Morning drive · fly Naboisho → Nairobi Wilson",
        description:
          "A final golden-hour drive, breakfast, and the flight back to Nairobi for onward connections — two of Africa's defining landscapes captured in a single week, both experienced privately.",
      },
    ],
    properties: [
      { tier: "Luxury", property: "Tortilis Camp / premium Mara camp", location: "Amboseli · Naboisho" },
      { tier: "Premium", property: "Porini Amboseli (Selenkay) / Kicheche", location: "Selenkay · Naboisho" },
      { tier: "Comfort", property: "Tented camp tier", location: "Both regions" },
    ],
    seasonality: [
      "June–October: dry season — clearest Kilimanjaro views and accessible Mara crossings; the premium window",
      "January–February: short dry season — excellent mountain visibility, Mara calving in the conservancies",
      "Kilimanjaro is shyest in the wet (March–May, November) — set client expectations on mountain views accordingly",
    ],
    differences: [
      "We route through Selenkay and Naboisho conservancies — the iconic images without the iconic crowds",
      "A fly-in between Amboseli and the Mara replaces a soul-destroying full-day drive most operators still sell",
      "Both legs include experiences (night drives, walking, authentic culture) the national parks legally cannot offer",
    ],
  },
  {
    id: "sf4",
    slug: "ultimate-kenya-private",
    number: "04",
    name: "Ultimate Kenya Private",
    tagline: "The north, the conservation heartland, and the private Mara — Kenya's finest week",
    duration: "8 Days / 7 Nights",
    nights: 7,
    route: "Nairobi → Samburu → Ol Pejeta → Mara Conservancy → Nairobi",
    image: "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1782069542/pexels-entumoto-17831035_wcimq6.jpg",
    gallery: [
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1782069542/pexels-entumoto-17831035_wcimq6.jpg",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1782069557/pexels-490714164-28157088_qeshbd.jpg",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1782069578/pexels-490714164-28157156_dhnqsz.jpg",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1782069615/pexels-gerbert-voortman-157989162-10740862_hhajju.jpg",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1782069753/pexels-paul-merkus-155349320-18647898_rzybpy.jpg",
    ],
    audience: [
      "The client who wants the definitive Kenya safari and will pay for it to be done without compromise",
      "Repeat safari-goers assembling a 'best of everything' trip — rare species, conservation, and big cats",
      "Special-occasion travel: milestone anniversaries, bucket-list journeys, multigenerational private trips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Into the wild north",
        meta: "Fly: Nairobi → Samburu, 1 hr",
        description:
          "Begin with a flight north to Samburu's red-earth wilderness, saving a full day of road. Afternoon along the Ewaso Nyiro, elephants at the water, the first of three utterly distinct Kenyan landscapes.",
        signature: "Fly-in start — the journey begins with wildlife, not a windscreen",
      },
      {
        day: 2,
        title: "Samburu's rare species",
        meta: "Full day · game drives + optional cultural visit",
        description:
          "A full Samburu day for the Special Five and the river's leopards. The arid north feels like a different country to the Mara — and that contrast is exactly the point of this journey.",
        signature: "The Special Five — the rare-species foundation of the trip",
      },
      {
        day: 3,
        title: "To the conservation heartland",
        meta: "Fly/road Samburu → Ol Pejeta · afternoon drive",
        description:
          "Transfer to Ol Pejeta on the Laikipia plateau beneath Mount Kenya. The largest black rhino sanctuary in East Africa, and a private conservancy with the full range of activity. Afternoon game drive with the mountain behind you.",
      },
      {
        day: 4,
        title: "The last rhinos, the rescued chimps",
        meta: "Full day · rhino & chimp sanctuaries, night drive",
        description:
          "The conservation centrepiece — the last two northern white rhinos on Earth, the Sweetwaters chimp sanctuary, and a night drive after dark. For many clients this is the day they remember most, the day the safari meant something.",
        signature: "The last two northern white rhinos on Earth — a sight available nowhere else",
      },
      {
        day: 5,
        title: "Fly to the private Mara",
        meta: "Fly: Ol Pejeta → Mara conservancy airstrip · afternoon drive",
        description:
          "A light-aircraft transfer to the Mara's private conservancies — Naboisho or Olare Motorogi — for the final and most famous act. Afternoon drive into big-cat country, vehicle numbers capped, the wilderness quiet.",
      },
      {
        day: 6,
        title: "Big cats, off-road",
        meta: "Full day · morning, afternoon and night drives",
        description:
          "The conservancy in full: off-road big-cat photography by day, a night drive after dark. Olare Motorogi's lion density and Naboisho's leopard-and-cheetah country deliver the safari's wildlife crescendo.",
        signature: "Off-road positioning and after-dark drives — the private-Mara advantage",
      },
      {
        day: 7,
        title: "On foot, and the crossings",
        meta: "Walking safari · optional reserve day-trip (season)",
        description:
          "A dawn walking safari, then — in season — the reserve day-trip for the Mara River crossings. Outside crossing season, a second conservancy day that regulars consistently rate above the crowded park.",
        signature: "Walking safari plus seasonal river-crossing access — both worlds, one day",
      },
      {
        day: 8,
        title: "A final dawn, then home",
        meta: "Morning drive · fly Mara → Nairobi Wilson",
        description:
          "One last golden morning among the cats, breakfast, and the flight to Nairobi — three landscapes, the rarest species, the most moving conservation story in Africa, and a private Mara finale. The definitive Kenya week.",
      },
    ],
    properties: [
      { tier: "Luxury", property: "Kifaru House · Porini Rhino · Mara Plains", location: "Lewa/Samburu · Ol Pejeta · Olare Motorogi" },
      { tier: "Premium", property: "Samburu Serena · Sweetwaters · Kicheche", location: "Across all three regions" },
      { tier: "Comfort", property: "Serena / tented-camp tier", location: "Across all three regions" },
    ],
    seasonality: [
      "June–October: the premium window — dry across all three regions, Mara crossings accessible",
      "January–March: excellent — Mara calving in the conservancies, strong northern game, fewer crowds",
      "The northern legs (Samburu, Ol Pejeta) are year-round, so only the Mara finale is migration-sensitive — flexible to sell",
    ],
    differences: [
      "Three fly-in connections turn a punishing 1,000km+ road trip into a seamless premium journey",
      "Every leg is conservancy or private-reserve based — exclusivity is the through-line, not an upsell",
      "A narrative arc — rare north, conservation heartland, private-Mara crescendo — that an agent can actually sell as a story, not a schedule",
    ],
  },
];

export const getSignatureFlagship = (slug: string) =>
  signatureFlagships.find((f) => f.slug === slug);

export const galleryImages = [
  galleryPool[0], galleryPool[1], galleryPool[2], galleryPool[3],
];
