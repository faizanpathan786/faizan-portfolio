import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import ContactButton from '../components/ContactButton';

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Pricing', 'Contact'];

const PORTRAIT_URL = '/faizan-avatar.png';

export default function HeroSection() {
  return (
    <section
      className="relative sm:min-h-screen flex flex-col"
      style={{ overflowX: 'clip' }}
    >
      {/* Navbar */}
      <FadeIn
        as="nav"
        immediate
        delay={0}
        y={-20}
        className="relative z-20 flex justify-between gap-1 px-4 sm:px-6 md:px-10 pt-5 sm:pt-6 md:pt-8"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-[#D7E2EA] font-medium uppercase tracking-normal sm:tracking-wider text-[0.7rem] sm:text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70"
          >
            {link}
          </a>
        ))}
      </FadeIn>

      {/* Hero Heading */}
      <div className="overflow-hidden">
        <FadeIn
          as="h1"
          immediate
          delay={0.15}
          y={40}
          className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[9vw] sm:text-[10vw] md:text-[10.5vw] lg:text-[11.5vw] mt-2 sm:mt-4 md:-mt-5"
        >
          Hi, i&apos;m faizan
        </FadeIn>
      </div>

      {/* Mobile portrait — in normal flow so the heading stays visible and the
          full avatar is shown (the absolute version below is desktop only) */}
      <FadeIn
        immediate
        delay={0.4}
        y={30}
        className="sm:hidden flex items-center justify-center px-8 py-14"
      >
        <img
          src={PORTRAIT_URL}
          alt="Faizan Pathan — Full Stack Developer portrait"
          className="w-[80%] max-w-[340px] h-auto select-none pointer-events-none"
          draggable={false}
        />
      </FadeIn>

      {/* Bottom bar */}
      <div className="relative z-20 mt-auto flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-7 md:pb-10">
        <FadeIn
          as="p"
          immediate
          delay={0.35}
          y={20}
          className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
          style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
        >
          full stack developer crafting fast, scalable and intuitive web experiences
        </FadeIn>

        <FadeIn immediate delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      {/* Hero Portrait — desktop / tablet (absolute, anchored to bottom) */}
      <FadeIn
        immediate
        delay={0.6}
        y={30}
        className="hidden sm:block absolute left-1/2 -translate-x-1/2 z-10 w-[360px] md:w-[440px] lg:w-[520px] bottom-0"
      >
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
        >
          <img
            src={PORTRAIT_URL}
            alt="Faizan Pathan — Full Stack Developer portrait"
            className="w-full h-auto select-none pointer-events-none"
            draggable={false}
          />
        </Magnet>
      </FadeIn>
    </section>
  );
}
