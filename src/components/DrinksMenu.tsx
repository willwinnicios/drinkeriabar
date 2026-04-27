import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Plus, Minus, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import logoDrinkeria from '../assets/logo-drinkeria.webp';
import { drinks } from '../data/drinks';

function DrinkCard({ drink, index }: { drink: typeof drinks[0]; index: number }) {
  const isLarge = index === 0 || (index - 6) % 7 === 0;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ 
        duration: 0.6, 
        delay: (index % 4) * 0.1,
        layout: { duration: 0.6, delay: 0 }
      }}
      className={cn(
        "group relative w-full overflow-hidden rounded-sm bg-[#1a1c2c]",
        isLarge ? "md:col-span-2 aspect-[16/10]" : "aspect-[4/5]"
      )}
    >
      <img
        src={drink.image}
        alt={drink.name}
        loading="lazy"
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-transform duration-1000 opacity-60",
          "transform-gpu backface-hidden will-change-transform",
          "md:group-hover:scale-105 md:group-hover:opacity-30",
          isOpen ? "scale-105 opacity-30" : ""
        )}
      />

      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-[#1F2133] via-[#1F2133]/20 to-transparent transition-opacity duration-700",
        isOpen ? "opacity-90" : "opacity-80"
      )} />

      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end pointer-events-none">
        <div className={cn(
          "transform transition-transform duration-500",
          "md:group-hover:-translate-y-4",
          isOpen ? "-translate-y-4" : ""
        )}>
          <span className="font-sans text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] mb-3 block font-bold opacity-80">
            {drink.category}
          </span>
          <h3 className={cn(
            "font-serif text-[#F6F4EA] italic mb-4 transition-colors",
            "md:group-hover:text-[#F9E076]",
            isLarge ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl",
            isOpen ? "text-[#F9E076]" : ""
          )}>
            {drink.name}
          </h3>

          <div className={cn(
            "h-[1px] bg-[#D4AF37]/50 transition-all duration-700",
            "w-12 md:group-hover:w-full",
            isOpen ? "w-full" : ""
          )} />
        </div>

        <div className={cn(
          "transition-all duration-700 overflow-hidden mt-4",
          "md:group-hover:max-h-40 md:group-hover:opacity-100",
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="space-y-3 font-sans text-[11px] md:text-[13px] text-[#F6F4EA]/70 leading-relaxed max-w-lg pointer-events-auto pr-28 md:pr-0">
            <p><strong className="text-[#F6F4EA] font-semibold uppercase tracking-tighter mr-2">Base:</strong> {drink.base}</p>
            <p><strong className="text-[#F6F4EA] font-semibold uppercase tracking-tighter mr-2">Perfil:</strong> {drink.profile}</p>
            <p className="italic font-light border-l border-[#D4AF37]/30 pl-4 py-1">"{drink.experience}"</p>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden pointer-events-none">
        <div className={cn(
          "absolute top-0 right-0 w-[1px] h-10 bg-gradient-to-b from-[#D4AF37] to-transparent transition-transform duration-700",
          "translate-x-10 md:group-hover:translate-x-0",
          isOpen ? "translate-x-0" : ""
        )} />
        <div className={cn(
          "absolute top-0 right-0 h-[1px] w-10 bg-gradient-to-l from-[#D4AF37] to-transparent transition-transform duration-700",
          "-translate-y-10 md:group-hover:translate-y-0",
          isOpen ? "translate-y-0" : ""
        )} />
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden absolute bottom-5 right-5 px-4 py-2 rounded-full border border-[#D4AF37]/40 flex items-center gap-2 bg-[#1F2133]/60 backdrop-blur-md text-[#D4AF37] transition-all z-10 font-sans text-[9px] uppercase tracking-[0.2em] font-bold shadow-lg"
        aria-label="Ver mais informações"
      >
        {isOpen ? (
          <>
            <span>Fechar</span>
            <Minus size={12} />
          </>
        ) : (
          <>
            <span>Ver Detalhes</span>
            <Plus size={12} />
          </>
        )}
      </button>
    </motion.div>
  );
}

export function DrinksMenu() {
  const [filter, setFilter] = useState('Todos');
  const sectionRef = useRef<HTMLElement>(null);
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Show button when scrolled at least 20% into the section and hide near the end
    if (latest > 0.2 && latest < 0.9) {
      setShowFloatingBtn(true);
    } else {
      setShowFloatingBtn(false);
    }
  });

  const categoryGroups = {
    'Todos': 'Todos',
    'Clássicos': ['Clássico', 'Clássico Contemporâneo', 'Clássico Italiano', 'Clássico Brasileiro', 'Clássico Moderno'],
    'Contemporâneos': ['Contemporâneo', 'Contemporâneo Moderno'],
    'Autorais': ['Autoral Moderno', 'Autoral Contemporâneo']
  };

  const filteredDrinks = filter === 'Todos'
    ? drinks
    : drinks.filter(d => categoryGroups[filter as keyof typeof categoryGroups].includes(d.category));

  return (
    <section ref={sectionRef} id="drinks" data-theme="dark" className="py-24 md:py-40 bg-[#1F2133] overflow-hidden relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-8">
        <div className="flex flex-col items-center mb-24 md:mb-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-8 opacity-70 px-2 md:px-0">
              <img
                src={logoDrinkeria}
                alt="Logo"
                className="h-8 md:h-12 object-contain"
                style={{ filter: 'brightness(0) saturate(100%) invert(43%) sepia(93%) saturate(319%) hue-rotate(7deg) brightness(101%) contrast(85%)' }}
              />
              <span className="text-[#D4AF37] font-sans tracking-[0.5em] uppercase text-[10px] md:text-[12px] font-bold">
                Eventos
              </span>
            </div>
            <h2 className="font-serif italic text-4xl md:text-8xl mb-12 text-[#F6F4EA] px-2 md:px-0 text-balance">A Carta de Drinks</h2>

            <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 md:gap-x-12 w-full px-4 md:px-0">
              {Object.keys(categoryGroups).map((group) => (
                <button
                  key={group}
                  onClick={() => setFilter(group)}
                  className={cn(
                    "font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all duration-700 relative py-2 whitespace-nowrap",
                    filter === group
                      ? "text-[#D4AF37]"
                      : "text-[#F6F4EA]/40 hover:text-[#F6F4EA]/70"
                  )}
                >
                  {group}
                  {filter === group && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </motion.div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 grid-flow-dense"
        >
          <AnimatePresence mode="popLayout">
            {filteredDrinks.map((drink, idx) => (
              <DrinkCard key={drink.name} drink={drink} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-32 flex flex-col items-center px-2 md:px-0">
          <div className="w-px h-20 bg-gradient-to-b from-[#D4AF37] to-transparent mb-12" />
          <p className="font-serif italic text-[#F6F4EA]/40 text-xl md:text-3xl max-w-3xl mx-auto text-center leading-relaxed">
            "Equilíbrio, técnica e alma. Redefinimos o conceito de brinde para tornar cada gole uma memória eterna."
          </p>
          
          <motion.a
            href="#diferenciais"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 flex flex-col items-center gap-3 group cursor-pointer"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] opacity-60 group-hover:opacity-100 transition-opacity">
              Descobrir Diferenciais
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#D4AF37]"
            >
              <ChevronDown size={24} strokeWidth={1} />
            </motion.div>
          </motion.a>
        </div>
      </div>

      {/* Floating Skip Button for Mobile */}
      <AnimatePresence>
        {showFloatingBtn && (
          <motion.a
            href="#diferenciais"
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-10 left-1/2 z-40 lg:hidden bg-[#D4AF37] text-[#1F2133] px-6 py-3 rounded-full flex items-center gap-3 shadow-[0_15px_30px_rgba(212,175,55,0.4)] transition-transform active:scale-95"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold">Próxima Sessão</span>
            <ChevronDown size={18} strokeWidth={2.5} />
          </motion.a>
        )}
      </AnimatePresence>
    </section>
  );
}
