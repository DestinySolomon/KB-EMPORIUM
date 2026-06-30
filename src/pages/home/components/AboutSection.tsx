import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EXPERTISE = [
  'Bespoke tailoring and precise garment construction',
  'Cultural fashion pieces (Agbada, Isiagu, Dashiki, Kaftan, Jalabia)',
  'Modern English and corporate wear',
  'Fabric handling, finishing, and styling precision',
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const listRef = useRef<HTMLUListElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'center center',
          scrub: false,
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });

      // Image parallax and reveal
      tl.fromTo(
        imageRef.current,
        { opacity: 0, y: 60, scale: 1.05 },
        { opacity: 1, y: 0, scale: 1, duration: 1.4 },
        0
      );

      // Label reveal
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.2
      );

      // Heading reveal
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 40, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2 },
        0.35
      );

      // Body paragraphs staggered
      bodyRefs.current.forEach((p, i) => {
        if (p) {
          tl.fromTo(
            p,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 1.0 },
            0.55 + i * 0.15
          );
        }
      });

      // Expertise list
      if (listRef.current) {
        const items = listRef.current.querySelectorAll('li');
        tl.fromTo(
          items,
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, stagger: 0.08, duration: 0.8 },
          1.0
        );
      }

      // Parallax drift on image while scrolling through section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          if (imageRef.current) {
            gsap.set(imageRef.current.querySelector('img'), {
              y: self.progress * 40 - 20,
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 bg-background-50"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          {/* Left: Image */}
          <div className="w-full lg:w-[48%] flex-shrink-0">
            <div
              ref={imageRef}
              className="relative overflow-hidden rounded-[32px] md:rounded-[40px]"
              style={{ willChange: 'transform, opacity' }}
            >
              <img
                src="https://readdy.ai/api/search-image?query=Luxury%20fashion%20atelier%20close%20up%20of%20tailored%20garment%20hanging%20on%20wooden%20rack%2C%20rich%20African%20aso%20oke%20fabric%20with%20gold%20thread%20details%2C%20soft%20natural%20window%20light%2C%20ivory%20and%20sand%20beige%20color%20palette%2C%20editorial%20fashion%20photography%2C%20minimal%20composition%2C%20shallow%20depth%20of%20field%2C%20high%20end%20tailoring%20studio%20atmosphere%2C%20elegant%20craftsmanship%20details%2C%20no%20people%20visible%2C%20warm%20neutral%20tones&width=1200&height=1400&seq=about-fabric-01&orientation=portrait"
                alt="KB's Emporium atelier with hanging garments"
                className="w-full h-auto object-cover aspect-[4/5]"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex-1 lg:pt-8">
            <span
              ref={labelRef}
              className="inline-block px-4 py-1.5 rounded-full text-xs tracking-[0.15em] uppercase mb-6 md:mb-8"
              style={{
                backgroundColor: 'oklch(var(--secondary-200))',
                color: 'oklch(var(--foreground-700))',
              }}
            >
              About KB&rsquo;s Emporium
            </span>

            <h2
              ref={headingRef}
              className="font-heading font-semibold leading-tight mb-6 md:mb-8"
              style={{
                color: 'oklch(var(--foreground-950))',
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                willChange: 'transform, filter, opacity',
              }}
            >
              Where African
              <br />
              <span style={{ color: 'oklch(var(--accent-600))' }}>
                Heritage
              </span>{' '}
              Meets Structure
            </h2>

            <p
              ref={(el) => { bodyRefs.current[0] = el; }}
              className="font-body leading-[1.7] mb-5"
              style={{
                color: 'oklch(var(--foreground-600))',
                fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
              }}
            >
              KB&rsquo;s Emporium is a refined fashion house focused on
              precision tailoring and cultural expression through clothing. The
              brand blends African heritage with modern structure, creating
              garments that reflect identity, confidence, and craftsmanship.
            </p>

            <p
              ref={(el) => { bodyRefs.current[1] = el; }}
              className="font-body leading-[1.7] mb-8 md:mb-10"
              style={{
                color: 'oklch(var(--foreground-600))',
                fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
              }}
            >
              Each piece is intentionally designed &mdash; from fabric selection
              to final stitching &mdash; ensuring durability, elegance, and
              perfect fit. Every garment tells a story of intention, heritage,
              and modern precision.
            </p>

            <ul
              ref={listRef}
              className="flex flex-col gap-3 md:gap-4"
            >
              {EXPERTISE.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: 'oklch(var(--accent-500))' }} />
                  <span
                    className="font-body text-sm md:text-base leading-relaxed"
                    style={{ color: 'oklch(var(--foreground-700))' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}