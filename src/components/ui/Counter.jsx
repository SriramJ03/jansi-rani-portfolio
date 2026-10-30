import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

/**
 * Counts up from 0 to `to` the first time it scrolls into view
 * (and once `start` is true, which lets the hero wait for the loader).
 * Screen readers hear only the final value.
 */
export default function Counter({ to, suffix = '', prefix = '', duration = 2, start = true, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || !start) return undefined;
    if (reduceMotion) {
      setValue(to);
      return undefined;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, start, reduceMotion, to, duration]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true" className="tabular-nums">
        {prefix}
        {value}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {to}
        {suffix}
      </span>
    </span>
  );
}
