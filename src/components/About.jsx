import { motion } from 'framer-motion';
import { about } from '../data/portfolioData';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad relative overflow-x-clip bg-white">
      <div className="container-page grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Image column */}
        <Reveal className="lg:sticky lg:top-28 lg:col-span-5" x={-30} y={0}>
          <figure className="group relative isolate mx-auto max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-[2rem] rounded-tl-[6rem] shadow-[0_40px_80px_-40px_rgb(74_21_36/0.5)]">
              <motion.div
                initial={{ scale: 1.12 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={about.image}
                  alt={about.imageAlt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover sm:aspect-[5/6] transition-transform duration-[1.4s] ease-[var(--ease-elegant)] group-hover:scale-[1.05]"
                />
              </motion.div>
            </div>
            <div
              aria-hidden="true"
              className="absolute -bottom-5 -left-5 -z-10 h-2/3 w-2/3 rounded-[2rem] rounded-bl-[5rem] bg-parchment"
            />
          </figure>
        </Reveal>

        {/* Text column */}
        <div className="lg:col-span-7">
          <SectionHeading id="about-title" title="About me" tamil="என்னைப் பற்றி" />

          <div className="max-w-[40rem] space-y-6 text-lg leading-[1.8] text-ink-soft">
            <Reveal>
              <p className="font-serif text-[1.35rem] leading-[1.6] text-charcoal">{about.paragraphs[0]}</p>
            </Reveal>

            {/* Teaching philosophy, anchored by a couplet from the Thirukkural */}
            <Reveal>
              <figure className="relative my-10 rounded-2xl bg-burgundy px-7 py-8 text-cream sm:px-10 sm:py-10">
                <span
                  aria-hidden="true"
                  className="absolute -top-7 left-6 font-display text-[6rem] leading-none text-gold"
                >
                  “
                </span>
                <blockquote>
                  <p lang="ta" className="tamil text-xl leading-[1.7] text-gold sm:text-2xl sm:leading-[1.7]">
                    {about.quote.tamil.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                  <p className="mt-4 font-serif text-lg text-cream/90 italic">{about.quote.translation}</p>
                </blockquote>
                <figcaption className="mt-4 text-sm text-cream/65">{about.quote.source}</figcaption>
              </figure>
            </Reveal>

            {about.paragraphs.slice(1).map((paragraph) => (
              <Reveal key={paragraph.slice(0, 24)}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
