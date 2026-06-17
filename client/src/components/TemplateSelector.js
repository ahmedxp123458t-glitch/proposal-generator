import React, { useState, useEffect } from 'react';

function TemplateSelector() {
  const [templates, setTemplates] = useState([]);
  const [name, setName] = useState('');
  const [structure, setStructure] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetch('/api/templates')
      .then(res => res.json())
      .then(data => setTemplates(data))
      .catch(() => {});
  }, []);

  const addTemplate = async () => {
    if (!name) return;
    const res = await fetch('/api/templates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, structure, sections: structure.split(',').map(s => s.trim()) }),
    });
    const t = await res.json();
    setTemplates([...templates, t]);
    setName(''); setStructure('');
  };

  const deleteTemplate = async (id) => {
    await fetch(`/api/templates/${id}`, { method: 'DELETE' });
    setTemplates(templates.filter(t => t._id !== id));
  };

  return (
    <div>
      <h2>Proposal Templates</h2>
      <div className="card">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Template name" />
        <input value={structure} onChange={e => setStructure(e.target.value)} placeholder="Sections (comma separated)" />
        <button className="btn btn-primary" onClick={addTemplate}>Add Template</button>
      </div>
      <div className="grid-3">
        {templates.map(t => (
          <div
            key={t._id}
            className={`template-card ${selectedId === t._id ? 'selected' : ''}`}
            onClick={() => setSelectedId(t._id)}
          >
            <h4>{t.name}</h4>
            <p>{t.sections?.join(' &middot; ')}</p>
            <button className="btn btn-danger" style={{ marginTop: 10 }} onClick={(e) => { e.stopPropagation(); deleteTemplate(t._id); }}>Delete</button>
          </div>
        ))}
        {templates.length === 0 && <div className="empty-state"><h3>No templates yet</h3></div>}
      </div>
    </div>
  );
}

export default TemplateSelector;
