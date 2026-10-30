import { motion } from 'framer-motion';

/**
 * Fades and lifts its children into view the first time they are scrolled to.
 * With "reduce motion" switched on, only the fade remains (see MotionConfig in App.jsx).
 */
export default function Reveal({ children, delay = 0, y = 28, x = 0, className = '', as = 'div' }) {
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Component>
  );
}
