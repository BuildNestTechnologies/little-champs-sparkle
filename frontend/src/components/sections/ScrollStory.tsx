import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import graduationImg from "@/assets/story-graduation.png";
import playImg from "@/assets/feature_play.png";

export const ScrollStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const scale1 = useTransform(scrollYProgress, [0, 0.4], [0.8, 1]);

  const x2 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const scale2 = useTransform(scrollYProgress, [0.4, 1], [0.8, 1.2]);

  return (
    <section ref={containerRef} className="relative h-[150vh] bg-cream dark:bg-background overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 pattern-clouds opacity-40 dark:opacity-10" />
      
      <div className="container relative h-full flex flex-col items-center justify-center gap-20">
        <div className="text-center max-w-2xl mx-auto z-10">
          <motion.span 
            style={{ opacity: opacity1 }}
            className="font-hand text-4xl text-sky block"
          >
            The journey begins...
          </motion.span>
          <motion.h2 
            style={{ opacity: opacity1 }}
            className="mt-4 font-display font-bold text-5xl text-ink dark:text-foreground"
          >
            From tiny steps to <span className="gradient-text">giant leaps</span>.
          </motion.h2>
        </div>

        <div className="relative w-full max-w-4xl aspect-[21/9] flex items-center justify-center">
          {/* Toddler Stage */}
          <motion.div
            style={{ x: x1, opacity: opacity1, scale: scale1 }}
            className="absolute left-0 w-64 h-64 md:w-80 md:h-80 rounded-[3rem] overflow-hidden shadow-pop ring-8 ring-white dark:ring-card"
          >
            <img src={playImg} alt="Toddler playing" className="w-full h-full object-cover" />
          </motion.div>

          {/* Path line */}
          <svg className="w-full h-24 text-sky/20 dark:text-sky/10" viewBox="0 0 100 20" preserveAspectRatio="none">
            <motion.path
              d="M 10 10 Q 50 20 90 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="1 2"
            />
          </svg>

          {/* Graduate Stage */}
          <motion.div
            style={{ x: x2, opacity: opacity2, scale: scale2 }}
            className="absolute right-0 w-64 h-64 md:w-80 md:h-80 rounded-[3rem] overflow-hidden shadow-sun ring-8 ring-white dark:ring-card"
          >
            <img src={graduationImg} alt="Child graduating" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        <div className="text-center max-w-2xl mx-auto z-10">
          <motion.p 
            style={{ opacity: opacity2 }}
            className="text-2xl font-playful font-bold text-ink/70 dark:text-foreground/70"
          >
            Every child is a champion in the making.
          </motion.p>
        </div>
      </div>
    </section>
  );
};
