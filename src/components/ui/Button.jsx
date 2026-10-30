import { motion } from 'framer-motion';

const styles = {
  primary:
    'bg-burgundy text-cream shadow-[0_10px_30px_-12px_rgb(100_30_50/0.6)] hover:bg-burgundy-deep',
  outline: 'border border-charcoal/25 text-charcoal hover:border-burgundy hover:text-burgundy',
  gold: 'bg-gold text-burgundy-deep hover:bg-[#d4b273]',
  ghostLight: 'border border-cream/30 text-cream hover:border-gold hover:text-gold',
};

/**
 * Link-styled button with a gentle lift on hover and a press on click.
 * Pass `href` for links (including downloads); otherwise it renders a <button>.
 */
export default function Button({ href, variant = 'primary', children, className = '', icon: Icon, ...rest }) {
  const Component = href ? motion.a : motion.button;
  return (
    <Component
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 py-3 text-[0.95rem] font-medium tracking-wide transition-colors duration-300 ${styles[variant]} ${className}`}
      {...rest}
    >
      {Icon && <Icon aria-hidden="true" className="size-4.5 shrink-0" strokeWidth={1.8} />}
      <span>{children}</span>
    </Component>
  );
}
