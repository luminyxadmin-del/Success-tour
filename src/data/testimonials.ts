import type { Testimonial } from "@/types";
import { IMG } from "./images";

export const testimonials: Testimonial[] = [
  { id: "t1", name: "Sarah & Michael Thompson", role: "Honeymooners", location: "London, UK", rating: 5, avatar: IMG.p2,
    quote: "From the first email to the last sundowner, every detail was flawless. The Mara exceeded our wildest dreams and the Diani finale was pure bliss. Luminyx Travel made our honeymoon perfect." },
  { id: "t2", name: "James Carter", role: "Wildlife Photographer", location: "Sydney, Australia", rating: 5, avatar: IMG.p1,
    quote: "As a professional photographer, I'm demanding about positioning and light. Our guide was world-class — patient, knowledgeable and always one step ahead of the animals. I came home with my best work yet." },
  { id: "t3", name: "The Rodriguez Family", role: "Family of Five", location: "Madrid, Spain", rating: 5, avatar: IMG.p6,
    quote: "Travelling with three kids felt effortless. The lodges were perfect, the guides endlessly patient, and our children still talk about feeding the giraffes every single day." },
  { id: "t4", name: "Dr. Anita Mehta", role: "Solo Traveller", location: "Mumbai, India", rating: 5, avatar: IMG.p4,
    quote: "I travelled solo and never once felt anything but safe and cared for. The team anticipated everything. Samburu was a revelation — wild, remote and utterly magical." },
  { id: "t5", name: "Robert & Linda Chen", role: "Retired Couple", location: "Vancouver, Canada", rating: 5, avatar: IMG.p3,
    quote: "Our grand tour of Kenya was the trip of a lifetime. Beautifully paced, exceptional lodges, and a level of personal service we simply didn't expect. We're already planning to return." },
  { id: "t6", name: "Thomas Müller", role: "Corporate Group Lead", location: "Munich, Germany", rating: 5, avatar: IMG.p7,
    quote: "We brought 28 colleagues for an incentive safari and the logistics were handled impeccably. The team came back inspired and bonded. A genuinely professional, seamless operation." },
  { id: "t7", name: "Emily Watson", role: "Adventure Traveller", location: "Auckland, New Zealand", rating: 5, avatar: IMG.p5,
    quote: "Cycling through Hell's Gate and summiting Mount Kenya were bucket-list moments. The guides' expertise and the attention to safety let me focus on the adventure. Unforgettable." },
  { id: "t8", name: "Kwame & Ama Osei", role: "Anniversary Trip", location: "Accra, Ghana", rating: 5, avatar: IMG.p8,
    quote: "For our 25th anniversary we wanted something special, and Luminyx Travel delivered beyond measure. The balloon safari at dawn brought tears to our eyes." },
];
