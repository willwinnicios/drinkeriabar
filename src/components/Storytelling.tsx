import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

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

const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export function Storytelling() {
  return (
    <section id="historia" data-theme="light" className="pt-24 pb-24 md:pt-40 md:pb-40 bg-[#F6F4EA] relative z-20 text-[#1F2133]">
      {/* Curved Scroll Tab from Hero to Storytelling */}
      <motion.div
        initial={{ y: 30, scaleY: 0.7, opacity: 0 }}
        animate={{ y: 0, scaleY: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[calc(100%-1px)] z-20 origin-bottom"
      >
        <svg width="280" height="45" viewBox="0 0 280 45" fill="none" className="block">
          <path d="M0 45 C100 45 110 0 140 0 C170 0 180 45 280 45 Z" fill="#F6F4EA" />
        </svg>
        <a
          href="#historia"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('historia')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="absolute top-2 left-1/2 -translate-x-1/2 text-[#1F2133] hover:scale-110 transition-transform p-1 cursor-pointer"
        >
          <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
            <ChevronDown size={24} strokeWidth={2.5} />
          </motion.div>
        </a>
      </motion.div>

      <div className="container max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="relative"
          >
            <div className="aspect-[3/4] max-w-sm mx-auto lg:max-w-md relative group">
              <div className="absolute inset-0 bg-[#D4AF37] translate-x-4 translate-y-4 rounded-sm -z-10 transition-transform group-hover:translate-x-6 group-hover:translate-y-6" />
              <img
                src="https://media-poa1-1.cdn.whatsapp.net/v/t61.24694-24/534428882_967119052423564_6445820148721132194_n.jpg?ccb=11-4&oh=01_Q5Aa4QGc9hwKQDJZ1dR43ilOZGSaoJpVJnmfKb6TTvBfkzAgag&oe=69FA0F95&_nc_sid=5e03e0&_nc_cat=104"
                alt="Retrato Kenia Tosi"
                loading="lazy"
                className="w-full h-full object-cover rounded-sm transition-all duration-700 shadow-xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-xl mx-auto lg:mx-0"
          >
            <motion.span variants={fadeUpVariant} className="text-[#D4AF37] font-sans tracking-[0.2em] uppercase text-xs mb-4 block font-semibold">
              10 Anos de Excelência
            </motion.span>
            <motion.h2 variants={fadeUpVariant} className="font-serif text-4xl md:text-5xl mb-8 leading-tight italic text-[#1F2133]">
              A Curadoria por<br /> <span className="text-[#D4AF37]">Kenia Tosi</span>
            </motion.h2>
            <motion.div variants={fadeUpVariant} className="space-y-6 text-[#1F2133]/70 font-sans leading-relaxed font-light">
              <p>
                A Drinkeria Bar nasce do encontro entre sofisticação, experiência e o desejo genuíno de realizar sonhos e transformar momentos em memórias inesquecíveis.
              </p>
              <p>
                Com 10 anos de experiência no universo de eventos, encontrei na coquetelaria a forma de transformar momentos em experiências. Com ingredientes selecionados, atenção aos detalhes e um atendimento personalizado, entregamos elegância em cada serviço.
              </p>
              <p className="text-xl text-[#1F2133] font-serif italic pt-4 font-medium">
                "Mais do que servir drinks, crio conexões, crio experiências, crio memórias. Porque celebrar é uma arte — e nós dominamos cada detalhe."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
