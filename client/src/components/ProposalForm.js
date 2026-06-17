import React, { useState, useEffect } from 'react';

function ProposalForm() {
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState('');
  const [title, setTitle] = useState('');
  const [requirements, setRequirements] = useState('');
  const [scope, setScope] = useState('');
  const [timeline, setTimeline] = useState('');
  const [budget, setBudget] = useState('');

  useEffect(() => {
    fetch('/api/clients')
      .then(res => res.json())
      .then(data => setClients(data))
      .catch(() => {});
  }, []);

  const createProposal = async () => {
    if (!clientId || !title) return;
    await fetch('/api/proposals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId, title, requirements, scope, timeline, budget: Number(budget) }),
    });
    setTitle(''); setRequirements(''); setScope(''); setTimeline(''); setBudget('');
  };

  return (
    <div>
      <h2>Create Proposal</h2>
      <div className="card">
        <div className="form-group">
          <label>Client</label>
          <select value={clientId} onChange={e => setClientId(e.target.value)}>
            <option value="">Select client...</option>
            {clients.map(c => <option key={c._id} value={c._id}>{c.name} - {c.company}</option>)}
          </select>
        </div>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Proposal title" />
        <div className="form-row">
          <div className="form-group">
            <label>Requirements</label>
            <textarea value={requirements} onChange={e => setRequirements(e.target.value)} placeholder="Client requirements" />
          </div>
          <div className="form-group">
            <label>Scope</label>
            <textarea value={scope} onChange={e => setScope(e.target.value)} placeholder="Project scope" />
          </div>
        </div>
        <div className="form-row">
          <input value={timeline} onChange={e => setTimeline(e.target.value)} placeholder="Timeline (e.g. 3 months)" />
          <input value={budget} onChange={e => setBudget(e.target.value)} type="number" placeholder="Budget ($)" />
        </div>
        <button className="btn btn-primary" onClick={createProposal}>Generate Proposal</button>
      </div>
    </div>
  );
}

export default ProposalForm;
