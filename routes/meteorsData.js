const express = require('express');
const router = express.Router();
const meteorsService = require('../services/meteorsData');

router.get('/', async function (req, res, next) {
  try {
    res.json(await meteorsService.getMeteorsData());
  } catch (err) {
    console.error('Error while getting meteors data ', err.message);
    next(err);
  }
});

module.exports = router;
