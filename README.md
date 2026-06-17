# Proposal Generator

A full-stack MERN application for generating client proposals with templates, preview, and history tracking.

## Features

- **Client Management** – Add, view, and manage client information
- **Proposal Creation** – Input client requirements, scope, timeline, and budget
- **Proposal Preview** – View generated proposals with formatted layout
- **PDF Export** – Simulated PDF export functionality
- **Templates** – Create and manage proposal templates with custom sections
- **History** – Browse past proposals with status tracking (draft/sent/accepted/rejected)

## Architecture

```
proposal-generator/
├── server/
│   ├── config/db.js          – MongoDB connection
│   ├── models/
│   │   ├── Client.js
│   │   ├── Proposal.js
│   │   └── Template.js
│   ├── routes/
│   │   ├── clients.js
│   │   ├── proposals.js
│   │   └── templates.js
│   ├── server.js
│   ├── seed.js
│   └── package.json
├── client/
│   ├── public/index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── components/
│   │       ├── Navbar.js
│   │       ├── ClientForm.js
│   │       ├── ProposalForm.js
│   │       ├── ProposalPreview.js
│   │       ├── TemplateSelector.js
│   │       └── History.js
│   └── package.json
├── .gitignore
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/clients | List clients |
| POST   | /api/clients | Create client |
| PUT    | /api/clients/:id | Update client |
| DELETE | /api/clients/:id | Delete client |
| GET    | /api/proposals | List proposals |
| POST   | /api/proposals | Create proposal |
| PUT    | /api/proposals/:id | Update proposal |
| DELETE | /api/proposals/:id | Delete proposal |
| GET    | /api/templates | List templates |
| POST   | /api/templates | Create template |
| DELETE | /api/templates/:id | Delete template |

## Usage

1. Start MongoDB on port 27017
2. `cd server && npm install && npm run seed && npm start`
3. `cd client && npm install && npm start`
4. Open `http://localhost:3000`
