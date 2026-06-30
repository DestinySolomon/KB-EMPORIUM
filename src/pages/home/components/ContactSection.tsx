import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = contentRef.current?.querySelectorAll('.contact-reveal');
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40"
      style={{ backgroundColor: 'oklch(var(--background-50))' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 xl:px-24">
        <div ref={contentRef} className="flex flex-col lg:flex-row gap-14 lg:gap-20">
          {/* Left: Contact Info */}
          <div className="flex-1">
            <span
              className="contact-reveal font-body text-xs tracking-[0.2em] uppercase block mb-4"
              style={{ color: 'oklch(var(--foreground-400))' }}
            >
              Get in Touch
            </span>
            <h2
              className="contact-reveal font-heading font-semibold leading-tight mb-8 md:mb-10"
              style={{
                color: 'oklch(var(--foreground-950))',
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              }}
            >
              Begin Your
              <br />
              Fitting Journey
            </h2>

            <div className="flex flex-col gap-8 md:gap-10">
              {/* Phone */}
              <div className="contact-reveal">
                <span
                  className="font-body text-xs tracking-[0.2em] uppercase block mb-2"
                  style={{ color: 'oklch(var(--foreground-400))' }}
                >
                  Phone
                </span>
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+2348080297786"
                    className="font-body text-base md:text-lg transition-colors duration-300 hover:opacity-70 whitespace-nowrap"
                    style={{ color: 'oklch(var(--foreground-700))' }}
                  >
                    +234 808 029 7786
                  </a>
                  <a
                    href="tel:+2349066826803"
                    className="font-body text-base md:text-lg transition-colors duration-300 hover:opacity-70 whitespace-nowrap"
                    style={{ color: 'oklch(var(--foreground-700))' }}
                  >
                    +234 906 682 6803
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="contact-reveal">
                <span
                  className="font-body text-xs tracking-[0.2em] uppercase block mb-2"
                  style={{ color: 'oklch(var(--foreground-400))' }}
                >
                  Visit Us
                </span>
                <p
                  className="font-body text-base md:text-lg leading-relaxed"
                  style={{ color: 'oklch(var(--foreground-700))' }}
                >
                  Nung Uyo Idoro,
                  <br />
                  Idoro Road,
                  <br />
                  Akwa Ibom State, Nigeria
                </p>
              </div>

              {/* Socials */}
              <div className="contact-reveal">
                <span
                  className="font-body text-xs tracking-[0.2em] uppercase block mb-3"
                  style={{ color: 'oklch(var(--foreground-400))' }}
                >
                  Socials
                </span>
                <div className="flex items-center gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:opacity-70"
                    style={{ borderColor: 'oklch(var(--foreground-300))' }}
                    aria-label="KB Inyang on Facebook"
                  >
                    <i className="ri-facebook-line text-lg" style={{ color: 'oklch(var(--foreground-700))' }} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:opacity-70"
                    style={{ borderColor: 'oklch(var(--foreground-300))' }}
                    aria-label="inyang_kb on Instagram"
                  >
                    <i className="ri-instagram-line text-lg" style={{ color: 'oklch(var(--foreground-700))' }} />
                  </a>
                  <a
                    href="https://wa.me/2348080297786"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:opacity-70"
                    style={{ borderColor: 'oklch(var(--foreground-300))' }}
                    aria-label="WhatsApp"
                  >
                    <i className="ri-whatsapp-line text-lg" style={{ color: 'oklch(var(--foreground-700))' }} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex-1 lg:max-w-[520px]">
            <div
              className="contact-reveal p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl"
              style={{ backgroundColor: 'oklch(var(--background-100))' }}
            >
              <h3
                className="font-heading font-semibold text-xl md:text-2xl mb-6"
                style={{ color: 'oklch(var(--foreground-950))' }}
              >
                Book a Fitting
              </h3>

              {formState === 'success' ? (
                <div className="text-center py-10">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: 'oklch(var(--secondary-200))' }}
                  >
                    <i className="ri-check-line text-2xl" style={{ color: 'oklch(var(--accent-600))' }} />
                  </div>
                  <p
                    className="font-heading text-lg mb-2"
                    style={{ color: 'oklch(var(--foreground-900))' }}
                  >
                    Request Received
                  </p>
                  <p
                    className="font-body text-sm"
                    style={{ color: 'oklch(var(--foreground-500))' }}
                  >
                    We&rsquo;ll reach out to confirm your fitting appointment.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label
                      className="font-body text-xs tracking-wider uppercase block mb-2"
                      style={{ color: 'oklch(var(--foreground-400))' }}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      required
                      className="w-full px-4 py-3 rounded-lg font-body text-sm outline-none transition-all duration-300 focus:ring-1"
                      style={{
                        backgroundColor: 'oklch(var(--background-50))',
                        color: 'oklch(var(--foreground-900))',
                        border: '1px solid oklch(var(--background-300))',
                      }}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      className="font-body text-xs tracking-wider uppercase block mb-2"
                      style={{ color: 'oklch(var(--foreground-400))' }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg font-body text-sm outline-none transition-all duration-300 focus:ring-1"
                      style={{
                        backgroundColor: 'oklch(var(--background-50))',
                        color: 'oklch(var(--foreground-900))',
                        border: '1px solid oklch(var(--background-300))',
                      }}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      className="font-body text-xs tracking-wider uppercase block mb-2"
                      style={{ color: 'oklch(var(--foreground-400))' }}
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full px-4 py-3 rounded-lg font-body text-sm outline-none transition-all duration-300 focus:ring-1"
                      style={{
                        backgroundColor: 'oklch(var(--background-50))',
                        color: 'oklch(var(--foreground-900))',
                        border: '1px solid oklch(var(--background-300))',
                      }}
                      placeholder="+234 xxx xxx xxxx"
                    />
                  </div>

                  <div>
                    <label
                      className="font-body text-xs tracking-wider uppercase block mb-2"
                      style={{ color: 'oklch(var(--foreground-400))' }}
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      maxLength={500}
                      className="w-full px-4 py-3 rounded-lg font-body text-sm outline-none transition-all duration-300 focus:ring-1 resize-none"
                      style={{
                        backgroundColor: 'oklch(var(--background-50))',
                        color: 'oklch(var(--foreground-900))',
                        border: '1px solid oklch(var(--background-300))',
                      }}
                      placeholder="What garment are you looking for? Any special requirements?"
                    />
                  </div>

                  {/* Honeypot */}
                  <input
                    type="text"
                    name="company_alt"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="company_alt_field"
                    style={{
                      position: 'absolute',
                      left: '-9999px',
                      opacity: 0,
                    }}
                  />

                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full py-3.5 rounded-lg font-body text-sm tracking-wider cursor-pointer transition-all duration-300 hover:opacity-90 disabled:opacity-50 whitespace-nowrap"
                    style={{
                      backgroundColor: 'oklch(var(--primary-500))',
                      color: 'oklch(var(--background-50))',
                    }}
                  >
                    {formState === 'submitting' ? 'Sending...' : 'Request Fitting'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}