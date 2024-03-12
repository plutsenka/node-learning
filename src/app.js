const express = require('express');
const meteorsDataRouter = require('./routes/meteorsData');
const userDataRouter = require('./routes/userData');
const config = require('./config/config');

const app = express();

const { port } = config.server;

app.use(express.json());

app.use('/meteors', meteorsDataRouter);
app.use('/user', userDataRouter);

app.listen(port, () => {
  console.log(`Starting Proxy at port ${port}`);
});
