import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/animations";
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
];

const COLOR_MAP: Record<string, string> = {
  candy: "from-candy/20 to-candy/5",
  sunshine: "from-sunshine/20 to-sunshine/5",
  sky: "from-sky/20 to-sky/5",
  leaf: "from-leaf/20 to-leaf/5",
};

const BUTTON_COLOR: Record<string, string> = {
  candy: "bg-candy",
  sunshine: "bg-sunshine",
  sky: "bg-sky",
  leaf: "bg-leaf",
};

export const Programs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalScrollWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalScrollWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Stagger items internal animations
      PROGRAMS.forEach((_, i) => {
        gsap.from(`.program-card-${i}`, {
          scale: 0.8,
          opacity: 0,
          rotateY: 20,
          scrollTrigger: {
            trigger: `.program-card-${i}`,
            containerAnimation: gsap.getById("mainTrack"), // Note: need to handle this differently with GSAP hook
            start: "left center",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="programs" className="scroll-track-container bg-cream dark:bg-background">
      <div className="scroll-track-sticky">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-10 w-full px-4">
          <span className="font-hand text-3xl text-leaf block">tailored for every age</span>
          <h2 className="mt-1 font-display font-bold text-4xl lg:text-5xl text-ink dark:text-foreground">
            Our <span className="gradient-text">Programs</span>
          </h2>
        </div>

        <div ref={trackRef} className="scroll-track-inner flex items-center h-full">
          {PROGRAMS.map((p, i) => (
            <div 
              key={p.id} 
              className={`program-card-${i} flex-shrink-0 w-screen h-screen flex items-center justify-center p-6 lg:p-20`}
            >
              <div className={`relative w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center bg-white dark:bg-card rounded-[3rem] shadow-pop p-6 lg:p-14 overflow-hidden border border-white/40 dark:border-white/5 bg-gradient-to-br ${COLOR_MAP[p.color]}`}>
                
                {/* Decoration blobs */}
                <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full bg-${p.color} opacity-10 blur-3xl`} />
                <div className={`absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-${p.color} opacity-10 blur-3xl`} />

                <div className="relative rounded-3xl overflow-hidden ring-8 ring-white dark:ring-border shadow-card h-full max-h-[450px]">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                  <div className={`absolute top-6 left-6 px-6 py-2 rounded-full ${BUTTON_COLOR[p.color]} text-white font-display font-bold shadow-pop text-lg`}>
                    {p.age}
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="font-display font-bold text-4xl lg:text-6xl text-ink dark:text-foreground">{p.name}</h3>
                  <p className="mt-5 text-xl lg:text-2xl text-ink/70 dark:text-foreground/70 font-body leading-relaxed">{p.desc}</p>
                  
                  <div className="mt-8">
                    <div className="font-playful font-bold text-ink/70 dark:text-foreground/60 uppercase text-sm tracking-widest mb-4">Key activities</div>
                    <div className="flex flex-wrap gap-3">
                      {p.activities.map((a) => (
                        <span key={a} className="px-5 py-2 rounded-full bg-white/80 dark:bg-muted border border-white dark:border-white/5 font-playful font-bold text-ink/80 dark:text-foreground/80 shadow-sm">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a 
                    href="#contact" 
                    className={`mt-10 inline-flex items-center gap-3 px-8 py-4 rounded-full ${BUTTON_COLOR[p.color]} text-white font-bold shadow-pop btn-pop text-lg`}
                  >
                    Enroll for {p.name}
                    <ArrowRight className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
           {PROGRAMS.map((_, i) => (
             <div key={i} className="w-2 h-2 rounded-full bg-ink/20 dark:bg-foreground/20" />
           ))}
        </div>
      </div>
    </section>
  );
};
