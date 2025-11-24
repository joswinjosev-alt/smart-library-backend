const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Allow JSON bodies and CORS
app.use(express.json());
app.use(cors());

// ---------- IN-MEMORY SEAT STATE ----------
// Initial status of all seats
const seats = {
  A1: 'free',
  A2: 'free',
  A3: 'free',
  A4: 'free',
  B1: 'free',
  B2: 'free',
  B3: 'free',
  B4: 'free'
};

// ---------- ROUTES ----------

// Simple check
app.get('/', (req, res) => {
  res.send('Smart Library backend is running');
});

// Return current seat statuses
// Used by your frontend (the website)
app.get('/seats', (req, res) => {
  res.json(seats);
});

// Update seat statuses
// This will be used later by the ESP32 (or you can test using Postman)
// Body example:
// { "A1": "occupied", "A2": "reserved", "B1": "free" }
app.post('/seats', (req, res) => {
  const updates = req.body;

  const allowedStatuses = ['free', 'occupied', 'reserved'];

  Object.keys(updates).forEach(id => {
    if (seats.hasOwnProperty(id)) {
      const status = String(updates[id]).toLowerCase();
      if (allowedStatuses.includes(status)) {
        seats[id] = status;
      }
    }
  });

  res.json({
    success: true,
    seats
  });
});

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`Smart Library backend listening on port ${PORT}`);
});
