const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const DATA_DIR = path.join(__dirname, "data");

function readLocal(relPath) {
  const file = path.join(DATA_DIR, relPath);
  if (!file.startsWith(DATA_DIR)) return null; // path traversal guard
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

app.get("/api/restaurants", (req, res) => {
  const data = readLocal("listRestaurants.json");
  if (!data) return res.status(500).json({ error: "Restaurant data file missing" });

  // Only keep restaurants that have a saved menu
  const menuDir = path.join(DATA_DIR, "menus");
  const available = new Set(
    fs.existsSync(menuDir)
      ? fs.readdirSync(menuDir).map((f) => f.replace(".json", ""))
      : []
  );

  const cards = data?.data?.data?.cards || [];
  cards.forEach((c) => {
    const grid = c?.card?.card?.gridElements?.infoWithStyle;
    if (grid?.restaurants) {
      grid.restaurants = grid.restaurants.filter(
        (r) => r?.info?.id && available.has(String(r.info.id))
      );
    }
  });

  res.json(data);
});

app.get("/api/menu/:id", (req, res) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: "Invalid restaurant id" });
  }
  const data = readLocal(`menus/${id}.json`);
  if (!data) {
    return res.status(404).json({ error: "Menu not available for this restaurant" });
  }
  res.json(data);
});

app.get("/api/health", (req, res) => res.json({ ok: true }));

module.exports = app;