import React from 'react';
import { motion, Variants } from 'framer-motion';
import { MessageCircle, Phone, Instagram, Facebook } from 'lucide-react';
import logoDrinkeria from '../assets/logo-drinkeria.webp';

const WHATSAPP_NUMBER = "5546999158888";
const WHATSAPP_MESSAGE = "Olá Kenia, me encantei com a Drinkeria. Gostaria de solicitar uma proposta exclusiva para meu evento.";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function Footer({ onOpenProposal }: { onOpenProposal: () => void }) {
  return (
    <footer className="relative bg-[#1F2133] pt-32 pb-12 overflow-hidden border-t border-[#D4AF37]/20">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-[#1F2133]/0 to-transparent" />

      <div className="container max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-8 text-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
        >
          <div className="w-16 h-[1px] bg-[#D4AF37]/50 mx-auto mb-10" />
          <h2 className="font-serif italic text-4xl md:text-5xl mb-6">Pronto para elevar o seu evento?</h2>
          <p className="font-sans text-xs uppercase tracking-widest text-[#F6F4EA]/60 max-w-lg mx-auto mb-10 leading-loose">
            Permita-nos desenhar uma experiência sob medida. Oferecemos uma <strong className="text-[#F6F4EA]">Cortesia de Degustação Agendada</strong>.
          </p>
          <button
            onClick={onOpenProposal}
            className="inline-flex items-center gap-3 bg-gradient-gold text-[#1F2133] px-8 py-4 uppercase font-sans text-xs font-bold tracking-widest rounded-sm hover:opacity-90 transition-opacity cta-glow transform hover:-translate-y-1 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            Solicitar Proposta Exclusiva
          </button>
        </motion.div>

        <div className="mt-32 pt-8 border-t border-[#F6F4EA]/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-4">
            <img src={logoDrinkeria} alt="Drinkeria Bar" loading="lazy" className="h-16 brightness-0 invert opacity-80" />
          </div>
          <p className="font-sans text-xs text-[#F6F4EA]/50 tracking-wider">
            © {new Date().getFullYear()} DRINKERIA BAR. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#F6F4EA]/80 font-sans text-xs hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0">
              <Phone size={16} className="text-[#D4AF37]" />
              (46) 99915-8888
            </a>
            <div className="flex gap-4 text-[#F6F4EA]/60">
              <a href="#" className="hover:text-[#D4AF37] transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
