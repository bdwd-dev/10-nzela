const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, 'db.json');

function loadDB() {
  try { return JSON.parse(fs.readFileSync(DB_PATH, 'utf8')); }
  catch { return { buses: [], agents: [], transactions: [], lines: [], users: [] }; }
}

function saveDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'nzela', version: '1.0.0' });
});

// Stats
app.get('/api/stats', (req, res) => {
  const db = loadDB();
  const totalRevenue = db.transactions.reduce((sum, t) => sum + t.amount, 0);
  res.json({
    buses: db.buses.length,
    agents: db.agents.length,
    transactions: db.transactions.length,
    revenue: totalRevenue,
    lines: db.lines.length
  });
});

// Buses
app.get('/api/buses', (req, res) => {
  const db = loadDB();
  res.json(db.buses);
});

app.post('/api/buses', (req, res) => {
  const db = loadDB();
  const bus = { id: Date.now(), ...req.body, created_at: new Date().toISOString() };
  db.buses.push(bus);
  saveDB(db);
  res.json(bus);
});

// Update bus line
app.put('/api/buses/:id/line', (req, res) => {
  const db = loadDB();
  const bus = db.buses.find(b => b.id == req.params.id);
  if (!bus) return res.status(404).json({ error: 'Bus non trouvé' });
  bus.line = req.body.line;
  bus.line_code = req.body.line_code;
  bus.updated_at = new Date().toISOString();
  saveDB(db);
  res.json(bus);
});

// Lines
app.get('/api/lines', (req, res) => {
  const db = loadDB();
  res.json(db.lines);
});

// Agents
app.get('/api/agents', (req, res) => {
  const db = loadDB();
  res.json(db.agents);
});

// Create agent
app.post('/api/agents', (req, res) => {
  const db = loadDB();
  const agent = { id: Date.now(), ...req.body, balance: 0, created_at: new Date().toISOString() };
  db.agents.push(agent);
  saveDB(db);
  res.json(agent);
});

// Recharge card (agent credits a card)
app.post('/api/recharge', (req, res) => {
  const db = loadDB();
  const { agent_id, card_uid, amount } = req.body;
  const agent = db.agents.find(a => a.id == agent_id);
  if (!agent) return res.status(404).json({ error: 'Agent non trouvé' });
  
  const transaction = {
    id: Date.now(),
    type: 'recharge',
    agent_id,
    card_uid,
    amount,
    timestamp: new Date().toISOString()
  };
  db.transactions.push(transaction);
  agent.balance = (agent.balance || 0) + amount;
  saveDB(db);
  res.json({ success: true, transaction, agent });
});

// Payment (passenger taps card on bus)
app.post('/api/pay', (req, res) => {
  const db = loadDB();
  const { bus_id, card_uid, amount } = req.body;
  const bus = db.buses.find(b => b.id == bus_id);
  if (!bus) return res.status(404).json({ error: 'Bus non trouvé' });
  
  const transaction = {
    id: Date.now(),
    type: 'payment',
    bus_id,
    card_uid,
    amount,
    timestamp: new Date().toISOString()
  };
  db.transactions.push(transaction);
  bus.revenue = (bus.revenue || 0) + amount;
  saveDB(db);
  res.json({ success: true, transaction, message: `Paiement Validé - ${amount} XAF` });
});

// Transactions
app.get('/api/transactions', (req, res) => {
  const db = loadDB();
  res.json(db.transactions.slice(-50).reverse());
});

// Revenue by bus
app.get('/api/revenue/:bus_id', (req, res) => {
  const db = loadDB();
  const bus = db.buses.find(b => b.id == req.params.bus_id);
  if (!bus) return res.status(404).json({ error: 'Bus non trouvé' });
  const busTx = db.transactions.filter(t => t.bus_id == req.params.bus_id && t.type === 'payment');
  const total = busTx.reduce((sum, t) => sum + t.amount, 0);
  res.json({ bus_id: bus.id, bus_name: bus.name, line: bus.line, total, transactions: busTx });
});

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`╔═══════════════════════════════════════════════╗`);
  console.log(`║  🚌 NZELA - Transport Intelligent            ║`);
  console.log(`║  Port: ${PORT}                                  ║`);
  console.log(`║  API: http://localhost:${PORT}/api            ║`);
  console.log(`╚═══════════════════════════════════════════════╝`);
});
