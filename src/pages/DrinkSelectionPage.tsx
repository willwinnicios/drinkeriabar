import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  ChevronRight, 
  Martini, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Users, 
  MessageSquare,
  PartyPopper,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { leadService, Lead } from '../lib/leads';
import { cn } from '../lib/utils';
import logoDrinkeria from '../assets/logo-drinkeria.webp';

import { drinks } from '../data/drinks';

export function DrinkSelectionPage() {
  const { leadId } = useParams<{ leadId: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [step, setStep] = useState<'auth' | 'selection' | 'details' | 'success'>('auth');
  const [isLoading, setIsLoading] = useState(true);
  const [authPhone, setAuthPhone] = useState('');
  const [authError, setAuthError] = useState(false);
  
  const [selectedDrinks, setSelectedDrinks] = useState<string[]>([]);
  const [filter, setFilter] = useState('Todos');
  const [formData, setFormData] = useState({
    eventLocation: '',
    eventDate: '',
    guests: '',
    observations: ''
  });

  const categories = ['Todos', 'Clássicos', 'Contemporâneos', 'Autorais'];
  
  const categoryGroups = {
    'Todos': 'Todos',
    'Clássicos': ['Clássico', 'Clássico Contemporâneo', 'Clássico Italiano', 'Clássico Brasileiro', 'Clássico Moderno'],
    'Contemporâneos': ['Contemporâneo', 'Contemporâneo Moderno'],
    'Autorais': ['Autoral Moderno', 'Autoral Contemporâneo']
  };

  const filteredDrinks = filter === 'Todos'
    ? drinks
    : drinks.filter(d => categoryGroups[filter as keyof typeof categoryGroups].includes(d.category));

  useEffect(() => {
    if (leadId) {
      const foundLead = leadService.getLeadById(leadId);
      if (foundLead) {
        setLead(foundLead);
        setFormData({
          eventLocation: foundLead.eventLocation || '',
          eventDate: foundLead.eventDate || '',
          guests: foundLead.guests || '',
          observations: foundLead.observations || ''
        });
        if (foundLead.selectedDrinks) {
          const validDrinks = foundLead.selectedDrinks.filter(drinkName => 
            drinks.some(d => d.name === drinkName)
          );
          setSelectedDrinks(validDrinks);
        }
      }
    }
    setIsLoading(false);
  }, [leadId]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead) return;

    const leadPhone = (lead.phone || '').replace(/\D/g, '');
    const inputPhone = authPhone.replace(/\D/g, '');

    if (leadPhone === inputPhone && inputPhone.length >= 10) {
      setStep('selection');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const toggleDrink = (drinkName: string) => {
    setSelectedDrinks(prev => 
      prev.includes(drinkName) 
        ? prev.filter(name => name !== drinkName) 
        : [...prev, drinkName]
    );
  };

  const handleSaveSelection = () => {
    if (selectedDrinks.length === 0) return;
    setStep('details');
  };

  const handleSubmitAll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadId) return;

    leadService.updateLead(leadId, {
      ...formData,
      selectedDrinks,
      status: 'contacted'
    });

    setStep('success');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1F2133] flex items-center justify-center">
        <Loader2 className="text-[#D4AF37] animate-spin" size={40} />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen bg-[#1F2133] flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="font-serif italic text-3xl text-[#F6F4EA]">Link Inválido</h1>
          <p className="text-[#F6F4EA]/60 font-sans">Este convite não foi encontrado ou expirou.</p>
          <button onClick={() => navigate('/')} className="text-[#D4AF37] underline font-bold uppercase tracking-widest text-xs">Voltar para o site</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1F2133] text-[#F6F4EA] font-sans selection:bg-[#D4AF37] selection:text-[#1F2133]">
      {/* Header */}
      <header className="bg-[#1F2133] py-12 px-4 text-center border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none" />
        <img src={logoDrinkeria} alt="Drinkeria Bar" className="h-16 mx-auto brightness-0 invert mb-6 relative z-10" />
        <h1 className="font-serif italic text-4xl text-[#F6F4EA] relative z-10">Sua Experiência Exclusiva</h1>
        <p className="text-[#D4AF37] font-sans text-[10px] uppercase tracking-[0.4em] mt-2 font-bold relative z-10">Montagem do Cardápio</p>
      </header>

      <main className="max-w-6xl mx-auto p-6 md:p-12">
        <AnimatePresence mode="wait">
          {step === 'auth' && (
            <motion.div
              key="auth"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-lg mx-auto mt-12 bg-white/5 backdrop-blur-xl p-10 rounded-sm border border-white/10 space-y-8"
            >
              <div className="text-center space-y-3">
                <h2 className="font-serif italic text-3xl">Seja Bem-vindo!</h2>
                <p className="text-sm text-[#F6F4EA]/50 font-light leading-relaxed">Olá, {lead.name.split(' ')[0]}! Para continuar com sua seleção, confirme seu número de WhatsApp abaixo.</p>
              </div>

              <form onSubmit={handleAuth} className="space-y-6">
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50 group-focus-within:text-[#D4AF37] transition-colors" size={20} />
                  <input
                    type="tel"
                    required
                    placeholder="Seu WhatsApp (DDD + Número)"
                    value={authPhone}
                    onChange={(e) => setAuthPhone(e.target.value)}
                    className={cn(
                      "w-full bg-white/5 border border-white/10 pl-12 pr-4 py-5 rounded-sm outline-none focus:border-[#D4AF37] transition-all text-sm font-light",
                      authError && "border-red-500/50 bg-red-500/5"
                    )}
                  />
                </div>
                {authError && (
                  <p className="text-red-400 text-[10px] uppercase tracking-widest font-bold text-center">Acesso negado. Verifique o número digitado.</p>
                )}
                <button
                  type="submit"
                  className="w-full bg-[#D4AF37] text-[#1F2133] py-5 rounded-sm font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_10px_20px_rgba(212,175,55,0.2)]"
                >
                  Entrar na Seleção
                  <ChevronRight size={18} />
                </button>
              </form>
            </motion.div>
          )}

          {step === 'selection' && (
            <motion.div
              key="selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12 pb-32"
            >
              <div className="text-center space-y-4">
                <h2 className="font-serif italic text-4xl">O Cardápio Perfeito</h2>
                <p className="text-sm text-[#F6F4EA]/50 font-light max-w-lg mx-auto">Escolha os drinks que farão parte do seu evento. Cada seleção é preparada com técnica e alma.</p>
                
                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={cn(
                        "px-6 py-2 text-[10px] uppercase tracking-widest font-bold transition-all border rounded-full",
                        filter === cat 
                          ? "bg-[#D4AF37] border-[#D4AF37] text-[#1F2133]" 
                          : "bg-transparent border-white/10 text-white/40 hover:border-white/30"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDrinks.map((drink, idx) => (
                  <motion.div
                    key={drink.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => toggleDrink(drink.name)}
                    className={cn(
                      "group relative aspect-[4/5] rounded-sm overflow-hidden border transition-all duration-500 cursor-pointer",
                      selectedDrinks.includes(drink.name)
                        ? "border-[#D4AF37] ring-1 ring-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                        : "border-white/5 hover:border-white/20"
                    )}
                  >
                    <img
                      src={drink.image}
                      alt={drink.name}
                      className={cn(
                        "absolute inset-0 w-full h-full object-cover transition-transform duration-700",
                        selectedDrinks.includes(drink.name) ? "scale-105 opacity-40" : "opacity-60 group-hover:scale-105 group-hover:opacity-40"
                      )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F2133] via-[#1F2133]/40 to-transparent" />
                    
                    {/* Checkmark */}
                    <div className={cn(
                      "absolute top-4 right-4 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-500",
                      selectedDrinks.includes(drink.name)
                        ? "bg-[#D4AF37] border-[#D4AF37] text-[#1F2133]"
                        : "bg-white/5 border-white/20 text-transparent"
                    )}>
                      <CheckCircle2 size={14} />
                    </div>

                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <span className="text-[#D4AF37] font-sans text-[8px] uppercase tracking-[0.3em] font-bold mb-2 block">{drink.category}</span>
                      <h4 className="font-serif italic text-2xl text-[#F6F4EA] mb-4">{drink.name}</h4>
                      
                      <div className="space-y-2 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <p className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest">{drink.profile}</p>
                        <p className="text-[10px] text-[#F6F4EA]/60 leading-relaxed line-clamp-2 italic border-l border-[#D4AF37]/30 pl-3">
                          {drink.experience}
                        </p>
                        <div className="space-y-1">
                          <p className="text-[9px] uppercase tracking-tighter text-[#F6F4EA]/40">
                            <strong className="text-[#F6F4EA]/60">Base:</strong> {drink.base}
                          </p>
                          <p className="text-[9px] uppercase tracking-tighter text-[#F6F4EA]/40">
                            <strong className="text-[#F6F4EA]/60">Marcas:</strong> {drink.brands}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Floating Counter & CTA */}
              <motion.div 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl z-50"
              >
                <div className="bg-[#1F2133]/90 backdrop-blur-2xl border border-[#D4AF37]/30 p-2 rounded-full flex items-center gap-2 shadow-2xl">
                  <div className="flex-1 px-8">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#D4AF37]">
                      {selectedDrinks.length} {selectedDrinks.length === 1 ? 'drink selecionado' : 'drinks selecionados'}
                    </p>
                  </div>
                  <button
                    onClick={handleSaveSelection}
                    disabled={selectedDrinks.length === 0}
                    className="bg-[#D4AF37] text-[#1F2133] px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] hover:brightness-110 transition-all disabled:opacity-20 disabled:grayscale"
                  >
                    Próximo Passo
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {step === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl mx-auto bg-white/5 backdrop-blur-xl p-10 rounded-sm border border-white/10 space-y-10"
            >
              <div className="flex items-center gap-6">
                <button onClick={() => setStep('selection')} className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h2 className="font-serif italic text-3xl">Últimos Detalhes</h2>
                  <p className="text-[10px] text-[#D4AF37] uppercase tracking-[0.3em] font-bold mt-1">Confirme seu Evento</p>
                </div>
              </div>

              <form onSubmit={handleSubmitAll} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-[#F6F4EA]/40 ml-1">Local ou Cidade</label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50 group-focus-within:text-[#D4AF37]" size={18} />
                      <input
                        type="text"
                        required
                        value={formData.eventLocation}
                        onChange={(e) => setFormData({ ...formData, eventLocation: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-4 rounded-sm outline-none focus:border-[#D4AF37] text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-[#F6F4EA]/40 ml-1">Data Prevista</label>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50 group-focus-within:text-[#D4AF37]" size={18} />
                      <input
                        type="text"
                        required
                        placeholder="DD/MM/AAAA"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-4 rounded-sm outline-none focus:border-[#D4AF37] text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-[#F6F4EA]/40 ml-1">Nº Estimado de Convidados</label>
                    <div className="relative group">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50 group-focus-within:text-[#D4AF37]" size={18} />
                      <input
                        type="number"
                        required
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-4 rounded-sm outline-none focus:border-[#D4AF37] text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-[#F6F4EA]/40 ml-1">Mensagem ou Observação</label>
                  <div className="relative group">
                    <MessageSquare className="absolute left-4 top-4 text-[#D4AF37]/50 group-focus-within:text-[#D4AF37]" size={18} />
                    <textarea
                      value={formData.observations}
                      onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                      placeholder="Deseja algum drink fora da lista? Alguma restrição?"
                      className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-4 rounded-sm outline-none focus:border-[#D4AF37] h-32 resize-none text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D4AF37] text-[#1F2133] py-5 rounded-sm font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:brightness-110 shadow-xl"
                >
                  Finalizar e Enviar para Kenia
                  <PartyPopper size={18} />
                </button>
              </form>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto bg-white/5 backdrop-blur-xl p-16 rounded-sm border border-[#D4AF37]/30 text-center space-y-8"
            >
              <div className="w-24 h-24 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#D4AF37]/20">
                <CheckCircle2 size={48} strokeWidth={1.5} />
              </div>
              <h2 className="font-serif italic text-4xl">Seleção Concluída!</h2>
              <p className="text-sm text-[#F6F4EA]/60 font-light leading-relaxed max-w-sm mx-auto">
                Excelente escolha! Seus drinks preferidos foram salvos. A Kenia entrará em contato em breve para finalizar os detalhes do seu orçamento.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => navigate('/')}
                  className="inline-block border border-white/10 text-white/40 px-10 py-4 rounded-full font-bold text-[9px] uppercase tracking-[0.3em] hover:bg-white/5 transition-all"
                >
                  Retornar ao Site
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
