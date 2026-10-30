import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import PersonalInfo from './components/PersonalInfo';
import Education from './components/Education';
import Experience from './components/Experience';
import Awards from './components/Awards';
import Results from './components/Results';
import Interests from './components/Interests';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';

const MIN_LOADER_MS = 1400;
const MAX_LOADER_MS = 3000;

export default function App() {
  const [loading, setLoading] = useState(true);

  // Keep the opening screen until the fonts are ready (and at least a moment, at most 3 s)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const minimum = new Promise((resolve) => setTimeout(resolve, reduce ? 200 : MIN_LOADER_MS));
    const fonts = document.fonts?.ready ?? Promise.resolve();
    const timeout = new Promise((resolve) => setTimeout(resolve, MAX_LOADER_MS));

    let cancelled = false;
    Promise.race([Promise.all([minimum, fonts]), timeout]).then(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Stop the page scrolling behind the opening screen
  useEffect(() => {
    document.documentElement.style.overflow = loading ? 'hidden' : '';
  }, [loading]);

  return (
    // reducedMotion="user" turns movement off for visitors who ask their device for less motion
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>

      <a
        href="#main"
        className="fixed top-3 left-3 z-[80] -translate-y-24 rounded-full bg-burgundy px-5 py-3 text-cream transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Navbar />

      <main id="main" className="overflow-x-clip">
        <Hero ready={!loading} />
        <About />
        <PersonalInfo />
        <Education />
        <Experience />
        <Awards />
        <Results />
        <Interests />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </MotionConfig>
  );
}
