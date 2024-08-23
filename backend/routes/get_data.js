const express = require("express");
const router = express.Router();
const DataModel = require("../model/DataModel");

router.get("/data", async (req, res) => {
  try {
    const {
      end_year,
      topic,
      sector,
      region,
      pestle,
      source,
      swot,
      country,
      city,
    } = req.query;

    let query = {};

    if (end_year) query.end_year = end_year;
    if (topic) query.topic = topic;
    if (sector) query.sector = sector;
    if (region) query.region = region;
    if (pestle) query.pestle = pestle;
    if (source) query.source = source;
    if (swot) query.swot = swot;
    if (country) query.country = country;
    if (city) query.city = city;

    const data = await DataModel.find(query);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Error fetching data" });
  }
});

module.exports = router;
