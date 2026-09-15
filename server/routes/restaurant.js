const express = require("express");
const { getRestaurants } = require("../services/swiggy");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "lat and lng are required",
      });
    }

    const data = await getRestaurants(lat, lng);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Swiggy API Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch restaurant data",
    });
  }
});

module.exports = router;