const express = require("express");
const app = express();

// Allow all origins so ESP32 and frontend can access
app.use(require("cors")());
app.use(express.json());

// Temporary seat data
let seatStatus = {
  A1: "free",
  A2: "free",
  A3: "free",
  A4: "free",
  B1: "free",
  B2: "free",
  B3: "free",
  B4: "free"
};

// GET for frontend
app.get("/seats", (req, res) => {
  res.json(seatStatus);
});

// POST for ESP32 to update seat data
app.post("/update", (req, res) => {
  seatStatus = req.body;
  console.log("Updated:", seatStatus);
  res.json({ success: true });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
