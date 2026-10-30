import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { gallery } from '../data/portfolioData';
import Reveal from './ui/Reveal';

/** Certificate and photograph gallery with a full-screen viewer. */
export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null);
  const closeButtonRef = useRef(null);
  const lastTriggerRef = useRef(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (direction) => setOpenIndex((index) => (index + direction + gallery.length) % gallery.length),
    [],
  );

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKey = (event) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      lastTriggerRef.current?.focus();
    };
  }, [isOpen, close, step]);

  const item = isOpen ? gallery[openIndex] : null;

  return (
    <div className="mt-24">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl text-charcoal sm:text-3xl">Certificates and moments</h3>
          <p lang="ta" className="tamil mt-1 text-gold-ink">
            சான்றிதழ்கள்
          </p>
        </div>
        <p className="text-sm text-ink-soft">Select an image to view it larger.</p>
      </Reveal>

      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-5 lg:grid-cols-3">
        {gallery.map((entry, index) => (
          <Reveal as="li" key={entry.caption} delay={(index % 3) * 0.08}>
            <button
              type="button"
              onClick={(event) => {
                lastTriggerRef.current = event.currentTarget;
                setOpenIndex(index);
              }}
              className="group block w-full text-left"
              aria-label={`View larger: ${entry.caption}`}
            >
              <span className="relative block overflow-hidden rounded-xl bg-parchment ring-1 ring-charcoal/10">
                <img
                  src={entry.image}
                  alt={entry.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[var(--ease-elegant)] group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 grid place-items-center bg-burgundy-deep/0 transition-colors duration-500 group-hover:bg-burgundy-deep/40">
                  <span className="grid size-12 scale-75 place-items-center rounded-full bg-cream text-burgundy opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                    <Expand className="size-5" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                </span>
              </span>
              <span className="mt-3 block text-sm leading-snug text-charcoal sm:text-[0.95rem]">{entry.caption}</span>
            </button>
          </Reveal>
        ))}
      </ul>

      {/* Full-screen viewer */}
      <AnimatePresence>
        {item && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={item.caption}
            className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-burgundy-deep/95 px-4 pt-[calc(4.5rem+env(safe-area-inset-top,0px))] pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Close viewer"
              className="absolute top-[calc(1rem+env(safe-area-inset-top,0px))] right-4 grid size-11 place-items-center rounded-full text-cream ring-1 ring-cream/30 transition-colors hover:text-gold hover:ring-gold"
            >
              <X className="size-5" aria-hidden="true" />
            </button>

            <AnimatePresence mode="wait">
              <motion.figure
                key={openIndex}
                className="flex max-h-full w-full max-w-4xl flex-col items-center"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={(event) => event.stopPropagation()}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="max-h-[70vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
                />
                <figcaption className="mt-5 text-center text-cream">
                  <span className="font-serif text-lg">{item.caption}</span>
                  <span className="mt-1 block text-sm text-cream/60">
                    {openIndex + 1} of {gallery.length}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <div className="mt-6 flex gap-3" onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="grid size-12 place-items-center rounded-full text-cream ring-1 ring-cream/30 transition-colors hover:text-gold hover:ring-gold"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="grid size-12 place-items-center rounded-full text-cream ring-1 ring-cream/30 transition-colors hover:text-gold hover:ring-gold"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
