import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Storytelling } from './components/Storytelling';
import { RecentEvents } from './components/RecentEvents';
import { EventServices } from './components/EventServices';
import { DrinksMenu } from './components/DrinksMenu';
import { Differentials } from './components/Differentials';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { ProposalModal } from './components/ProposalModal';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [isProposalOpen, setIsProposalOpen] = useState(false);
  const [view, setView] = useState<'site' | 'admin'>('site');

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setView('admin');
      } else {
        setView('site');
      }
    };

    window.addEventListener('hashchange', handleHash);
    handleHash(); // Check on mount
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  if (view === 'admin') {
    return <AdminDashboard onBack={() => { window.location.hash = ''; setView('site'); }} />;
  }

  return (
    <div className="bg-[#1F2133] min-h-screen text-[#F6F4EA]">
      <Header onOpenProposal={() => setIsProposalOpen(true)} />
      <main>
        <Hero onOpenProposal={() => setIsProposalOpen(true)} />
        <Storytelling />
        <RecentEvents />
        <EventServices />
        <DrinksMenu />
        <Differentials />
      </main>
      <Footer onOpenProposal={() => setIsProposalOpen(true)} />
      <WhatsAppWidget />
      
      <ProposalModal 
        isOpen={isProposalOpen} 
        onClose={() => setIsProposalOpen(false)} 
      />
    </div>
  );
}
