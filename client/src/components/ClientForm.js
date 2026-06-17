import React, { useState, useEffect } from 'react';

function ClientForm() {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetch('/api/clients')
      .then(res => res.json())
      .then(data => setClients(data))
      .catch(() => {});
  }, []);

  const addClient = async () => {
    if (!name || !email) return;
    const res = await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, company, phone }),
    });
    const client = await res.json();
    setClients([...clients, client]);
    setName(''); setEmail(''); setCompany(''); setPhone('');
  };

  const deleteClient = async (id) => {
    await fetch(`/api/clients/${id}`, { method: 'DELETE' });
    setClients(clients.filter(c => c._id !== id));
  };

  return (
    <div>
      <h2>Clients</h2>
      <div className="card">
        <div className="form-row">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Company" />
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
        </div>
        <button className="btn btn-primary" onClick={addClient}>Add Client</button>
      </div>
      <div className="card">
        <h3>All Clients</h3>
        {clients.map(client => (
          <div key={client._id} className="history-item">
            <div className="info">
              <h4>{client.name}</h4>
              <p>{client.email} &middot; {client.company}</p>
            </div>
            <button className="btn btn-danger" onClick={() => deleteClient(client._id)}>Delete</button>
          </div>
        ))}
        {clients.length === 0 && <div className="empty-state"><h3>No clients yet</h3></div>}
      </div>
    </div>
  );
}

export default ClientForm;
