import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { navLinks, profile } from '../data/portfolioData';
import Kolam from './ui/Kolam';

export default function Footer() {
  const year = new Date().getFullYear();

  const backToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <footer className="relative isolate overflow-hidden bg-burgundy-deep pt-20 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] text-cream">
      <div aria-hidden="true" className="pulli-grid-light absolute inset-0 -z-10 opacity-70" />
      <span
        aria-hidden="true"
        lang="ta"
        className="tamil pointer-events-none absolute -right-6 -bottom-24 -z-10 text-[18rem] leading-none text-gold/[0.07] select-none sm:text-[24rem]"
      >
        தமிழ்
      </span>

      <div className="container-page">
        <div className="grid gap-12 border-b border-cream/15 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Kolam className="mb-6 w-16 text-gold" />
            <p className="font-display text-4xl text-cream sm:text-5xl">{profile.name}</p>
            <p className="mt-2 font-serif text-xl text-gold italic">{profile.qualifications}</p>
            <p className="mt-5 max-w-sm text-cream/75">
              {profile.designation}, {profile.school}, {profile.town}.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-4">
            <p className="font-serif text-lg text-gold">Quick links</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="inline-block py-1 text-cream/80 transition-[color,translate] duration-300 hover:translate-x-1 hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2 lg:justify-self-end">
            <motion.button
              type="button"
              onClick={backToTop}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.94 }}
              className="group flex items-center gap-3 text-cream/80 hover:text-gold lg:flex-col lg:items-end"
            >
              <span className="grid size-14 place-items-center rounded-full ring-1 ring-gold/50 transition-colors group-hover:bg-gold group-hover:text-burgundy-deep">
                <ArrowUp className="size-5" strokeWidth={1.7} aria-hidden="true" />
              </span>
              Back to top
            </motion.button>
          </div>
        </div>

        <p className="pt-8 text-sm text-cream/60">
          © {year} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
