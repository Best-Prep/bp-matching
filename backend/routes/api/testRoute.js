const express = require("express");
const router = express.Router();
const Test = require('../../models/testModel')

router.post('/populateData', async (req, res, next) => {
    for (let x = 0; x < 5; x++) {
      const newTest = new Test({
        testProperty: `This is testDocument ${Math.random().toFixed(5)}`,
        dateCreated: new Date(),
      });
      await newTest.save();
    }
    res.send('Population of data successful');
  });

module.exports = router;