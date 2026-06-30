import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LOOKBOOK_ITEMS = [
  {
    title: 'The Tailored Agbada',
    category: 'Masculine',
    image: 'https://readdy.ai/api/search-image?query=Elegant%20African%20man%20wearing%20tailored%20white%20agbada%20with%20gold%20embroidery%2C%20standing%20confidently%2C%20ivory%20and%20sand%20beige%20studio%20background%2C%20soft%20editorial%20lighting%2C%20high%20end%20fashion%20photography%2C%20full%20body%20shot%2C%20minimal%20composition%2C%20luxury%20tailoring%20showcase&width=700&height=900&seq=lookbook-agbada-01&orientation=portrait',
  },
  {
    title: 'Corporate Elegance',
    category: 'Masculine',
    image: 'https://readdy.ai/api/search-image?query=Refined%20African%20man%20in%20charcoal%20grey%20bespoke%20suit%2C%20standing%20confidently%2C%20ivory%20and%20sand%20beige%20studio%20background%2C%20soft%20editorial%20lighting%2C%20high%20end%20fashion%20photography%2C%20full%20body%20shot%2C%20minimal%20composition%2C%20luxury%20tailoring%20showcase&width=700&height=900&seq=lookbook-corporate-01&orientation=portrait',
  },
  {
    title: 'Kaftan Grace',
    category: 'Feminine',
    image: 'https://readdy.ai/api/search-image?query=Elegant%20African%20woman%20wearing%20flowing%20burgundy%20kaftan%20robe%2C%20standing%20gracefully%2C%20ivory%20and%20sand%20beige%20studio%20background%2C%20soft%20editorial%20lighting%2C%20high%20end%20fashion%20photography%2C%20full%20body%20shot%2C%20minimal%20composition%2C%20luxury%20tailoring%20showcase&width=700&height=900&seq=lookbook-kaftan-01&orientation=portrait',
  },
  {
    title: 'Isiagu Statement',
    category: 'Masculine',
    image: 'https://readdy.ai/api/search-image?query=African%20man%20wearing%20bold%20burgundy%20and%20gold%20isiagu%20traditional%20wear%2C%20standing%20proudly%2C%20ivory%20and%20sand%20beige%20studio%20background%2C%20soft%20editorial%20lighting%2C%20high%20end%20fashion%20photography%2C%20full%20body%20shot%2C%20minimal%20composition%2C%20luxury%20tailoring%20showcase&width=700&height=900&seq=lookbook-isiagu-01&orientation=portrait',
  },
  {
    title: 'Senator Sophistication',
    category: 'Masculine',
    image: 'https://readdy.ai/api/search-image?query=African%20man%20in%20elegant%20black%20senator%20style%20suit%20with%20subtle%20embroidery%2C%20standing%20confidently%2C%20ivory%20and%20sand%20beige%20studio%20background%2C%20soft%20editorial%20lighting%2C%20high%20end%20fashion%20photography%2C%20full%20body%20shot%2C%20minimal%20composition&width=700&height=900&seq=lookbook-senator-01&orientation=portrait',
  },
  {
    title: 'Jalabia Serenity',
    category: 'Feminine',
    image: 'https://readdy.ai/api/search-image?query=Elegant%20African%20woman%20wearing%20flowing%20white%20jalabia%20robe%2C%20standing%20serenely%2C%20ivory%20and%20sand%20beige%20studio%20background%2C%20soft%20editorial%20lighting%2C%20high%20end%20fashion%20photography%2C%20full%20body%20shot%2C%20minimal%20composition%2C%20luxury%20tailoring%20showcase&width=700&height=900&seq=lookbook-jalabia-01&orientation=portrait',
  },
  {
    title: 'Dashiki Vibrance',
    category: 'Unisex',
    image: 'https://readdy.ai/api/search-image?query=Fashionable%20African%20person%20wearing%20vibrant%20earth%20tone%20dashiki%20shirt%20with%20geometric%20patterns%2C%20standing%20confidently%2C%20ivory%20and%20sand%20beige%20studio%20background%2C%20soft%20editorial%20lighting%2C%20high%20end%20fashion%20photography%2C%20full%20body%20shot%2C%20minimal%20composition&width=700&height=900&seq=lookbook-dashiki-01&orientation=portrait',
  },
  {
    title: 'English Shirt Refinement',
    category: 'Unisex',
    image: 'https://readdy.ai/api/search-image?query=Refined%20African%20person%20wearing%20crisp%20white%20tailored%20English%20dress%20shirt%20with%20precision%20cufflinks%2C%20standing%20elegantly%2C%20ivory%20and%20sand%20beige%20studio%20background%2C%20soft%20editorial%20lighting%2C%20high%20end%20fashion%20photography%2C%20full%20body%20shot%2C%20minimal%20composition&width=700&height=900&seq=lookbook-shirt-01&orientation=portrait',
  },
];

export default function LookbookSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Card reveals with stagger
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.lookbook-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="lookbook"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40"
      style={{ backgroundColor: 'oklch(var(--background-50))' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 xl:px-24">
        {/* Header */}
        <div ref={headerRef} className="mb-14 md:mb-20">
          <span
            className="font-heading italic text-sm md:text-base block mb-3"
            style={{ color: 'oklch(var(--foreground-400))' }}
          >
            Collections
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2
                className="font-heading font-semibold leading-tight"
                style={{
                  color: 'oklch(var(--foreground-950))',
                  fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                }}
              >
                <span className="block">Masculine Tailoring</span>
                <span
                  className="block font-heading italic"
                  style={{ color: 'oklch(var(--accent-600))' }}
                >
                  Feminine Styling
                </span>
              </h2>
            </div>
            <p
              className="font-body max-w-md leading-relaxed"
              style={{
                color: 'oklch(var(--foreground-500))',
                fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
              }}
            >
              Fashion for both men and women, equally. Every piece carries the
              same standard of precision, beauty, and cultural depth.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {LOOKBOOK_ITEMS.map((item, i) => (
            <div
              key={i}
              className="lookbook-card group relative overflow-hidden rounded-2xl cursor-pointer"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.1) 45%, transparent 70%)',
                  }}
                />
                {/* Category badge */}
                <div
                  className="absolute top-3 left-3 px-3 py-1 rounded-full"
                  style={{ backgroundColor: 'oklch(var(--background-50) / 0.85)' }}
                >
                  <span
                    className="font-body text-[10px] md:text-xs tracking-wider uppercase"
                    style={{ color: 'oklch(var(--foreground-700))' }}
                  >
                    {item.category}
                  </span>
                </div>
                {/* Title on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <h3
                    className="font-heading text-sm md:text-base font-medium"
                    style={{ color: 'oklch(var(--background-50))' }}
                  >
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}