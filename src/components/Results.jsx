import { motion } from 'framer-motion';
import { results } from '../data/portfolioData';
import Counter from './ui/Counter';
import Kolam from './ui/Kolam';
import SectionHeading from './ui/SectionHeading';

export default function Results() {
  return (
    <section id="results" aria-labelledby="results-title" className="section-pad relative isolate overflow-hidden bg-burgundy">
      <div aria-hidden="true" className="pulli-grid-light absolute inset-0 -z-10" />
      <Kolam className="absolute -bottom-24 -left-20 -z-10 w-80 text-gold/15" />
      <Kolam className="absolute -top-20 -right-16 -z-10 hidden w-64 text-gold/15 md:block" />

      <div className="container-page">
        <SectionHeading
          id="results-title"
          tone="dark"
          title="Academic achievements and results"
          tamil="தேர்ச்சி முடிவுகள்"
          intro="The numbers behind the classroom: consistent pass results, top scores and long service."
        />

        <motion.dl
          className="grid gap-px overflow-hidden rounded-[1.75rem] bg-gold/25 ring-1 ring-gold/25 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          {results.map((item) => (
            <motion.div
              key={item.label}
              className="group flex flex-col-reverse justify-end bg-burgundy p-8 transition-colors duration-500 hover:bg-burgundy-soft sm:p-10"
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <dt className="mt-4">
                <span className="block font-serif text-xl text-cream">{item.label}</span>
                <span className="mt-2 block text-[0.95rem] leading-relaxed text-cream/70">{item.detail}</span>
              </dt>
              <dd className="font-display text-6xl leading-none text-gold transition-transform duration-500 group-hover:-translate-y-1 sm:text-7xl">
                <Counter to={item.value} suffix={item.suffix} />
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
