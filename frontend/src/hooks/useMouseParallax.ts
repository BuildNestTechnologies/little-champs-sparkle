import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export const useMouseParallax = (strength = 20) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [strength, -strength]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-strength, strength]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      x.set(e.clientX / innerWidth - 0.5);
      y.set(e.clientY / innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return { rotateX, rotateY };
};
