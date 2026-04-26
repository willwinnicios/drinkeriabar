import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import heroVideo from '../assets/hero-video.mp4';
import heroPoster from '../assets/casamento-drink.webp';

const WHATSAPP_NUMBER = "5546999158888";
const WHATSAPP_MESSAGE = "Olá Kenia, me encantei com a Drinkeria. Gostaria de solicitar uma proposta exclusiva para meu evento.";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

function TypingEffect({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (isSelected) {
      const timeout = setTimeout(() => {
        setIsSelected(false);
        setIsDeleting(true);
        setSubIndex(0); // clear entire word when selected
      }, 500); // How long it stays selected
      return () => clearTimeout(timeout);
    }

    if (!isDeleting && subIndex === words[index].length) {
      const timeout = setTimeout(() => {
        setIsSelected(true);
      }, 1500); // How long word stays before being selected
      return () => clearTimeout(timeout);
    }

    if (isDeleting && subIndex === 0) {
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }, 300); // pause before typing next word
      return () => clearTimeout(timeout);
    }

    // Typing
    if (!isSelected && !isDeleting) {
      const timeout = setTimeout(() => {
        setSubIndex((prev) => prev + 1);
      }, 120); // Typing speed
      return () => clearTimeout(timeout);
    }
  }, [subIndex, index, isDeleting, isSelected, words]);

  const currentWord = words[index];
  const displayText = isSelected ? currentWord : currentWord.substring(0, subIndex);

  return (
    <span className="inline-block text-left min-w-[120px] sm:min-w-[200px] md:min-w-[260px] align-bottom">
      {isSelected ? (
        <span className="bg-[#D4AF37] text-[#1F2133] px-1">{displayText || '\u200B'}</span>
      ) : (
        <span className="text-gradient-gold px-1">{displayText || '\u200B'}</span>
      )}
      <motion.span
        animate={isSelected ? { opacity: 0 } : { opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[2px] h-[0.9em] bg-[#D4AF37] ml-1 align-baseline translate-y-[2px]"
      />
    </span>
  );
}

export function Hero({ onOpenProposal }: { onOpenProposal: () => void }) {
  const words = ['sabor.', 'aroma.', 'elegância.', 'estilo.'];

  return (
    <section id="inicio" data-theme="dark" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-[#1F2133]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={heroPoster}
          className="w-full h-full object-cover scale-105 transform translate-z-0 opacity-50 transition-opacity duration-1000"
        >
          <source src={heroVideo} type="video/mp4" />
          Seu navegador não suporta a reprodução de vídeo.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F2133]/90 via-[#1F2133]/20 to-[#1F2133] z-10" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-8 md:px-12 lg:px-8 max-w-4xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] mb-4 block opacity-70">
            Alta Coquetelaria
          </span>
          <h1 className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-8 text-[#F6F4EA] max-w-4xl mx-auto">
            Seu evento merece <br className="hidden md:block" />
            um drink com <TypingEffect words={words} />
          </h1>
          <motion.button
            onClick={onOpenProposal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-gold text-[#1F2133] px-8 py-4 uppercase font-sans text-xs font-bold tracking-widest rounded-sm hover:opacity-90 transition-opacity cta-glow mt-8 cursor-pointer"
          >
            Descubra Nossos Menus
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
