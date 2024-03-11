const axios = require('axios');
const { format, add } = require('date-fns');
const meteorFormatter = require('../utils/meteorFormatter');
require('dotenv').config();

const { API_BASE_URL, API_KEY } = process.env;

async function getMeteorsData(request) {
  const startDate = request.startDate ?? new Date();
  const endDate = request.endDate ?? add(startDate, {days: 7});

  let formattedMeteors = [];
  let wereDangerous = false;

  const meteorsData = await axios.get(API_BASE_URL, {
    'params': {
      'start_date': format(startDate, 'yyyy-MM-dd'),
      'end_date': format(endDate, 'yyyy-MM-dd'),
      'api_key': API_KEY,
    },
  });

  const meteorsByDate = meteorsData.data.near_earth_objects;

  Object.keys(meteorsByDate).forEach((key) => {
    const meteors = meteorsByDate[key];

    meteors.forEach((meteor) => {
      formattedMeteors.push(meteorFormatter.format(meteor));

      if (meteor.is_potentially_hazardous_asteroid && !wereDangerous) {
        wereDangerous = true;
      }
    });
  });

  let response = { 'count': formattedMeteors.length };

  if (!request.countOnly) {
    response.meteors = formattedMeteors;
  }

  if (request.wereDangerous) {
    response.wereDagerous = wereDangerous;
  }

  return response;
}

module.exports = {
  getMeteorsData,
};
