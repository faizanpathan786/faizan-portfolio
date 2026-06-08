import { useEffect, useRef, useState } from 'react';

// Screenshots of Jack's own live projects — the marquee showcases real work
// that matches his software-development specialization.
const IMAGES = [
  '/projects/linkedinflow-1.png',
  '/projects/rivaleye-1.png',
  '/projects/ayushflower-1.png',
  '/projects/elitebadge-1.png',
  '/projects/linkedinflow-2.png',
  '/projects/rivaleye-2.png',
  '/projects/ayushflower-2.png',
  '/projects/elitebadge-2.png',
  '/projects/linkedinflow-3.png',
  '/projects/rivaleye-3.png',
  '/projects/ayushflower-3.png',
  '/projects/elitebadge-3.png',
  '/projects/linkedinflow-4.png',
];

const ROW_ONE = IMAGES.slice(0, 7);
const ROW_TWO = IMAGES.slice(7);

function Tile({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      className="rounded-2xl object-cover shrink-0 w-[230px] h-[148px] sm:w-[320px] sm:h-[206px] md:w-[420px] md:h-[270px]"
    />
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.offsetTop;
      const value =
        (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(value);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const rowOneImages = [...ROW_ONE, ...ROW_ONE, ...ROW_ONE];
  const rowTwoImages = [...ROW_TWO, ...ROW_TWO, ...ROW_TWO];

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10"
      style={{ overflowX: 'clip' }}
    >
      <div className="flex flex-col gap-3">
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: 'transform',
          }}
        >
          {rowOneImages.map((src, i) => (
            <Tile key={`r1-${i}`} src={src} />
          ))}
        </div>
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
            willChange: 'transform',
          }}
        >
          {rowTwoImages.map((src, i) => (
            <Tile key={`r2-${i}`} src={src} />
          ))}
        </div>
      </div>
    </section>
  );
}
