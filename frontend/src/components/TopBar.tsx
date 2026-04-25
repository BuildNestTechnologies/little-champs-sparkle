import { Phone, Mail, Instagram, Facebook, Youtube } from "lucide-react";

export const TopBar = () => (
  <div className="hidden md:block bg-ink dark:bg-card text-white dark:text-foreground text-sm transition-colors duration-400">
    <div className="container flex items-center justify-between py-2">
      <div className="flex items-center gap-5">
        <a href="tel:+917387326222" className="flex items-center gap-2 hover:text-sunshine transition-colors group">
          <Phone className="w-4 h-4 group-hover:animate-shake" />
          +91 73873 26222
        </a>
        <a href="mailto:info@littlechampsschool.com" className="flex items-center gap-2 hover:text-sunshine transition-colors">
          <Mail className="w-4 h-4" />
          info@littlechampsschool.com
        </a>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-white/70 dark:text-foreground/60">Follow us:</span>
        <a aria-label="Instagram" href="https://instagram.com/little_champs_school" target="_blank" rel="noreferrer" className="hover:text-candy transition-transform hover:-translate-y-0.5"><Instagram className="w-4 h-4" /></a>
        <a aria-label="Facebook" href="#" className="hover:text-sky transition-transform hover:-translate-y-0.5"><Facebook className="w-4 h-4" /></a>
        <a aria-label="YouTube" href="#" className="hover:text-candy transition-transform hover:-translate-y-0.5"><Youtube className="w-4 h-4" /></a>
        <a href="#contact" className="ml-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-candy text-candy-foreground font-bold animate-pulse-glow btn-pop">
          Enroll Now
        </a>
      </div>
    </div>
  </div>
);
