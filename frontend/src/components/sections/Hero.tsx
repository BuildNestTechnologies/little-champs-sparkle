import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ArrowRight, ChevronDown, Star } from "lucide-react";
import heroKids from "@/assets/hero-kids.png";
import { FloatingShapes } from "@/components/ui/FloatingShapes";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import confetti from "canvas-confetti";

const WORDS = ["Nurturing", "Playful", "Creative", "Safe", "Joyful"];

export const Hero = () => {
  const [i, setI] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { rotateX, rotateY } = useMouseParallax(15);
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 300]);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);

  const handleConfetti = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { x: clientX / window.innerWidth, y: clientY / window.innerHeight },
      colors: ["#FFD23F", "#4FC3F7", "#FF6FAE", "#7DD957"],
      shapes: ["circle", "square"],
      scalar: 0.8,
    });
  };

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-hero pattern-stars">
      <FloatingShapes density="high" />
      {/* color blobs — reduced opacity in dark for a soft glow instead of muddy patches */}
      <div className="blob bg-sunshine w-[420px] h-[420px] -top-32 -left-20 opacity-55 dark:opacity-20" />
      <div className="blob bg-candy w-[360px] h-[360px] top-1/3 -right-24 opacity-55 dark:opacity-15" />
      <div className="blob bg-sky w-[300px] h-[300px] bottom-0 left-1/3 opacity-55 dark:opacity-20" />

      <div className="container relative z-10 grid lg:grid-cols-2 gap-10 items-center pt-10 pb-20 lg:pt-20 lg:pb-28 min-h-[88vh]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-card/80 shadow-card mb-6"
          >
            <Star className="w-4 h-4 fill-sunshine text-sunshine" />
            <span className="font-playful font-bold text-ink dark:text-foreground">5.0 Rated by Parents</span>
          </motion.div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-ink dark:text-foreground leading-[1.05]">
            A
            <span className="inline-block min-w-[5ch] px-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={WORDS[i]}
                  initial={{ y: 20, opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ y: -20, opacity: 0, scale: 1.1, filter: "blur(8px)" }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="inline-block gradient-text"
                >
                  {WORDS[i]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            place to grow.
          </h1>

          <p className="mt-5 text-lg lg:text-xl text-ink/70 dark:text-foreground/70 font-body max-w-xl">
            Welcome to <span className="font-bold text-ink dark:text-foreground">Little Champs School</span> — where little steps become big leaps. A vibrant kindergarten in Bhiwandi designed for curious minds, kind hearts, and big imaginations.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a 
              href="#programs" 
              onMouseEnter={handleConfetti}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-rainbow text-white font-bold shadow-pop btn-pop"
            >
              Explore Our World
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white dark:bg-card text-ink dark:text-foreground font-bold shadow-card btn-pop">
              Book a Visit
            </a>
          </div>

          <div className="mt-10 flex items-center gap-5 text-ink/70 dark:text-foreground/70 text-sm">
            <div className="flex -space-x-2">
              {[
                "hsl(47 100% 62%)",
                "hsl(199 92% 64%)",
                "hsl(335 100% 72%)",
                "hsl(100 60% 60%)",
              ].map((c, idx) => (
                <div key={idx} className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-card" style={{ background: c }} />
              ))}
            </div>
            <span><span className="font-bold text-ink dark:text-foreground">200+ happy kids</span> • Playgroup to UKG</span>
          </div>
        </div>

        <motion.div
          style={{ rotateX, rotateY }}
          className="relative perspective-1000 preserve-3d"
        >
          <div className="absolute -inset-10 bg-white/40 dark:bg-sky/5 rounded-[4rem] blur-3xl animate-pulse" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative rounded-[2.5rem] overflow-hidden shadow-pop ring-8 ring-white dark:ring-card translate-z-20"
          >
            <img src={heroKids} alt="Happy preschool children playing at Little Champs" className="w-full h-auto" loading="eager" />
          </motion.div>
          {/* floating badges */}
          <div className="absolute -top-4 -left-4 bg-white dark:bg-card rounded-2xl shadow-card px-3 py-2 font-playful font-bold text-ink dark:text-foreground animate-float-fast flex items-center gap-2">
            <Star className="w-4 h-4 text-candy fill-candy" /> Play-Based
          </div>
          <div className="absolute -bottom-4 -right-4 bg-sunshine rounded-2xl shadow-sun px-3 py-2 font-playful font-bold text-ink animate-float-med flex items-center gap-2">
            <Star className="w-4 h-4 text-ink fill-ink" /> 5.0 Rating
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
