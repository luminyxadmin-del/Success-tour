import type { Destination } from "@/types";
import { IMG } from "./images";

export const destinations: Destination[] = [
  {
    id: "d1",
    slug: "maasai-mara",
    name: "Maasai Mara",
    region: "Rift Valley",
    tagline: "The theatre of the Great Migration",
    description:
      "Kenya's crown jewel — endless golden plains where lions, leopards and cheetahs roam and over a million wildebeest thunder across the Mara River.",
    longDescription:
      "The Maasai Mara National Reserve is the northern extension of Tanzania's Serengeti and arguably the finest big-cat country on Earth. Between July and October the reserve hosts the dramatic river crossings of the Great Migration, while year-round game viewing delivers the full Big Five. Stay in tented camps perched above the Mara River, share sundowners on the savanna and meet the Maasai communities whose stewardship has protected this wilderness for generations.",
    image: IMG.savanna,
    gallery: [IMG.elephants, IMG.lion, IMG.wildebeest, IMG.safariJeep, IMG.acaciaSunset],
    activities: ["Big Five game drives", "Hot-air balloon safari", "Great Migration river crossings", "Maasai village visit", "Bush dining & sundowners"],
    bestTime: "July – October (migration); January – March (calving & big cats)",
    highlights: ["Annual wildebeest migration", "Highest lion density in Africa", "Balloon safaris at dawn", "Authentic Maasai culture"],
    relatedPackages: ["luxury-maasai-mara-safari", "great-migration-explorer", "mara-balloon-romance"],
    routeKeyword: "Masai Mara",
  },
  {
    id: "d2",
    slug: "amboseli",
    name: "Amboseli",
    region: "Kajiado County",
    tagline: "Elephants beneath Kilimanjaro",
    description:
      "Vast elephant herds framed by the snow-capped peak of Mount Kilimanjaro — the most iconic backdrop in African photography.",
    longDescription:
      "Amboseli National Park is famous for its free-ranging elephant herds and uninterrupted views of Mount Kilimanjaro rising across the border in Tanzania. The park's swamps, fed by Kilimanjaro's meltwater, draw concentrations of wildlife to compact, photographer-friendly plains. It is one of the best places on the continent to observe and study elephants up close, and the golden light at dawn and dusk is the stuff of legend.",
    image: "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781787029/erwin-gerber-o9_hNU0ywgU-unsplash_y1v6t0.jpg",
    gallery: [
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781787029/erwin-gerber-o9_hNU0ywgU-unsplash_y1v6t0.jpg",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781787377/anna-claire-schellenberg-AeD-IgpPChU-unsplash_kmhd30.jpg",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781787441/daniel-vargas-FyrplABOofM-unsplash_xqff1b.jpg",
    ],
    activities: ["Elephant-focused game drives", "Kilimanjaro photography", "Observation Hill walks", "Cultural Maasai bomas", "Birdwatching at the swamps"],
    bestTime: "June – October & January – February (dry, clear Kilimanjaro views)",
    highlights: ["Iconic Kilimanjaro backdrop", "Giant tusker elephants", "Over 400 bird species", "Compact, easy game viewing"],
    relatedPackages: ["amboseli-kilimanjaro-classic", "amboseli-tsavo-discovery", "family-safari-adventure"],
  },
  {
    id: "d4",
    slug: "nairobi",
    name: "Nairobi",
    region: "Capital City",
    tagline: "The only capital with a national park",
    description:
      "A fast, green capital where lions roam against a skyline backdrop and world-class restaurants meet pioneering conservation.",
    longDescription:
      "Nairobi is the beating heart of East Africa — and the only capital city on Earth bordered by a fully-fledged national park. Here you can watch rhino and lion with skyscrapers on the horizon, cuddle orphaned elephants at the David Sheldrick Wildlife Trust, hand-feed endangered Rothschild giraffes at the Giraffe Centre, and dine in some of the continent's most exciting kitchens. It is the gateway to every Kenyan adventure and a destination in its own right.",
    image: "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781980563/beautiful-kilimanjaro-mountain-zebras-kenya-amboseli-national-park-africa_ekndxu.webp",
    gallery: [
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781980563/beautiful-kilimanjaro-mountain-zebras-kenya-amboseli-national-park-africa_ekndxu.webp",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781980695/zebras-wildebeest-migration-wildlife-animals-mammals-savanna-grassland-maasai-mara-national-game-res_ewjapy.webp",
      "https://res.cloudinary.com/dbvtxf4pa/image/upload/v1781980546/flock-pink-african-flamingos-walking-around-blue-lagoon-background-bright-sky-sunny-day_rkw8w2.jpg",
    ],
    activities: ["Nairobi National Park game drive", "Elephant orphanage visit", "Giraffe Centre", "Karen Blixen Museum", "Local food & art tours"],
    bestTime: "Year-round (pleasant highland climate)",
    highlights: ["Wildlife within the city", "Sheldrick elephant orphanage", "Giraffe Centre encounters", "Gateway to all safaris"],
    relatedPackages: ["nairobi-city-wildlife", "kenya-grand-tour", "family-safari-adventure"],
  },
  {
    id: "d5",
    slug: "tsavo",
    name: "Tsavo",
    region: "Coast & Eastern",
    tagline: "Land of the red elephants",
    description:
      "Kenya's largest wilderness — vast, untamed and famous for its dust-red elephants, lava flows and crystal-clear springs.",
    longDescription:
      "Split into Tsavo East and Tsavo West, this is Kenya's largest protected area and one of the biggest game reserves in the world. Tsavo East offers sweeping savanna and the legendary red elephants that dust themselves in the region's rust-coloured soil; Tsavo West is more dramatic, with the Shetani lava flows, Mzima Springs where hippos glide through clear water, and the Ngulia rhino sanctuary. Remote, wild and uncrowded, Tsavo rewards the adventurous traveller.",
    image: IMG.acaciaSunset,
    gallery: [IMG.acaciaSunset, IMG.elephants, IMG.riftValley, IMG.savanna],
    activities: ["Red-elephant game drives", "Mzima Springs underwater viewing", "Shetani lava flow walks", "Rhino sanctuary visit", "Birding safaris"],
    bestTime: "June – October & January – February (dry season)",
    highlights: ["Iconic red elephants", "Crystal-clear Mzima Springs", "Vast uncrowded wilderness", "Dramatic volcanic scenery"],
    relatedPackages: ["amboseli-tsavo-discovery", "tsavo-wilderness-trail", "mombasa-diani-coastal"],
  },
  {
    id: "d6",
    slug: "lake-nakuru",
    name: "Lake Nakuru",
    region: "Rift Valley",
    tagline: "A pink shoreline of flamingos & rhinos",
    description:
      "A shallow soda lake rimmed with flamingos and a fenced sanctuary protecting both black and white rhino in equal measure.",
    longDescription:
      "Lake Nakuru National Park is a Rift Valley jewel — a shallow alkaline lake whose shores can shimmer pink with flamingos, surrounded by acacia forest and dramatic cliffs. It is one of Kenya's premier rhino sanctuaries, home to healthy populations of both black and white rhino, as well as the rare Rothschild's giraffe, tree-climbing lions and over 450 bird species. Compact and beautiful, it pairs perfectly with the Maasai Mara on a Rift Valley circuit.",
    image: IMG.flamingos,
    gallery: [IMG.flamingos, IMG.riftValley, IMG.giraffes, IMG.lion],
    activities: ["Flamingo & pelican viewing", "Rhino tracking", "Baboon Cliff viewpoint", "Rothschild giraffe spotting", "Makalia Falls walk"],
    bestTime: "Year-round; June – March for the best birdlife",
    highlights: ["Flamingo-pink shoreline", "Black & white rhino sanctuary", "Rare Rothschild's giraffe", "450+ bird species"],
    relatedPackages: ["rift-valley-lakes-safari", "kenya-grand-tour", "great-migration-explorer"],
  },
  {
    id: "d7",
    slug: "samburu",
    name: "Samburu",
    region: "Northern Kenya",
    tagline: "The wild north's special species",
    description:
      "A rugged semi-arid frontier along the Ewaso Ng'iro River, home to wildlife found nowhere else in Kenya's south.",
    longDescription:
      "Samburu National Reserve sits in Kenya's arid north, its life sustained by the palm-lined Ewaso Ng'iro River. The reserve is famed for the 'Samburu Special Five' — Grevy's zebra, reticulated giraffe, Beisa oryx, gerenuk and Somali ostrich — species adapted to this harsh, beautiful landscape and seen almost nowhere else. The proud Samburu people, cousins of the Maasai, add deep cultural richness to a safari that feels genuinely off the beaten track.",
    image: IMG.riftValley,
    gallery: [IMG.riftValley, IMG.giraffes, IMG.zebra, IMG.lodgeTent],
    activities: ["Special Five game drives", "Samburu cultural visits", "River-walks along the Ewaso Ng'iro", "Camel-back excursions", "Night game drives"],
    bestTime: "June – October & December – March (dry season)",
    highlights: ["Samburu Special Five", "Authentic northern culture", "Dramatic river landscapes", "Low-density, exclusive safaris"],
    relatedPackages: ["samburu-northern-frontier", "kenya-grand-tour", "luxury-maasai-mara-safari"],
  },
  {
    id: "d8",
    slug: "olare-motorogi",
    name: "Olare Motorogi",
    region: "Maasai Mara Ecosystem",
    tagline: "The most exclusive conservancy in the Mara",
    description:
      "A strict vehicle-cap conservancy bordering the Maasai Mara, permitting just five camps and delivering the highest lion density in Africa without the crowds.",
    longDescription:
      "Olare Motorogi Conservancy is one of the most tightly controlled wildlife areas in the entire Mara ecosystem. Bordering the Maasai Mara National Reserve, it permits just five camps across its plains — meaning vehicle numbers at any sighting are counted in single figures, not tens. Off-road driving, night game drives and guided walking safaris are all permitted here, unlocking experiences that the national reserve simply cannot offer. This is the conservancy for serious wildlife photographers and big-cat enthusiasts who want time and proximity at their sightings.",
    image: IMG.lion,
    gallery: [IMG.lion, IMG.cheetah, IMG.savanna, IMG.safariJeep],
    activities: ["Off-road big-cat drives", "Night game drives", "Guided walking safaris", "Sundowners on the plains", "Named-pride lion tracking"],
    bestTime: "July – October (migration crossings nearby); January – March (calving & high predator action)",
    highlights: ["Highest lion density in Africa", "Strict vehicle caps — often 3–4 cars at a sighting", "Off-road & night drives permitted", "Private, exclusive wilderness experience"],
    relatedPackages: ["luxury-maasai-mara-safari", "great-migration-explorer"],
  },
  {
    id: "d9",
    slug: "mara-naboisho",
    name: "Mara Naboisho",
    region: "Maasai Mara Ecosystem",
    tagline: "500 Maasai landowners, one breathtaking wildlife corridor",
    description:
      "A community-owned conservancy where over 500 Maasai landowners pooled their land to create one of the Mara's richest wildlife corridors — home to lion, leopard and cheetah.",
    longDescription:
      "Naboisho means 'coming together' in Maa, and over 500 Maasai landowners did exactly that to create this 50,000-acre wildlife corridor in the Mara ecosystem. Its acacia valleys funnel prey into predictable hunting grounds, and the resident lion prides know exactly where to wait. The Mara Lion Project maintains a research base here, and guides track named individuals — giving guests a depth of experience no reserve can match. Leopard and cheetah thrive in the varied terrain, and every booking goes directly to Maasai landowners.",
    image: IMG.savanna,
    gallery: [IMG.savanna, IMG.lion, IMG.cheetah, IMG.acaciaSunset],
    activities: ["Named-pride lion tracking", "Leopard & cheetah drives", "Night game drives", "Walking safaris", "Fly-camping"],
    bestTime: "Year-round; July – October for migration day-trips; January – March for calving season",
    highlights: ["500+ Maasai landowner community", "Mara Lion Project research base", "Low-density, crowd-free wildlife", "Off-road & after-dark drives"],
    relatedPackages: ["luxury-maasai-mara-safari", "mara-balloon-romance"],
  },
  {
    id: "d10",
    slug: "selenkay-amboseli",
    name: "Selenkay Conservancy",
    region: "Amboseli Ecosystem",
    tagline: "Kilimanjaro's shadow, away from the crowds",
    description:
      "A private community conservancy on the edge of the Amboseli ecosystem, offering the iconic elephant-and-mountain views with off-park experiences the national park cannot provide.",
    longDescription:
      "Selenkay Conservancy sits on the northern edge of the Amboseli ecosystem, where Africa's largest free-ranging elephant herds roam beneath the snow-capped summit of Mount Kilimanjaro. Unlike the busy national park itself, Selenkay is private and Maasai-owned — meaning night drives, walking safaris and off-road drives are all available. Guests access Amboseli National Park by day for the iconic photography, then return to the conservancy for after-dark experiences the Kenya Wildlife Service park can never offer.",
    image: IMG.kilimanjaro,
    gallery: [IMG.kilimanjaro, IMG.elephants, IMG.elephantClose, IMG.acaciaSunset],
    activities: ["Elephant game drives with Kilimanjaro backdrop", "Night drives in the conservancy", "Maasai cultural visits", "Walking safaris", "Observation Hill photography"],
    bestTime: "June – October & January – February (dry, clearest Kilimanjaro views)",
    highlights: ["Private conservancy — no park crowds", "Night drives permitted", "Authentic Maasai community ownership", "Gateway to big-tusker Amboseli herds"],
    relatedPackages: ["amboseli-kilimanjaro-classic", "amboseli-tsavo-discovery"],
  },
  {
    id: "d11",
    slug: "ol-pejeta-laikipia",
    name: "Ol Pejeta / Laikipia",
    region: "Laikipia Plateau",
    tagline: "The last rhinos and the conservation heartland",
    description:
      "90,000 acres of Big Five wilderness beneath Mount Kenya — home to the last two northern white rhinos on Earth, the Sweetwaters chimp sanctuary, and the full range of conservancy activities.",
    longDescription:
      "Ol Pejeta Conservancy on the Laikipia plateau is one of Africa's great conservation success stories. The largest black rhino sanctuary in East Africa, it is also the only place on the planet where the last two northern white rhinos — mother and daughter — are protected around the clock. The Sweetwaters Chimpanzee Sanctuary, the only chimp facility in Kenya, adds another dimension that no other Kenyan safari can match. With night drives, bush walks, horse and camel safaris, and lion tracking alongside the conservancy's research team, Ol Pejeta offers the widest activity menu of any private conservancy in East Africa.",
    image: IMG.riftValley,
    gallery: [IMG.riftValley, IMG.elephantClose, IMG.giraffes, IMG.lodgeTent],
    activities: ["Northern white rhino visit", "Sweetwaters chimp sanctuary", "Bush walks & horseback safaris", "Lion tracking with research team", "Night game drives"],
    bestTime: "Year-round; June – October & January – February (dry seasons, best game viewing)",
    highlights: ["Last two northern white rhinos on Earth", "Only chimp sanctuary in Kenya", "Big Five year-round", "Maximum activity variety"],
    relatedPackages: ["samburu-northern-frontier", "kenya-grand-tour"],
  },
  {
    id: "d12",
    slug: "lake-naivasha",
    name: "Lake Naivasha",
    region: "Rift Valley",
    tagline: "A freshwater gem alive with hippos and birdlife",
    description:
      "A papyrus-fringed freshwater lake in the heart of the Rift Valley — boat safaris, the Crescent Island walking safari, and the dramatic backdrop of Hell's Gate National Park.",
    longDescription:
      "Lake Naivasha is the Rift Valley's freshwater counterpart to the alkaline lakes around it — its papyrus-lined shores shelter hippo pods, hundreds of bird species and the famous Crescent Island, where you can walk unarmed among giraffe, zebra and wildebeest. A morning boat safari drifting past hippos and fish eagles is one of Kenya's most peaceful wildlife experiences. Nearby, Hell's Gate National Park offers the rare chance to cycle or walk through a gorge among wildlife, and the dramatic geothermal scenery of the Rift Valley escarpment frames everything.",
    image: IMG.riftValley,
    gallery: [IMG.riftValley, IMG.giraffes, IMG.flamingos, IMG.acaciaSunset],
    activities: ["Boat safari — hippos & fish eagles", "Crescent Island walking safari", "Hell's Gate cycling & gorge walk", "Birdwatching — 360+ species", "Elsamere Conservation Centre"],
    bestTime: "Year-round; January – February & June – October (dry, best birdlife)",
    highlights: ["Walk unarmed on Crescent Island", "Resident hippo pods", "Hell's Gate cycling safari", "360+ bird species", "Rift Valley escarpment scenery"],
    relatedPackages: ["rift-valley-mara-discovery", "amboseli-naivasha-mara", "grand-northern-mara-safari"],
  },
];

export const getDestination = (slug: string) =>
  destinations.find((d) => d.slug === slug);
