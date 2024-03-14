require('dotenv').config();

const config = {
  nasaApi: {
    baseUrl: process.env.API_BASE_URL,
    meteorsDataEndpoint: process.env.METEORS_ENDPOINT,
    marsPhotoEndpoint: process.env.MARS_PHOTO_ENDPOINT,
    manifestEndpoint: process.env.MANIFESTS_ENDPOINT,
    apiKey: process.env.API_KEY,
  },
  server: {
    port: process.env.PORT || 4000,
  },
};

module.exports = config;
