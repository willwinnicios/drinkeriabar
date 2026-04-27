export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  eventLocation?: string;
  guests: string;
  observations: string;
  status: 'pending' | 'contacted' | 'completed';
  selectedDrinks?: string[];
  selectionCompletedAt?: string;
  createdAt: string;
}

const STORAGE_KEY = 'drinkeria_leads';

export const leadService = {
  getLeads: (): Lead[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      const parsed = data ? JSON.parse(data) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  },

  getLeadById: (id: string): Lead | undefined => {
    const leads = leadService.getLeads();
    return leads.find(l => l.id === id);
  },

  saveLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status' | 'selectedDrinks'>) => {
    const leads = leadService.getLeads();
    const newLead: Lead = {
      ...lead,
      id: Math.random().toString(36).substring(2, 9),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    leads.unshift(newLead);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    return newLead;
  },

  updateLead: (id: string, updates: Partial<Lead>) => {
    const leads = leadService.getLeads();
    const updated = leads.map(l => l.id === id ? { ...l, ...updates } : l);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  updateStatus: (id: string, status: Lead['status']) => {
    const leads = leadService.getLeads();
    const updated = leads.map(l => l.id === id ? { ...l, status } : l);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  deleteLead: (id: string) => {
    const leads = leadService.getLeads();
    const filtered = leads.filter(l => l.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
