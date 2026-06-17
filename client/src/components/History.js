import React, { useState, useEffect } from 'react';

function History() {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    fetch('/api/proposals')
      .then(res => res.json())
      .then(data => setProposals(data))
      .catch(() => {});
  }, []);

  const deleteProposal = async (id) => {
    await fetch(`/api/proposals/${id}`, { method: 'DELETE' });
    setProposals(proposals.filter(p => p._id !== id));
  };

  return (
    <div>
      <h2>Proposal History</h2>
      <div className="card">
        {proposals.map(p => (
          <div key={p._id} className="history-item">
            <div className="info">
              <h4>{p.title}</h4>
              <p>
                {p.clientId?.name || 'Unknown client'} &middot;
                ${p.budget?.toLocaleString() || '0'} &middot;
                {new Date(p.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span className={`status-badge status-${p.status}`}>{p.status}</span>
              <button className="btn btn-danger" onClick={() => deleteProposal(p._id)}>Delete</button>
            </div>
          </div>
        ))}
        {proposals.length === 0 && <div className="empty-state"><h3>No proposals yet</h3></div>}
      </div>
    </div>
  );
}

export default History;
