import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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

function SiteLayout() {
  const [isProposalOpen, setIsProposalOpen] = useState(false);

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

export default function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<SiteLayout />} />
      <Route path="/admin" element={<AdminDashboard onBack={() => navigate('/')} />} />
    </Routes>
  );
}
