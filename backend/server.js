require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const healthRoutes = require('./routes/health');
const requirementRoutes = require('./routes/requirements');

// Connect to MongoDB
connectDB();

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────

// Parse JSON request bodies
app.use(express.json());

// HTTP request logger (dev format)
app.use(morgan('dev'));

// Configure CORS for production (allow specified FRONTEND_URL or default to localhost in dev)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

// ── Routes ──────────────────────────────────────────────────────────────────

app.use('/api/health', healthRoutes);
app.use('/api/requirements', requirementRoutes);

// 404 handler — no route matched
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Central error handler (must be last)
app.use(errorHandler);

// ── Start server ─────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} [${process.env.NODE_ENV}]`);
});
