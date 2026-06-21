import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Wraps every page in a subtle fade/slide transition (used with AnimatePresence in AppRoutes). */
export default function Page({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
