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

// Mock drinks list - in a real app this could come from a database/config
const DRINKS_OPTIONS = [
  { id: 'gin-tonic', name: 'Gin Tônica Premium', description: 'Gin importado, tônica especiarias e frutas.', category: 'Clássicos' },
  { id: 'caipirinha', name: 'Caipirinha Gourmet', description: 'Frutas da estação com cachaça premium ou vodka.', category: 'Nacionais' },
  { id: 'moscow-mule', name: 'Moscow Mule', description: 'Vodka, limão e espuma artesanal de gengibre.', category: 'Populares' },
  { id: 'negroni', name: 'Negroni Especial', description: 'Gin, Campari e Vermute Rosso.', category: 'Clássicos' },
  { id: 'aperol', name: 'Aperol Spritz', description: 'Aperol, prosecco e água com gás.', category: 'Refrescantes' },
  { id: 'mojito', name: 'Mojito Cubano', description: 'Rum, hortelã, limão e soda.', category: 'Refrescantes' },
  { id: 'margarita', name: 'Margarita', description: 'Tequila, licor de laranja e limão.', category: 'Clássicos' },
  { id: 'whisky-sour', name: 'Whisky Sour', description: 'Bourbon, limão e xarope de açúcar.', category: 'Clássicos' },
];

export function DrinkSelectionPage() {
  const { leadId } = useParams<{ leadId: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [step, setStep] = useState<'auth' | 'selection' | 'details' | 'success'>('auth');
  const [isLoading, setIsLoading] = useState(true);
  const [authName, setAuthName] = useState('');
  const [authError, setAuthError] = useState(false);
  
  const [selectedDrinks, setSelectedDrinks] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    eventLocation: '',
    eventDate: '',
    guests: '',
    observations: ''
  });

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
          setSelectedDrinks(foundLead.selectedDrinks);
        }
      }
    }
    setIsLoading(false);
  }, [leadId]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead) return;

    // Check if name matches (case insensitive and partial match for simplicity)
    const normalizedAuth = authName.toLowerCase().trim();
    const normalizedLead = lead.name.toLowerCase().trim();

    if (normalizedLead.includes(normalizedAuth) && normalizedAuth.length > 3) {
      setStep('selection');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const toggleDrink = (drinkId: string) => {
    setSelectedDrinks(prev => 
      prev.includes(drinkId) 
        ? prev.filter(id => id !== drinkId) 
        : [...prev, drinkId]
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
      status: 'contacted' // Move to contacted when they fill the selection
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
    <div className="min-h-screen bg-[#F6F4EA] text-[#1F2133] font-sans">
      {/* Header */}
      <header className="bg-[#1F2133] py-8 px-4 text-center">
        <img src={logoDrinkeria} alt="Drinkeria Bar" className="h-12 mx-auto brightness-0 invert mb-4" />
        <h1 className="font-serif italic text-2xl text-[#F6F4EA]">Sua Festa, Seus Drinks</h1>
      </header>

      <main className="max-w-3xl mx-auto p-6 md:p-12">
        <AnimatePresence mode="wait">
          {step === 'auth' && (
            <motion.div
              key="auth"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-8 rounded-xl shadow-xl border border-[#1F2133]/10 space-y-6"
            >
              <div className="text-center space-y-2">
                <span className="text-[#D4AF37] font-bold text-[10px] uppercase tracking-[0.3em]">Confirmação</span>
                <h2 className="font-serif italic text-3xl">Seja Bem-vindo!</h2>
                <p className="text-sm text-[#1F2133]/60 italic">Para garantir sua privacidade, informe seu nome completo conforme cadastrado.</p>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={20} />
                  <input
                    type="text"
                    required
                    placeholder="Seu Nome Completo"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    className={cn(
                      "w-full bg-[#F6F4EA]/30 border border-[#1F2133]/10 pl-12 pr-4 py-4 rounded-lg outline-none focus:border-[#D4AF37] transition-all",
                      authError && "border-red-500 bg-red-50"
                    )}
                  />
                </div>
                {authError && (
                  <p className="text-red-500 text-xs font-bold text-center">Nome não coincide com o registro. Tente novamente.</p>
                )}
                <button
                  type="submit"
                  className="w-full bg-[#1F2133] text-[#F6F4EA] py-4 rounded-lg font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-[#1F2133] transition-all"
                >
                  Acessar Seleção de Drinks
                  <ChevronRight size={18} />
                </button>
              </form>
            </motion.div>
          )}

          {step === 'selection' && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="font-serif italic text-3xl mb-2">Escolha seus favoritos</h2>
                <p className="text-sm text-[#1F2133]/60">Selecione os drinks que você gostaria de ter no seu evento.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DRINKS_OPTIONS.map((drink) => (
                  <button
                    key={drink.id}
                    onClick={() => toggleDrink(drink.id)}
                    className={cn(
                      "p-6 rounded-xl border text-left transition-all relative group",
                      selectedDrinks.includes(drink.id)
                        ? "bg-[#1F2133] border-[#1F2133] text-[#F6F4EA] shadow-lg scale-[1.02]"
                        : "bg-white border-[#1F2133]/10 hover:border-[#D4AF37]"
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <Martini className={cn("w-6 h-6", selectedDrinks.includes(drink.id) ? "text-[#D4AF37]" : "text-[#1F2133]/20")} />
                      {selectedDrinks.includes(drink.id) && <CheckCircle2 className="text-[#D4AF37]" size={20} />}
                    </div>
                    <h4 className="font-bold text-lg mb-1">{drink.name}</h4>
                    <p className={cn("text-xs leading-relaxed", selectedDrinks.includes(drink.id) ? "text-[#F6F4EA]/70" : "text-[#1F2133]/50")}>
                      {drink.description}
                    </p>
                    <span className={cn("inline-block mt-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider", 
                      selectedDrinks.includes(drink.id) ? "bg-white/10 text-[#D4AF37]" : "bg-[#F6F4EA] text-[#1F2133]/40")}>
                      {drink.category}
                    </span>
                  </button>
                ))}
              </div>

              <div className="sticky bottom-6 pt-4">
                <button
                  onClick={handleSaveSelection}
                  disabled={selectedDrinks.length === 0}
                  className="w-full bg-[#D4AF37] text-[#1F2133] py-4 rounded-lg font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                >
                  Continuar ({selectedDrinks.length} selecionados)
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-8 rounded-xl shadow-xl border border-[#1F2133]/10 space-y-8"
            >
              <div className="flex items-center gap-4">
                <button onClick={() => setStep('selection')} className="p-2 hover:bg-[#F6F4EA] rounded-full transition-colors">
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h2 className="font-serif italic text-2xl">Confirmar Detalhes</h2>
                  <p className="text-xs text-[#1F2133]/50 uppercase tracking-widest font-bold">Quase lá, {lead.name.split(' ')[0]}!</p>
                </div>
              </div>

              <form onSubmit={handleSubmitAll} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1F2133]/40 ml-1">Local/Cidade</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={18} />
                      <input
                        type="text"
                        required
                        value={formData.eventLocation}
                        onChange={(e) => setFormData({ ...formData, eventLocation: e.target.value })}
                        className="w-full bg-[#F6F4EA]/30 border border-[#1F2133]/10 pl-12 pr-4 py-3 rounded-lg outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1F2133]/40 ml-1">Data do Evento</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={18} />
                      <input
                        type="text"
                        required
                        placeholder="DD/MM/AAAA"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full bg-[#F6F4EA]/30 border border-[#1F2133]/10 pl-12 pr-4 py-3 rounded-lg outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1F2133]/40 ml-1">Nº Convidados</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={18} />
                      <input
                        type="number"
                        required
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full bg-[#F6F4EA]/30 border border-[#1F2133]/10 pl-12 pr-4 py-3 rounded-lg outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#1F2133]/40 ml-1">Alguma observação?</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 text-[#D4AF37]" size={18} />
                    <textarea
                      value={formData.observations}
                      onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                      placeholder="Alguma restrição ou pedido especial?"
                      className="w-full bg-[#F6F4EA]/30 border border-[#1F2133]/10 pl-12 pr-4 py-3 rounded-lg outline-none focus:border-[#D4AF37] h-32 resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1F2133] text-[#F6F4EA] py-4 rounded-lg font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-[#1F2133] transition-all shadow-xl"
                >
                  Finalizar Escolha e Confirmar
                  <PartyPopper size={18} />
                </button>
              </form>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-12 rounded-xl shadow-xl border border-[#1F2133]/10 text-center space-y-6"
            >
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="font-serif italic text-3xl">Tudo Confirmado!</h2>
              <p className="text-sm text-[#1F2133]/60 max-w-md mx-auto">
                Obrigado por selecionar seus drinks e confirmar os dados. A Kenia já recebeu sua seleção e entrará em contato em breve para os próximos passos.
              </p>
              <button
                onClick={() => navigate('/')}
                className="inline-block border border-[#1F2133]/10 text-[#1F2133]/60 px-8 py-3 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-[#F6F4EA] transition-all"
              >
                Voltar ao Início
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
