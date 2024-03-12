const axios = require('axios');
const { format, add } = require('date-fns');
const meteorMapper = require('../utils/meteorMapper');
require('dotenv').config();

const { API_BASE_URL, API_KEY } = process.env;
const DEFAULT_INTERVAL = 7;

async function getMeteorsData(requestedStartDate, requestedEndDate, countOnly, wereDangerous) {
  const startDate = requestedStartDate ?? new Date();
  const endDate = requestedEndDate ?? add(startDate, { days: DEFAULT_INTERVAL });

  let formattedMeteors = [];
  let hasDangerous = false;

  const meteorsData = await axios.get(API_BASE_URL, {
    params: {
      start_date: format(startDate, 'yyyy-MM-dd'),
      end_date: format(endDate, 'yyyy-MM-dd'),
      api_key: API_KEY,
    },
  });

  const meteorsByDate = meteorsData.data.near_earth_objects;


  Object.keys(meteorsByDate).forEach((key) => {
    const meteors = meteorsByDate[key];

    meteors.forEach((meteor) => {
      formattedMeteors.push(meteorMapper.mapMeteor(meteor));

      if (meteor.is_potentially_hazardous_asteroid && !hasDangerous) {
        hasDangerous = true;
      }
    });
  });

  let response = { count: formattedMeteors.length };

  if (!countOnly) {
    response.meteors = formattedMeteors;
  }

  if (wereDangerous) {
    response.wereDagerous = hasDangerous;
  }

  return response;
}

module.exports = {
  getMeteorsData,
};
