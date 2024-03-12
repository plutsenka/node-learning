const express = require('express');
const router = express.Router();
const meteorsService = require('../services/meteorsData');
const MeteorRequestDto = require('../dto/meteorRequestDto');

router.get('/', async function (req, res, next) {
  const { startDate, endDate, countOnly, wereDangerous } = new MeteorRequestDto(req.query);

  try {
    res.json(await meteorsService.getMeteorsData(startDate, endDate, countOnly, wereDangerous));
  } catch (err) {
    console.error('Error while getting meteors data ', err.message);
    next(err);
  }
});

module.exports = router;
