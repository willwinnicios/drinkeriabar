import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Wine, Droplets, Sparkles, GlassWater } from 'lucide-react';
import { cn } from '../lib/utils';

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

export function Differentials() {
  const items = [
    {
      num: "01",
      icon: <Wine strokeWidth={1} size={28} className="text-[#D4AF37] transform group-hover:scale-110 transition-transform duration-500" />,
      title: "Cristalaria Fina",
      desc: "Taças e copos de design europeu que elevam não apenas o sabor, mas a experiência visual e tátil de cada convidado em seu evento."
    },
    {
      num: "02",
      icon: <Droplets strokeWidth={1} size={28} className="text-[#D4AF37] transform group-hover:scale-110 transition-transform duration-500" />,
      title: "Insumos Artesanais",
      desc: "Xaropes de fabricação própria, botânicos rigorosamente selecionados e guarnições frescas preparadas no dia do evento."
    },
    {
      num: "03",
      icon: <Sparkles strokeWidth={1} size={28} className="text-[#D4AF37] transform group-hover:scale-110 transition-transform duration-500" />,
      title: "Design de Bar",
      desc: "Uma estrutura imponente que compõe o cenário da festa. Bancadas minimalistas, iluminação pontual e organização impecável."
    },
    {
      num: "04",
      icon: <GlassWater strokeWidth={1} size={28} className="text-[#D4AF37] transform group-hover:scale-110 transition-transform duration-500" />,
      title: "Equipe Especializada",
      desc: "Bartenders com postura de alta coquetelaria, uniformização sob medida e treinamento focado na arte da hospitalidade."
    }
  ];

  return (
    <section id="diferenciais" data-theme="light" className="py-24 md:py-40 bg-[#F6F4EA] relative">

      {/* Visual Effect: Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bg-[#D4AF37]/10 rounded-full blur-3xl"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="text-center mb-20 md:mb-28"
        >
          <span className="text-[#D4AF37] font-sans tracking-[0.2em] uppercase text-xs mb-4 block font-bold opacity-80">
            Padrão de Excelência
          </span>
          <h2 className="font-serif italic text-4xl md:text-6xl mb-6 text-[#1F2133]">Nossos Diferenciais</h2>
          <div className="h-[1px] w-20 bg-[#D4AF37] mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: "easeOut" }}
              className="group relative p-6 sm:p-10 md:p-14 bg-white/50 backdrop-blur-sm rounded-sm border border-[#1F2133]/5 hover:border-[#D4AF37]/30 hover:shadow-2xl transition-all duration-700 overflow-hidden cursor-default shadow-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />

              <span className="absolute -bottom-10 -right-6 text-[180px] font-serif font-bold text-[#1F2133]/[0.02] group-hover:text-[#D4AF37]/[0.05] transition-colors duration-700 pointer-events-none z-0">
                {item.num}
              </span>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
                  <div className="w-20 h-20 rounded-full border border-[#1F2133]/10 flex items-center justify-center bg-[#F6F4EA] group-hover:border-[#D4AF37]/50 group-hover:shadow-lg transition-all duration-500 shrink-0">
                    {item.icon}
                  </div>
                  <h3 className="font-serif text-3xl text-[#1F2133] group-hover:text-[#D4AF37] transition-colors duration-500 italic">{item.title}</h3>
                </div>
                <p className="font-sans text-sm md:text-base text-[#1F2133]/70 font-light leading-relaxed group-hover:text-[#1F2133] transition-colors duration-500 max-w-md">
                  {item.desc}
                </p>

                <div className="w-0 h-[2px] bg-gradient-gold mt-12 transition-all duration-700 group-hover:w-full opacity-40" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
