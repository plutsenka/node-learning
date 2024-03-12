const axios = require('axios');
const { format, subDays } = require('date-fns');
const config = require('../config/config');

const { baseUrl, marsPhotoEndpoint, manifestEndpoint, apiKey } = config.nasaApi;
const DATE_FORMAT = 'yyyy-MM-dd';
const ONE_DAY_OFFSET = 1;

async function getRoverPhoto() {
  const manifestResponse = await axios.get(baseUrl + manifestEndpoint, {
    params: {
      api_key: apiKey,
    },
  });

  const maxDate = new Date(manifestResponse.data.photo_manifest.max_date);
  // for some reason maxDate doesn't work as expected, let's use previous day
  const earthDate = format(subDays(maxDate, ONE_DAY_OFFSET), DATE_FORMAT);

  const photoResponse = await axios.get(baseUrl + marsPhotoEndpoint, {
    params: {
      earth_date: earthDate,
      api_key: apiKey,
    },
  });

  const photos = photoResponse.data.photos;
  const lastPhoto = photos[photos.length - 1]; // retrieve last element of array

  return lastPhoto.img_src;
}

module.exports = {
  getRoverPhoto,
};
