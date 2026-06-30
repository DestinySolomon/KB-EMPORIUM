import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    name: 'Senator Wears',
    description: 'Elegant traditional Nigerian senator style suits tailored for distinction and cultural pride.',
    image: 'https://readdy.ai/api/search-image?query=Elegant%20African%20senator%20style%20suit%20on%20wooden%20hanger%2C%20black%20and%20gold%20fabric%20with%20subtle%20embroidery%2C%20tailoring%20atelier%20background%2C%20ivory%20and%20sand%20beige%20color%20palette%2C%20soft%20editorial%20lighting%2C%20shallow%20depth%20of%20field%2C%20high%20end%20fashion%20photography%2C%20no%20people%20visible%2C%20minimal%20composition%2C%20luxury%20craftsmanship%20detail&width=600&height=750&seq=service-senator-01&orientation=portrait',
  },
  {
    name: 'Bespoke Suits',
    description: 'Hand-cut English suits with African finishing — made to measure for your frame and presence.',
    image: 'https://readdy.ai/api/search-image?query=Classic%20bespoke%20English%20suit%20jacket%20on%20tailor%20mannequin%2C%20charcoal%20grey%20wool%20fabric%2C%20ivory%20and%20sand%20beige%20atelier%20background%2C%20soft%20editorial%20lighting%2C%20shallow%20depth%20of%20field%2C%20high%20end%20fashion%20photography%2C%20minimal%20composition%2C%20luxury%20craftsmanship%20detail%2C%20precision%20stitching%20visible&width=600&height=750&seq=service-bespoke-01&orientation=portrait',
  },
  {
    name: 'English Shirts',
    description: 'Crisp corporate shirts and trousers — refined English tailoring for the modern professional.',
    image: 'https://readdy.ai/api/search-image?query=Crisp%20white%20English%20tailored%20dress%20shirt%20folded%20elegantly%20on%20wooden%20table%2C%20tailoring%20atelier%20background%2C%20ivory%20and%20sand%20beige%20color%20palette%2C%20soft%20editorial%20lighting%2C%20shallow%20depth%20of%20field%2C%20high%20end%20fashion%20photography%2C%20minimal%20composition%2C%20luxury%20craftsmanship%20detail&width=600&height=750&seq=service-english-01&orientation=portrait',
  },
  {
    name: 'Corporate Trousers',
    description: 'Precision-cut trousers for boardrooms and beyond — comfort meets executive presence.',
    image: 'https://readdy.ai/api/search-image?query=Tailored%20navy%20corporate%20trousers%20hanging%20on%20wooden%20rack%2C%20premium%20fabric%20detail%20visible%2C%20ivory%20and%20sand%20beige%20atelier%20background%2C%20soft%20editorial%20lighting%2C%20shallow%20depth%20of%20field%2C%20high%20end%20fashion%20photography%2C%20minimal%20composition%2C%20luxury%20craftsmanship%20detail&width=600&height=750&seq=service-trousers-01&orientation=portrait',
  },
  {
    name: 'Agbada',
    description: 'Flowing three-piece traditional wear — majestic, dignified, and tailored with reverence.',
    image: 'https://readdy.ai/api/search-image?query=Traditional%20African%20agbada%20robe%20on%20elegant%20hanger%2C%20rich%20white%20and%20gold%20embroidered%20fabric%2C%20ivory%20and%20sand%20beige%20atelier%20background%2C%20soft%20editorial%20lighting%2C%20shallow%20depth%20of%20field%2C%20high%20end%20fashion%20photography%2C%20minimal%20composition%2C%20luxury%20craftsmanship%20detail&width=600&height=750&seq=service-agbada-01&orientation=portrait',
  },
  {
    name: 'Isiagu',
    description: 'Bold lion-head patterned Igbo ceremonial wear — cultural heritage woven into every thread.',
    image: 'https://readdy.ai/api/search-image?query=Traditional%20African%20isiagu%20fabric%20garment%20with%20lion%20head%20pattern%20on%20wooden%20hanger%2C%20rich%20burgundy%20and%20gold%20colors%2C%20ivory%20and%20sand%20beige%20atelier%20background%2C%20soft%20editorial%20lighting%2C%20shallow%20depth%20of%20field%2C%20high%20end%20fashion%20photography%2C%20minimal%20composition&width=600&height=750&seq=service-isiagu-01&orientation=portrait',
  },
  {
    name: 'Dashiki',
    description: 'Vibrant and expressive dashiki shirts — freedom and culture in every colorful stitch.',
    image: 'https://readdy.ai/api/search-image?query=Colorful%20African%20dashiki%20shirt%20with%20geometric%20patterns%20on%20wooden%20hanger%2C%20warm%20earth%20tones%20and%20burgundy%20accents%2C%20ivory%20and%20sand%20beige%20atelier%20background%2C%20soft%20editorial%20lighting%2C%20shallow%20depth%20of%20field%2C%20high%20end%20fashion%20photography%2C%20minimal%20composition&width=600&height=750&seq=service-dashiki-01&orientation=portrait',
  },
  {
    name: 'Jalabia',
    description: 'Graceful flowing robes — spiritual elegance and comfort for ceremonial occasions.',
    image: 'https://readdy.ai/api/search-image?query=Elegant%20white%20African%20jalabia%20robe%20on%20wooden%20hanger%2C%20flowing%20fabric%20detail%2C%20ivory%20and%20sand%20beige%20atelier%20background%2C%20soft%20editorial%20lighting%2C%20shallow%20depth%20of%20field%2C%20high%20end%20fashion%20photography%2C%20minimal%20composition%2C%20luxury%20craftsmanship%20detail&width=600&height=750&seq=service-jalabia-01&orientation=portrait',
  },
  {
    name: 'Kaftan / Robe',
    description: 'Versatile kaftan robes for men and women — effortless elegance with cultural depth.',
    image: 'https://readdy.ai/api/search-image?query=Luxury%20African%20kaftan%20robe%20on%20wooden%20hanger%2C%20earth%20tone%20fabric%20with%20subtle%20gold%20thread%20detail%2C%20ivory%20and%20sand%20beige%20atelier%20background%2C%20soft%20editorial%20lighting%2C%20shallow%20depth%20of%20field%2C%20high%20end%20fashion%20photography%2C%20minimal%20composition&width=600&height=750&seq=service-kaftan-01&orientation=portrait',
  },
  {
    name: 'Traditional Caps',
    description: 'Fila and Aso Oke caps — the finishing crown for every cultural ensemble.',
    image: 'https://readdy.ai/api/search-image?query=African%20aso%20oke%20traditional%20cap%20fila%20displayed%20on%20wooden%20stand%2C%20intricate%20woven%20texture%20detail%2C%20ivory%20and%20sand%20beige%20atelier%20background%2C%20soft%20editorial%20lighting%2C%20shallow%20depth%20of%20field%2C%20high%20end%20fashion%20photography%2C%20minimal%20composition&width=600&height=750&seq=service-caps-01&orientation=portrait',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

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

      // Card staggered reveals
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.querySelectorAll('.service-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
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
      id="services"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40"
      style={{ backgroundColor: 'oklch(var(--secondary-50))' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 xl:px-24">
        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <span
            className="font-body text-xs tracking-[0.2em] uppercase block mb-4"
            style={{ color: 'oklch(var(--foreground-400))' }}
          >
            KB&rsquo;S EMPORIUM
          </span>
          <h2
            className="font-heading font-semibold leading-tight"
            style={{
              color: 'oklch(var(--foreground-950))',
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            }}
          >
            The Atelier Services
          </h2>
          <p
            className="font-body mt-4 max-w-xl leading-relaxed"
            style={{
              color: 'oklch(var(--foreground-500))',
              fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
            }}
          >
            Every garment is a conversation between tradition and modernity.
            From boardroom suits to ceremonial robes, each piece is crafted
            with the precision your presence deserves.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6"
        >
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className="service-card group relative overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer transition-all duration-500"
              style={{
                backgroundColor: 'oklch(var(--background-50))',
                willChange: 'transform, opacity',
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(20,20,20,0.6) 0%, rgba(20,20,20,0.15) 40%, transparent 70%)',
                  }}
                />
                {/* Number badge */}
                <div
                  className="absolute top-4 left-4 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'oklch(var(--primary-500) / 0.8)' }}
                >
                  <span
                    className="font-body text-xs font-medium"
                    style={{ color: 'oklch(var(--background-50))' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="p-5 md:p-6">
                <h3
                  className="font-heading font-medium text-lg md:text-xl mb-2"
                  style={{ color: 'oklch(var(--foreground-900))' }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: 'oklch(var(--foreground-500))' }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}