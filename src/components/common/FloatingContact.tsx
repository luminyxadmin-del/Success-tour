import { MessageCircle } from "lucide-react";
import { company } from "@/data/company";

export default function FloatingContact() {
  const wa = company.whatsapp.replace(/[^0-9]/g, "");
  return (
    <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white shadow-glow transition hover:scale-105 hover:bg-secondary-dark">
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
