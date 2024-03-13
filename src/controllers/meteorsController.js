const meteorsService = require('../services/meteorsData');
const MeteorsRequestDto = require('../dto/meteorRequestDto');

const getMeteors = async (req, res, next) => {
  const { startDate, endDate, countOnly, wereDangerous } = new MeteorsRequestDto(req.query);

  try {
    res.json(await meteorsService.getMeteorsData(startDate, endDate, countOnly, wereDangerous));
  } catch (err) {
    console.error('Error while getting meteors data ', err.message);
    next(err);
  }
};

module.exports = {
  getMeteors,
};
