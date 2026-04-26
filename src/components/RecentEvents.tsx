import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Play } from 'lucide-react';
import event1 from '../assets/events/1.jpg';
import event2 from '../assets/events/2.mp4';
import event3 from '../assets/events/3.jpg';
import event4 from '../assets/events/4.mp4';
import event5 from '../assets/events/5.mp4';
import event6 from '../assets/events/6.jpg';
import event7 from '../assets/events/7.jpg';
import event8 from '../assets/events/8.mp4';

export function RecentEvents() {
  const events = [
    { media: event2, link: "https://www.instagram.com/reel/DXFeTmqEZ7E/", type: "video", delay: 0 },
    { media: event1, link: "https://www.instagram.com/reel/DXXcPPHkXWy/", type: "image", delay: 0.1 },
    { media: event3, link: "https://www.instagram.com/reel/DWPaMvlkbrv/", type: "image", delay: 0.2 },
    { media: event4, link: "https://www.instagram.com/p/DVy6ELpGmum/", type: "video", delay: 0.3 },
    { media: event5, link: "https://www.instagram.com/p/DWPbiqkgflV/?img_index=2", type: "video", delay: 0.4 },
    { media: event7, link: "https://www.instagram.com/drinkeria.oficiall/", type: "image", delay: 0.5 },
    { media: event6, link: "https://www.instagram.com/p/DRBBxj0AAIC/", type: "image", delay: 0.6 },
    { media: event8, link: "https://www.instagram.com/drinkeria.oficiall/", type: "video", delay: 0.7 },
  ];

  return (
    <section id="eventos" data-theme="light" className="py-24 bg-[#F6F4EA] overflow-hidden">
      {/* Text Container - Standard Alignment */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-8 mb-16">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-[#D4AF37] font-sans tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 block font-bold">Experiências Reais</span>
            <h2 className="font-serif italic text-4xl md:text-6xl text-[#1F2133] leading-tight">
              Acompanhe nossas <br className="hidden md:block" /> últimas experiências.
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:items-end"
          >
            <span className="text-6xl md:text-8xl font-serif text-[#1F2133] opacity-10">+200</span>
            <span className="text-[#D4AF37] font-sans tracking-widest uppercase text-[10px] md:text-xs font-bold -mt-4 md:-mt-6">Eventos Realizados</span>
          </motion.div>
        </div>
      </div>

      {/* Media Mural - Wide Layout */}
      <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8">
        {/* Proportional Masonry Mural - Perfectly Aligned Columns */}
        <div className="columns-1 sm:columns-2 md:columns-4 gap-4 sm:gap-2 md:gap-3 space-y-4 sm:space-y-2 w-full mx-auto px-2">
          {events.map((event, idx) => (
            <motion.a
              key={idx}
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="block relative overflow-hidden rounded-lg shadow-lg group cursor-pointer break-inside-avoid mb-2 md:mb-3"
            >
              <div className="w-full h-auto bg-black">
                {event.type === 'video' ? (
                  <video 
                    src={event.media} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    preload="metadata"
                    className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <img 
                    src={event.media} 
                    alt="Evento Drinkeria" 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" 
                  />
                )}
              </div>
              
              {/* Simple Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 bg-black/40 backdrop-blur-[1px]">
                {event.type === 'video' ? (
                  <Play className="text-white fill-white" size={20} />
                ) : (
                  <Instagram className="text-white" size={24} />
                )}
                <span className="text-white font-sans text-[8px] uppercase tracking-widest font-bold">Ver no Instagram</span>
              </div>

              {/* Icon Badge */}
              <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md p-1.5 rounded-full z-10">
                {event.type === 'video' ? <Play size={10} className="text-white" /> : <Instagram size={10} className="text-white" />}
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <a href="https://www.instagram.com/drinkeria.oficiall/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-[#1F2133] font-sans text-xs uppercase tracking-[0.3em] font-bold hover:text-[#D4AF37] transition-colors">
            <Instagram size={20} />
            Seguir @drinkeria.oficiall
          </a>
        </motion.div>
      </div>
    </section>
  );
}
