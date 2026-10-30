import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { navLinks, profile } from '../data/portfolioData';
import useActiveSection from '../hooks/useActiveSection';

const sectionIds = navLinks.map((link) => link.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const menuButtonRef = useRef(null);
  const firstLinkRef = useRef(null);

  // Solid background once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu: lock page scroll, close on Escape, manage focus
  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();

    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const menuButton = menuButtonRef.current;
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      menuButton?.focus();
    };
  }, [open]);

  // Close the menu if the screen grows to desktop width
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1280px)');
    const onChange = () => query.matches && setOpen(false);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled && !open
            ? 'bg-cream/90 shadow-[0_1px_0_rgb(41_41_41/0.08),0_12px_30px_-20px_rgb(41_41_41/0.35)] backdrop-blur-md'
            : 'bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <nav
          aria-label="Main"
          className={`container-page flex items-center justify-between gap-6 transition-[height] duration-500 ${
            scrolled ? 'h-16' : 'h-20'
          }`}
        >
          {/* Monogram and name */}
          <a href="#home" className="group flex items-center gap-3" aria-label={`${profile.name}, back to top`}>
            <span className="grid size-10 place-items-center rounded-full bg-burgundy font-display text-lg text-gold ring-1 ring-gold/50 transition-transform duration-500 group-hover:rotate-[8deg]">
              JR
            </span>
            <span
              className={`hidden font-display text-xl transition-colors duration-300 sm:block ${
                open ? 'text-cream' : 'text-charcoal'
              }`}
            >
              {profile.name}
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`group relative block px-3 py-2 text-[0.95rem] transition-colors duration-300 ${
                      isActive ? 'text-burgundy' : 'text-charcoal/75 hover:text-burgundy'
                    }`}
                  >
                    {link.label}
                    {/* hover underline */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[var(--ease-elegant)] group-hover:scale-x-100"
                    />
                    {/* active marker slides between links */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden="true"
                        className="absolute inset-x-3 bottom-1 h-[2px] bg-burgundy"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <motion.a
              href={profile.cvUrl}
              download={profile.cvFileName}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className={`hidden items-center gap-2 rounded-full bg-burgundy px-5 py-2.5 text-sm font-medium tracking-wide text-cream transition-colors duration-300 hover:bg-burgundy-deep ${
                open ? 'sm:hidden' : 'sm:inline-flex'
              }`}
            >
              <Download className="size-4" strokeWidth={1.8} aria-hidden="true" />
              Download CV
            </motion.a>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={`grid size-11 place-items-center rounded-full ring-1 transition-colors xl:hidden ${
                open
                  ? 'text-cream ring-cream/30 hover:text-gold hover:ring-gold/60'
                  : 'text-charcoal ring-charcoal/15 hover:text-burgundy hover:ring-burgundy/40'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile and tablet menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-burgundy pulli-grid-light px-6 pt-[calc(6rem+env(safe-area-inset-top,0px))] pb-[calc(2rem+env(safe-area-inset-bottom,0px))] xl:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 3rem) 2.5rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 3rem) 2.5rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 3rem) 2.5rem)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.ul
              className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
            >
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.id}
                  variants={{ hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === link.id ? 'location' : undefined}
                    className={`block py-2 font-display text-[2rem] leading-tight transition-colors sm:text-4xl ${
                      active === link.id ? 'text-gold' : 'text-cream hover:text-gold'
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.a
              href={profile.cvUrl}
              download={profile.cvFileName}
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-medium text-burgundy-deep"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.55 } }}
            >
              <Download className="size-4" aria-hidden="true" />
              Download CV
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
