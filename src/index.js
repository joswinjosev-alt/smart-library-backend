const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Initial dummy seat data (will update from ESP32)
let seats = {
  "A1": "free",
  "A2": "free",
  "A3": "free",
  "A4": "free",
  "B1": "free",
  "B2": "free",
  "B3": "free",
  "B4": "free"
};

// Route for frontend to get seat status
app.get("/seats", (req, res) => {
  res.json(seats);
});

// Route for ESP32 to update seat status
app.post("/update", (req, res) => {
  console.log("Update Received:", req.body);
  seats = { ...seats, ...req.body };
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
