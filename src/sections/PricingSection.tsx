import { Check } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { CONTACT_MAILTO } from '../components/ContactButton';

interface Plan {
  label: string;
  price: string;
  priceUnit?: string;
  sub: string;
  blurb: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

const PLANS: Plan[] = [
  {
    label: 'Hourly Rate',
    price: '€15',
    priceUnit: '/hour',
    sub: 'billed weekly / monthly',
    blurb:
      'Perfect for ongoing maintenance, quick tasks, and flexible day-to-day support.',
    cta: 'Get Started',
    features: [
      'Bug fixes & quick updates',
      'Feature tweaks & enhancements',
      'Performance & uptime monitoring',
      'Code reviews & refactoring',
      'Ad-hoc consulting calls',
      'No long-term commitment',
    ],
  },
  {
    label: 'Fixed Project',
    price: 'By Quote',
    sub: 'one-off project fee',
    blurb:
      'Best for well-defined projects with a specific scope of work and set deadlines.',
    cta: 'Contact Me',
    popular: true,
    features: [
      'Full frontend & backend build',
      'REST API design & integration',
      'PostgreSQL & Prisma data layer',
      'Authentication & dashboards',
      'Responsive, polished UI',
      'Deployment & handover',
      'Delivered against timeline',
    ],
  },
  {
    label: 'Custom Retainer',
    price: 'Tailored',
    sub: 'monthly flat-rate',
    blurb:
      'Designed for long-term partnerships or unique business workflows.',
    cta: 'Get Started',
    features: [
      'Everything in Fixed Project',
      'Dedicated ongoing development',
      'Priority feature delivery',
      'Scalable architecture & CI/CD',
      'Continuous monitoring & support',
      'Monthly progress reporting',
      'Strategy & planning calls',
    ],
  },
];

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const dark = plan.popular;

  return (
    <FadeIn
      delay={index * 0.1}
      className={`relative flex flex-col rounded-[32px] sm:rounded-[40px] p-8 sm:p-10 ${
        dark
          ? 'bg-[#0C0C0C] md:-my-4 md:scale-[1.02] shadow-2xl'
          : 'bg-white border border-[#0C0C0C]/10'
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#0C0C0C]">
          Most Popular
        </span>
      )}

      <span
        className={`text-xs font-medium uppercase tracking-[0.2em] ${
          dark ? 'text-[#D7E2EA]/60' : 'text-[#0C0C0C]/50'
        }`}
      >
        {plan.label}
      </span>

      <div className="mt-4 flex items-end gap-2">
        <span
          className={`font-black leading-none ${
            dark ? 'text-white' : 'text-[#0C0C0C]'
          }`}
          style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
        >
          {plan.price}
        </span>
        {plan.priceUnit && (
          <span
            className={`font-light text-base mb-1.5 ${
              dark ? 'text-white/50' : 'text-[#0C0C0C]/50'
            }`}
          >
            {plan.priceUnit}
          </span>
        )}
      </div>

      <span
        className={`mt-1 text-sm font-light ${
          dark ? 'text-[#D7E2EA]/50' : 'text-[#0C0C0C]/45'
        }`}
      >
        {plan.sub}
      </span>

      <p
        className={`mt-5 font-light leading-relaxed text-sm sm:text-base ${
          dark ? 'text-[#D7E2EA]/70' : 'text-[#0C0C0C]/60'
        }`}
      >
        {plan.blurb}
      </p>

      <div
        className={`my-6 h-px w-full ${
          dark ? 'bg-white/15' : 'bg-[#0C0C0C]/10'
        }`}
      />

      <ul className="flex flex-col gap-3.5 flex-1">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className={`flex items-start gap-3 font-light text-sm sm:text-[0.95rem] ${
              dark ? 'text-[#D7E2EA]' : 'text-[#0C0C0C]/80'
            }`}
          >
            <Check
              size={18}
              strokeWidth={2.5}
              className={`mt-0.5 shrink-0 ${
                dark ? 'text-[#B600A8]' : 'text-[#0C0C0C]'
              }`}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={CONTACT_MAILTO}
        className={`mt-8 inline-block rounded-full text-center font-medium uppercase tracking-widest px-6 py-3.5 text-sm transition-transform duration-200 hover:scale-[1.03] ${
          dark
            ? 'text-white'
            : 'border-2 border-[#0C0C0C] text-[#0C0C0C] hover:bg-[#0C0C0C] hover:text-white'
        }`}
        style={
          dark
            ? {
                background:
                  'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                boxShadow:
                  '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                outline: '2px solid #FFFFFF',
                outlineOffset: '-3px',
              }
            : undefined
        }
      >
        {plan.cta}
      </a>
    </FadeIn>
  );
}

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="bg-[#F4F4F5] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <h2
        className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-24"
        style={{ fontSize: 'clamp(2.5rem, 9vw, 120px)' }}
      >
        Pricing
      </h2>

      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3 items-start">
        {PLANS.map((plan, i) => (
          <PlanCard key={plan.label} plan={plan} index={i} />
        ))}
      </div>
    </section>
  );
}
