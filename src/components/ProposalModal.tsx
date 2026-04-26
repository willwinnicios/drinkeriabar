import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Calendar, Users, PartyPopper, MessageSquare, ChevronRight, CheckCircle2, Mail, MapPin, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { leadService } from '../lib/leads';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProposalModal({ isOpen, onClose }: ProposalModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    eventDate: '',
    eventLocation: '',
    guests: '',
    observations: ''
  });

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLocationSearch = (query: string) => {
    setFormData({ ...formData, eventLocation: query });
    setShowSuggestions(true);
    
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&countrycodes=br&limit=5`, {
          headers: { 'User-Agent': 'DrinkeriaBar/1.0' }
        });
        const data = await res.json();
        setSuggestions(data);
      } catch (error) {
        console.error('Erro ao buscar local:', error);
      } finally {
        setIsSearching(false);
      }
    }, 500);
  };

  const maskPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const maskDate = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\/\d{4})\d+?$/, '$1');
  };

  const eventTypes = [
    'Casamento',
    'Aniversário',
    'XV Anos',
    'Corporativo',
    'Formatura',
    'Outros'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to local admin
    leadService.saveLead(formData);

    // Prepare WhatsApp Message - Premium Formatting
    const message = `*NOVA SOLICITAÇÃO DE PROPOSTA*\n` +
      `---------------------------------------\n` +
      `*CLIENTE:* ${formData.name.toUpperCase()}\n` +
      `*E-MAIL:* ${formData.email}\n` +
      `*WHATSAPP:* ${formData.phone}\n\n` +
      `*DETALHES DO EVENTO*\n` +
      `---------------------------------------\n` +
      `*TIPO:* ${formData.eventType}\n` +
      `*DATA:* ${formData.eventDate}\n` +
      `*LOCAL/CIDADE:* ${formData.eventLocation}\n` +
      `*CONVIDADOS:* ${formData.guests} pessoas\n\n` +
      `*OBSERVAÇÕES:*\n` +
      `_${formData.observations || 'Nenhuma informada.'}_\n` +
      `---------------------------------------\n` +
      `_Solicitado via site Drinkeria Bar_`;

    const whatsappLink = `https://wa.me/5546999158888?text=${encodeURIComponent(message)}`;
    
    setStep(3); // Success step
    
    setTimeout(() => {
      window.open(whatsappLink, '_blank');
      onClose();
      // Reset after close
      setTimeout(() => {
        setStep(1);
        setFormData({ name: '', phone: '', email: '', eventType: '', eventDate: '', eventLocation: '', guests: '', observations: '' });
      }, 500);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-start md:items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1F2133]/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-xl bg-[#F6F4EA] rounded-sm shadow-2xl overflow-hidden my-auto"
          >
            {/* Header */}
            <div className="bg-[#1F2133] p-6 text-center relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-[#F6F4EA]/50 hover:text-[#F6F4EA] transition-colors"
              >
                <X size={24} />
              </button>
              <span className="text-[#D4AF37] font-sans text-[10px] uppercase tracking-[0.4em] mb-2 block font-bold">Solicitar Proposta</span>
              <h2 className="font-serif italic text-3xl text-[#F6F4EA]">Experiência Exclusiva</h2>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-[#1F2133]/5 w-full">
              <motion.div 
                className="h-full bg-[#D4AF37]"
                initial={{ width: '0%' }}
                animate={{ width: `${(step / 3) * 100}%` }}
              />
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <p className="text-[#1F2133]/60 font-sans text-sm mb-8 text-center italic">
                      Primeiro, gostaríamos de saber quem você é.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={18} />
                        <input
                          required
                          type="text"
                          placeholder="Seu Nome Completo"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white border border-[#1F2133]/10 px-12 py-4 rounded-sm text-[#1F2133] font-sans text-sm outline-none focus:border-[#D4AF37] transition-colors"
                        />
                      </div>
                      
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={18} />
                        <input
                          required
                          type="tel"
                          placeholder="Seu WhatsApp (46) 99915-8888"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: maskPhone(e.target.value) })}
                          className="w-full bg-white border border-[#1F2133]/10 px-12 py-4 rounded-sm text-[#1F2133] font-sans text-sm outline-none focus:border-[#D4AF37] transition-colors"
                        />
                      </div>

                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={18} />
                        <input
                          required
                          type="email"
                          placeholder="Seu melhor e-mail"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white border border-[#1F2133]/10 px-12 py-4 rounded-sm text-[#1F2133] font-sans text-sm outline-none focus:border-[#D4AF37] transition-colors"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => formData.name && formData.phone && formData.email && setStep(2)}
                      className="w-full bg-[#1F2133] text-[#F6F4EA] py-4 rounded-sm font-sans text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-[#1F2133] transition-all disabled:opacity-50"
                      disabled={!formData.name || !formData.phone || !formData.email}
                    >
                      Próximo Passo
                      <ChevronRight size={16} />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#1F2133]/40 font-bold mb-2 block">Tipo de Evento</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {eventTypes.map(type => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setFormData({ ...formData, eventType: type })}
                              className={cn(
                                "py-3 rounded-sm text-[10px] uppercase tracking-wider font-bold transition-all border",
                                formData.eventType === type 
                                  ? "bg-[#D4AF37] border-[#D4AF37] text-[#1F2133]" 
                                  : "bg-white border-[#1F2133]/10 text-[#1F2133]/60 hover:border-[#D4AF37]"
                              )}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="relative mt-2 md:mt-4">
                        <label className="text-[10px] uppercase tracking-widest text-[#1F2133]/40 font-bold mb-2 block">Data Prevista</label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={16} />
                          <input
                            type="text"
                            placeholder="DD/MM/AAAA"
                            value={formData.eventDate}
                            onChange={(e) => setFormData({ ...formData, eventDate: maskDate(e.target.value) })}
                            className="w-full bg-white border border-[#1F2133]/10 px-12 py-3 rounded-sm text-[#1F2133] font-sans text-sm outline-none focus:border-[#D4AF37] transition-colors"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2 relative mt-2 md:mt-4">
                        <label className="text-[10px] uppercase tracking-widest text-[#1F2133]/40 font-bold mb-2 block">Local ou Cidade do Evento</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={16} />
                          <input
                            type="text"
                            placeholder="Ex: Pato Branco - PR ou Nome do Local"
                            value={formData.eventLocation}
                            onChange={(e) => handleLocationSearch(e.target.value)}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            className="w-full bg-white border border-[#1F2133]/10 px-12 py-3 rounded-sm text-[#1F2133] font-sans text-sm outline-none focus:border-[#D4AF37] transition-colors"
                          />
                          {isSearching && (
                            <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1F2133]/30 animate-spin" size={16} />
                          )}
                        </div>

                        {/* Autocomplete Dropdown */}
                        <AnimatePresence>
                          {showSuggestions && suggestions.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="absolute z-50 w-full mt-1 bg-white border border-[#1F2133]/10 rounded-sm shadow-xl max-h-48 overflow-y-auto divide-y divide-[#1F2133]/5"
                            >
                              {suggestions.map((place) => (
                                <div
                                  key={place.place_id}
                                  onClick={() => {
                                    setFormData({ ...formData, eventLocation: place.display_name.split(',').slice(0, 3).join(', ') });
                                    setShowSuggestions(false);
                                  }}
                                  className="p-3 hover:bg-[#F6F4EA] cursor-pointer transition-colors"
                                >
                                  <p className="text-sm font-bold text-[#1F2133]">{place.name}</p>
                                  <p className="text-[10px] text-[#1F2133]/60 truncate">{place.display_name}</p>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="relative mt-2 md:mt-4">
                        <label className="text-[10px] uppercase tracking-widest text-[#1F2133]/40 font-bold mb-2 block">Nº de Convidados</label>
                        <div className="relative">
                          <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={16} />
                          <input
                            type="number"
                            placeholder="Ex: 150"
                            value={formData.guests}
                            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                            className="w-full bg-white border border-[#1F2133]/10 px-12 py-3 rounded-sm text-[#1F2133] font-sans text-sm outline-none focus:border-[#D4AF37] transition-colors"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2 mt-2 md:mt-4">
                        <label className="text-[10px] uppercase tracking-widest text-[#1F2133]/40 font-bold mb-2 block">Observações (Opcional)</label>
                        <div className="relative">
                          <MessageSquare className="absolute left-4 top-4 text-[#D4AF37]" size={16} />
                          <textarea
                            placeholder="Diga-nos o que você imagina para o seu bar..."
                            value={formData.observations}
                            onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                            className="w-full bg-white border border-[#1F2133]/10 px-12 py-3 rounded-sm text-[#1F2133] font-sans text-sm outline-none focus:border-[#D4AF37] transition-colors h-24 resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 border border-[#1F2133]/10 text-[#1F2133]/60 py-4 rounded-sm font-sans text-xs font-bold uppercase tracking-widest hover:bg-white transition-all"
                      >
                        Voltar
                      </button>
                      <button
                        type="submit"
                        disabled={!formData.eventType || !formData.guests}
                        className="flex-[2] bg-[#1F2133] text-[#F6F4EA] py-4 rounded-sm font-sans text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-[#1F2133] transition-all disabled:opacity-50"
                      >
                        Gerar Proposta
                        <PartyPopper size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-6"
                  >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="font-serif text-2xl text-[#1F2133]">Tudo pronto!</h3>
                    <p className="text-[#1F2133]/60 font-sans text-sm max-w-xs mx-auto">
                      Sua solicitação foi salva e agora estamos te levando para o WhatsApp da Kenia para finalizar os detalhes.
                    </p>
                    <div className="pt-4">
                      <motion.div 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="text-[10px] uppercase tracking-widest font-bold text-[#D4AF37]"
                      >
                        Redirecionando...
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
