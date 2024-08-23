const express = require('express');
const router = express.Router();
const DataModel = require('../model/DataModel');
const fs = require('fs');
const path = require('path');


router.post('/insert-data', async (req, res) => {
  const dataPath = path.join(__dirname, '../config/data.json');
  console.log('Data file path:', dataPath);
  const fileContents = fs.readFileSync(dataPath, 'utf8');
  const dataArray = JSON.parse(fileContents);

  try {
    for (const data of dataArray) {
      const existingDoc = await DataModel.findOne({ title: data.title, added: new Date(data.added) });

      if (existingDoc) {
        console.log('Data already exists in the database:', existingDoc.title);
      } else {
        const doc = await DataModel.create(data);
        console.log('Data inserted successfully:', doc.title);
      }
    }
    res.status(200).send('Data insertion completed successfully.');
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).send('Error inserting data.');
  }
});

module.exports = router;
