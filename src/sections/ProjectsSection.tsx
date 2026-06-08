import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';

interface Project {
  number: string;
  category: string;
  name: string;
  url: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
}

const PROJECTS: Project[] = [
  {
    number: '01',
    category: 'SaaS · Web App',
    name: 'LinkedInFlow',
    url: 'https://linkedinflowfe.vercel.app/',
    col1Image1: '/projects/linkedinflow-2.png',
    col1Image2: '/projects/linkedinflow-3.png',
    col2Image: '/projects/linkedinflow-1.png',
  },
  {
    number: '02',
    category: 'SaaS · Competitor Intelligence',
    name: 'RivalEye',
    url: 'https://rivaleye.app/',
    col1Image1: '/projects/rivaleye-2.png',
    col1Image2: '/projects/rivaleye-3.png',
    col2Image: '/projects/rivaleye-1.png',
  },
  {
    number: '03',
    category: 'Business · E-Commerce',
    name: 'Ayush Flower Merchant',
    url: 'https://ayushflowermerchant.vercel.app/',
    col1Image1: '/projects/ayushflower-2.png',
    col1Image2: '/projects/ayushflower-3.png',
    col2Image: '/projects/ayushflower-1.png',
  },
  {
    number: '04',
    category: 'Agency · Marketing',
    name: 'Elite Badge Media',
    url: 'https://elite-badge-media.vercel.app/',
    col1Image1: '/projects/elitebadge-2.png',
    col1Image2: '/projects/elitebadge-3.png',
    col2Image: '/projects/elitebadge-1.png',
  },
];

const IMG_RADIUS = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]';

interface ProjectCardProps {
  project: Project;
  index: number;
  totalCards: number;
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}

function ProjectCard({
  project,
  index,
  totalCards,
  scrollProgress,
}: ProjectCardProps) {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(
    scrollProgress,
    [index / totalCards, 1],
    [1, targetScale]
  );

  return (
    <div
      className="sticky top-24 md:top-32 h-[85vh] flex items-start justify-center"
    >
      <motion.div
        style={{ scale, top: `${index * 28}px` }}
        className="relative w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
      >
        {/* Top row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 min-w-0">
            <span
              className="text-[#D7E2EA] font-black leading-none shrink-0"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-[#D7E2EA]/60 uppercase tracking-widest text-xs sm:text-sm font-light">
                {project.category}
              </span>
              <span
                className="text-[#D7E2EA] font-medium uppercase leading-tight"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </span>
            </div>
          </div>
          <LiveProjectButton href={project.url} />
        </div>

        {/* Bottom row: image grid — fixed height so both columns align */}
        <div
          className="flex gap-3 sm:gap-4 md:gap-6"
          style={{ height: 'clamp(280px, 34vw, 430px)' }}
        >
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 w-[38%]">
            <img
              src={project.col1Image1}
              alt={`${project.name} preview 1`}
              className={`${IMG_RADIUS} object-cover w-full flex-[2] min-h-0 bg-[#161616]`}
            />
            <img
              src={project.col1Image2}
              alt={`${project.name} preview 2`}
              className={`${IMG_RADIUS} object-cover w-full flex-[3] min-h-0 bg-[#161616]`}
            />
          </div>
          <div className="w-[62%]">
            <img
              src={project.col2Image}
              alt={`${project.name} preview 3`}
              className={`${IMG_RADIUS} object-cover w-full h-full bg-[#161616]`}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-40 sm:pb-48 md:pb-56"
    >
      <FadeIn
        as="h2"
        y={40}
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(2.5rem, 9vw, 120px)' }}
      >
        Projects
      </FadeIn>

      <div ref={containerRef} className="max-w-6xl mx-auto">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            totalCards={PROJECTS.length}
            scrollProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
