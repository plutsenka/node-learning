const axios = require('axios');
const { format, subDays } = require('date-fns');
require('dotenv').config();

const { API_BASE_URL, MARS_PHOTO_ENDPOINT, MANIFESTS_ENDPOINT } = process.env;
const { API_KEY } = process.env;

async function getRoverPhoto() {
  const manifestResponse = await axios.get(API_BASE_URL + MANIFESTS_ENDPOINT, {
    params: {
      api_key: API_KEY,
    },
  });

  const maxDate = new Date(manifestResponse.data.photo_manifest.max_date);
  // for some reason maxDate doesn't work as expected, let's use previous day
  const earthDate = format(subDays(maxDate, 1), 'yyyy-MM-dd');

  const photoResponse = await axios.get(API_BASE_URL + MARS_PHOTO_ENDPOINT, {
    params: {
      earth_date: earthDate,
      api_key: API_KEY,
    },
  });

  const photos = photoResponse.data.photos;
  const lastPhoto = photos[photos.length - 1]; // retrieve last element of array

  return lastPhoto.img_src;
}

module.exports = {
  getRoverPhoto,
};
