const express = require("express");
const router = express.Router();
const DataModel = require("../model/DataModel");

//query data route
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
      fields, // Add fields to destructure
    } = req.query;

    let query = {};

    // Build the query object based on provided filters
    if (end_year) query.end_year = end_year;
    if (topic) query.topic = topic;
    if (sector) query.sector = sector;
    if (region) query.region = region;
    if (pestle) query.pestle = pestle;
    if (source) query.source = source;
    if (swot) query.swot = swot;
    if (country) query.country = country;
    if (city) query.city = city;

    // Handle field selection
    let select = null;
    if (fields) {
      // Convert comma-separated fields to space-separated string for Mongoose
      select = fields.split(',').join(' ');
    }

    // Fetch data with query and selected fields
    const data = await DataModel.find(query).select(select);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Error fetching data" });
  }
});

//all data route
router.get("/data/all", async (req, res) => {
  try {
    const data = await DataModel.find({});
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching all data:", err);
    res.status(500).json({ message: "Error fetching all data" });
  }
});
module.exports = router;
