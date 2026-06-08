import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { ReactNode, ElementType } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  /**
   * Play the animation on mount instead of waiting for scroll-into-view.
   * Use for above-the-fold content (e.g. the hero) so it always appears on
   * load — `whileInView` can fail to fire for already-visible elements.
   */
  immediate?: boolean;
}

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  className,
  style,
  immediate = false,
}: FadeInProps) {
  // Memoize so a new component type isn't created on every render — otherwise
  // any parent re-render (e.g. typing in a form) remounts children, replaying
  // the animation and stealing input focus.
  const MotionTag = useMemo(() => motion.create(as), [as]);

  const reveal = { opacity: 1, x: 0, y: 0 };
  const trigger = immediate
    ? { animate: reveal }
    : { whileInView: reveal, viewport: { once: true, margin: '50px', amount: 0 } };

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      {...trigger}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
