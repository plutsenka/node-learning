const axios = require('axios');
const { format, add } = require('date-fns');
const meteorMapper = require('../utils/meteorMapper');
const config = require('../config/config');

const { baseUrl, meteorsDataEndpoint, apiKey } = config.nasaApi;
const DEFAULT_INTERVAL = 7;

async function getMeteorsData(requestedStartDate, requestedEndDate, countOnly, wereDangerous) {
  const startDate = requestedStartDate ? new Date(requestedStartDate) : new Date();
  const endDate = requestedEndDate ? new Date(requestedEndDate) : add(startDate, { days: DEFAULT_INTERVAL });

  const meteorsData = await axios.get(baseUrl + meteorsDataEndpoint, {
    params: {
      start_date: format(startDate, 'yyyy-MM-dd'),
      end_date: format(endDate, 'yyyy-MM-dd'),
      api_key: apiKey,
    },
  });

  const meteorsByDate = meteorsData.data.near_earth_objects;

  // eslint-disable-next-line
  const formattedMeteors = Object.entries(meteorsByDate).reduce((acc, [key, meteors]) => {
    return [...acc, ...meteors.map((meteor) => meteorMapper.mapMeteor(meteor))];
  }, []);

  const hasDangerous = formattedMeteors.some((meteor) => meteor.is_potentially_hazardous_asteroid);

  let response = { count: formattedMeteors.length };

  if (!countOnly) {
    response.meteors = formattedMeteors;
  }

  if (wereDangerous) {
    response.wereDangerous = hasDangerous;
  }

  return response;
}

module.exports = {
  getMeteorsData,
};
