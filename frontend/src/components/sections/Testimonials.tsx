import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import a1 from "@/assets/avatar-mom-1.png";
import a2 from "@/assets/avatar-dad-1.png";
import a3 from "@/assets/avatar-mom-2.png";

const REVIEWS = [
  { name: "Raviraj", when: "Parent", quote: "Nice place for children. Loving place. My daughter looks forward to school every single day!", avatar: a2, color: "bg-sunshine" },
  { name: "Prashant", when: "Parent", quote: "Excellent execution and professional staff. The teachers truly care about each child’s growth.", avatar: a1, color: "bg-sky" },
  { name: "Nutan Patil", when: "Parent", quote: "Overall growth for the baby — confidence, manners and learning. Highly recommend Little Champs!", avatar: a3, color: "bg-candy" },
];

const ROT = ["-rotate-3", "rotate-2", "-rotate-1"];

export const Testimonials = () => {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % REVIEWS.length), 4500);
    return () => clearInterval(t);
  }, [paused]);

  const r = REVIEWS[i];

  return (
    <section id="testimonials" className="relative py-24 lg:py-32 bg-gradient-hero pattern-clouds overflow-hidden">
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-hand text-3xl text-sky">happy parents</span>
          <h2 className="mt-1 font-display font-bold text-4xl lg:text-5xl text-ink">
            Words from our <span className="gradient-text">family</span>
          </h2>
          <div className="mt-3 flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="w-5 h-5 fill-sunshine text-sunshine" />)}
            <span className="ml-2 font-playful font-bold text-ink">5.0 from 6 reviews</span>
          </div>
        </div>

        <div
          className="relative max-w-2xl mx-auto h-[420px] sm:h-[380px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 50, rotate: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, rotate: -8, scale: 0.9 }}
              transition={{ duration: 0.55, ease: [0.6, 0.05, 0.2, 1] }}
              className={`absolute inset-0 ${ROT[i % ROT.length]}`}
            >
              <div className="relative h-full bg-white rounded-2xl shadow-pop p-7 sm:p-10 flex flex-col">
                <span className="tape -top-2 left-1/2 -translate-x-1/2 -rotate-3" />
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="w-4 h-4 fill-sunshine text-sunshine" />)}
                </div>
                <p className="font-hand text-2xl sm:text-3xl text-ink leading-snug">“{r.quote}”</p>
                <div className="mt-auto pt-6 flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full ${r.color} ring-2 ring-white shadow-card overflow-hidden`}>
                    <img src={r.avatar} alt={r.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-ink">{r.name}</div>
                    <div className="text-xs text-ink/60 font-playful">{r.when}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button onClick={() => setI((v) => (v - 1 + REVIEWS.length) % REVIEWS.length)} aria-label="Previous review" className="absolute -left-3 sm:-left-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-card flex items-center justify-center text-ink z-10">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => setI((v) => (v + 1) % REVIEWS.length)} aria-label="Next review" className="absolute -right-3 sm:-right-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-card flex items-center justify-center text-ink z-10">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {REVIEWS.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`Go to review ${k + 1}`}
              className={`h-2.5 rounded-full transition-all ${k === i ? "w-8 bg-candy" : "w-2.5 bg-ink/20 hover:bg-ink/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
