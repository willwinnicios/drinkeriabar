import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  Clock, 
  Phone, 
  Trash2, 
  CheckCircle, 
  ArrowLeft,
  LayoutDashboard,
  Search,
  Mail,
  Settings,
  Bell,
  BarChart3,
  LogOut,
  ChevronRight,
  TrendingUp,
  DollarSign,
  MessageSquare
} from 'lucide-react';
import { leadService, Lead } from '../lib/leads';
import { cn } from '../lib/utils';
import logoDrinkeria from '../assets/logo-drinkeria.webp';

interface AdminDashboardProps {
  onBack: () => void;
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<Lead['status'] | 'all'>('all');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'settings'>('overview');

  useEffect(() => {
    setLeads(leadService.getLeads());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta solicitação?')) {
      leadService.deleteLead(id);
      setLeads(leadService.getLeads());
    }
  };

  const handleStatusChange = (id: string, status: Lead['status']) => {
    leadService.updateStatus(id, status);
    setLeads(leadService.getLeads());
  };

  const filteredLeads = leads
    .filter(l => filter === 'all' ? true : l.status === filter)
    .filter(l => 
      (l.name?.toLowerCase() || '').includes(search.toLowerCase()) || 
      (l.eventType?.toLowerCase() || '').includes(search.toLowerCase())
    );

  const stats = {
    total: leads.length,
    pending: leads.filter(l => l.status === 'pending').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    completed: leads.filter(l => l.status === 'completed').length,
  };

  const recentLeads = leads.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#F6F4EA] text-[#1F2133] font-sans flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1F2133] text-[#F6F4EA] flex flex-col sticky top-0 md:h-screen z-50 shadow-2xl">
        <div className="p-6 flex items-center justify-between md:justify-center border-b border-white/10">
          <img src={logoDrinkeria} alt="Logo" className="h-8 brightness-0 invert" />
        </div>
        
        <nav className="flex-1 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-hidden">
          <button 
            onClick={() => setActiveTab('overview')}
            className={cn("flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium whitespace-nowrap", activeTab === 'overview' ? "bg-[#D4AF37] text-[#1F2133]" : "hover:bg-white/5 text-white/70 hover:text-white")}
          >
            <LayoutDashboard size={18} />
            Visão Geral
          </button>
          <button 
            onClick={() => setActiveTab('leads')}
            className={cn("flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium whitespace-nowrap", activeTab === 'leads' ? "bg-[#D4AF37] text-[#1F2133]" : "hover:bg-white/5 text-white/70 hover:text-white")}
          >
            <Users size={18} />
            Gestão de Leads
            {stats.pending > 0 && (
              <span className="ml-auto bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full">{stats.pending}</span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={cn("flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium whitespace-nowrap", activeTab === 'settings' ? "bg-[#D4AF37] text-[#1F2133]" : "hover:bg-white/5 text-white/70 hover:text-white")}
          >
            <Settings size={18} />
            Configurações
          </button>
        </nav>

        <div className="p-4 border-t border-white/10 mt-auto">
          <button onClick={onBack} className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 w-full">
            <LogOut size={18} />
            Sair do Painel
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto bg-[#F6F4EA] pb-20">
        {/* Topbar */}
        <header className="bg-white px-8 py-4 flex items-center justify-between border-b border-[#1F2133]/10 sticky top-0 z-40">
          <div>
            <h1 className="font-serif italic text-2xl text-[#1F2133]">
              {activeTab === 'overview' ? 'Visão Geral' : activeTab === 'leads' ? 'Gestão de Leads' : 'Configurações'}
            </h1>
            <p className="text-xs text-[#1F2133]/50 uppercase tracking-widest font-bold mt-1">Drinkeria Bar & Eventos</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-[#1F2133]/60 hover:text-[#1F2133] hover:bg-[#1F2133]/5 rounded-full transition-all">
              <Bell size={20} />
              {stats.pending > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />}
            </button>
            <div className="h-8 w-[1px] bg-[#1F2133]/10 mx-2" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#1F2133] rounded-full flex items-center justify-center text-[#D4AF37] font-serif italic font-bold">
                K
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold leading-none">Kenia Tosi</p>
                <p className="text-[10px] text-[#1F2133]/50 uppercase tracking-widest">Administrador</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-[#1F2133]/10 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-[#1F2133]/5 rounded-lg text-[#1F2133]"><LayoutDashboard size={24} /></div>
                      <span className="text-green-600 text-xs font-bold flex items-center gap-1"><TrendingUp size={14}/> +12%</span>
                    </div>
                    <p className="text-[#1F2133]/50 text-xs uppercase tracking-widest font-bold mb-1">Total de Pedidos</p>
                    <h3 className="text-3xl font-serif">{stats.total}</h3>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-[#1F2133]/10 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-orange-50 rounded-lg text-orange-500"><Clock size={24} /></div>
                    </div>
                    <p className="text-[#1F2133]/50 text-xs uppercase tracking-widest font-bold mb-1">Pendentes</p>
                    <h3 className="text-3xl font-serif text-orange-500">{stats.pending}</h3>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-[#1F2133]/10 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-blue-50 rounded-lg text-blue-500"><MessageSquare size={24} /></div>
                    </div>
                    <p className="text-[#1F2133]/50 text-xs uppercase tracking-widest font-bold mb-1">Em Negociação</p>
                    <h3 className="text-3xl font-serif text-blue-500">{stats.contacted}</h3>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-[#1F2133]/10 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-green-50 rounded-lg text-green-600"><CheckCircle size={24} /></div>
                    </div>
                    <p className="text-[#1F2133]/50 text-xs uppercase tracking-widest font-bold mb-1">Eventos Fechados</p>
                    <h3 className="text-3xl font-serif text-green-600">{stats.completed}</h3>
                  </div>
                </div>

                {/* Recent Leads */}
                <div className="bg-white rounded-xl border border-[#1F2133]/10 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-[#1F2133]/10 flex items-center justify-between">
                    <h2 className="font-serif italic text-xl">Pedidos Recentes</h2>
                    <button onClick={() => setActiveTab('leads')} className="text-sm text-[#D4AF37] hover:underline font-bold">Ver todos</button>
                  </div>
                  <div className="divide-y divide-[#1F2133]/5">
                    {recentLeads.length > 0 ? recentLeads.map(lead => (
                      <div key={lead.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#F6F4EA]/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#1F2133]/5 rounded-full flex items-center justify-center text-[#1F2133] font-serif italic text-xl">
                            {(lead.name || '?').charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-[#1F2133]">{lead.name || 'Sem nome'}</h4>
                            <p className="text-xs text-[#1F2133]/60">{lead.eventType || 'Evento'} • {lead.guests || '0'} pessoas</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={cn(
                            "px-3 py-1 text-[10px] uppercase font-bold rounded-full",
                            lead.status === 'pending' ? "bg-orange-100 text-orange-600" : 
                            lead.status === 'contacted' ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
                          )}>
                            {lead.status === 'pending' ? 'Pendente' : lead.status === 'contacted' ? 'Contatado' : 'Fechado'}
                          </span>
                          <a href={`https://wa.me/${(lead.phone || '').replace(/\D/g, '')}`} target="_blank" className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
                            <Phone size={14} />
                          </a>
                        </div>
                      </div>
                    )) : (
                      <div className="p-8 text-center text-[#1F2133]/50">Nenhum pedido recente.</div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'leads' && (
              <motion.div key="leads" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-xl border border-[#1F2133]/10 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
                <div className="p-6 border-b border-[#1F2133]/10 flex flex-col md:flex-row justify-between gap-4">
                  <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1F2133]/30" size={18} />
                    <input 
                      type="text" 
                      placeholder="Buscar por nome ou evento..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full bg-[#F6F4EA]/50 border border-[#1F2133]/10 pl-12 pr-4 py-2.5 rounded-lg outline-none focus:border-[#D4AF37] transition-all text-sm"
                    />
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {[
                      { id: 'all', label: 'Todos' },
                      { id: 'pending', label: 'Pendentes' },
                      { id: 'contacted', label: 'Contatados' },
                      { id: 'completed', label: 'Fechados' }
                    ].map(item => (
                      <button
                        key={item.id}
                        onClick={() => setFilter(item.id as any)}
                        className={cn(
                          "px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all rounded-lg whitespace-nowrap",
                          filter === item.id 
                            ? "bg-[#1F2133] text-[#F6F4EA]" 
                            : "bg-[#1F2133]/5 text-[#1F2133]/60 hover:bg-[#1F2133]/10"
                        )}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                      <tr className="bg-[#F6F4EA]/50 border-b border-[#1F2133]/10">
                        <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-[#1F2133]/40">Data/Hora</th>
                        <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-[#1F2133]/40">Cliente</th>
                        <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-[#1F2133]/40">Evento</th>
                        <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-[#1F2133]/40">Status</th>
                        <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-[#1F2133]/40 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1F2133]/5">
                      {filteredLeads.length > 0 ? filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-[#F6F4EA]/50 transition-colors group">
                          <td className="p-4 text-xs text-[#1F2133]/60">
                            {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('pt-BR') : 'Sem data'} <br/>
                            {lead.createdAt ? new Date(lead.createdAt).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'}) : ''}
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-sm text-[#1F2133]">{lead.name || 'Sem nome'}</p>
                            <div className="flex gap-3 mt-1">
                              <a href={`https://wa.me/${(lead.phone || '').replace(/\D/g, '')}`} target="_blank" className="text-[11px] text-green-600 flex items-center gap-1 hover:underline"><Phone size={10} /> {lead.phone}</a>
                              <p className="text-[11px] text-[#1F2133]/60 flex items-center gap-1"><Mail size={10} /> {lead.email}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="inline-block px-2 py-0.5 bg-[#1F2133]/5 text-[#1F2133] text-[10px] uppercase font-bold rounded">
                              {lead.eventType}
                            </span>
                            <p className="text-[11px] mt-1 text-[#1F2133]/60"><Calendar size={10} className="inline mr-1"/> {lead.eventDate || 'A combinar'} • <Users size={10} className="inline mr-1"/> {lead.guests} pessoas</p>
                          </td>
                          <td className="p-4">
                            <select 
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                              className={cn(
                                "text-[10px] uppercase font-bold border-none outline-none cursor-pointer px-2 py-1 rounded-full",
                                lead.status === 'pending' ? "bg-orange-100 text-orange-600" : 
                                lead.status === 'contacted' ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
                              )}
                            >
                              <option value="pending">Pendente</option>
                              <option value="contacted">Contatado</option>
                              <option value="completed">Fechado</option>
                            </select>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => handleDelete(lead.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-all" title="Excluir">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={5} className="p-20 text-center">
                            <div className="flex flex-col items-center opacity-20">
                              <Search size={48} className="mb-4" />
                              <p className="font-serif text-2xl italic">Nenhum pedido encontrado</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-3xl">
                <div className="bg-white rounded-xl border border-[#1F2133]/10 shadow-sm overflow-hidden mb-6">
                  <div className="p-6 border-b border-[#1F2133]/10">
                    <h2 className="font-serif italic text-xl">Configurações da Empresa</h2>
                    <p className="text-sm text-[#1F2133]/60 mt-1">Gerencie as informações públicas da Drinkeria Bar.</p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#1F2133]/60 mb-2">Nome da Empresa</label>
                      <input type="text" defaultValue="Drinkeria Bar & Eventos" className="w-full bg-[#F6F4EA]/50 border border-[#1F2133]/10 px-4 py-2.5 rounded-lg outline-none focus:border-[#D4AF37] transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#1F2133]/60 mb-2">WhatsApp de Contato (Recebimento de Leads)</label>
                      <input type="text" defaultValue="5546999158888" className="w-full bg-[#F6F4EA]/50 border border-[#1F2133]/10 px-4 py-2.5 rounded-lg outline-none focus:border-[#D4AF37] transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#1F2133]/60 mb-2">E-mail Administrativo</label>
                      <input type="email" defaultValue="contato@drinkeria.com.br" className="w-full bg-[#F6F4EA]/50 border border-[#1F2133]/10 px-4 py-2.5 rounded-lg outline-none focus:border-[#D4AF37] transition-all text-sm" />
                    </div>
                  </div>
                  <div className="p-6 bg-[#F6F4EA]/30 border-t border-[#1F2133]/10 flex justify-end">
                    <button className="bg-[#1F2133] text-[#F6F4EA] px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#1F2133]/80 transition-all">Salvar Alterações</button>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#1F2133]/10 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-[#1F2133]/10">
                    <h2 className="font-serif italic text-xl">Notificações</h2>
                    <p className="text-sm text-[#1F2133]/60 mt-1">Gerencie como você recebe avisos de novos orçamentos.</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#D4AF37]" />
                      <span className="text-sm">Receber notificação por e-mail quando houver um novo lead</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#D4AF37]" />
                      <span className="text-sm">Notificar no painel (som e pop-up)</span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
