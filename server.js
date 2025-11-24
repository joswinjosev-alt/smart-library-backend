const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let seatData = {
  A1: "free",
  A2: "free",
  A3: "free",
  A4: "free",
  B1: "free",
  B2: "free",
  B3: "free",
  B4: "free"
};

// ESP32 sends seat status
app.post("/update", (req, res) => {
  seatData = req.body;
  console.log("Updated seat data:", seatData);
  res.send("OK");
});

// Website fetches seat status
app.get("/seats", (req, res) => {
  res.json(seatData);
});

app.get("/", (req, res) => {
  res.send("Smart Library Backend Running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
