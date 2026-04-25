import { motion } from "framer-motion";
import { Palette, Shield, Users, Music, Trees, Heart, type LucideIcon } from "lucide-react";
import fPlay from "@/assets/feature_play.png";
import fSafe from "@/assets/feature_safe.png";
import fRatio from "@/assets/feature_ratio.png";
import fCulture from "@/assets/feature_culture.png";
import fOutdoor from "@/assets/feature_outdoor.png";
import fTeachers from "@/assets/feature_teachers.png";

type Feature = { icon: LucideIcon; title: string; front: string; back: string; gradient: string; iconBg: string; image: string };

const FEATURES: Feature[] = [
  { icon: Palette, title: "Play-Based Learning", front: "We turn lessons into adventures.", back: "Hands-on activities, sensory play & creative projects every single day.", gradient: "bg-gradient-candy", iconBg: "bg-candy", image: fPlay },
  { icon: Shield, title: "Safe & Hygienic", front: "Your child's safety is our top priority.", back: "CCTV-monitored campus, sanitised play areas and trained staff.", gradient: "bg-gradient-sky", iconBg: "bg-sky", image: fSafe },
  { icon: Users, title: "12 : 1 Student Ratio", front: "Individual attention for every champ.", back: "Small group sizes mean every child is seen, heard and celebrated.", gradient: "bg-gradient-leaf", iconBg: "bg-leaf", image: fRatio },
  { icon: Music, title: "Cultural Activities", front: "Festivals, dance, music & more.", back: "Annual day, Diwali, Holi, Christmas — we celebrate joy in every form.", gradient: "bg-gradient-sunshine", iconBg: "bg-sunshine", image: fCulture },
  { icon: Trees, title: "Outdoor Play Zone", front: "Big skies, big imaginations.", back: "Slides, swings, sand pit and a green garden for daily outdoor play.", gradient: "bg-gradient-leaf", iconBg: "bg-leaf", image: fOutdoor },
  { icon: Heart, title: "Loving Teachers", front: "Patient, trained and full of warmth.", back: "Our 6+ teachers are chosen for their kindness as much as their skill.", gradient: "bg-gradient-candy", iconBg: "bg-candy", image: fTeachers },
];

export const Features = () => (
  <section className="relative py-24 lg:py-32 bg-cream dark:bg-background pattern-stars transition-colors duration-400">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="font-hand text-3xl text-sky">why parents love us</span>
        <h2 className="mt-1 font-display font-bold text-4xl lg:text-5xl text-ink dark:text-foreground">
          What makes us <span className="gradient-text">special</span>
        </h2>
        <p className="mt-3 text-ink/70 dark:text-foreground/60">Hover or tap each card to peek inside.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group perspective-1000 h-64"
          >
            <div className="relative w-full h-full preserve-3d transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* front */}
              <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden shadow-card group-hover:shadow-pop transition-shadow duration-500">
                <img src={f.image} alt={f.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-2">
                    <f.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">{f.title}</h3>
                  <p className="text-white/80 text-sm font-playful">{f.front}</p>
                </div>
              </div>
              {/* back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-white dark:bg-card shadow-pop p-7 flex flex-col justify-center">
                <div className={`w-14 h-14 rounded-2xl ${f.iconBg} flex items-center justify-center mb-4`}>
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-ink dark:text-foreground">{f.title}</h3>
                <p className="text-ink/70 dark:text-foreground/70 mt-2">{f.back}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
