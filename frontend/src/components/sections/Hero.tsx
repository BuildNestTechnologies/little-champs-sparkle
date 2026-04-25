import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Star } from "lucide-react";
import heroKids from "@/assets/hero-kids.png";
import { FloatingShapes } from "@/components/ui/FloatingShapes";

const WORDS = ["Nurturing", "Playful", "Creative", "Safe", "Joyful"];

export const Hero = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-hero pattern-stars">
      <FloatingShapes density="high" />
      {/* color blobs */}
      <div className="blob bg-sunshine w-[420px] h-[420px] -top-32 -left-20" />
      <div className="blob bg-candy w-[360px] h-[360px] top-1/3 -right-24" />
      <div className="blob bg-sky w-[300px] h-[300px] bottom-0 left-1/3" />

      <div className="container relative z-10 grid lg:grid-cols-2 gap-10 items-center pt-10 pb-20 lg:pt-20 lg:pb-28 min-h-[88vh]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 shadow-card mb-6"
          >
            <Star className="w-4 h-4 fill-sunshine text-sunshine" />
            <span className="font-playful font-bold text-ink">5.0 ★ Rated by Parents</span>
          </motion.div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-ink leading-[1.05]">
            A
            <span className="inline-block min-w-[5ch] px-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={WORDS[i]}
                  initial={{ y: 30, opacity: 0, rotate: -4 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -30, opacity: 0, rotate: 4 }}
                  transition={{ duration: 0.45 }}
                  className="inline-block gradient-text"
                >
                  {WORDS[i]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            place to grow.
          </h1>

          <p className="mt-5 text-lg lg:text-xl text-ink/70 font-body max-w-xl">
            Welcome to <span className="font-bold text-ink">Little Champs School</span> — where little steps become big leaps. A vibrant kindergarten in Bhiwandi designed for curious minds, kind hearts, and big imaginations.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#programs" className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-rainbow text-white font-bold shadow-pop btn-pop">
              Explore Our World
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-ink font-bold shadow-card btn-pop">
              Book a Visit
            </a>
          </div>

          <div className="mt-10 flex items-center gap-5 text-ink/70 text-sm">
            <div className="flex -space-x-2">
              {[
                "hsl(47 100% 62%)",
                "hsl(199 92% 64%)",
                "hsl(335 100% 72%)",
                "hsl(100 60% 60%)",
              ].map((c, idx) => (
                <div key={idx} className="w-8 h-8 rounded-full ring-2 ring-white" style={{ background: c }} />
              ))}
            </div>
            <span><span className="font-bold text-ink">200+ happy kids</span> • Playgroup to UKG</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-6 bg-white/40 rounded-[3rem] blur-2xl" />
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-pop ring-4 ring-white animate-float-slow">
            <img src={heroKids} alt="Happy preschool children playing at Little Champs" className="w-full h-auto" loading="eager" />
          </div>
          {/* floating badges */}
          <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-card px-3 py-2 font-playful font-bold text-ink animate-float-fast">
            🎨 Play-Based
          </div>
          <div className="absolute -bottom-4 -right-4 bg-sunshine rounded-2xl shadow-sun px-3 py-2 font-playful font-bold text-ink animate-float-med">
            ⭐ 5.0 Rating
          </div>
          <div className="absolute top-1/3 -right-6 bg-candy text-white rounded-2xl shadow-pop px-3 py-2 font-playful font-bold animate-float-slow">
            12:1 Ratio
          </div>
        </motion.div>
      </div>

      <a href="#about" aria-label="Scroll to about" className="absolute left-1/2 -translate-x-1/2 bottom-6 flex flex-col items-center gap-1 text-ink/70 hover:text-ink transition">
        <span className="text-xs font-playful font-bold tracking-wider">DISCOVER MORE</span>
        <ChevronDown className="w-6 h-6 animate-bounce-soft" />
      </a>
    </section>
  );
};
