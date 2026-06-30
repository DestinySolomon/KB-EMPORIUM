import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const brandLine1Ref = useRef<HTMLSpanElement>(null);
  const brandLine2Ref = useRef<HTMLSpanElement>(null);
  const mottoRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const fabricStripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        brandLine1Ref.current,
        { filter: 'blur(12px)', opacity: 0, y: 60 },
        { filter: 'blur(0px)', opacity: 1, y: 0, duration: 1.6, delay: 0.3 }
      )
        .fromTo(
          brandLine2Ref.current,
          { filter: 'blur(12px)', opacity: 0, y: 60 },
          { filter: 'blur(0px)', opacity: 1, y: 0, duration: 1.6 },
          '-=1.2'
        )
        .fromTo(
          mottoRef.current,
          { filter: 'blur(8px)', opacity: 0, y: 24 },
          { filter: 'blur(0px)', opacity: 1, y: 0, duration: 1.4 },
          '-=1.0'
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.2 },
          '-=0.8'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 1.0 },
          '-=0.6'
        );

      // Parallax background zoom-out
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(imageRef.current, { scale: 1 + progress * 0.2 });
          gsap.set(overlayRef.current, { opacity: 0.35 + progress * 0.3 });
        },
      });

      // Fabric strip parallax (moves slower for depth)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.0,
        onUpdate: (self) => {
          gsap.set(fabricStripRef.current, { y: self.progress * 80 });
        },
      });

      // Fade out all hero text as user scrolls
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
        onUpdate: (self) => {
          const targets = [
            brandLine1Ref.current,
            brandLine2Ref.current,
            mottoRef.current,
            descRef.current,
            ctaRef.current,
          ];
          gsap.set(targets, {
            opacity: 1 - self.progress * 1.5,
            y: self.progress * 100,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen min-h-[700px] overflow-hidden"
    >
      {/* Primary background image — tailoring atelier */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage:
            'url(https://readdy.ai/api/search-image?query=Editorial%20fashion%20photography%20of%20luxury%20tailoring%20atelier%20interior%2C%20dramatic%20warm%20lighting%20through%20large%20arched%20windows%2C%20wooden%20worktable%20with%20measuring%20tape%20and%20scissors%2C%20elegant%20garments%20hanging%20on%20copper%20racks%2C%20fabric%20rolls%20on%20shelves%2C%20deep%20shadows%20and%20highlights%2C%20cinematic%20composition%2C%20rich%20warm%20ivory%20and%20deep%20brown%20tones%2C%20fashion%20editorial%20aesthetic%2C%20no%20people%20visible%2C%20studio%20quality&width=1800&height=1200&seq=hero-atelier-v2&orientation=landscape)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      />

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.35) 35%, rgba(10,10,10,0.4) 65%, rgba(10,10,10,0.65) 100%)',
        }}
      />

      {/* Decorative corner accent line */}
      <div
        className="absolute top-0 left-0 w-px h-[120px]"
        style={{ backgroundColor: 'oklch(var(--secondary-500) / 0.4)' }}
      />
      <div
        className="absolute top-0 left-0 h-px w-[120px]"
        style={{ backgroundColor: 'oklch(var(--secondary-500) / 0.4)' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 md:px-10 lg:px-16 xl:px-24 max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16">
          {/* Left: Brand name */}
          <div className="flex-1">
            <h1 className="font-heading leading-[0.95] tracking-[0.08em]">
              <span
                ref={brandLine1Ref}
                className="block"
                style={{
                  color: 'oklch(0.96 0.015 85)',
                  fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                  willChange: 'transform, filter, opacity',
                }}
              >
                KB&rsquo;S
              </span>
              <span
                ref={brandLine2Ref}
                className="block"
                style={{
                  color: 'oklch(0.96 0.015 85)',
                  fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                  willChange: 'transform, filter, opacity',
                }}
              >
                EMPORIUM
              </span>
            </h1>

            <p
              ref={mottoRef}
              className="font-heading italic tracking-wider mt-6 md:mt-8"
              style={{
                color: 'oklch(0.96 0.015 85 / 0.75)',
                fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                willChange: 'transform, filter, opacity',
              }}
            >
              You&rsquo;re the Art where Purpose gets dressed.
            </p>
          </div>

          {/* Right: Description + CTA */}
          <div className="flex-1 lg:max-w-[480px] lg:self-end lg:pb-2">
            <p
              ref={descRef}
              className="font-body leading-relaxed"
              style={{
                color: 'oklch(0.96 0.015 85 / 0.7)',
                fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                willChange: 'transform, opacity',
              }}
            >
              A refined luxury tailoring house in Akwa Ibom, blending African
              heritage with modern English structure. From bespoke suits and
              corporate wear to Agbada, Isiagu, and Kaftan &mdash; every
              garment is crafted with precision, identity, and purpose.
            </p>

            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-10 items-start"
              style={{ willChange: 'transform, opacity' }}
            >
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector('#about')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 border tracking-wider text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:bg-background-50 hover:text-primary-900"
                style={{
                  borderColor: 'oklch(0.96 0.015 85 / 0.5)',
                  color: 'oklch(0.96 0.015 85)',
                }}
              >
                Discover Our Craft
                <i className="ri-arrow-right-line text-base w-5 h-5 flex items-center justify-center" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector('#contact')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 tracking-wider text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:opacity-75"
                style={{
                  backgroundColor: 'oklch(var(--secondary-500))',
                  color: 'oklch(var(--primary-900))',
                }}
              >
                Book a Fitting
                <i className="ri-calendar-line text-base w-5 h-5 flex items-center justify-center" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fabric strip with parallax */}
      <div
        ref={fabricStripRef}
        className="absolute bottom-0 left-0 right-0 h-[160px] md:h-[200px] overflow-hidden"
        style={{ willChange: 'transform' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url(https://readdy.ai/api/search-image?query=Seamless%20horizontal%20panorama%20of%20luxury%20African%20aso%20oke%20woven%20textile%20texture%20in%20warm%20sand%20beige%20and%20ivory%20tones%2C%20fine%20thread%20patterns%20visible%2C%20fabric%20grain%20detail%2C%20soft%20even%20lighting%2C%20high%20resolution%20material%20texture%20strip%2C%20editorial%20fashion%20photography%20quality%2C%20neutral%20background%20surface%20study%2C%20no%20objects%20or%20decorations%20just%20pure%20woven%20texture&width=2000&height=400&seq=hero-fabric-strip-01&orientation=landscape)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.85)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.1) 50%, transparent 100%)',
          }}
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-32 md:bottom-36 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span
          className="text-xs tracking-[0.25em]"
          style={{ color: 'oklch(0.96 0.015 85 / 0.5)' }}
        >
          SCROLL
        </span>
        <div
          className="w-[1px] h-8 md:h-10"
          style={{ backgroundColor: 'oklch(0.96 0.015 85 / 0.3)' }}
        />
      </div>
    </section>
  );
}