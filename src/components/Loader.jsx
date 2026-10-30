import { motion } from 'framer-motion';
import { profile } from '../data/portfolioData';

/**
 * Opening screen: the Tamil letter அ (the first letter of the alphabet)
 * with the teacher's name, then the curtain lifts to reveal the site.
 */
export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
      initial={{ opacity: 1 }}
      exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading the portfolio of {profile.name}</span>

      <motion.span
        aria-hidden="true"
        lang="ta"
        className="tamil text-[7rem] leading-none text-burgundy sm:text-[9rem]"
        initial={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        அ
      </motion.span>

      <motion.p
        aria-hidden="true"
        className="mt-4 font-display text-2xl text-charcoal"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7 }}
      >
        {profile.name}
      </motion.p>

      <div className="mt-6 h-px w-40 overflow-hidden bg-charcoal/10" aria-hidden="true">
        <motion.div
          className="h-full origin-left bg-gold"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
        />
      </div>
    </motion.div>
  );
}
