const express = require('express');
const router = express.Router();
const meteorsService = require('../services/meteorsData');
const MeteorRequest = require('../Requests/meteorRequest');

router.get('/', async function (req, res, next) {
  const request = new MeteorRequest(req.query);

  try {
    res.json(await meteorsService.getMeteorsData(request));
  } catch (err) {
    console.error('Error while getting meteors data ', err.message);
    next(err);
  }
});

module.exports = router;
