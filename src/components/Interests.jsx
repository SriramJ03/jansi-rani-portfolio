import { motion } from 'framer-motion';
import { Leaf, Mic, ScrollText } from 'lucide-react';
import { interests } from '../data/portfolioData';
import Kolam from './ui/Kolam';
import SectionHeading from './ui/SectionHeading';

const icons = { scroll: ScrollText, leaf: Leaf, mic: Mic };

export default function Interests() {
  return (
    <section id="interests" aria-labelledby="interests-title" className="section-pad relative bg-parchment">
      <div className="container-page">
        <SectionHeading
          id="interests-title"
          title="Areas of interest"
          tamil="ஆர்வங்கள்"
          intro="The subjects I return to outside the syllabus, each rooted in the Tamil tradition."
        />

        <motion.ul
          className="grid gap-6 md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
        >
          {interests.map((interest) => {
            const Icon = icons[interest.icon] ?? ScrollText;
            return (
              <motion.li
                key={interest.title}
                className="group relative isolate flex flex-col overflow-hidden rounded-[1.75rem] bg-cream p-8 ring-1 ring-charcoal/10 transition-shadow duration-500 hover:shadow-[0_30px_60px_-35px_rgb(74_21_36/0.55)]"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                {/* Typographic illustration: the Tamil name, large */}
                <div className="relative mb-6 flex h-52 items-center justify-center">
                  <Kolam className="absolute w-48 text-gold/30 transition-transform duration-[1.2s] ease-[var(--ease-elegant)] group-hover:rotate-45" />
                  <span className="relative grid size-20 place-items-center rounded-full bg-burgundy text-gold shadow-[0_16px_30px_-12px_rgb(74_21_36/0.7)] transition-transform duration-500 group-hover:scale-110">
                    <Icon className="size-8" strokeWidth={1.4} aria-hidden="true" />
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-charcoal">{interest.title}</h3>
                <p lang="ta" className="tamil mt-1 text-lg text-gold-ink">
                  {interest.tamil}
                </p>
                <p className="mt-3 leading-relaxed text-ink-soft">{interest.text}</p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
