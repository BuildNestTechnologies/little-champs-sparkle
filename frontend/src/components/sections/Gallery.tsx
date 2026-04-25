import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import g1 from "@/assets/gallery-1.png";
import g2 from "@/assets/gallery-2.png";
import g3 from "@/assets/gallery-3.png";
import g4 from "@/assets/gallery-4.png";
import g5 from "@/assets/gallery-5.png";
import g6 from "@/assets/gallery-6.png";
import g7 from "@/assets/gallery-7.png";
import g8 from "@/assets/gallery-8.png";

const IMAGES = [
  { src: g1, alt: "Cultural festival celebration", h: "tall" },
  { src: g2, alt: "Outdoor play area" },
  { src: g3, alt: "Birthday celebration in classroom" },
  { src: g4, alt: "Art and craft corner" },
  { src: g5, alt: "Storytime under a tree", h: "tall" },
  { src: g6, alt: "Sports day fun" },
  { src: g7, alt: "Music class with toddlers" },
  { src: g8, alt: "Healthy snack time" },
];

export const Gallery = () => {
  const [open, setOpen] = useState<number | null>(null);
  const [video, setVideo] = useState(false);

  const close = () => setOpen(null);
  const next = () => setOpen((i) => (i === null ? 0 : (i + 1) % IMAGES.length));
  const prev = () => setOpen((i) => (i === null ? 0 : (i - 1 + IMAGES.length) % IMAGES.length));

  return (
    <section id="gallery" className="relative py-24 lg:py-32 bg-cream">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-hand text-3xl text-candy">a peek inside</span>
          <h2 className="mt-1 font-display font-bold text-4xl lg:text-5xl text-ink">
            Moments of <span className="gradient-text">joy</span>
          </h2>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-5 [column-fill:_balance]">
          {/* video tour tile */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            onClick={() => setVideo(true)}
            className="group relative mb-5 break-inside-avoid w-full rounded-3xl overflow-hidden bg-gradient-rainbow aspect-square shadow-pop btn-pop"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <span className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-pop animate-pulse-glow">
                <Play className="w-7 h-7 text-candy ml-1" fill="currentColor" />
              </span>
              <span className="mt-3 font-display font-bold text-xl">Video Tour</span>
              <span className="text-white/80 font-playful">See our school in action</span>
            </div>
          </motion.button>

          {IMAGES.map((img, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.5, rotate: i % 2 === 0 ? -5 : 5, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ 
                type: "spring",
                stiffness: 150,
                damping: 15,
                delay: i * 0.04
              }}
              onClick={() => setOpen(i)}
              className="group relative mb-5 block w-full break-inside-avoid rounded-3xl overflow-hidden shadow-card ring-2 ring-white dark:ring-border btn-pop"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className={`w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 ${img.h === "tall" ? "aspect-[3/4]" : "aspect-square"}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end justify-center pb-4">
                <span className="text-white font-bold font-playful text-sm px-3 py-1 rounded-full bg-white/20 backdrop-blur-md">View Moment</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-ink/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={close}
          >
            <button onClick={close} aria-label="Close" className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white text-ink flex items-center justify-center shadow-pop">
              <X className="w-6 h-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous" className="absolute left-5 w-12 h-12 rounded-full bg-white text-ink flex items-center justify-center shadow-pop">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next" className="absolute right-5 w-12 h-12 rounded-full bg-white text-ink flex items-center justify-center shadow-pop">
              <ChevronRight className="w-6 h-6" />
            </button>
            <motion.img
              key={open}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={IMAGES[open].src}
              alt={IMAGES[open].alt}
              className="max-h-[85vh] max-w-[90vw] rounded-3xl shadow-pop ring-4 ring-white"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video modal */}
      <AnimatePresence>
        {video && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-ink/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setVideo(false)}
          >
            <button onClick={() => setVideo(false)} aria-label="Close" className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white text-ink flex items-center justify-center shadow-pop">
              <X className="w-6 h-6" />
            </button>
            <div className="w-full max-w-3xl aspect-video rounded-3xl overflow-hidden shadow-pop ring-4 ring-white" onClick={(e) => e.stopPropagation()}>
              <iframe
                title="Little Champs School video tour"
                src="https://www.youtube.com/embed/zdq7ItjDZgs"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
