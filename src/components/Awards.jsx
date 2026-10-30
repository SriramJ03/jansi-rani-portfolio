import { motion } from 'framer-motion';
import { Award, HeartHandshake, Medal, Mic, Radio, Trophy } from 'lucide-react';
import { awards } from '../data/portfolioData';
import Gallery from './Gallery';
import SectionHeading from './ui/SectionHeading';

const icons = { trophy: Trophy, award: Award, medal: Medal, heart: HeartHandshake, mic: Mic, radio: Radio };

const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Awards() {
  return (
    <section id="achievements" aria-labelledby="awards-title" className="section-pad relative bg-cream">
      <div className="container-page">
        <SectionHeading
          id="awards-title"
          title="Awards and recognition"
          tamil="விருதுகளும் பாராட்டுகளும்"
          intro="Honours from schools, civic organisations and the district administration, and invitations to speak on public platforms."
        />

        <motion.ul
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {awards.map((award) => {
            const Icon = icons[award.icon] ?? Award;
            const featured = award.featured;
            return (
              <motion.li
                key={`${award.title}-${award.by}`}
                variants={card}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className={`group relative flex flex-col overflow-hidden rounded-2xl p-7 transition-shadow duration-500 ${
                  featured
                    ? 'bg-burgundy text-cream shadow-[0_30px_60px_-30px_rgb(74_21_36/0.8)]'
                    : 'border border-charcoal/10 bg-white hover:border-gold/60 hover:shadow-[0_30px_60px_-35px_rgb(74_21_36/0.5)]'
                }`}
              >
                {/* gold sheen that sweeps across on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-gold/20 to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100 motion-reduce:hidden"
                />

                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`grid size-14 place-items-center rounded-full ring-1 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 ${
                      featured ? 'bg-gold/15 text-gold ring-gold/40' : 'bg-cream text-burgundy ring-gold/40'
                    }`}
                  >
                    <Icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  {award.year && (
                    <span className={`font-display text-2xl ${featured ? 'text-gold' : 'text-gold-ink'}`}>{award.year}</span>
                  )}
                </div>

                <h3 className={`mt-8 font-serif text-[1.4rem] leading-snug ${featured ? 'text-cream' : 'text-charcoal'}`}>
                  {award.title}
                </h3>
                <p className={`mt-2 ${featured ? 'text-cream/75' : 'text-ink-soft'}`}>{award.by}</p>
              </motion.li>
            );
          })}
        </motion.ul>

        <Gallery />
      </div>
    </section>
  );
}
