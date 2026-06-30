import { useState, useEffect } from 'react';
import Navbar from '@/components/feature/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import DividerSection from './components/DividerSection';
import CEOSection from './components/CEOSection';
import ServicesSection from './components/ServicesSection';
import LookbookSection from './components/LookbookSection';
import AtelierSection from './components/AtelierSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function Home() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <DividerSection />
      <CEOSection />
      <ServicesSection />
      <LookbookSection />
      <AtelierSection />
      <ContactSection />
      <Footer />
      
      {/* Back to top button */}
      <button
        onClick={goToTop}
        className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 z-50 cursor-pointer ${showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        style={{
          backgroundColor: 'oklch(var(--foreground-900))',
          color: 'oklch(var(--background-50))',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
        aria-label="Back to top"
      >
        <i className="ri-arrow-up-line text-xl md:text-2xl" />
      </button>
    </main>
  );
}