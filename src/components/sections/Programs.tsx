import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import playgroup from "@/assets/program-playgroup.png";
import nursery from "@/assets/program-nursery.png";
import lkg from "@/assets/program-lkg.png";
import ukg from "@/assets/program-ukg.png";

const PROGRAMS = [
  {
    id: "playgroup", name: "Playgroup", age: "2 – 3 yrs", img: playgroup, color: "candy",
    desc: "A gentle introduction to school life through music, sensory play and lots of cuddles.",
    activities: ["Sensory bins", "Story time", "Music & rhymes", "Free play", "Snack time"],
  },
  {
    id: "nursery", name: "Nursery", age: "3 – 4 yrs", img: nursery, color: "sunshine",
    desc: "Building confidence with creative arts, alphabets through play, and friendships that last.",
    activities: ["Finger painting", "ABC fun", "Counting games", "Outdoor play", "Show & tell"],
  },
  {
    id: "lkg", name: "LKG", age: "4 – 5 yrs", img: lkg, color: "sky",
    desc: "Structured learning meets joyful exploration — reading, writing and discovery rolled into one.",
    activities: ["Phonics", "Number sense", "Craft projects", "Group games", "Cultural events"],
  },
  {
    id: "ukg", name: "UKG", age: "5 – 6 yrs", img: ukg, color: "leaf",
    desc: "Getting ready for big school with strong fundamentals, curiosity and a happy heart.",
    activities: ["Reading", "Writing", "Basic math", "Public speaking", "Science play"],
  },
] as const;

export const Programs = () => {
  const [active, setActive] = useState(PROGRAMS[0].id);
  const cur = PROGRAMS.find((p) => p.id === active)!;

  return (
    <section id="programs" className="relative py-24 lg:py-32 overflow-hidden bg-gradient-hero">
      <div className="absolute -top-24 left-10 w-72 h-72 rounded-full bg-sky opacity-30 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-candy opacity-30 blur-3xl" />

      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-hand text-3xl text-leaf">tailored for every age</span>
          <h2 className="mt-1 font-display font-bold text-4xl lg:text-5xl text-ink">
            Our <span className="gradient-text">Programs</span>
          </h2>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-3 mb-8 lg:justify-center">
          {PROGRAMS.map((p) => {
            const isActive = p.id === active;
            return (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={`shrink-0 px-6 py-3 rounded-full font-display font-bold text-base transition-all ${
                  isActive
                    ? "bg-ink text-white shadow-pop scale-105"
                    : "bg-white text-ink/70 hover:text-ink shadow-card"
                }`}
              >
                {p.name} <span className={`ml-1 text-xs font-body ${isActive ? "text-white/70" : "text-ink/50"}`}>· {p.age}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={cur.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-10 items-center bg-white rounded-[2.5rem] shadow-pop p-6 lg:p-10"
          >
            <div className="relative rounded-3xl overflow-hidden ring-4 ring-white shadow-card">
              <img src={cur.img} alt={`${cur.name} class`} className="w-full h-auto" loading="lazy" />
              <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-full bg-${cur.color} text-white font-display font-bold shadow-pop`}>
                {cur.age}
              </div>
            </div>
            <div>
              <h3 className="font-display font-bold text-3xl lg:text-4xl text-ink">{cur.name}</h3>
              <p className="mt-3 text-lg text-ink/70 font-body">{cur.desc}</p>
              <div className="mt-6">
                <div className="font-playful font-bold text-ink/70 uppercase text-sm tracking-wide mb-3">Key activities</div>
                <div className="flex flex-wrap gap-2">
                  {cur.activities.map((a) => (
                    <span key={a} className="px-4 py-1.5 rounded-full bg-cream border border-border font-playful font-bold text-ink/80">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
              <a href="#contact" className={`mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-${cur.color} text-white font-bold shadow-pop btn-pop`}>
                Enroll for {cur.name}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
