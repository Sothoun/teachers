const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// ── DB Connection ──────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Student DB connected to MongoDB Cloud'))
  .catch(err => console.error('❌ DB connection error:', err));

// ── Routes ─────────────────────────────────────────────────────
app.use('/student', require('./routes/studentRoutes'));

// ── Health Check ───────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ service: 'Student Microservice', status: 'running', port: process.env.PORT });
});

// ── Start Server ───────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Student Service running on port ${PORT}`);
});
