import type { GalleryImage } from "@/types";
import { IMG } from "./images";

export const galleryImages: GalleryImage[] = [
  { id: "g1", src: IMG.elephants, category: "Wildlife", caption: "Elephant herd at dusk, Amboseli" },
  { id: "g2", src: IMG.lion, category: "Wildlife", caption: "Lion surveying the plains, Maasai Mara" },
  { id: "g3", src: IMG.beach, category: "Beach", caption: "Powder-white sands of Diani" },
  { id: "g4", src: IMG.kilimanjaro, category: "Landscapes", caption: "Kilimanjaro at first light" },
  { id: "g5", src: IMG.giraffe, category: "Wildlife", caption: "Reticulated giraffe, Samburu" },
  { id: "g6", src: IMG.flamingos, category: "Wildlife", caption: "Flamingos on Lake Nakuru" },
  { id: "g7", src: IMG.savanna, category: "Landscapes", caption: "Endless Mara savanna" },
  { id: "g8", src: IMG.dhow, category: "Culture", caption: "Traditional dhow at sunset, Lamu" },
  { id: "g9", src: IMG.safariJeep, category: "Safari", caption: "Game drive at golden hour" },
  { id: "g10", src: IMG.acaciaSunset, category: "Landscapes", caption: "Lone acacia against the sunset" },
  { id: "g11", src: IMG.zebra, category: "Wildlife", caption: "Zebra on the move" },
  { id: "g12", src: IMG.beachAerial, category: "Beach", caption: "Turquoise coast from above" },
  { id: "g13", src: IMG.lodgeTent, category: "Lodges", caption: "Luxury tented camp interior" },
  { id: "g14", src: IMG.cheetah, category: "Wildlife", caption: "Cheetah on alert" },
  { id: "g15", src: IMG.riftValley, category: "Landscapes", caption: "Dramatic Rift Valley vistas" },
  { id: "g16", src: IMG.wildebeest, category: "Wildlife", caption: "The Great Migration in motion" },
  { id: "g17", src: IMG.beachResort, category: "Lodges", caption: "Beachfront honeymoon suite" },
  { id: "g18", src: IMG.nairobi, category: "Culture", caption: "Nairobi skyline meets the wild" },
];

export const galleryCategories = ["All", ...Array.from(new Set(galleryImages.map((g) => g.category)))];
