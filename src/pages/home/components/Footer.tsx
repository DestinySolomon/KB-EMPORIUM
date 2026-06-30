import { useEffect, useRef } from 'react';
import logoImg from '@/assets/logo (1).png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FOOTER_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Lookbook', href: '#lookbook' },
  { label: 'Atelier', href: '#atelier' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  { icon: 'ri-facebook-line', label: 'KB Inyang on Facebook', href: 'https://facebook.com' },
  { icon: 'ri-instagram-line', label: 'inyang_kb on Instagram', href: 'https://instagram.com' },
  { icon: 'ri-whatsapp-line', label: 'WhatsApp', href: 'https://wa.me/2348080297786' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = footerRef.current?.querySelectorAll('.footer-reveal');
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full pt-20 md:pt-28 pb-8"
      style={{ backgroundColor: 'oklch(var(--primary-500))' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-16 md:mb-20">
          {/* Left: Brand + intro */}
          <div className="flex-1 lg:max-w-[420px]">
            <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-4 mb-6 md:mb-8 footer-reveal">
              <img src={logoImg} alt="KB's Emporium Logo" className="h-14 md:h-20 w-auto" />
              <h2
                className="font-heading font-bold tracking-[0.1em]"
                style={{
                  color: '#C19A6B', // Milky caramel brown
                  fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
                  lineHeight: 1.1,
                }}
              >
                KB&rsquo;S<br />EMPORIUM
              </h2>
            </a>
            <p
              className="footer-reveal font-body leading-[1.7] mb-8"
              style={{
                color: 'oklch(var(--background-50) / 0.7)',
                fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
              }}
            >
              A refined luxury tailoring house in Akwa Ibom, blending African
              heritage with modern English structure. Every garment is crafted
              with precision, identity, and purpose.
            </p>

            {/* Social icons */}
            <div className="footer-reveal flex items-center gap-3">
              {SOCIAL_LINKS.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:opacity-70"
                  style={{ borderColor: 'oklch(var(--background-50) / 0.3)' }}
                  aria-label={social.label}
                >
                  <i
                    className={`${social.icon} text-lg`}
                    style={{ color: 'oklch(var(--background-50) / 0.8)' }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Middle: Contact info */}
          <div className="flex-1 lg:max-w-[300px]">
            <div className="flex flex-col gap-8">
              <div className="footer-reveal">
                <span
                  className="font-body text-xs tracking-[0.2em] uppercase block mb-3"
                  style={{ color: 'oklch(var(--background-50) / 0.5)' }}
                >
                  Address
                </span>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: 'oklch(var(--background-50) / 0.75)' }}
                >
                  Nung Uyo Idoro,
                  <br />
                  Idoro Road,
                  <br />
                  Akwa Ibom State, Nigeria
                </p>
              </div>

              <div className="footer-reveal">
                <span
                  className="font-body text-xs tracking-[0.2em] uppercase block mb-3"
                  style={{ color: 'oklch(var(--background-50) / 0.5)' }}
                >
                  Phone
                </span>
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+2348080297786"
                    className="font-body text-sm transition-colors duration-300 hover:opacity-70 whitespace-nowrap"
                    style={{ color: 'oklch(var(--background-50) / 0.75)' }}
                  >
                    +234 808 029 7786
                  </a>
                  <a
                    href="tel:+2349066826803"
                    className="font-body text-sm transition-colors duration-300 hover:opacity-70 whitespace-nowrap"
                    style={{ color: 'oklch(var(--background-50) / 0.75)' }}
                  >
                    +234 906 682 6803
                  </a>
                </div>
              </div>

              <div className="footer-reveal">
                <span
                  className="font-body text-xs tracking-[0.2em] uppercase block mb-3"
                  style={{ color: 'oklch(var(--background-50) / 0.5)' }}
                >
                  Socials
                </span>
                <div className="flex flex-col gap-1">
                  <span
                    className="font-body text-sm"
                    style={{ color: 'oklch(var(--background-50) / 0.75)' }}
                  >
                    FB: KB Inyang
                  </span>
                  <span
                    className="font-body text-sm"
                    style={{ color: 'oklch(var(--background-50) / 0.75)' }}
                  >
                    IG: inyang_kb
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Small image */}
          <div className="hidden lg:block flex-1 lg:max-w-[320px]">
            <div className="footer-reveal overflow-hidden rounded-2xl">
              <img
                src="https://readdy.ai/api/search-image?query=Luxury%20fashion%20atelier%20corner%20with%20tailoring%20tools%20and%20fabric%20rolls%20on%20wooden%20shelves%2C%20warm%20ambient%20lighting%2C%20ivory%20and%20sand%20beige%20color%20palette%2C%20soft%20editorial%20photography%2C%20shallow%20depth%20of%20field%2C%20high%20end%20fashion%20studio%20atmosphere%2C%20minimal%20composition%2C%20no%20people%20visible&width=640&height=400&seq=footer-image-01&orientation=landscape"
                alt="KB's Emporium atelier interior"
                className="w-full h-auto object-cover aspect-[16/10]"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-6"
          style={{ backgroundColor: 'oklch(var(--background-50) / 0.15)' }}
        />

        {/* Bottom bar */}
        <div className="footer-reveal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p
            className="font-body text-xs"
            style={{ color: 'oklch(var(--background-50) / 0.5)' }}
          >
            &copy; {new Date().getFullYear()} KB&rsquo;s Emporium. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-body text-xs tracking-wider transition-colors duration-300 hover:opacity-70 whitespace-nowrap cursor-pointer"
                style={{ color: 'oklch(var(--background-50) / 0.5)' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}