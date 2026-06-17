import React, { useState, useEffect } from 'react';

function ProposalPreview() {
  const [proposals, setProposals] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('/api/proposals')
      .then(res => res.json())
      .then(data => setProposals(data))
      .catch(() => {});
  }, []);

  const exportPDF = () => {
    alert('PDF export simulated: ' + (selected ? selected.title : 'No proposal'));
  };

  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/proposals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const updated = await res.json();
    setProposals(proposals.map(p => (p._id === id ? updated : p)));
    if (selected && selected._id === id) setSelected(updated);
  };

  if (!selected) {
    return (
      <div>
        <h2>Proposal Preview</h2>
        <div className="card">
          <h3>Select a proposal to preview</h3>
          {proposals.map(p => (
            <div key={p._id} className="history-item" onClick={() => setSelected(p)}>
              <div className="info">
                <h4>{p.title}</h4>
                <p><span className={`status-badge status-${p.status}`}>{p.status}</span></p>
              </div>
            </div>
          ))}
          {proposals.length === 0 && <div className="empty-state"><h3>No proposals yet</h3></div>}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Proposal Preview</h2>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button className="btn btn-primary" onClick={exportPDF}>Export PDF</button>
        <button className="btn btn-success" onClick={() => updateStatus(selected._id, 'sent')}>Mark Sent</button>
        <button className="btn btn-secondary" onClick={() => setSelected(null)}>Back</button>
      </div>
      <div className="preview-container">
        <h1>{selected.title}</h1>
        <div className="preview-meta">
          <div className="meta-item">
            <div className="label">Client</div>
            <div className="value">{selected.clientId?.name || 'N/A'}</div>
          </div>
          <div className="meta-item">
            <div className="label">Status</div>
            <div className="value"><span className={`status-badge status-${selected.status}`}>{selected.status}</span></div>
          </div>
        </div>
        <div className="preview-section">
          <h3>Requirements</h3>
          <p>{selected.requirements || 'No requirements specified.'}</p>
        </div>
        <div className="preview-section">
          <h3>Scope of Work</h3>
          <p>{selected.scope || 'No scope defined.'}</p>
        </div>
        <div className="preview-meta">
          <div className="meta-item">
            <div className="label">Timeline</div>
            <div className="value">{selected.timeline || 'TBD'}</div>
          </div>
          <div className="meta-item">
            <div className="label">Budget</div>
            <div className="value">${selected.budget?.toLocaleString() || '0'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProposalPreview;
