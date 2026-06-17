import React from 'react';

function Navbar({ activeView, setActiveView }) {
  const links = [
    { id: 'clients', label: 'Clients' },
    { id: 'proposal', label: 'New Proposal' },
    { id: 'preview', label: 'Preview' },
    { id: 'templates', label: 'Templates' },
    { id: 'history', label: 'History' },
  ];

  return (
    <nav className="navbar">
      <h2>Proposal Generator</h2>
      <ul>
        {links.map(link => (
          <li
            key={link.id}
            className={activeView === link.id ? 'active' : ''}
            onClick={() => setActiveView(link.id)}
          >
            {link.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
