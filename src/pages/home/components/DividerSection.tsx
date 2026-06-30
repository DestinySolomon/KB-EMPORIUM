import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DividerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'center center',
          scrub: false,
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });

      // Line draw animation (width from 0 to full)
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }
      );

      // Text fade in after line
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1.0 },
        '-=0.4'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 lg:py-36 bg-background-50 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Stitched line */}
      <div className="w-full max-w-[600px] px-6">
        <div
          ref={lineRef}
          className="h-[2px] w-full origin-left"
          style={{
            backgroundColor: 'oklch(var(--secondary-400))',
            willChange: 'transform',
          }}
        />
        {/* Stitch dots */}
        <div className="flex justify-between px-1 -mt-[3px]">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: 'oklch(var(--secondary-500))' }}
            />
          ))}
        </div>
      </div>

      {/* Transition text */}
      <p
        ref={textRef}
        className="font-heading italic text-center mt-10 md:mt-14 px-6"
        style={{
          color: 'oklch(var(--foreground-600))',
          fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
          willChange: 'transform, opacity',
        }}
      >
        At the heart of KB&rsquo;s Emporium is its vision.
      </p>
    </section>
  );
}