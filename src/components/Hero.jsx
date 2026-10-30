
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Download, Radio, Trophy } from 'lucide-react';
import { awards, profile } from '../data/portfolioData';
import Button from './ui/Button';
import Counter from './ui/Counter';
import Kolam from './ui/Kolam';

const ease = [0.22, 1, 0.36, 1];

const column = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
};

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease },
  },
};

// Tamil letters drifting softly in the background
const floatingLetters = [
  { char: 'க', className: 'left-[3%] top-[30%] text-6xl', duration: 11 },
  { char: 'ழ', className: 'left-[47%] top-[11%] text-5xl', duration: 13 },
  { char: 'ஞ', className: 'left-[2%] bottom-[12%] text-7xl', duration: 15 },
  { char: 'ற', className: 'right-[3%] bottom-[8%] text-6xl', duration: 12 },
  { char: 'ங', className: 'left-[40%] bottom-[4%] text-5xl', duration: 14 },
];

export default function Hero({ ready }) {
  const reduceMotion = useReducedMotion();
  const nameWords = profile.name.split(' ');
  const introWords = profile.intro.split(' ');
  const state = ready ? 'show' : 'hidden';

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 lg:pt-32"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pulli-grid absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_70%_45%,black_10%,transparent_70%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_80%_30%,rgb(197_161_90/0.16),transparent_45%)]"
      />

      {/* Floating Tamil letters */}
      {floatingLetters.map((letter) => (
        <motion.span
          key={letter.char}
          aria-hidden="true"
          lang="ta"
          className={`tamil pointer-events-none absolute -z-10 hidden text-gold-ink/15 select-none lg:block ${letter.className}`}
          animate={
            reduceMotion
              ? undefined
              : { y: [0, -16, 0], rotate: [0, 3, 0] }
          }
          transition={{
            duration: letter.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {letter.char}
        </motion.span>
      ))}

      <div className="container-page grid items-center gap-16 lg:grid-cols-12 lg:gap-8">

        {/* TEXT SECTION */}
        <motion.div
          className="lg:col-span-7"
          variants={column}
          initial="hidden"
          animate={state}
        >
          <h1
            id="hero-title"
            className="font-display text-[clamp(3.4rem,10vw,6.75rem)] leading-[0.95] tracking-[-0.01em] text-charcoal"
          >
            <span className="sr-only">{profile.name}</span>

            <span aria-hidden="true">
              {nameWords.map((word) => (
                <span
                  key={word}
                  className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] align-bottom last:mr-0"
                >
                  <motion.span
                    className="inline-block"
                    variants={{
                      hidden: { y: '110%' },
                      show: {
                        y: 0,
                        transition: { duration: 1, ease },
                      },
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <motion.p
            variants={rise}
            className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-1"
          >
            <span className="font-serif text-2xl text-burgundy italic sm:text-[1.7rem]">
              {profile.qualifications}
            </span>

            <span lang="ta" className="tamil text-xl text-gold-ink">
              {profile.nameTamil}
            </span>
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-8 border-l-2 border-gold pl-5"
          >
            <p className="font-serif text-xl text-charcoal sm:text-2xl">
              {profile.designation}
            </p>

            <p className="mt-1 text-ink-soft">
              {profile.school}, {profile.town}
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.p
            className="mt-8 max-w-[38rem] text-lg leading-relaxed text-ink-soft sm:text-xl sm:leading-relaxed"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.025 },
              },
            }}
          >
            {introWords.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 },
                  },
                }}
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={rise}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Button
              href={profile.cvUrl}
              download={profile.cvFileName}
              icon={Download}
            >
              Download resume
            </Button>

            <Button href="#about" variant="outline" icon={ArrowDown}>
              Explore my journey
            </Button>
          </motion.div>

          {/* Highlights */}
          <motion.dl
            variants={rise}
            className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-charcoal/10 border-t border-charcoal/10 pt-7"
          >
            <div className="flex flex-col-reverse pr-4">
              <dt className="text-sm leading-snug text-ink-soft">
                Years teaching Tamil
              </dt>

              <dd className="font-display text-4xl text-burgundy sm:text-5xl">
                <Counter to={14} suffix="+" start={ready} />
              </dd>
            </div>

            <div className="flex flex-col-reverse px-4">
              <dt className="text-sm leading-snug text-ink-soft">
                Awards and honours
              </dt>

              <dd className="font-display text-4xl text-burgundy sm:text-5xl">
                <Counter to={awards.length} start={ready} duration={1.4} />
              </dd>
            </div>

            <div className="flex flex-col-reverse pl-4">
              <dt className="text-sm leading-snug text-ink-soft">
                Pass rate, two years running
              </dt>

              <dd className="font-display text-4xl text-burgundy sm:text-5xl">
                <Counter to={100} suffix="%" start={ready} />
              </dd>
            </div>
          </motion.dl>
        </motion.div>

        {/* PORTRAIT SECTION */}
        <div className="relative isolate mx-auto w-full max-w-[22.5rem] lg:col-span-5 lg:mx-0 lg:ml-auto">

          {/* Tamil decorative letter - behind portrait */}
          <motion.span
            aria-hidden="true"
            lang="ta"
            className="tamil pointer-events-none absolute -bottom-6 left-2 z-0 text-[8rem] leading-none text-transparent select-none [-webkit-text-stroke:1.25px_var(--color-gold)] sm:left-8 sm:text-[11rem] lg:-left-4 lg:text-[13rem]"
            initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
            animate={
              ready
                ? { opacity: 1, scale: 1, rotate: 0 }
                : undefined
            }
            transition={{ duration: 1.8, ease, delay: 0.9 }}
          >
            அ
          </motion.span>

          {/* Kolam decoration */}
          <Kolam
            draw
            className="pointer-events-none absolute -right-5 -bottom-10 -z-10 hidden w-40 text-gold/80 sm:block"
          />

          {/* Main Portrait */}
          <motion.div
            className="relative z-10 ml-auto w-full max-w-[16.5rem] sm:max-w-[22rem] lg:max-w-[22.5rem]"
            initial={{ opacity: 0, y: 40 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1.1, ease, delay: 0.45 }}
          >
            {/* Gold outline */}
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-[50%_40%] rounded-b-3xl border border-gold"
            />

            {/* Portrait image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[50%_40%] rounded-b-3xl bg-parchment shadow-[0_40px_80px_-40px_rgb(74_21_36/0.55)] ring-1 ring-gold/40">
              <motion.img
                src={profile.portrait}
                alt={profile.portraitAlt}
                className="size-full object-cover"
                initial={{ scale: 1.18 }}
                animate={ready ? { scale: 1 } : undefined}
                whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                transition={{ duration: 1.6, ease }}
                fetchPriority="high"
              />
            </div>

            {/* AWARD CARD */}
            <motion.div
              className="absolute z-30 left-2 -bottom-8 flex max-w-[13.5rem] items-center gap-3 rounded-2xl bg-white/95 p-3.5 pr-5 shadow-[0_20px_40px_-20px_rgb(41_41_41/0.45)] ring-1 ring-charcoal/5 backdrop-blur sm:-left-12 sm:top-[26%] sm:bottom-auto sm:right-auto lg:-left-16"
              initial={{ opacity: 0, x: -20 }}
              animate={ready ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.8, ease, delay: 1.1 }}
            >
              <motion.span
                className="grid size-11 shrink-0 place-items-center rounded-full bg-burgundy text-gold"
                animate={
                  reduceMotion || !ready
                    ? undefined
                    : { rotate: [0, -8, 8, 0] }
                }
                transition={{
                  duration: 1.2,
                  delay: 2,
                  repeat: Infinity,
                  repeatDelay: 6,
                }}
              >
                <Trophy
                  className="size-5"
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </motion.span>

              <span className="leading-tight">
                <span className="block font-serif text-[0.95rem] text-charcoal">
                  Best Teacher Award
                </span>

                <span className="text-sm text-ink-soft">
                  UIT, 2025
                </span>
              </span>
            </motion.div>

            {/* ALL INDIA RADIO BADGE */}
            <motion.div
              className="absolute z-30 top-4 right-2 flex items-center gap-2 rounded-full bg-burgundy py-2 pr-4 pl-2.5 text-xs text-cream shadow-lg ring-1 ring-gold/40 sm:top-12 sm:-right-2 sm:text-sm lg:-right-4"
              initial={{ opacity: 0, x: 20 }}
              animate={ready ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.8, ease, delay: 1.3 }}
            >
              <Radio
                className="size-4 shrink-0 text-gold"
                strokeWidth={1.8}
                aria-hidden="true"
              />

              <span className="whitespace-nowrap">
                All India Radio speaker
              </span>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
