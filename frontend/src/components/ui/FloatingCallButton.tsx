import { Phone } from "lucide-react";

export const FloatingCallButton = () => (
  <a
    href="tel:+917387326222"
    aria-label="Call Little Champs School"
    className="md:hidden fixed bottom-24 right-5 z-40 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-leaf text-white font-bold shadow-pop animate-pulse-glow btn-pop"
  >
    <Phone className="w-5 h-5 animate-shake" />
    Call Now
  </a>
);
