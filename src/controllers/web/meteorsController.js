const meteorsService = require('../../services/meteorsData');
const MeteorsRequestDto = require('../../dto/meteorRequestDto');

const getMeteors = async (req, res, next) => {
  const { startDate, endDate, countOnly, wereDangerous } = new MeteorsRequestDto(req.query);

  try {
    const data = await meteorsService.getMeteorsData(startDate, endDate, countOnly, wereDangerous);
    res.render('meteors.html', data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMeteors,
};
