import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '../lib/utils';
import logoDrinkeria from '../assets/logo-drinkeria.webp';
import negroniImg from '../assets/drinks/negroni.webp';
import oldFashionedImg from '../assets/drinks/old-fashioned.webp';
import margaritaImg from '../assets/drinks/margarita.webp';
import dryMartiniImg from '../assets/drinks/dry-martini.webp';
import moscowMuleImg from '../assets/drinks/moscow-mule.webp';
import mojitoImg from '../assets/drinks/mojito.webp';
import pinaColadaImg from '../assets/drinks/pina-colada.webp';
import blueVelvetImg from '../assets/drinks/blue-velvet.webp';
import scarletImg from '../assets/drinks/scarlet.webp';
import penicillinImg from '../assets/drinks/penicillin.webp';
import garibaldiImg from '../assets/drinks/garibaldi.webp';
import camparinhaImg from '../assets/drinks/camparinha.webp';
import tropicalGingerImg from '../assets/drinks/tropical-ginger.webp';
import caipiBrutImg from '../assets/drinks/caipi-brut.webp';
import jackLemonadeImg from '../assets/drinks/jack-lemonade.webp';
import appleLemonadeImg from '../assets/drinks/apple-lemonade.webp';
import sexOnTheBeachImg from '../assets/drinks/sex-on-the-beach.webp';

const drinks = [
  {
    name: "Penicillin",
    category: "Clássico Contemporâneo",
    image: penicillinImg,
    profile: "Cítrico | Adocicado",
    base: "Whisky Bourbon, Suco de limão, xarope mel e gengibre.",
    experience: "Finalizado com gengibre cristalizado para um toque exótico.",
    brands: "Jack Daniel's"
  },
  {
    name: "Enzoni",
    category: "Clássico Contemporâneo",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
    profile: "Frutado | Aromático",
    base: "Gin, Campari, Suco de limão, xarope simples, uvas verdes.",
    experience: "Equilíbrio perfeito entre o amargor do Campari e o frescor das uvas.",
    brands: "Tanqueray, Campari"
  },
  {
    name: "Garibaldi",
    category: "Clássico Italiano",
    image: garibaldiImg,
    profile: "Amargo",
    base: "Bitter Campari, Suco de laranja, lâmina de laranja.",
    experience: "A simplicidade italiana em um drink vibrante e refrescante.",
    brands: "Campari"
  },
  {
    name: "Camparinha",
    category: "Clássico Brasileiro",
    image: camparinhaImg,
    profile: "Cítrico",
    base: "Bitter Campari, Limão taiti, xarope simples.",
    experience: "Uma releitura brasileira para os amantes de sabores intensos.",
    brands: "Campari"
  },
  {
    name: "Negroni",
    category: "Clássico",
    image: negroniImg,
    profile: "Amargo",
    base: "Bitter Campari, Gin, Vermute doce, Twist de laranja.",
    experience: "Servido com gelo translúcido para uma experiência impecável.",
    brands: "Tanqueray, Campari"
  },
  {
    name: "Glória",
    category: "Contemporâneo",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80",
    profile: "Amargo",
    base: "Gin, Vermute branco, Bitter Campari, Licor de laranja.",
    experience: "Perfume cítrico de laranja para uma finalização sofisticada.",
    brands: "Tanqueray, Campari"
  },
  {
    name: "Campari Spritz",
    category: "Clássico Moderno",
    image: "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=800&q=80",
    profile: "Amargo",
    base: "Campari, Espumante, Água gaseificada, lâmina de laranja.",
    experience: "O frescor das bolhas aliado ao amargor clássico.",
    brands: "Campari, Casa Perini"
  },
  {
    name: "Tropical Ginger",
    category: "Contemporâneo",
    image: tropicalGingerImg,
    profile: "Cítrico | Adocicado",
    base: "Rum Oro, Suco de abacaxi e limão, xarope simples, espuma de gengibre.",
    experience: "Toque picante da espuma de gengibre artesanal.",
    brands: "Bacardi"
  },
  {
    name: "Old Fashioned",
    category: "Clássico",
    image: oldFashionedImg,
    profile: "Seco",
    base: "Whisky Bourbon, Angostura, xarope simples, twist de laranja.",
    experience: "Um clássico atemporal para paladares exigentes.",
    brands: "Jack Daniel's"
  },
  {
    name: "Margarita",
    category: "Clássico",
    image: margaritaImg,
    profile: "Seco | Cítrico",
    base: "Tequila, Cointreau, Suco de limão, sal.",
    experience: "Borda de sal e equilíbrio cítrico refrescante.",
    brands: "Jose Cuervo"
  },
  {
    name: "Dry Martini",
    category: "Clássico",
    image: dryMartiniImg,
    profile: "Seco",
    base: "Gin, Vermute dry, Twist limão siciliano, azeitona verde.",
    experience: "A elegância em sua forma mais pura.",
    brands: "Tanqueray"
  },
  {
    name: "Vodka Martini",
    category: "Clássico",
    image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800&q=80",
    profile: "Seco",
    base: "Vodka, Vermute seco, Twist limão siciliano, azeitona verde.",
    experience: "Direto, gelado e extremamente sofisticado.",
    brands: "Absolut"
  },
  {
    name: "Caipi Brut",
    category: "Contemporâneo",
    image: caipiBrutImg,
    profile: "Ácido | Aromático",
    base: "Espumante brut, Xarope simples, morango, uva verde ou limão.",
    experience: "A elegância do espumante com a descontração da caipira.",
    brands: "Casa Perini"
  },
  {
    name: "Paloma",
    category: "Clássico",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&q=80",
    profile: "Refrescante",
    base: "Tequila, Suco de limão, suco de tangerina, sal, água gaseificada.",
    experience: "Explosão cítrica com o caráter da tequila.",
    brands: "Jose Cuervo"
  },
  {
    name: "Jack Lemonade",
    category: "Contemporâneo",
    image: jackLemonadeImg,
    profile: "Cítrico | Adocicado",
    base: "Jack Daniel's Tradicional, Limão siciliano, xarope simples.",
    experience: "O equilíbrio perfeito entre o carvalho e a acidez do limão.",
    brands: "Jack Daniel's"
  },
  {
    name: "Apple Lemonade",
    category: "Contemporâneo",
    image: appleLemonadeImg,
    profile: "Cítrico | Adocicado",
    base: "Jack Daniel's Apple, Limão siciliano, xarope simples.",
    experience: "Notas intensas de maçã verde com final cítrico.",
    brands: "Jack Daniel's Apple"
  },
  {
    name: "Whisky's Passion",
    category: "Contemporâneo",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
    profile: "Frutado | Tropical",
    base: "Whisky Bourbon, Suco de maracujá e limão, canela, xarope simples.",
    experience: "O calor da canela com o frescor do maracujá.",
    brands: "Jack Daniel's"
  },
  {
    name: "Whisky Sour Clean",
    category: "Clássico",
    image: "https://images.unsplash.com/photo-1530991808291-7e157454758c?w=800&q=80",
    profile: "Cítrico",
    base: "Whisky Bourbon, Suco de limão, xarope simples, espuma cítrica.",
    experience: "Textura aveludada com final cítrico limpo.",
    brands: "Jack Daniel's"
  },
  {
    name: "Morena Flor",
    category: "Clássico Brasileiro",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",
    profile: "Refrescante | Aveludado",
    base: "Cachaça envelhecida, Canela, suco de caju e limão, xarope simples.",
    experience: "O sabor do Brasil em uma releitura sofisticada.",
    brands: "Cachaça Premium"
  },
  {
    name: "Juliet",
    category: "Contemporâneo",
    image: "https://images.unsplash.com/photo-1609951651556-5334e2706168?w=800&q=80",
    profile: "Refrescante | Cítrico",
    base: "Cachaça, Suco de limão, xarope de maracujá, manjericão.",
    experience: "Aromático e surpreendente em cada gole.",
    brands: "Cachaça Premium"
  },
  {
    name: "Jorge Amado",
    category: "Clássico Brasileiro",
    image: "https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=800&q=80",
    profile: "Cítrico",
    base: "Cachaça, Suco de limão, xarope de maracujá, manjericão.",
    experience: "Homenagem aos sabores tropicais brasileiros.",
    brands: "Cachaça Premium"
  },
  {
    name: "Piña Colada",
    category: "Clássico",
    image: pinaColadaImg,
    profile: "Doce | Cremoso",
    base: "Rum branco, Suco de abacaxi, leite de coco, leite condensado.",
    experience: "A clássica doçura caribenha.",
    brands: "Bacardi"
  },
  {
    name: "Bella Rosé",
    category: "Autoral Moderno",
    image: "https://images.unsplash.com/photo-1609951651556-5334e2706168?w=800&q=80",
    profile: "Doce | Aveludado",
    base: "Rum branco, aperitivo Ramazzotti, Suco de limão, xarope simples, morango, hortelã.",
    experience: "Elegância rosada com frescor de hortelã.",
    brands: "Bacardi, Ramazzotti"
  },
  {
    name: "Mojito",
    category: "Clássico",
    image: mojitoImg,
    profile: "Refrescante",
    base: "Rum branco, Suco de limão, xarope simples, hortelã, água gaseificada.",
    experience: "O frescor máximo em um copo longo.",
    brands: "Bacardi"
  },
  {
    name: "Caipirinha",
    category: "Clássico Brasileiro",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80",
    profile: "Refrescante | Cítrico",
    base: "Vodka ou cachaça, Xarope simples, fruta da estação.",
    experience: "A alma brasileira servida com perfeição.",
    brands: "Absolut ou Cachaça Premium"
  },
  {
    name: "Moscow Mule",
    category: "Clássico",
    image: moscowMuleImg,
    profile: "Refrescante | Cítrico",
    base: "Vodka, Xarope de gengibre, suco de limão, espuma cítrica.",
    experience: "Servido na tradicional caneca de cobre.",
    brands: "Smirnoff"
  },
  {
    name: "Sex On The Beach",
    category: "Clássico Moderno",
    image: sexOnTheBeachImg,
    profile: "Frutado | Doce",
    base: "Vodka, licor de pêssego, Suco de laranja, grenadine.",
    experience: "Cores vibrantes e sabor tropical.",
    brands: "Smirnoff"
  },
  {
    name: "Raspberry Mule",
    category: "Contemporâneo Moderno",
    image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=800&q=80",
    profile: "Refrescante | Cítrico",
    base: "Vodka, Suco de limão, xarope de frutas vermelhas, espuma de gengibre.",
    experience: "A versão sofisticada e frutada do mule.",
    brands: "Smirnoff"
  },
  {
    name: "Blue Velvet",
    category: "Autoral Contemporâneo",
    image: blueVelvetImg,
    profile: "Refrescante | Aveludado",
    base: "Vodka, Mirtilo, suco de limão, curaçau, manjericão, club soda.",
    experience: "Visual hipnotizante com sabor equilibrado.",
    brands: "Smirnoff"
  },
  {
    name: "Scarlet",
    category: "Autoral Moderno",
    image: scarletImg,
    profile: "Refrescante | Encorpado",
    base: "Vodka, Morango, suco de limão, grenadine, club soda.",
    experience: "Intenso, doce e refrescante.",
    brands: "Absolut"
  }
];

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
      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
      className={cn(
        "group relative w-full overflow-hidden rounded-sm bg-[#1a1c2c] transition-all duration-700",
        isLarge ? "md:col-span-2 aspect-[16/10]" : "aspect-[4/5]"
      )}
    >
      <img
        src={drink.image}
        alt={drink.name}
        loading="lazy"
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-transform duration-1000 opacity-60",
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
          <div className="space-y-3 font-sans text-[11px] md:text-[13px] text-[#F6F4EA]/70 leading-relaxed max-w-lg pointer-events-auto">
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
        className="md:hidden absolute bottom-6 right-6 w-8 h-8 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#1F2133]/50 backdrop-blur-sm text-[#D4AF37] transition-all z-10"
        aria-label="Ver mais informações"
      >
        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
      </button>
    </motion.div>
  );
}

export function DrinksMenu() {
  const [filter, setFilter] = useState('Todos');

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
    <section id="drinks" data-theme="dark" className="py-24 md:py-40 bg-[#1F2133] overflow-hidden relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-8">
        <div className="flex flex-col items-center mb-24 md:mb-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-8 opacity-70">
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
            <h2 className="font-serif italic text-5xl md:text-8xl mb-12 text-[#F6F4EA]">A Carta de Drinks</h2>

            <nav className="flex justify-start md:justify-center items-center gap-6 md:gap-12 overflow-x-auto pb-4 md:pb-0 scrollbar-hide px-4 md:px-0">
              {Object.keys(categoryGroups).map((group) => (
                <button
                  key={group}
                  onClick={() => setFilter(group)}
                  className={cn(
                    "font-sans text-[10px] md:text-[11px] uppercase tracking-[0.3em] transition-all duration-700 relative py-2",
                    filter === group
                      ? "text-[#D4AF37]"
                      : "text-[#F6F4EA]/20 hover:text-[#F6F4EA]/50"
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

        <div className="mt-32 flex flex-col items-center">
          <div className="w-px h-20 bg-gradient-to-b from-[#D4AF37] to-transparent mb-12" />
          <p className="font-serif italic text-[#F6F4EA]/40 text-xl md:text-3xl max-w-3xl mx-auto text-center leading-relaxed">
            "Equilíbrio, técnica e alma. Redefinimos o conceito de brinde para tornar cada gole uma memória eterna."
          </p>
        </div>
      </div>
    </section>
  );
}
