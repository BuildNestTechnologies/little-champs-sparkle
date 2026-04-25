import { motion } from "framer-motion";
import { Palette, Shield, Users, Music, Trees, Heart, type LucideIcon } from "lucide-react";

type Feature = { icon: LucideIcon; title: string; front: string; back: string; gradient: string; iconBg: string };

const FEATURES: Feature[] = [
  { icon: Palette, title: "Play-Based Learning", front: "We turn lessons into adventures.", back: "Hands-on activities, sensory play & creative projects every single day.", gradient: "bg-gradient-candy", iconBg: "bg-candy" },
  { icon: Shield, title: "Safe & Hygienic", front: "Your child’s safety is our top priority.", back: "CCTV-monitored campus, sanitised play areas and trained staff.", gradient: "bg-gradient-sky", iconBg: "bg-sky" },
  { icon: Users, title: "12 : 1 Student Ratio", front: "Individual attention for every champ.", back: "Small group sizes mean every child is seen, heard and celebrated.", gradient: "bg-gradient-leaf", iconBg: "bg-leaf" },
  { icon: Music, title: "Cultural Activities", front: "Festivals, dance, music & more.", back: "Annual day, Diwali, Holi, Christmas — we celebrate joy in every form.", gradient: "bg-gradient-sunshine", iconBg: "bg-sunshine" },
  { icon: Trees, title: "Outdoor Play Zone", front: "Big skies, big imaginations.", back: "Slides, swings, sand pit and a green garden for daily outdoor play.", gradient: "bg-gradient-leaf", iconBg: "bg-leaf" },
  { icon: Heart, title: "Loving Teachers", front: "Patient, trained and full of warmth.", back: "Our 6+ teachers are chosen for their kindness as much as their skill.", gradient: "bg-gradient-candy", iconBg: "bg-candy" },
];

export const Features = () => (
  <section className="relative py-24 lg:py-32 bg-cream pattern-stars">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="font-hand text-3xl text-sky">why parents love us</span>
        <h2 className="mt-1 font-display font-bold text-4xl lg:text-5xl text-ink">
          What makes us <span className="gradient-text">special</span>
        </h2>
        <p className="mt-3 text-ink/70">Hover or tap each card to peek inside.</p>
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
              <div className={`absolute inset-0 backface-hidden rounded-3xl ${f.gradient} p-7 shadow-card flex flex-col justify-between`}>
                <div className={`w-14 h-14 rounded-2xl bg-white/90 shadow-soft flex items-center justify-center`}>
                  <f.icon className="w-7 h-7 text-ink" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-ink">{f.title}</h3>
                  <p className="text-ink/80 mt-1 font-playful">{f.front}</p>
                </div>
              </div>
              {/* back */}
              <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-white shadow-pop p-7 flex flex-col justify-center`}>
                <div className={`w-14 h-14 rounded-2xl ${f.iconBg} flex items-center justify-center mb-4`}>
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-ink">{f.title}</h3>
                <p className="text-ink/70 mt-2">{f.back}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
