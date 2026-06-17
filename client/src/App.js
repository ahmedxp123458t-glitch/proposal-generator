import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ClientForm from './components/ClientForm';
import ProposalForm from './components/ProposalForm';
import ProposalPreview from './components/ProposalPreview';
import TemplateSelector from './components/TemplateSelector';
import History from './components/History';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState('clients');

  const renderView = () => {
    switch (activeView) {
      case 'clients': return <ClientForm />;
      case 'proposal': return <ProposalForm />;
      case 'preview': return <ProposalPreview />;
      case 'templates': return <TemplateSelector />;
      case 'history': return <History />;
      default: return <ClientForm />;
    }
  };

  return (
    <div className="app">
      <Navbar activeView={activeView} setActiveView={setActiveView} />
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
