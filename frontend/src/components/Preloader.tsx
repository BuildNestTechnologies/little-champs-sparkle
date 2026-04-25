import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const Preloader = () => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-hero"
        >
          <div className="relative">
            <motion.svg
              viewBox="0 0 120 120"
              className="w-32 h-32"
              initial="hidden"
              animate="visible"
            >
              <motion.path
                d="M60 12 L72 46 L108 46 L78 68 L90 102 L60 82 L30 102 L42 68 L12 46 L48 46 Z"
                fill="none"
                stroke="hsl(47 100% 55%)"
                strokeWidth="4"
                strokeLinejoin="round"
                strokeDasharray="400"
                initial={{ strokeDashoffset: 400 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              />
              <motion.path
                d="M60 12 L72 46 L108 46 L78 68 L90 102 L60 82 L30 102 L42 68 L12 46 L48 46 Z"
                fill="hsl(47 100% 62%)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.05, duration: 0.3 }}
              />
            </motion.svg>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center font-display font-bold text-ink mt-2"
            >
              Little Champs
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
