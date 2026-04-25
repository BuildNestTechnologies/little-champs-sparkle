import { Logo } from "@/components/Logo";
import { Instagram, Facebook, Youtube, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const Footer = () => {
  const [email, setEmail] = useState("");
  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Subscribed! Tiny updates coming your way.");
    setEmail("");
  };

  return (
    <footer className="relative bg-ink text-white pt-20 pb-8 overflow-hidden">
      <div className="absolute -top-24 left-1/4 w-72 h-72 rounded-full bg-candy/30 blur-3xl" />
      <div className="absolute -bottom-24 right-1/4 w-72 h-72 rounded-full bg-sky/30 blur-3xl" />
      <div className="container relative grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="brightness-0 invert opacity-90"><Logo size={44} /></div>
          <p className="mt-4 text-white/70 text-sm">
            Where little steps become big leaps. A nurturing kindergarten in the heart of Bhiwandi.
          </p>
          <div className="flex gap-3 mt-5">
            <a aria-label="Instagram" href="https://instagram.com/little_champs_school" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-candy hover:-translate-y-1 transition flex items-center justify-center"><Instagram className="w-4 h-4" /></a>
            <a aria-label="Facebook" href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-sky hover:-translate-y-1 transition flex items-center justify-center"><Facebook className="w-4 h-4" /></a>
            <a aria-label="YouTube" href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-candy hover:-translate-y-1 transition flex items-center justify-center"><Youtube className="w-4 h-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-lg mb-4">Quick links</h4>
          <ul className="space-y-2">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-white/70 hover:text-sunshine transition">{n.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-lg mb-4">Contact</h4>
          <p className="text-white/70 text-sm">
            Kamatghar Road, Brahmanand Nagar,<br />
            Bhiwandi, Maharashtra 421305
          </p>
          <p className="mt-3 text-white/70 text-sm">
            <a href="tel:+917387326222" className="hover:text-sunshine">+91 73873 26222</a><br />
            <a href="mailto:info@littlechampsschool.com" className="hover:text-sunshine break-all">info@littlechampsschool.com</a>
          </p>
        </div>

        <div>
          <h4 className="font-display font-bold text-lg mb-4">Tiny newsletter</h4>
          <p className="text-white/70 text-sm mb-3">Monthly updates on events, tips & little wins.</p>
          <form onSubmit={subscribe} className="flex items-center gap-2 bg-white/10 rounded-full p-1.5 pl-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="bg-transparent flex-1 text-sm outline-none placeholder:text-white/50"
            />
            <button aria-label="Subscribe" className="w-9 h-9 rounded-full bg-candy text-white flex items-center justify-center btn-pop">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="container relative mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/60 text-sm">
        <p>© 2025 Little Champs School. Crafted with love and care.</p>
        <p className="font-playful">…born to win</p>
      </div>
    </footer>
  );
};
