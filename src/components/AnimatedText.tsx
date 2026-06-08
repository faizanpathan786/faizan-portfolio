import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Char({ char, progress, range }: CharProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {/* invisible placeholder preserves layout */}
      <span style={{ opacity: 0.2 }}>{char === ' ' ? ' ' : char}</span>
      <motion.span
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          opacity,
          userSelect: 'none',
        }}
      >
        {char === ' ' ? ' ' : char}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const total = text.length;
  const words = text.split(' ');
  let charIndex = 0;

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, wi) => {
        // keep each word's characters together so lines break only at spaces
        const wordEl = (
          <span
            key={`w-${wi}`}
            style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
          >
            {word.split('').map((char) => {
              const i = charIndex++;
              const start = i / total;
              const end = start + 1 / total;
              return (
                <Char
                  key={i}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        );
        charIndex++; // account for the space between words
        return (
          <span key={`g-${wi}`}>
            {wordEl}
            {wi < words.length - 1 ? ' ' : null}
          </span>
        );
      })}
    </p>
  );
}
