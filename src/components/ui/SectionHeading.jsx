import { motion } from 'framer-motion';

/**
 * Bilingual section heading: English title in Caslon, Tamil title in gold beneath,
 * with a short gold rule that draws in from the left.
 */
export default function SectionHeading({ title, tamil, intro, tone = 'light', align = 'left', id }) {
  const dark = tone === 'dark';
  const centered = align === 'center';

  return (
    <motion.header
      className={`mb-12 max-w-2xl sm:mb-16 ${centered ? 'mx-auto text-center' : ''}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
    >
      <motion.h2
        id={id}
        className={`font-display text-4xl leading-[1.05] sm:text-5xl lg:text-[3.5rem] ${
          dark ? 'text-cream' : 'text-charcoal'
        }`}
        variants={{
          hidden: { opacity: 0, y: 24 },
          show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
        }}
      >
        {title}
      </motion.h2>

      <motion.div
        className={`mt-4 flex items-center gap-4 ${centered ? 'justify-center' : ''}`}
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } }}
      >
        <motion.span
          aria-hidden="true"
          className="block h-px w-12 origin-left bg-gold"
          variants={{
            hidden: { scaleX: 0 },
            show: { scaleX: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
          }}
        />
        <span lang="ta" className={`tamil text-lg sm:text-xl ${dark ? 'text-gold' : 'text-gold-ink'}`}>
          {tamil}
        </span>
      </motion.div>

      {intro && (
        <motion.p
          className={`mt-6 text-lg ${dark ? 'text-cream/80' : 'text-ink-soft'}`}
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {intro}
        </motion.p>
      )}
    </motion.header>
  );
}
