import type { TeamMember } from "@/types";
import { IMG } from "./images";

export const team: TeamMember[] = [
  { id: "tm1", name: "Joseph Mwangi", role: "Founder & Managing Director", image: IMG.p1,
    bio: "A third-generation Kenyan and lifelong conservationist, Joseph founded Luminyx Travel in 2008 to share the wonders of East Africa while protecting them for the future." },
  { id: "tm2", name: "Amani Wanjiru", role: "Head of Safari Experiences", image: IMG.p2,
    bio: "With 15 years designing safaris, Amani knows every camp, crossing and secret sundowner spot. She leads our experience and product team." },
  { id: "tm3", name: "David Kiprop", role: "Senior Safari Guide", image: IMG.p7,
    bio: "A KPSGA-certified gold guide, David has spent two decades in the field and is renowned for his uncanny ability to find big cats." },
  { id: "tm4", name: "Grace Achieng", role: "Lead Travel Designer", image: IMG.p4,
    bio: "Grace crafts bespoke itineraries with meticulous care, specialising in honeymoons, families and once-in-a-lifetime celebrations." },
  { id: "tm5", name: "Samuel Otieno", role: "Photographic Guide", image: IMG.p3,
    bio: "An award-winning wildlife photographer, Samuel leads our photographic safaris and helps guests capture their finest images." },
  { id: "tm6", name: "Faith Njeri", role: "Sustainability Lead", image: IMG.p5,
    bio: "Faith oversees our conservation partnerships and community programmes, ensuring every journey gives back to East Africa's people and wildlife." },
];
