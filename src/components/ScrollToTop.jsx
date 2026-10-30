import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

/** Floating button that appears after scrolling down and returns to the top. */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollUp}
          aria-label="Back to top"
          className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] z-40 grid size-12 place-items-center rounded-full bg-burgundy text-gold shadow-[0_12px_30px_-10px_rgb(74_21_36/0.7)] ring-1 ring-gold/40 sm:right-6 sm:bottom-6"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
        >
          <ArrowUp className="size-5" strokeWidth={1.8} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
