const express = require("express");
const cors = require("cors");

const restaurantRoutes = require("./routes/restaurant");

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/restaurants", restaurantRoutes);

app.get("/", (req, res) => {
  res.send("Namaste Food API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});