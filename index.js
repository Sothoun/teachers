const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// ── DB Connection ──────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Teacher DB connected to MongoDB Cloud'))
  .catch(err => console.error('❌ DB connection error:', err));

// ── Routes ─────────────────────────────────────────────────────
app.use('/teacher', require('./routes/teacherRoutes'));

// ── Health Check ───────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ service: 'Teacher Microservice', status: 'running', port: process.env.PORT });
});

// ── Start Server ───────────────────────────────────────────────
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`🚀 Teacher Service running on port ${PORT}`);
});
