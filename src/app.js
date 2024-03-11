const express = require('express');
const meteorsDataRouter = require('./routes/meteorsData');
const userDataRouter = require('./routes/userData');
require('dotenv').config();

const app = express();

const { PORT } = process.env;

app.use(express.json());

app.use('/meteors', meteorsDataRouter);
app.use('/user', userDataRouter);

app.listen(PORT, () => {
  console.log(`Starting Proxy at port ${PORT}`);
});
