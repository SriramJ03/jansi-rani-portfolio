import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { education } from '../data/portfolioData';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

export default function Education() {
  const timelineRef = useRef(null);
  // The gold line grows as the visitor scrolls through the timeline
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 75%', 'end 60%'] });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  const first = education[0].year;
  const last = education[education.length - 1].year;

  return (
    <section id="education" aria-labelledby="education-title" className="section-pad relative bg-cream">
      <div className="container-page">
        <SectionHeading
          id="education-title"
          title="Educational qualifications"
          tamil="கல்வித் தகுதிகள்"
          intro={`From the State Board examinations in ${first} to a master’s degree in Tamil in ${last}, with a teaching degree specialising in the language.`}
        />

        <div ref={timelineRef} className="relative">
          {/* Track and animated line */}
          <div aria-hidden="true" className="absolute top-2 bottom-2 left-[1.15rem] w-px bg-charcoal/10 md:left-1/2" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: lineProgress }}
            className="absolute top-2 bottom-2 left-[1.1rem] w-[3px] origin-top rounded-full bg-gold md:left-[calc(50%-1px)]"
          />

          <ol className="space-y-10 md:space-y-6">
            {education.map((item, index) => {
              const cardOnLeft = index % 2 === 0;
              return (
                <li key={item.title} className="relative grid items-center pl-14 md:grid-cols-2 md:gap-24 md:pl-0">
                  {/* Node on the line */}
                  <motion.span
                    aria-hidden="true"
                    className="absolute top-8 left-[1.25rem] grid size-5 -translate-x-1/2 place-items-center rounded-full border-2 border-gold bg-cream md:top-1/2 md:left-1/2 md:-translate-y-1/2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '0px 0px -120px 0px' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.15 }}
                  >
                    <span className="size-1.5 rounded-full bg-burgundy" />
                  </motion.span>

                  {/* Large year on the opposite side (tablet and up) */}
                  <Reveal
                    y={0}
                    x={cardOnLeft ? 30 : -30}
                    className={`hidden md:block ${cardOnLeft ? 'md:order-2' : 'md:order-1 md:text-right'}`}
                  >
                    <span className="font-display text-7xl text-gold-ink/80 lg:text-8xl">{item.year}</span>
                  </Reveal>

                  <Reveal
                    y={20}
                    x={cardOnLeft ? -30 : 30}
                    className={cardOnLeft ? 'md:order-1' : 'md:order-2'}
                  >
                    <article className="group rounded-2xl border border-charcoal/10 bg-white p-6 transition-[border-color,box-shadow,translate] duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_24px_50px_-30px_rgb(74_21_36/0.45)] sm:p-7">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-display text-3xl text-gold-ink md:hidden">{item.year}</p>
                          <h3 className="font-serif text-2xl text-charcoal">{item.title}</h3>
                          <p className="mt-1 text-ink-soft">{item.institution}</p>
                        </div>
                        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-cream text-burgundy ring-1 ring-gold/40 transition-colors duration-500 group-hover:bg-burgundy group-hover:text-gold">
                          <GraduationCap className="size-5" strokeWidth={1.6} aria-hidden="true" />
                        </span>
                      </div>
                      <p className="mt-5 inline-flex items-baseline gap-2 rounded-full bg-cream px-4 py-1.5 text-sm text-ink-soft">
                        Marks
                        <span className="font-serif text-base text-burgundy">{item.marks}</span>
                      </p>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
