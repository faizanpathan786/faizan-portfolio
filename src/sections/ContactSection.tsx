import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { CONTACT_EMAIL } from '../components/ContactButton';

const INFO = [
  { label: 'Email', value: CONTACT_EMAIL },
  { label: 'Specialization', value: 'Software Development' },
  { label: 'Availability', value: 'Mon – Fri, 9am – 6pm IST' },
  { label: 'Response Time', value: 'Within 24 hours' },
];

const SERVICES = [
  'Frontend Development',
  'Backend Development',
  'Full Stack Application',
  'Database & API Design',
  'AI-Assisted Development',
  'Other',
];

const FIELD =
  'w-full rounded-2xl border border-[#D7E2EA]/15 bg-[#141414] px-5 py-4 text-[#D7E2EA] placeholder:text-[#D7E2EA]/40 font-light outline-none transition-colors duration-200 focus:border-[#B600A8]';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, service, message }),
      });

      // Local `npm run dev`/`vite preview` has no /api route and returns HTML.
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error(
          'The email endpoint is not running. Deploy to Vercel or use `vercel dev` to test sending.'
        );
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to send message.');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setService('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <section
      id="contact"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <div className="max-w-[1600px] mx-auto grid gap-x-14 gap-y-10 lg:grid-cols-2 lg:gap-x-28 lg:gap-y-16">
        {/* Row 1, left: heading */}
        <FadeIn
          as="h2"
          y={40}
          className="hero-heading font-black uppercase leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(3rem, 8.5vw, 7rem)' }}
        >
          <span className="block">Let&apos;s</span>
          <span className="block">Work</span>
        </FadeIn>

        {/* Row 1, right: intro */}
        <FadeIn
          as="p"
          delay={0.15}
          className="text-[#D7E2EA]/70 font-light leading-relaxed lg:text-right ml-auto max-w-md"
          style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)' }}
        >
          Ready to build something impactful? Fill in the form and I&apos;ll
          get back to you within 24 hours.
        </FadeIn>

        {/* Row 2, left: info */}
        <div className="flex flex-col">
          {INFO.map((item, i) => (
            <FadeIn
              key={item.label}
              delay={0.1 + i * 0.08}
              y={20}
              className="border-t border-[#D7E2EA]/12 py-6 first:border-t-0"
            >
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/45">
                {item.label}
              </p>
              {item.label === 'Email' ? (
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mt-2 block text-[#D7E2EA] font-medium text-lg hover:text-white transition-colors duration-200 break-all"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-2 text-[#D7E2EA] font-medium text-lg">
                  {item.value}
                </p>
              )}
            </FadeIn>
          ))}
        </div>

        {/* Row 2, right: form */}
        <FadeIn delay={0.25}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={FIELD}
                  aria-label="Full Name"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={FIELD}
                  aria-label="Email Address"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={FIELD}
                  aria-label="Phone Number"
                />
                <div className="relative">
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={`${FIELD} appearance-none pr-12 ${
                      service ? 'text-[#D7E2EA]' : 'text-[#D7E2EA]/40'
                    }`}
                    aria-label="Select a Service"
                  >
                    <option value="" disabled>
                      Select a Service
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s} className="bg-[#141414] text-[#D7E2EA]">
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#D7E2EA]/50"
                  />
                </div>
              </div>

              <textarea
                required
                rows={6}
                placeholder="Tell me about your project *"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${FIELD} resize-none`}
                aria-label="Tell me about your project"
              />

              <button
                type="submit"
                disabled={status === 'sending'}
                className="mt-2 self-start rounded-full text-white font-medium uppercase tracking-widest px-10 py-4 text-sm md:text-base transition-transform duration-200 hover:scale-[1.03] disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed"
                style={{
                  background:
                    'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                  boxShadow:
                    '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                  outline: '2px solid #FFFFFF',
                  outlineOffset: '-3px',
                }}
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p
                  role="status"
                  className="text-sm font-medium text-green-400"
                >
                  Thanks! Your message has been sent — I&apos;ll get back to you
                  within 24 hours.
                </p>
              )}
              {status === 'error' && (
                <p role="alert" className="text-sm font-medium text-red-400">
                  {errorMsg}
                </p>
              )}
            </form>
          </FadeIn>
      </div>
    </section>
  );
}
