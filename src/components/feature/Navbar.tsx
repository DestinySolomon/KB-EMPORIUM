import { useState, useEffect } from 'react';
import logoImg from '@/assets/logo (1).png';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Lookbook', href: '#lookbook' },
  { label: 'Atelier', href: '#atelier' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'navbar-scrolled border-b border-background-300/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full flex items-center justify-between h-[72px] md:h-[80px]">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="cursor-pointer flex-shrink-0 flex items-center gap-3 min-w-0"
        >
          <img src={logoImg} alt="KB's Emporium Logo" className="h-10 md:h-12 w-auto" />
          <span
            className="font-heading text-lg md:text-xl tracking-[0.15em] whitespace-nowrap"
            style={{
              color: scrolled ? '#4A3728' : '#C19A6B',
              transition: 'color 0.5s ease',
            }}
          >
            KB&rsquo;S EMPORIUM
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="flex items-center gap-8 lg:gap-12 xl:gap-16">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm tracking-wider whitespace-nowrap cursor-pointer transition-colors duration-300 hover:opacity-70"
                style={{
                  color: scrolled
                    ? 'oklch(var(--foreground-700))'
                    : 'oklch(0.96 0.015 85 / 0.85)',
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center justify-end flex-shrink-0 ml-6">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="text-sm tracking-wider whitespace-nowrap cursor-pointer px-5 py-2 border transition-all duration-300 hover:opacity-80"
            style={{
              borderColor: scrolled
                ? 'oklch(var(--foreground-800))'
                : 'oklch(0.96 0.015 85 / 0.6)',
              color: scrolled
                ? 'oklch(var(--foreground-900))'
                : 'oklch(0.96 0.015 85)',
            }}
          >
            Book a Fitting
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto w-8 h-8 flex items-center justify-center cursor-pointer flex-shrink-0"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <i
            className={`ri-${mobileOpen ? 'close' : 'menu'}-line text-xl transition-colors duration-300`}
            style={{
              color: scrolled
                ? 'oklch(var(--foreground-900))'
                : 'oklch(0.96 0.015 85)',
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ backgroundColor: 'oklch(var(--background-50) / 0.98)' }}
      >
        <div className="px-6 py-5 flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm tracking-wider whitespace-nowrap cursor-pointer py-1"
              style={{ color: 'oklch(var(--foreground-700))' }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="text-sm tracking-wider whitespace-nowrap cursor-pointer py-2 px-5 border inline-block w-fit mt-2"
            style={{
              borderColor: 'oklch(var(--foreground-800))',
              color: 'oklch(var(--foreground-900))',
            }}
          >
            Book a Fitting
          </a>
        </div>
      </div>
    </nav>
  );
}