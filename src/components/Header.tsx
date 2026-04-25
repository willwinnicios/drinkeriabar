import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import logoDrinkeria from '../assets/logo-drinkeria.webp';

const WHATSAPP_NUMBER = "5546999158888";
const WHATSAPP_MESSAGE = "Olá Kenia, me encantei com a Drinkeria. Gostaria de solicitar uma proposta exclusiva para meu evento.";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export function Header({ onOpenProposal }: { onOpenProposal: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeSection, setActiveSection] = useState('inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'A História', id: 'historia' },
    { name: 'Eventos', id: 'eventos' },
    { name: 'Serviços', id: 'servicos' },
    { name: 'Carta de Drinks', id: 'drinks' },
    { name: 'Diferenciais', id: 'diferenciais' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Detect active section and theme
      const sections = document.querySelectorAll('section[id], header[id]');
      let currentSectionId = 'inicio';
      let currentTheme: 'dark' | 'light' = 'dark';

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSectionId = section.id;
          currentTheme = (section.getAttribute('data-theme') as 'dark' | 'light') || 'dark';
        }
      });

      setActiveSection(currentSectionId);
      setTheme(currentTheme);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-20 flex items-center",
        !isScrolled
          ? "bg-transparent"
          : theme === 'light'
            ? "bg-[#F6F4EA]/90 backdrop-blur-md shadow-sm"
            : "bg-[#1F2133]/90 backdrop-blur-md"
      )}
    >
      <div className="container max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-8 h-full flex items-center justify-between gap-4">
        <a href="#inicio" className="flex items-center flex-shrink-0">
          <img
            src={logoDrinkeria}
            alt="Drinkeria Bar"
            className={cn(
              "transition-all duration-500 w-auto",
              isScrolled ? "h-8 md:h-9" : "h-10 md:h-11",
              theme === 'light' ? "brightness-0" : "brightness-0 invert"
            )}
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-end">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={cn(
                "font-sans text-[10px] xl:text-[11px] uppercase tracking-[0.2em] transition-all duration-300 relative py-2 whitespace-nowrap",
                theme === 'light' ? "text-[#1F2133]" : "text-[#F6F4EA]",
                activeSection === link.id ? "opacity-100 font-bold" : "opacity-60 hover:opacity-100"
              )}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeNav"
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-[1px]",
                    theme === 'light' ? "bg-[#1F2133]" : "bg-[#D4AF37]"
                  )}
                />
              )}
            </a>
          ))}
          <button
            onClick={onOpenProposal}
            className={cn(
              "px-5 xl:px-6 py-2 rounded-sm font-sans text-[10px] uppercase tracking-[0.2em] transition-all duration-500 font-bold whitespace-nowrap cursor-pointer",
              theme === 'light'
                ? "bg-[#1F2133] text-white hover:bg-[#D4AF37]"
                : "bg-[#D4AF37] text-[#1F2133] hover:bg-[#F6F4EA]"
            )}
          >
            Solicitar Proposta
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className={cn(
            "lg:hidden p-2 transition-colors duration-500",
            theme === 'light' ? "text-[#1F2133]" : "text-[#F6F4EA]"
          )}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#1F2133] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <img src={logoDrinkeria} alt="Logo" className="h-10 brightness-0 invert" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-[#F6F4EA]">
                <X size={32} />
              </button>
            </div>

            <nav className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-4xl text-[#F6F4EA] italic"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenProposal();
                }}
                className="mt-8 bg-[#D4AF37] text-[#1F2133] py-4 rounded-sm text-center font-sans uppercase tracking-widest text-sm font-bold cursor-pointer"
              >
                Solicitar Proposta
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
