import React, { useRef } from 'react';
import { motion, Variants, useInView } from 'framer-motion';
import casamentoImg from '../assets/casamento-drink.webp';
import formaturaVid from '../assets/formatura-drink.mp4';
import aniversarioVid from '../assets/aniversario-drink.mp4';
import corporativoVid from '../assets/corporativo-drink.mp4';

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

function LazyVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });
  
  return (
    <div ref={ref} className="w-full h-full relative">
      {isInView && (
        <video 
          src={src} 
          autoPlay 
          muted 
          loop 
          playsInline
          className={className}
        />
      )}
    </div>
  );
}

const services = [
  {
    title: "Casamentos",
    desc: "Brindes inesquecíveis para o dia mais importante. Entregamos cartas personalizadas que contam a história do casal em cada detalhe.",
    image: casamentoImg,
    video: ""
  },
  {
    title: "Formaturas",
    desc: "A consagração de uma jornada merece ser celebrada com drinks vibrantes, energia contagiante e um serviço que impressiona seus convidados.",
    image: "",
    video: formaturaVid
  },
  {
    title: "Festas",
    desc: "Aniversários e celebrações particulares. Trabalhamos com os melhores produtos para que sua festa se torne uma experiência única.",
    image: "",
    video: aniversarioVid
  },
  {
    title: "Eventos Corporativos",
    desc: "Sofisticação e networking. Elevamos o padrão da sua marca com um serviço de bar elegante, pontual e muito bem apresentado.",
    image: "",
    video: corporativoVid
  }
];

function ServiceCard({ service, idx }: { service: typeof services[0]; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative mb-8 aspect-[4/5] overflow-hidden rounded-sm border border-[#1F2133]/5 shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:border-[#D4AF37]/20 group-hover:-translate-y-2">
        <div className="absolute inset-0 bg-[#1F2133]/5 group-hover:bg-transparent transition-colors duration-700 z-20" />

        {service.video ? (
          <LazyVideo
            src={service.video}
            className="absolute inset-0 w-full h-full object-cover z-10"
          />
        ) : (
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000"
          />
        )}

        <div className="absolute top-6 left-6 z-30">
          <span className="font-serif text-5xl text-[#F6F4EA]/40 italic pointer-events-none group-hover:text-[#D4AF37]/60 transition-colors duration-500">
            0{idx + 1}
          </span>
        </div>
      </div>

      <div className="relative px-2">
        <div className="flex items-center gap-4 mb-4">
          <h3 className="font-serif text-2xl text-[#1F2133] italic">{service.title}</h3>
          <div className="h-[1px] flex-1 bg-[#1F2133]/10 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 bg-gradient-gold h-[2px]" />
        </div>
        <p className="font-sans text-[13px] font-light text-[#1F2133]/60 leading-relaxed max-w-[90%]">
          {service.desc}
        </p>
      </div>
    </motion.div>
  );
}

export function EventServices() {
  return (
    <section id="servicos" data-theme="light" className="pb-24 md:pb-40 bg-[#F6F4EA] text-[#1F2133]">
      <div className="container max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-[#D4AF37] font-sans tracking-[0.2em] uppercase text-xs mb-4 block font-semibold">
            Nossos Serviços
          </span>
          <h2 className="font-serif text-3xl md:text-5xl mb-6 leading-tight italic text-[#1F2133]">
            Atendimento exclusivo para <br className="hidden md:block" />
            <span className="text-[#D4AF37]">momentos memoráveis</span>
          </h2>
          <p className="max-w-2xl mx-auto font-sans font-light text-[#1F2133]/70 leading-relaxed">
            Construímos uma trajetória de excelência e consistência na alta coquetelaria, criando menus sob medida para encantar você e seus convidados.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {services.map((service, idx) => (
            <ServiceCard key={idx} service={service} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
