import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { experience } from '../data/portfolioData';
import Kolam from './ui/Kolam';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

function formatTotal(months) {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const yearText = `${years} year${years === 1 ? '' : 's'}`;
  return rest ? `${yearText} and ${rest} month${rest === 1 ? '' : 's'}` : yearText;
}

export default function Experience() {
  const totalMonths = experience.reduce((sum, job) => sum + job.months, 0);
  const current = experience.find((job) => job.current);
  const earlier = experience.filter((job) => !job.current);

  return (
    <section id="experience" aria-labelledby="experience-title" className="section-pad relative overflow-x-clip bg-white">
      <div className="container-page">
        <SectionHeading
          id="experience-title"
          title="Professional experience"
          tamil="பணி அனுபவம்"
          intro={`${formatTotal(totalMonths)} of teaching across ${experience.length} schools in the Nilgiris, from matriculation and government schools to higher secondary.`}
        />

        {/* Current position */}
        {current && (
          <Reveal>
            <article className="relative isolate overflow-hidden rounded-[2rem] bg-burgundy px-7 py-10 text-cream sm:px-12 sm:py-14 lg:grid lg:grid-cols-12 lg:items-end lg:gap-12">
              <div aria-hidden="true" className="pulli-grid-light absolute inset-0 -z-10 opacity-60" />
              <Kolam draw className="absolute -top-16 -right-16 -z-10 w-56 text-gold/25 sm:w-72" />

              <div className="lg:col-span-8">
                <p className="inline-flex items-center gap-2.5 rounded-full bg-gold/15 px-4 py-1.5 text-sm text-gold ring-1 ring-gold/30">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full rounded-full bg-gold opacity-75 motion-safe:animate-ping" />
                    <span className="relative inline-flex size-2 rounded-full bg-gold" />
                  </span>
                  Currently teaching here
                </p>
                <h3 className="mt-6 font-display text-[2rem] leading-tight text-cream sm:text-4xl lg:text-5xl">
                  {current.school}
                </h3>
                <p className="mt-4 flex items-center gap-2 text-cream/75">
                  <MapPin className="size-4 text-gold" strokeWidth={1.8} aria-hidden="true" />
                  {current.place}, The Nilgiris
                </p>
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-cream/15 pt-8 lg:col-span-4 lg:mt-0 lg:grid-cols-1 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                <div>
                  <dt className="text-sm text-cream/60">Position</dt>
                  <dd className="mt-1 font-serif text-xl text-cream">{current.role}</dd>
                </div>
                <div>
                  <dt className="text-sm text-cream/60">Service so far</dt>
                  <dd className="mt-1 font-serif text-xl text-gold">{current.duration}</dd>
                </div>
              </dl>
            </article>
          </Reveal>
        )}

        {/* Earlier positions, oldest first */}
        <div className="mt-20">
          <Reveal>
            <h3 className="font-serif text-2xl text-charcoal sm:text-3xl">Where I taught before</h3>
          </Reveal>

          <div className="relative mt-10">
            <motion.div
              aria-hidden="true"
              className="absolute top-[0.6rem] right-0 left-0 hidden h-px origin-left bg-gold/60 lg:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '0px 0px -80px 0px' }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
            <span aria-hidden="true" className="absolute top-3 bottom-3 left-[0.55rem] w-px bg-gold/50 sm:hidden" />
            <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {earlier.map((job, index) => (
                <Reveal as="li" key={job.school} delay={index * 0.12} className="relative pl-10 sm:pl-0">
                  <span
                    aria-hidden="true"
                    className="absolute top-0.5 left-0 z-10 block size-[1.2rem] rounded-full border-2 border-gold bg-white sm:relative sm:top-0"
                  />
                  <p className="text-sm text-gold-ink sm:mt-6">
                    {String(index + 1).padStart(2, '0')}
                    <span className="sr-only"> of {earlier.length}</span>
                  </p>
                  <p className="mt-1 font-display text-3xl text-burgundy">{job.duration}</p>
                  <h4 className="mt-3 font-serif text-xl leading-snug text-charcoal">{job.school}</h4>
                  <p className="mt-2 text-ink-soft">
                    {job.role}, {job.place}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
