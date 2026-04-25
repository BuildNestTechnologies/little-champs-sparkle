import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <motion.button
      id="theme-toggle"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92 }}
      className={`
        relative w-14 h-7 rounded-full flex items-center cursor-pointer transition-colors duration-400 outline-none
        focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky
        ${isDark
          ? "bg-gradient-to-r from-sky/70 to-candy/70 shadow-[0_0_14px_hsl(199_92%_60%/0.5)]"
          : "bg-gradient-to-r from-sunshine to-candy shadow-sun"
        }
      `}
    >
      {/* Track pill */}
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-card flex items-center justify-center
          ${isDark ? "left-7" : "left-0.5"}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.25 }}
            >
              <Moon className="w-3.5 h-3.5 text-sky" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.25 }}
            >
              <Sun className="w-3.5 h-3.5 text-sunshine" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </motion.button>
  );
};
