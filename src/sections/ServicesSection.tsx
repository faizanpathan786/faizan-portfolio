import FadeIn from '../components/FadeIn';

const SERVICES = [
  {
    number: '01',
    name: 'Frontend Development',
    description:
      'Building responsive, interactive interfaces with Vue.js and React.js — focused on clean UX, reusable components, and modern state management.',
  },
  {
    number: '02',
    name: 'Backend Development',
    description:
      'Designing robust REST APIs and server-side logic with Node.js and Express.js, with secure authentication and scalable architecture.',
  },
  {
    number: '03',
    name: 'Database & ORM',
    description:
      'Modeling and querying relational data with PostgreSQL and Prisma — efficient schemas, migrations, and type-safe data access.',
  },
  {
    number: '04',
    name: 'Full Stack Applications',
    description:
      'Delivering end-to-end products such as Hotel Management, Online Examination, and Student Management platforms — from database to UI.',
  },
  {
    number: '05',
    name: 'AI-Assisted Development',
    description:
      'Leveraging Generative AI pair programming to improve code quality, accelerate delivery, and solve problems across the full stack.',
  },
  {
    number: '06',
    name: 'Responsive UI / Tailwind CSS',
    description:
      'Crafting mobile-first, pixel-precise interfaces with Tailwind CSS and modern CSS — fluid layouts that scale gracefully across every device.',
  },
  {
    number: '07',
    name: 'REST API Design',
    description:
      'Architecting clean, well-documented RESTful APIs with thoughtful resource modeling, validation, error handling, and third-party integrations.',
  },
  {
    number: '08',
    name: 'Authentication & Security',
    description:
      'Implementing secure auth flows with JWT and session management, role-based access control, and protection against common web vulnerabilities.',
  },
  {
    number: '09',
    name: 'Version Control & Deployment',
    description:
      'Collaborating with Git and GitHub workflows, and shipping applications to production with reliable build and deployment pipelines.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="skills"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <h2
        className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Skills
      </h2>

      <div className="max-w-5xl mx-auto">
        {SERVICES.map((service, i) => (
          <FadeIn
            key={service.number}
            delay={i * 0.1}
            className="flex items-start gap-5 sm:gap-8 md:gap-12 py-8 sm:py-10 md:py-12"
            style={{ borderTop: '1px solid rgba(12, 12, 12, 0.15)' }}
          >
            <span
              className="text-[#0C0C0C] font-black leading-none shrink-0"
              style={{ fontSize: 'clamp(2.25rem, 7vw, 96px)' }}
            >
              {service.number}
            </span>
            <div className="flex flex-col gap-3 pt-1">
              <h3
                className="text-[#0C0C0C] font-medium uppercase leading-tight"
                style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.6rem)' }}
              >
                {service.name}
              </h3>
              <p
                className="text-[#0C0C0C] font-light leading-relaxed max-w-2xl"
                style={{
                  fontSize: 'clamp(0.8rem, 1.3vw, 1.05rem)',
                  opacity: 0.6,
                }}
              >
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
