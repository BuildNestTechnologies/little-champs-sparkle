import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const Header = () => {
  const scrolled = useScrolled(20);
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          scrolled ? "py-2 glass shadow-card" : "py-4 bg-transparent"
        )}
      >
        <div className="container flex items-center justify-between">
          <Logo size={scrolled ? 40 : 48} />
          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="underline-draw font-playful font-bold text-ink/80 hover:text-ink">
                {n.label}
              </a>
            ))}
            <a href="#contact" className="ml-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-rainbow text-white font-bold shadow-pop btn-pop">
              Book a Visit
            </a>
          </nav>
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full bg-white shadow-card text-ink"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] lg:hidden"
          >
            <motion.div
              initial={{ clipPath: "circle(0% at 100% 0%)" }}
              animate={{ clipPath: "circle(150% at 100% 0%)" }}
              exit={{ clipPath: "circle(0% at 100% 0%)" }}
              transition={{ duration: 0.6, ease: [0.6, 0.05, 0.2, 1] }}
              className="absolute inset-0 bg-gradient-hero"
            />
            <div className="relative h-full flex flex-col">
              <div className="flex items-center justify-between p-5">
                <Logo size={42} />
                <button aria-label="Close menu" onClick={() => setOpen(false)} className="w-11 h-11 rounded-full bg-white shadow-card flex items-center justify-center">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 flex flex-col items-center justify-center gap-5 px-6">
                {NAV.map((n, i) => (
                  <motion.a
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                    className="font-display font-bold text-3xl text-ink"
                  >
                    {n.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-rainbow text-white font-bold shadow-pop"
                >
                  Book a Visit
                </motion.a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
