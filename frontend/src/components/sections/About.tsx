import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import aboutImg from "@/assets/about-classroom.png";
import { Counter } from "@/components/ui/Counter";

const STATS = [
  { value: 5, suffix: "+", label: "Years of Joy", color: "text-candy" },
  { value: 200, suffix: "+", label: "Happy Kids", color: "text-sky" },
  { value: 6, suffix: "+", label: "Expert Teachers", color: "text-leaf" },
  { value: 4, suffix: "", label: "Programs", color: "text-sunshine" },
];

export const About = () => (
  <section id="about" className="relative py-24 lg:py-32 overflow-hidden bg-background transition-colors duration-400">
    <div className="absolute -top-20 right-0 w-[420px] h-[420px] rounded-full bg-gradient-sunshine opacity-20 dark:opacity-10 blur-3xl" />
    <div className="container relative grid lg:grid-cols-2 gap-14 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        <div className="absolute -top-8 -left-8 w-40 h-40 rounded-3xl bg-gradient-candy -rotate-6 opacity-80 dark:opacity-40" />
        <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-3xl bg-gradient-sky rotate-6 opacity-80 dark:opacity-40" />
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-pop ring-4 ring-white dark:ring-card">
          <img src={aboutImg} alt="Cozy classroom at Little Champs" className="w-full h-auto" loading="lazy" />
        </div>
        <div className="absolute -bottom-6 left-6 bg-white dark:bg-card rounded-2xl shadow-card px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sunshine flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-ink" />
          </div>
          <div>
            <div className="font-display font-bold text-ink dark:text-foreground leading-tight">Since 2019</div>
            <div className="text-xs text-ink/60 dark:text-foreground/60">Loved by parents</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <span className="font-hand text-3xl text-candy">Welcome to our world</span>
        <h2 className="mt-2 font-display font-bold text-4xl lg:text-5xl text-ink dark:text-foreground leading-tight">
          A loving home where <span className="gradient-text">little champs</span> bloom.
        </h2>
        <p className="mt-5 text-lg text-ink/70 dark:text-foreground/70 font-body">
          At Little Champs School, we believe in learning through play. Our nurturing environment encourages curiosity, creativity, and confidence in every child. With a perfect 5.0 rating from happy parents, we're committed to laying a strong foundation for your little one's future.
        </p>
        <p className="mt-3 text-ink/70 dark:text-foreground/70 font-body">
          Located on Kamatghar Road, Brahmanand Nagar, Bhiwandi, our bright classrooms, safe play zones, and warm teachers turn every day into a small adventure.
        </p>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white dark:bg-card shadow-card p-4 text-center">
              <div className={`font-display font-bold text-3xl ${s.color}`}>
                <Counter end={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs font-playful font-bold text-ink/70 dark:text-foreground/70 uppercase tracking-wide mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <a href="#programs" className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ink dark:bg-foreground text-white dark:text-background font-bold shadow-card btn-pop">
          Read Our Story
        </a>
      </motion.div>
    </div>
  </section>
);
