import { motion } from 'framer-motion';
import { personalDetails, showPersonalDetails } from '../data/portfolioData';
import SectionHeading from './ui/SectionHeading';

export default function PersonalInfo() {
  if (!showPersonalDetails) return null;

  return (
    <section aria-labelledby="personal-title" className="bg-white pb-20 sm:pb-24 lg:pb-32">
      <div className="container-page">
        <div className="rounded-[2rem] border border-charcoal/10 bg-cream px-6 py-12 sm:px-12 sm:py-14">
          <SectionHeading id="personal-title" title="Personal details" tamil="தனிப்பட்ட விவரங்கள்" />

          <motion.dl
            className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          >
            {personalDetails.map((item) => (
              <motion.div
                key={item.label}
                className="border-t border-charcoal/10 py-5"
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <dt className="text-sm text-gold-ink">{item.label}</dt>
                <dd className="mt-1 font-serif text-xl text-charcoal">{item.value}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
