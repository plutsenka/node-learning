const axios = require('axios');
const moment = require('moment/moment');
require('dotenv').config();

const { API_BASE_URL } = process.env;
const { API_KEY } = process.env;
const START_DATE = moment().format('YYYY-MM-DD');
const END_DATE = moment().add(7, 'days').format('YYYY-MM-DD');
const API_SERVICE_URL = `${API_BASE_URL}?start_date=${START_DATE}&end_date=${END_DATE}&api_key=${API_KEY}`;

async function getMeteorsData() {
  let result = [];

  const response = await axios.get(API_SERVICE_URL);
  const meteorsByDate = response.data.near_earth_objects;

  Object.keys(meteorsByDate).forEach((key) => {
    const meteors = meteorsByDate[key];

    meteors.forEach((meteor) => {
      result.push({
        id: meteor.id,
        name: meteor.name,
        estimated_diameter_min: meteor.estimated_diameter.meters.estimated_diameter_min,
        estimated_diameter_max: meteor.estimated_diameter.meters.estimated_diameter_max,
        is_potentially_hazardous_asteroid: meteor.is_potentially_hazardous_asteroid,
        close_approach_date_full: meteor.close_approach_data[0].close_approach_date_full,
        relative_velocity: meteor.close_approach_data[0].relative_velocity.kilometers_per_second,
      });
    });
  });

  return { ...result };
}

module.exports = {
  getMeteorsData,
};
