import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  Clock, 
  Phone, 
  Trash2, 
  CheckCircle, 
  ExternalLink, 
  ArrowLeft,
  LayoutDashboard,
  Filter,
  Search,
  MessageSquare,
  Mail
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
      l.name.toLowerCase().includes(search.toLowerCase()) || 
      l.eventType.toLowerCase().includes(search.toLowerCase())
    );

  const stats = {
    total: leads.length,
    pending: leads.filter(l => l.status === 'pending').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
  };

  return (
    <div className="min-h-screen bg-[#F6F4EA] text-[#1F2133] font-sans">
      {/* Sidebar / Header */}
      <header className="bg-[#1F2133] text-[#F6F4EA] py-6 px-8 shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <img src={logoDrinkeria} alt="Logo" className="h-8 brightness-0 invert" />
            <div className="h-6 w-[1px] bg-white/20 mx-2" />
            <h1 className="font-serif italic text-xl">Painel de Leads</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white/10 px-4 py-2 rounded-sm border border-white/10 flex items-center gap-3">
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest opacity-60 leading-none">Total Geral</p>
                <p className="text-xl font-serif leading-none mt-1">{stats.total}</p>
              </div>
              <LayoutDashboard size={24} className="text-[#D4AF37]" />
            </div>
            
            <div className="bg-white/10 px-4 py-2 rounded-sm border border-white/10 flex items-center gap-3">
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest opacity-60 leading-none">Pendentes</p>
                <p className="text-xl font-serif leading-none mt-1 text-orange-400">{stats.pending}</p>
              </div>
              <Clock size={24} className="text-orange-400" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8">
        {/* Filters */}
        <div className="mb-10 flex flex-col md:flex-row gap-6 justify-between items-end">
          <div className="flex-1 w-full md:max-w-md">
            <label className="text-[10px] uppercase tracking-widest font-bold text-[#1F2133]/40 mb-2 block">Buscar Cliente ou Evento</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1F2133]/30" size={18} />
              <input 
                type="text" 
                placeholder="Ex: Maria Eduarda ou Casamento..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-[#1F2133]/10 pl-12 pr-4 py-3 rounded-sm outline-none focus:border-[#D4AF37] transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-1 rounded-sm border border-[#1F2133]/10">
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
                  "px-6 py-2 text-[10px] uppercase tracking-widest font-bold transition-all rounded-sm",
                  filter === item.id 
                    ? "bg-[#1F2133] text-[#F6F4EA]" 
                    : "text-[#1F2133]/40 hover:bg-black/5"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-sm border border-[#1F2133]/10 overflow-hidden shadow-sm">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[800px] md:min-w-full">
            <thead>
              <tr className="bg-[#1F2133]/5 border-b border-[#1F2133]/10">
                <th className="p-5 text-[10px] uppercase tracking-widest font-bold text-[#1F2133]/40">Cliente</th>
                <th className="p-5 text-[10px] uppercase tracking-widest font-bold text-[#1F2133]/40">Evento</th>
                <th className="p-5 text-[10px] uppercase tracking-widest font-bold text-[#1F2133]/40">Data/Convidados</th>
                <th className="p-5 text-[10px] uppercase tracking-widest font-bold text-[#1F2133]/40">Status</th>
                <th className="p-5 text-[10px] uppercase tracking-widest font-bold text-[#1F2133]/40 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2133]/5">
              {filteredLeads.length > 0 ? filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-[#F6F4EA]/50 transition-colors group">
                  <td className="p-5">
                    <p className="font-serif text-lg leading-none mb-1">{lead.name}</p>
                    <div className="flex flex-col gap-1">
                      <a 
                        href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} 
                        target="_blank" 
                        className="text-[11px] text-green-600 flex items-center gap-1 hover:underline"
                      >
                        <Phone size={10} /> {lead.phone}
                      </a>
                      <p className="text-[11px] text-[#1F2133]/60 flex items-center gap-1">
                        <Mail size={10} className="text-[#D4AF37]" /> {lead.email}
                      </p>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="inline-block px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] uppercase font-bold rounded-full">
                      {lead.eventType}
                    </span>
                    {lead.observations && (
                      <p className="text-[11px] text-[#1F2133]/40 mt-2 italic max-w-xs truncate">"{lead.observations}"</p>
                    )}
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2 text-xs text-[#1F2133]/60 mb-1">
                      <Calendar size={14} className="text-[#D4AF37]" />
                      {lead.eventDate || 'A combinar'}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#1F2133]/60">
                      <Users size={14} className="text-[#D4AF37]" />
                      {lead.guests} pessoas
                    </div>
                  </td>
                  <td className="p-5">
                    <select 
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                      className={cn(
                        "text-[10px] uppercase font-bold border-none outline-none bg-transparent cursor-pointer",
                        lead.status === 'pending' ? "text-orange-500" : 
                        lead.status === 'contacted' ? "text-blue-500" : "text-green-600"
                      )}
                    >
                      <option value="pending">Pendente</option>
                      <option value="contacted">Contatado</option>
                      <option value="completed">Fechado</option>
                    </select>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleStatusChange(lead.id, 'completed')}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-all"
                        title="Marcar como Fechado"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(lead.id)}
                        className="p-2 text-red-400 hover:bg-red-50 rounded-full transition-all"
                        title="Excluir"
                      >
                        <Trash2 size={18} />
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
      </div>

        {/* Footer Info */}
        <p className="mt-8 text-center text-[10px] uppercase tracking-widest text-[#1F2133]/30 font-bold">
          Dica: Clique no telefone do cliente para abrir o WhatsApp direto.
        </p>
      </main>
    </div>
  );
}
