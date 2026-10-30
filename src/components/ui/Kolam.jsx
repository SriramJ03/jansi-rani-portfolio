import { motion } from 'framer-motion';

/**
 * A kolam-inspired ornament: a diamond of pulli (dots) with interlocking
 * loops drawn around them, as in the threshold drawings of Tamil homes.
 * Set `draw` to animate the loops being traced when it enters the screen.
 */
const SIZE = 3; // dots per side
const GAP = 24;
const RADIUS = GAP * 0.72;

const points = [];
for (let row = 0; row < SIZE; row += 1) {
  for (let col = 0; col < SIZE; col += 1) {
    points.push({ x: col * GAP, y: row * GAP, key: `${row}-${col}` });
  }
}
const span = (SIZE - 1) * GAP;

export default function Kolam({ className = '', draw = false, color = 'currentColor', strokeWidth = 1.4 }) {
  return (
    <svg
      viewBox={`${-GAP * 1.9} ${-GAP * 1.9} ${span + GAP * 3.8} ${span + GAP * 3.8}`}
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <g transform={`rotate(45 ${span / 2} ${span / 2})`}>
        {points.map((point, index) => (
          <motion.circle
            key={`loop-${point.key}`}
            cx={point.x}
            cy={point.y}
            r={RADIUS}
            stroke={color}
            strokeWidth={strokeWidth}
            initial={draw ? { pathLength: 0, opacity: 0 } : false}
            whileInView={draw ? { pathLength: 1, opacity: 1 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.25 + index * 0.08, ease: 'easeInOut' }}
          />
        ))}
        <motion.rect
          x={-GAP * 1.15}
          y={-GAP * 1.15}
          width={span + GAP * 2.3}
          height={span + GAP * 2.3}
          rx={GAP * 0.9}
          stroke={color}
          strokeWidth={strokeWidth}
          initial={draw ? { pathLength: 0, opacity: 0 } : false}
          whileInView={draw ? { pathLength: 1, opacity: 1 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.2, ease: 'easeInOut' }}
        />
        {points.map((point) => (
          <circle key={`dot-${point.key}`} cx={point.x} cy={point.y} r={2.4} fill={color} />
        ))}
      </g>
    </svg>
  );
}
