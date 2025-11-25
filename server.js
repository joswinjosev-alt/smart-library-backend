const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// ------------------ SEAT STATE ------------------
const seats = {
  A1: "free", A2: "free", A3: "free", A4: "free",
  B1: "free", B2: "free", B3: "free", B4: "free"
};

// ------------------ ROUTES ------------------
app.get("/", (req, res) => {
  res.send("Smart Library backend running");
});

app.get("/seats", (req, res) => {
  res.json(seats);
});

app.post("/seats", (req, res) => {
  const updates = req.body;

  Object.keys(updates).forEach(id => {
    if (seats[id]) {
      const s = updates[id].toLowerCase();
      if (["free", "occupied", "reserved"].includes(s)) {
        seats[id] = s;
      }
    }
  });

  res.json({ success: true, seats });
});

// ------------------ START ------------------
app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
});
