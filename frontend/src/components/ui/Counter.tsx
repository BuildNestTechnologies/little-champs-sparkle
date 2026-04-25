import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const Counter = ({ end, suffix = "+", duration = 2 }: { end: number; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const step = end / (duration * 60);
      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="inline-flex overflow-hidden">
      <motion.span
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        {count}{suffix}
      </motion.span>
    </span>
  );
};
