const express = require('express');
const router = express.Router();
const meteorsService = require('../services/meteorsData');
const MeteorRequestDto = require('../dto/meteorRequestDto');

router.get('/', async function (req, res, next) {
  const request = new MeteorRequestDto(req.query);

  try {
    res.json(await meteorsService.getMeteorsData(request));
  } catch (err) {
    console.error('Error while getting meteors data ', err.message);
    next(err);
  }
});

module.exports = router;
