const express = require('express');
const meteorsDataRouter = require('./routes/meteorsRoute');
const userDataRouter = require('./routes/userRoute');
const config = require('./config/config');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

const { port } = config.server;

app.use(express.json());

app.use('/meteors', meteorsDataRouter);
app.use('/user', userDataRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Starting Proxy at port ${port}`);
});
