const express = require('express');
const meteorsDataRouter = require('./routes/meteorsData');
require('dotenv').config();

const app = express();

const { PORT } = process.env;

app.use('/meteors', meteorsDataRouter);

app.listen(PORT, () => {
  console.log(`Starting Proxy at port ${PORT}`);
});
