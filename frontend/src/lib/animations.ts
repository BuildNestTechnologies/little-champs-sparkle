import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Global configuration
gsap.config({
  nullTargetWarn: false,
});

// Reusable animation tokens
export const ANIM = {
  duration: 0.8,
  ease: "power3.out",
  stagger: 0.1,
};

// ScrollTrigger Defaults
ScrollTrigger.defaults({
  toggleActions: "play none none reverse",
});

export { gsap, ScrollTrigger };
