const { connectDB } = require('./config/db');
const Client = require('./models/Client');
const Proposal = require('./models/Proposal');
const Template = require('./models/Template');

const seed = async () => {
  await connectDB();

  await Client.deleteMany({});
  await Proposal.deleteMany({});
  await Template.deleteMany({});

  const client = await Client.create({ name: 'Acme Corp', email: 'info@acme.com', company: 'Acme Corp', phone: '555-0100' });

  await Proposal.create({
    clientId: client._id,
    title: 'Website Redesign',
    requirements: 'Modern responsive design',
    scope: 'Full website rebuild',
    timeline: '3 months',
    budget: 25000,
    status: 'draft',
  });

  await Template.create({
    name: 'Standard Proposal',
    structure: 'Cover letter, Scope, Timeline, Budget',
    sections: ['Cover Letter', 'Scope of Work', 'Timeline', 'Budget', 'Terms'],
  });

  console.log('Seed complete');
  process.exit(0);
};

seed();
