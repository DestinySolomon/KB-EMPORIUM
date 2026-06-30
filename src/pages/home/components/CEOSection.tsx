import { useEffect, useRef } from 'react';
import missKb from '@/assets/miss-kb.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CORE_EXPERTISE = [
  'Advanced tailoring and garment construction',
  'Male and female styling systems',
  'Cultural fashion innovation',
  'Fabric intelligence and material selection',
  'Creative direction for fashion identity',
];

const VISION_ITEMS = [
  'Elevating African tailoring into global luxury spaces',
  'Preserving cultural identity through modern design language',
  'Creating fashion that communicates personality and confidence',
];

export default function CEOSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const storyRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const expertiseRef = useRef<HTMLUListElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);

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

      // Image zoom in from slight zoom
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 1.6 },
        0
      );

      // Label
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.2
      );

      // Heading
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.0 },
        0.35
      );

      // Story
      tl.fromTo(
        storyRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.0 },
        0.5
      );

      // Quote
      tl.fromTo(
        quoteRef.current,
        { opacity: 0, y: 20, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2 },
        0.65
      );

      // Expertise list
      if (expertiseRef.current) {
        const items = expertiseRef.current.querySelectorAll('li');
        tl.fromTo(
          items,
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, stagger: 0.06, duration: 0.7 },
          0.8
        );
      }

      // Vision section
      tl.fromTo(
        visionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0 },
        1.1
      );

      // Slow zoom on image during scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          if (imageRef.current) {
            const img = imageRef.current.querySelector('img');
            if (img) {
              gsap.set(img, { scale: 1 + self.progress * 0.08 });
            }
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ceo"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40"
      style={{ backgroundColor: 'oklch(var(--background-100))' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          {/* Left: Image */}
          <div className="w-full lg:w-[40%] flex-shrink-0">
            <div
              ref={imageRef}
              className="relative overflow-hidden rounded-[28px] md:rounded-[36px]"
              style={{ willChange: 'transform, opacity' }}
            >
              <img
                src={missKb}
                alt="KB Inyang - Creative Director at KB's Emporium"
                className="w-full h-auto object-cover aspect-[3/4]"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex-1 lg:pt-6">
            <span
              ref={labelRef}
              className="inline-block font-body text-xs tracking-[0.2em] uppercase mb-4 md:mb-6"
              style={{ color: 'oklch(var(--foreground-400))' }}
            >
              (Creative Direction)
            </span>

            <h2
              ref={headingRef}
              className="font-heading font-semibold leading-tight mb-4"
              style={{
                color: 'oklch(var(--foreground-950))',
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                willChange: 'transform, opacity',
              }}
            >
              Meet the Founder
            </h2>

            <p
              className="font-heading text-lg md:text-xl mb-8 md:mb-10"
              style={{ color: 'oklch(var(--foreground-500))' }}
            >
              KB Inyang &mdash; Creative Director
              <span className="block" style={{ color: 'oklch(var(--foreground-400))' }}>
                &amp; Lead Designer
              </span>
            </p>

            <p
              ref={storyRef}
              className="font-body leading-[1.7] mb-8"
              style={{
                color: 'oklch(var(--foreground-600))',
                fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
              }}
            >
              KB Inyang leads KB&rsquo;s Emporium with a vision rooted in
              redefining African tailoring through modern craftsmanship and
              identity-driven design. Her approach bridges structure and
              expression, combining traditional silhouettes with contemporary
              tailoring precision.
            </p>

            <blockquote
              ref={quoteRef}
              className="font-heading italic leading-relaxed mb-8 md:mb-10 pl-6 border-l-2"
              style={{
                color: 'oklch(var(--foreground-700))',
                fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
                borderColor: 'oklch(var(--accent-500))',
                willChange: 'transform, filter, opacity',
              }}
            >
              &ldquo;Fashion is a language of presence &mdash; where clothing
              becomes identity and tailoring becomes storytelling.&rdquo;
            </blockquote>

            <p
              className="font-body text-sm font-medium mb-6"
              style={{ color: 'oklch(var(--foreground-700))' }}
            >
              &mdash; KB Inyang, Creative Director
            </p>

            {/* Core Expertise */}
            <div className="mb-8 md:mb-10">
              <h3
                className="font-body text-xs tracking-[0.2em] uppercase mb-4"
                style={{ color: 'oklch(var(--foreground-400))' }}
              >
                Core Expertise
              </h3>
              <ul ref={expertiseRef} className="flex flex-col gap-2.5">
                {CORE_EXPERTISE.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: 'oklch(var(--secondary-500))' }}
                    />
                    <span
                      className="font-body text-sm leading-relaxed"
                      style={{ color: 'oklch(var(--foreground-600))' }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div
              ref={visionRef}
              className="p-6 md:p-8 rounded-2xl"
              style={{ backgroundColor: 'oklch(var(--secondary-100))' }}
            >
              <h3
                className="font-body text-xs tracking-[0.2em] uppercase mb-4"
                style={{ color: 'oklch(var(--foreground-400))' }}
              >
                Vision for Fashion
              </h3>
              <ul className="flex flex-col gap-2">
                {VISION_ITEMS.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3"
                  >
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: 'oklch(var(--accent-500) / 0.15)' }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: 'oklch(var(--accent-500))' }}
                      />
                    </div>
                    <span
                      className="font-body text-sm leading-relaxed"
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
      </div>
    </section>
  );
}