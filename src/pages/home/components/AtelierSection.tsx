import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    number: '01',
    title: 'Measuring',
    description:
      'Every garment begins with precision. We take over 30 individual measurements to ensure your piece fits your frame, posture, and presence.',
    image:
      'https://readdy.ai/api/search-image?query=Elegant%20tailor%20hands%20holding%20cream%20colored%20measuring%20tape%20against%20warm%20ivory%20linen%20fabric%20on%20wooden%20worktable%2C%20soft%20diffused%20natural%20window%20light%2C%20shallow%20depth%20of%20field%20focusing%20on%20tape%20and%20fabric%20texture%2C%20editorial%20fashion%20photography%2C%20warm%20sand%20beige%20and%20ivory%20tones%2C%20minimal%20composition%2C%20artisanal%20craftsmanship%20atmosphere%2C%20no%20faces%2C%20refined%20luxury%20tailoring%20studio%20aesthetic&width=1400&height=900&seq=atelier-measuring-03&orientation=landscape',
  },
  {
    number: '02',
    title: 'Cutting Fabric',
    description:
      'Fabric is laid, patterns are traced, and each piece is cut by hand. This is where the garment starts to find its shape.',
    image:
      'https://readdy.ai/api/search-image?query=Professional%20tailor%20scissors%20cutting%20through%20premium%20charcoal%20wool%20fabric%20on%20wooden%20cutting%20table%2C%20pattern%20paper%20weights%20and%20chalk%20markings%20visible%2C%20warm%20ambient%20studio%20lighting%2C%20editorial%20fashion%20photography%2C%20rich%20textural%20detail%20of%20fabric%20grain%20and%20cut%20edge%2C%20sand%20beige%20and%20deep%20charcoal%20palette%2C%20minimal%20composition%2C%20artisanal%20craft%20moment%2C%20no%20faces%2C%20luxury%20atelier%20setting&width=1400&height=900&seq=atelier-cutting-03&orientation=landscape',
  },
  {
    number: '03',
    title: 'Stitching',
    description:
      'Our tailors stitch with intention — every seam, every hem, every detail is placed to hold both structure and beauty.',
    image:
      'https://readdy.ai/api/search-image?query=Close%20up%20of%20vintage%20sewing%20machine%20needle%20piercing%20through%20layered%20ivory%20and%20sand%20colored%20fabric%2C%20golden%20thread%20spool%20and%20fine%20stitching%20detail%2C%20warm%20soft%20directional%20light%20from%20side%20window%2C%20editorial%20fashion%20photography%2C%20shallow%20depth%20of%20field%2C%20rich%20textile%20texture%2C%20warm%20ivory%20and%20muted%20gold%20tones%2C%20minimal%20composition%2C%20artisanal%20craftsmanship%2C%20no%20faces%2C%20refined%20tailoring%20studio%20atmosphere&width=1400&height=900&seq=atelier-stitching-03&orientation=landscape',
  },
  {
    number: '04',
    title: 'Fitting',
    description:
      'The final fitting is where everything comes together. Adjustments are made, the drape is perfected, and the garment becomes yours.',
    image:
      'https://readdy.ai/api/search-image?query=Elegant%20tailored%20charcoal%20garment%20on%20dress%20form%20mannequin%20being%20adjusted%20by%20tailor%20hands%2C%20pins%20and%20marking%20chalk%2C%20soft%20natural%20light%20from%20large%20window%2C%20editorial%20fashion%20photography%2C%20warm%20ivory%20and%20charcoal%20palette%2C%20refined%20luxury%20atelier%20interior%20with%20fabric%20rolls%20in%20background%2C%20shallow%20depth%20of%20field%2C%20minimal%20composition%2C%20artisanal%20craftsmanship%2C%20no%20faces%20visible%2C%20serene%20atmosphere&width=1400&height=900&seq=atelier-fitting-03&orientation=landscape',
  },
];

export default function AtelierSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animatingRef = useRef(false);

  const [current, setCurrent] = useState(0);
  const totalSlides = STAGES.length;

  const animateSlide = useCallback(
    (nextIndex: number, direction: 'next' | 'prev') => {
      if (animatingRef.current) return;
      animatingRef.current = true;

      const currentSlide = slideRefs.current[current];
      const nextSlide = slideRefs.current[nextIndex];

      const xFrom = direction === 'next' ? 80 : -80;
      const xTo = direction === 'next' ? -80 : 80;

      if (nextSlide) {
        gsap.set(nextSlide, { opacity: 0, x: xFrom });
        gsap.to(nextSlide, {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
        });
      }

      if (currentSlide) {
        gsap.to(currentSlide, {
          opacity: 0,
          x: xTo,
          duration: 0.7,
          ease: 'power3.out',
          onComplete: () => {
            animatingRef.current = false;
          },
        });
      } else {
        animatingRef.current = false;
      }

      setCurrent(nextIndex);
    },
    [current]
  );

  const goTo = useCallback(
    (index: number) => {
      if (index === current || animatingRef.current) return;
      const direction = index > current ? 'next' : 'prev';
      animateSlide(index, direction);
    },
    [current, animateSlide]
  );

  const goNext = useCallback(() => {
    if (animatingRef.current) return;
    const nextIndex = (current + 1) % totalSlides;
    animateSlide(nextIndex, 'next');
  }, [current, totalSlides, animateSlide]);

  const goPrev = useCallback(() => {
    if (animatingRef.current) return;
    const nextIndex = (current - 1 + totalSlides) % totalSlides;
    animateSlide(nextIndex, 'prev');
  }, [current, totalSlides, animateSlide]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Set initial slide visible
  useEffect(() => {
    slideRefs.current.forEach((el, i) => {
      if (el) {
        gsap.set(el, { opacity: i === 0 ? 1 : 0, x: i === 0 ? 0 : 80 });
      }
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goPrev, goNext]);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      goNext();
    }, 5000); // Automatically slide every 5 seconds
    return () => clearInterval(timer);
  }, [goNext]);

  // Swipe support
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) goNext();
    if (distance < -50) goPrev();
  };

  return (
    <section
      id="atelier"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ backgroundColor: 'oklch(var(--background-100))' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 xl:px-24">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <span
            className="font-body text-xs tracking-[0.2em] uppercase block mb-4"
            style={{ color: 'oklch(var(--foreground-400))' }}
          >
            The Making Ritual
          </span>
          <h2
            className="font-heading font-semibold leading-tight"
            style={{
              color: 'oklch(var(--foreground-950))',
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            }}
          >
            From Fabric to Form
          </h2>
          <p
            className="font-body mt-4 max-w-xl mx-auto leading-relaxed"
            style={{
              color: 'oklch(var(--foreground-500))',
              fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
            }}
          >
            Four stages. One philosophy: intention in every stitch.
          </p>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="relative">
          {/* Main carousel container */}
          <div
            className="relative overflow-hidden rounded-2xl md:rounded-3xl"
            style={{
              backgroundColor: 'oklch(var(--background-50))',
              aspectRatio: '16 / 9',
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Slides */}
            {STAGES.map((stage, i) => (
              <div
                key={i}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                className="absolute inset-0 w-full h-full"
                style={{ willChange: 'transform, opacity' }}
              >
                <img
                  src={stage.image}
                  alt={`Stage ${stage.number}: ${stage.title} — ${stage.description.slice(0, 80)}`}
                  className="w-full h-full object-cover object-top"
                />
                {/* Subtle overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                {/* Slide content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
                  <span
                    className="font-heading text-5xl md:text-7xl lg:text-8xl font-semibold opacity-30 block leading-none"
                    style={{ color: 'oklch(var(--background-50))' }}
                  >
                    {stage.number}
                  </span>
                  <h3
                    className="font-heading font-semibold text-2xl md:text-3xl lg:text-4xl mt-2 md:mt-3"
                    style={{ color: 'oklch(var(--background-50))' }}
                  >
                    {stage.title}
                  </h3>
                  <p
                    className="font-body mt-2 md:mt-3 max-w-lg leading-relaxed"
                    style={{
                      color: 'oklch(var(--background-50) / 0.85)',
                      fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
                    }}
                  >
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goPrev}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer z-10"
            style={{ backgroundColor: 'oklch(var(--background-50) / 0.9)' }}
            aria-label="Previous slide"
          >
            <i
              className="ri-arrow-left-line text-lg md:text-xl"
              style={{ color: 'oklch(var(--foreground-900))' }}
            />
          </button>

          <button
            onClick={goNext}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer z-10"
            style={{ backgroundColor: 'oklch(var(--background-50) / 0.9)' }}
            aria-label="Next slide"
          >
            <i
              className="ri-arrow-right-line text-lg md:text-xl"
              style={{ color: 'oklch(var(--foreground-900))' }}
            />
          </button>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {STAGES.map((stage, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="transition-all duration-500 cursor-pointer rounded-full"
                style={{
                  width: i === current ? '32px' : '8px',
                  height: '8px',
                  backgroundColor:
                    i === current
                      ? 'oklch(var(--foreground-900))'
                      : 'oklch(var(--foreground-300))',
                }}
                aria-label={`Go to slide ${stage.title}`}
              />
            ))}
          </div>

          {/* Slide counter */}
          <div className="text-center mt-4">
            <span
              className="font-body text-xs tracking-[0.15em]"
              style={{ color: 'oklch(var(--foreground-400))' }}
            >
              {String(current + 1).padStart(2, '0')} /{' '}
              {String(totalSlides).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}