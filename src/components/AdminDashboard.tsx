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
  MessageSquare,
  X,
  MapPin,
  Eye,
  Martini,
  Wine
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
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

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

  const recentLeads = [...leads].sort((a, b) => 
    new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  ).slice(0, 5);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1F2133] font-sans flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-[#1F2133] text-white flex flex-col relative z-50 shadow-2xl">
        <div className="p-8 border-b border-white/5">
          <img src={logoDrinkeria} alt="Logo" className="h-10 mx-auto brightness-0 invert" />
          <div className="mt-6 text-center">
            <p className="text-[#D4AF37] font-serif italic text-lg">Painel de Gestão</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mt-1">Exclusivo Kenia Tosi</p>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={cn(
              "w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all text-sm font-semibold",
              activeTab === 'overview' ? "bg-[#D4AF37] text-[#1F2133] shadow-lg shadow-[#D4AF37]/20" : "text-white/60 hover:bg-white/5 hover:text-white"
            )}
          >
            <LayoutDashboard size={20} strokeWidth={1.5} />
            <span>Visão Geral</span>
          </button>
          <button 
            onClick={() => setActiveTab('leads')}
            className={cn(
              "w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all text-sm font-semibold relative",
              activeTab === 'leads' ? "bg-[#D4AF37] text-[#1F2133] shadow-lg shadow-[#D4AF37]/20" : "text-white/60 hover:bg-white/5 hover:text-white"
            )}
          >
            <Users size={20} strokeWidth={1.5} />
            <span>Gestão de Leads</span>
            {stats.pending > 0 && (
              <span className="absolute right-4 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-[#1F2133]">
                {stats.pending}
              </span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={cn(
              "w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all text-sm font-semibold",
              activeTab === 'settings' ? "bg-[#D4AF37] text-[#1F2133] shadow-lg shadow-[#D4AF37]/20" : "text-white/60 hover:bg-white/5 hover:text-white"
            )}
          >
            <Settings size={20} strokeWidth={1.5} />
            <span>Configurações</span>
          </button>
        </nav>

        <div className="p-6 border-t border-white/5">
          <button onClick={onBack} className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-white/40 hover:text-white hover:bg-red-500/10 transition-all text-sm font-semibold group">
            <LogOut size={20} strokeWidth={1.5} className="group-hover:text-red-500" />
            <span>Sair do Sistema</span>
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md px-10 py-6 flex items-center justify-between border-b border-[#1F2133]/5 sticky top-0 z-40">
          <div className="flex items-center gap-4 md:hidden">
             <img src={logoDrinkeria} alt="Logo" className="h-6" />
          </div>
          <div className="hidden md:block">
            <h2 className="text-xs uppercase tracking-[0.4em] text-[#1F2133]/40 font-bold">Ambiente Administrativo</h2>
            <p className="text-xl font-serif italic text-[#1F2133]">Bem-vinda de volta, Kenia!</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-bold text-[#1F2133]">Kenia Tosi</span>
              <span className="text-[10px] text-green-500 uppercase tracking-widest font-bold">Online</span>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-[#1F2133] to-[#2d304a] rounded-2xl flex items-center justify-center text-[#D4AF37] shadow-xl border border-white/10">
              <span className="font-serif italic text-xl font-bold">K</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 scrollbar-hide">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div 
                key="overview" 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }} 
                className="space-y-10"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Geral', value: stats.total, icon: LayoutDashboard, color: 'text-indigo-500', bg: 'bg-indigo-500/5' },
                    { label: 'Novos Leads', value: stats.pending, icon: Bell, color: 'text-orange-500', bg: 'bg-orange-500/5' },
                    { label: 'Em Negociação', value: stats.contacted, icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-500/5' },
                    { label: 'Fechados', value: stats.completed, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/5' },
                  ].map((stat, i) => (
                    <motion.div 
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-8 rounded-3xl border border-[#1F2133]/5 shadow-sm hover:shadow-xl transition-all group"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className={cn("p-4 rounded-2xl transition-colors", stat.bg)}>
                          <stat.icon size={24} className={stat.color} strokeWidth={1.5} />
                        </div>
                        <ChevronRight size={16} className="text-[#1F2133]/10 group-hover:text-[#D4AF37] transition-colors" />
                      </div>
                      <p className="text-[#1F2133]/40 text-[10px] uppercase tracking-widest font-bold mb-2">{stat.label}</p>
                      <h3 className="text-4xl font-serif text-[#1F2133]">{stat.value}</h3>
                    </motion.div>
                  ))}
                </div>

                {/* Main Dashboard Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {/* Recent Activity */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between px-2">
                      <h3 className="font-serif italic text-2xl">Atividade Recente</h3>
                      <button onClick={() => setActiveTab('leads')} className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest hover:underline">Ver Gestão Completa</button>
                    </div>
                    
                    <div className="bg-white rounded-3xl border border-[#1F2133]/5 shadow-sm overflow-hidden divide-y divide-[#1F2133]/5">
                      {recentLeads.length > 0 ? recentLeads.map((lead, i) => (
                        <motion.div 
                          key={lead.id} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          onClick={() => { setSelectedLead(lead); setActiveTab('leads'); }}
                          className="p-6 flex items-center justify-between hover:bg-[#F8F9FA] transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-[#1F2133]/5 flex items-center justify-center text-[#1F2133] font-serif italic text-2xl group-hover:bg-[#1F2133] group-hover:text-[#D4AF37] transition-all">
                              {(lead.name || '?').charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-bold text-lg text-[#1F2133] mb-1">{lead.name}</h4>
                              <div className="flex items-center gap-3 text-xs text-[#1F2133]/40">
                                <span className="flex items-center gap-1"><Calendar size={12}/> {lead.eventDate || 'Pendente'}</span>
                                <span className="w-1 h-1 bg-[#1F2133]/10 rounded-full"/>
                                <span className="flex items-center gap-1 font-bold text-[#D4AF37] uppercase tracking-widest text-[9px]">{lead.eventType}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className={cn(
                              "px-4 py-1.5 text-[9px] uppercase font-bold rounded-full border shadow-sm",
                              lead.status === 'pending' ? "bg-orange-50 border-orange-100 text-orange-600" : 
                              lead.status === 'contacted' ? "bg-blue-50 border-blue-100 text-blue-600" : "bg-green-50 border-green-100 text-green-600"
                            )}>
                              {lead.status === 'pending' ? 'Pendente' : lead.status === 'contacted' ? 'Em Contato' : 'Fechado'}
                            </span>
                            <span className="text-[10px] text-[#1F2133]/30 font-medium">há {Math.floor((Date.now() - new Date(lead.createdAt || 0).getTime()) / (1000 * 60 * 60 * 24))} dias</span>
                          </div>
                        </motion.div>
                      )) : (
                        <div className="p-20 text-center space-y-4">
                          <div className="w-20 h-20 bg-[#1F2133]/5 rounded-full flex items-center justify-center mx-auto">
                            <Search className="text-[#1F2133]/20" size={32} />
                          </div>
                          <p className="font-serif italic text-[#1F2133]/40 text-xl">Tudo em ordem por aqui!</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Summary Side Card */}
                  <div className="space-y-6">
                    <h3 className="font-serif italic text-2xl px-2">Resumo da Semana</h3>
                    <div className="bg-[#1F2133] text-white rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
                      <div className="relative z-10 space-y-8">
                        <div>
                          <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold mb-4">Total Pendente</p>
                          <div className="flex items-baseline gap-3">
                            <span className="text-5xl font-serif text-[#D4AF37]">{stats.pending}</span>
                            <span className="text-white/40 text-sm italic">leads esperando</span>
                          </div>
                        </div>
                        <div className="space-y-4 pt-4">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-white/60">Conversão de Orçamentos</span>
                            <span className="text-[#D4AF37] font-bold">65%</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: '65%' }} />
                          </div>
                        </div>
                        <button 
                          onClick={() => setActiveTab('leads')}
                          className="w-full bg-white text-[#1F2133] py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#D4AF37] transition-all shadow-xl"
                        >
                          Gerenciar Pendências
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'leads' && (
              <motion.div 
                key="leads" 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }} 
                className="space-y-8"
              >
                <div className="bg-white rounded-3xl border border-[#1F2133]/5 shadow-xl overflow-hidden">
                  <div className="p-8 border-b border-[#1F2133]/5 flex flex-col lg:flex-row justify-between gap-6">
                    <div className="relative flex-1 max-w-xl group">
                      <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1F2133]/30 group-focus-within:text-[#D4AF37] transition-colors" size={20} />
                      <input 
                        type="text" 
                        placeholder="Buscar por cliente, evento ou detalhes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-[#F8F9FA] border border-[#1F2133]/5 pl-14 pr-6 py-4 rounded-2xl outline-none focus:border-[#D4AF37] focus:bg-white transition-all text-sm font-medium shadow-sm"
                      />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                      {[
                        { id: 'all', label: 'Todos' },
                        { id: 'pending', label: 'Pendentes' },
                        { id: 'contacted', label: 'Em Contato' },
                        { id: 'completed', label: 'Fechados' }
                      ].map(item => (
                        <button
                          key={item.id}
                          onClick={() => setFilter(item.id as any)}
                          className={cn(
                            "px-6 py-3 text-[10px] uppercase tracking-widest font-bold transition-all rounded-xl whitespace-nowrap border shadow-sm",
                            filter === item.id 
                              ? "bg-[#1F2133] border-[#1F2133] text-white" 
                              : "bg-white border-[#1F2133]/5 text-[#1F2133]/60 hover:border-[#D4AF37]"
                          )}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                      <thead>
                        <tr className="bg-[#F8F9FA] border-b border-[#1F2133]/5">
                          <th className="p-6 text-[10px] uppercase tracking-widest font-black text-[#1F2133]/30">Data de Entrada</th>
                          <th className="p-6 text-[10px] uppercase tracking-widest font-black text-[#1F2133]/30">Cliente & Contato</th>
                          <th className="p-6 text-[10px] uppercase tracking-widest font-black text-[#1F2133]/30">Evento Planejado</th>
                          <th className="p-6 text-[10px] uppercase tracking-widest font-black text-[#1F2133]/30">Status Atual</th>
                          <th className="p-6 text-[10px] uppercase tracking-widest font-black text-[#1F2133]/30 text-right">Controles</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1F2133]/5">
                        {filteredLeads.length > 0 ? filteredLeads.map((lead) => (
                          <tr 
                            key={lead.id} 
                            onClick={() => setSelectedLead(lead)}
                            className="hover:bg-[#F8F9FA] transition-all group cursor-pointer"
                          >
                            <td className="p-6">
                              <div className="flex flex-col">
                                <span className="font-bold text-[#1F2133] text-sm">{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('pt-BR') : '--'}</span>
                                <span className="text-[10px] text-[#1F2133]/40 font-medium uppercase mt-1">{lead.createdAt ? new Date(lead.createdAt).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'}) : ''}</span>
                              </div>
                            </td>
                            <td className="p-6">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/5 text-indigo-600 flex items-center justify-center font-bold text-sm">
                                  {(lead.name || '?').charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <p className="font-bold text-[#1F2133] text-sm">{lead.name}</p>
                                  <div className="flex gap-4 mt-1">
                                    <a href={`https://wa.me/${(lead.phone || '').replace(/\D/g, '')}`} target="_blank" onClick={e => e.stopPropagation()} className="text-[10px] text-green-600 flex items-center gap-1.5 hover:underline font-bold"><Phone size={10} /> WhatsApp</a>
                                    <span className="text-[10px] text-[#1F2133]/40 flex items-center gap-1.5"><Mail size={10} /> {lead.email}</span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-6">
                              <div className="space-y-1.5">
                                <span className="inline-block px-2.5 py-1 bg-[#1F2133] text-[#D4AF37] text-[9px] uppercase font-black rounded-md tracking-wider">
                                  {lead.eventType}
                                </span>
                                <p className="text-[11px] font-medium text-[#1F2133]/60 flex items-center gap-2">
                                  <Calendar size={12} className="text-[#D4AF37]"/> {lead.eventDate || 'À definir'} 
                                  <span className="w-1 h-1 bg-[#1F2133]/10 rounded-full"/>
                                  <Users size={12} className="text-[#D4AF37]"/> {lead.guests} conv.
                                </p>
                              </div>
                            </td>
                            <td className="p-6" onClick={(e) => e.stopPropagation()}>
                              <div className="relative group/status w-fit">
                                <select 
                                  value={lead.status}
                                  onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                                  className={cn(
                                    "appearance-none text-[10px] uppercase font-black border-none outline-none cursor-pointer pl-4 pr-10 py-2 rounded-xl transition-all shadow-sm",
                                    lead.status === 'pending' ? "bg-orange-500 text-white" : 
                                    lead.status === 'contacted' ? "bg-blue-500 text-white" : "bg-green-600 text-white"
                                  )}
                                >
                                  <option value="pending">Pendente</option>
                                  <option value="contacted">Em Contato</option>
                                  <option value="completed">Fechado</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
                              </div>
                            </td>
                            <td className="p-6 text-right" onClick={(e) => e.stopPropagation()}>
                              <div className="flex justify-end gap-2">
                                <button onClick={() => setSelectedLead(lead)} className="p-3 text-[#1F2133]/30 hover:bg-[#1F2133] hover:text-[#D4AF37] rounded-2xl transition-all shadow-sm bg-white border border-[#1F2133]/5">
                                  <Eye size={18} strokeWidth={1.5} />
                                </button>
                                <button onClick={() => handleDelete(lead.id)} className="p-3 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl transition-all shadow-sm bg-white border border-red-100">
                                  <Trash2 size={18} strokeWidth={1.5} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan={5} className="p-32 text-center">
                              <div className="flex flex-col items-center gap-6 opacity-30">
                                <div className="w-24 h-24 bg-[#1F2133]/5 rounded-full flex items-center justify-center">
                                  <Search size={40} />
                                </div>
                                <h3 className="font-serif text-3xl italic">Nenhum registro encontrado</h3>
                                <p className="text-sm max-w-xs mx-auto">Tente ajustar sua busca ou mudar o filtro de status.</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div 
                key="settings" 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }} 
                className="max-w-4xl mx-auto space-y-10"
              >
                <div className="bg-white rounded-3xl border border-[#1F2133]/5 shadow-xl overflow-hidden">
                  <div className="p-8 border-b border-[#1F2133]/5 bg-[#F8F9FA]/50">
                    <h2 className="font-serif italic text-2xl">Dados da Drinkeria</h2>
                    <p className="text-sm text-[#1F2133]/40 font-medium">As informações abaixo são usadas para recebimento de novos leads.</p>
                  </div>
                  <div className="p-10 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#1F2133]/40 ml-1">Nome Comercial</label>
                        <input type="text" defaultValue="Drinkeria Bar & Eventos" className="w-full bg-[#F8F9FA] border border-[#1F2133]/5 px-6 py-4 rounded-2xl outline-none focus:border-[#D4AF37] focus:bg-white transition-all text-sm font-bold" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#1F2133]/40 ml-1">WhatsApp Principal</label>
                        <input type="text" defaultValue="5546999158888" className="w-full bg-[#F8F9FA] border border-[#1F2133]/5 px-6 py-4 rounded-2xl outline-none focus:border-[#D4AF37] focus:bg-white transition-all text-sm font-bold" />
                      </div>
                      <div className="space-y-3 md:col-span-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#1F2133]/40 ml-1">E-mail Administrativo</label>
                        <input type="email" defaultValue="contato@drinkeria.com.br" className="w-full bg-[#F8F9FA] border border-[#1F2133]/5 px-6 py-4 rounded-2xl outline-none focus:border-[#D4AF37] focus:bg-white transition-all text-sm font-bold" />
                      </div>
                    </div>
                  </div>
                  <div className="p-8 bg-[#F8F9FA] border-t border-[#1F2133]/5 flex justify-end">
                    <button className="bg-[#1F2133] text-[#D4AF37] px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:brightness-110 transition-all shadow-xl">Salvar Alterações</button>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-[#1F2133]/5 shadow-xl p-10 flex items-center justify-between group cursor-pointer hover:border-[#D4AF37] transition-all">
                  <div className="flex items-center gap-6">
                    <div className="p-5 bg-indigo-500/5 text-indigo-500 rounded-2xl">
                      <Bell size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-[#1F2133]">Configurar Notificações</h4>
                      <p className="text-sm text-[#1F2133]/40">Gerencie alertas de novos leads no desktop e e-mail.</p>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-[#F8F9FA] rounded-xl flex items-center justify-center text-[#1F2133]/20 group-hover:bg-[#D4AF37] group-hover:text-[#1F2133] transition-all">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Modern Lead Details Modal */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-10 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="absolute inset-0 bg-[#1F2133]/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-white md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-[90vh] md:h-auto md:max-h-[85vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-8 md:p-10 border-b border-[#1F2133]/5 bg-[#F8F9FA]">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 rounded-[24px] bg-[#1F2133] flex items-center justify-center text-[#D4AF37] font-serif italic text-3xl shadow-xl">
                    {(selectedLead.name || '?').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif italic text-[#1F2133]">{selectedLead.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                        selectedLead.status === 'pending' ? "bg-orange-500 text-white" : 
                        selectedLead.status === 'contacted' ? "bg-blue-500 text-white" : "bg-green-600 text-white"
                      )}>
                        {selectedLead.status === 'pending' ? 'Novo Pedido' : selectedLead.status === 'contacted' ? 'Em Negociação' : 'Contrato Fechado'}
                      </span>
                      <span className="text-[10px] text-[#1F2133]/40 font-bold uppercase tracking-tighter">ID: {selectedLead.id}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedLead(null)}
                  className="w-12 h-12 flex items-center justify-center bg-white border border-[#1F2133]/5 text-[#1F2133]/40 hover:text-[#1F2133] rounded-2xl transition-all shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-8 md:p-10 space-y-12 scrollbar-hide">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Info Cards */}
                  <div className="space-y-10">
                    <section className="space-y-6">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37] border-b border-[#D4AF37]/20 pb-3">Informações de Contato</h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 bg-[#F8F9FA] p-4 rounded-2xl border border-[#1F2133]/5 group hover:border-[#D4AF37] transition-all">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#D4AF37] shadow-sm">
                            <Phone size={18} />
                          </div>
                          <div>
                            <p className="text-[9px] uppercase font-bold text-[#1F2133]/40">Telefone</p>
                            <p className="text-sm font-bold text-[#1F2133]">{selectedLead.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 bg-[#F8F9FA] p-4 rounded-2xl border border-[#1F2133]/5 group hover:border-[#D4AF37] transition-all">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#D4AF37] shadow-sm">
                            <Mail size={18} />
                          </div>
                          <div>
                            <p className="text-[9px] uppercase font-bold text-[#1F2133]/40">E-mail</p>
                            <p className="text-sm font-bold text-[#1F2133]">{selectedLead.email}</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section className="space-y-6">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37] border-b border-[#D4AF37]/20 pb-3">Logística do Evento</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#F8F9FA] p-5 rounded-3xl border border-[#1F2133]/5">
                          <p className="text-[9px] uppercase font-bold text-[#1F2133]/40 mb-2">Tipo</p>
                          <p className="text-sm font-black text-[#1F2133] uppercase">{selectedLead.eventType}</p>
                        </div>
                        <div className="bg-[#F8F9FA] p-5 rounded-3xl border border-[#1F2133]/5">
                          <p className="text-[9px] uppercase font-bold text-[#1F2133]/40 mb-2">Convidados</p>
                          <p className="text-sm font-black text-[#1F2133]">{selectedLead.guests}</p>
                        </div>
                        <div className="bg-[#F8F9FA] p-5 rounded-3xl border border-[#1F2133]/5 col-span-2 flex items-center gap-4">
                          <MapPin size={20} className="text-[#D4AF37]" />
                          <div>
                            <p className="text-[9px] uppercase font-bold text-[#1F2133]/40">Localização</p>
                            <p className="text-sm font-bold text-[#1F2133]">{selectedLead.eventLocation || 'Não informado'}</p>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>

                  {/* Drinks & Observations */}
                  <div className="space-y-10">
                    <section className="space-y-6">
                      <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">Drinks Selecionados</h4>
                        <Martini size={16} className="text-[#D4AF37]" />
                      </div>
                      
                      {selectedLead.selectedDrinks && selectedLead.selectedDrinks.length > 0 ? (
                        <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto pr-2 scrollbar-hide">
                          {selectedLead.selectedDrinks.map(drink => (
                            <div key={drink} className="flex items-center gap-3 bg-[#1F2133] text-[#D4AF37] px-5 py-4 rounded-2xl shadow-lg border border-white/5">
                              <CheckCircle size={14} />
                              <span className="text-xs font-black uppercase tracking-widest">{drink}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-[#F8F9FA] p-10 rounded-[32px] border-2 border-dashed border-[#1F2133]/5 text-center space-y-4">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto text-[#1F2133]/20 shadow-sm">
                            <Wine size={20} />
                          </div>
                          <p className="text-xs text-[#1F2133]/40 font-medium italic">O cliente ainda não realizou a escolha dos drinks.</p>
                          <button 
                            onClick={() => {
                              const link = `${window.location.origin}/drinks-selection/${selectedLead.id}`;
                              navigator.clipboard.writeText(link);
                              alert('Link de seleção copiado!');
                            }}
                            className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] hover:underline"
                          >
                            Copiar link de seleção
                          </button>
                        </div>
                      )}
                    </section>

                    <section className="space-y-6">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37] border-b border-[#D4AF37]/20 pb-3">Mensagem do Cliente</h4>
                      <div className="bg-[#F8F9FA] p-8 rounded-[32px] border border-[#1F2133]/5 italic text-sm text-[#1F2133]/60 leading-relaxed relative">
                        <MessageSquare className="absolute -top-3 -left-3 text-[#D4AF37] bg-white p-2 rounded-xl shadow-lg" size={32} />
                        {selectedLead.observations ? `"${selectedLead.observations}"` : "Sem observações adicionais informadas."}
                      </div>
                    </section>
                  </div>
                </div>

                {/* Exclusive Selection Tool */}
                <div className="bg-[#1F2133] rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                    <Wine size={120} strokeWidth={1} />
                  </div>
                  <div className="relative z-10 space-y-6 max-w-xl">
                    <h4 className="text-2xl font-serif italic text-[#D4AF37]">Ferramenta de Seleção Digital</h4>
                    <p className="text-sm text-white/60 leading-relaxed font-light">
                      Este cliente possui um link exclusivo onde ele pode visualizar seu cardápio premium e selecionar os drinks desejados. Isso facilita seu orçamento e encanta o cliente.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button 
                        onClick={() => {
                          const link = `${window.location.origin}/drinks-selection/${selectedLead.id}`;
                          navigator.clipboard.writeText(link);
                          alert('Link copiado com sucesso!');
                        }}
                        className="flex-1 bg-[#D4AF37] text-[#1F2133] py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:brightness-110 transition-all shadow-xl"
                      >
                        Copiar Link do Cliente
                      </button>
                      <a 
                        href={`https://wa.me/${(selectedLead.phone || '').replace(/\D/g, '')}?text=${encodeURIComponent(`Olá ${selectedLead.name}, aqui está o link exclusivo para você escolher os drinks do seu evento: ${window.location.origin}/drinks-selection/${selectedLead.id}`)}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 bg-green-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-green-600 transition-all flex items-center justify-center gap-3 shadow-xl"
                      >
                        <Phone size={16} />
                        Enviar no WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 md:p-10 border-t border-[#1F2133]/5 bg-[#F8F9FA] flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#1F2133]/40">Mudar Status:</span>
                  <div className="flex-1 md:flex-none grid grid-cols-3 gap-2">
                    {['pending', 'contacted', 'completed'].map(st => (
                      <button 
                        key={st}
                        onClick={() => {
                          handleStatusChange(selectedLead.id, st as any);
                          setSelectedLead({ ...selectedLead, status: st as any });
                        }}
                        className={cn(
                          "px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border",
                          selectedLead.status === st 
                            ? "bg-[#1F2133] border-[#1F2133] text-[#D4AF37] shadow-lg" 
                            : "bg-white border-[#1F2133]/5 text-[#1F2133]/40 hover:border-[#D4AF37]"
                        )}
                      >
                        {st === 'pending' ? 'Novo' : st === 'contacted' ? 'Contato' : 'Fechado'}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                   <button 
                    onClick={() => handleDelete(selectedLead.id)}
                    className="p-4 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all border border-red-100 flex-1 md:flex-none"
                    title="Excluir Lead"
                  >
                    <Trash2 size={20} strokeWidth={1.5} />
                  </button>
                  <button 
                    onClick={() => setSelectedLead(null)}
                    className="flex-1 md:flex-none bg-[#1F2133] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:brightness-110 shadow-xl"
                  >
                    Concluído
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
