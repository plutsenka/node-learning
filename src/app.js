const express = require('express');
const path = require('node:path');
const apiRouter = require('./routes/apiRouter');
const webRouter = require('./routes/webRouter');
const config = require('./config/config');
const errorHandler = require('./middlewares/errorHandler');
const pageNotFoundHandler = require('./middlewares/pageNotFoundHandler');
const nunjucks = require('nunjucks');

const app = express();

nunjucks.configure(path.resolve(__dirname, './views'), {
  autoescape: true,
  express: app,
  noCache: true,
});

app.set('view engine', 'html');

const { port } = config.server;

app.use(express.json());

app.use('/', webRouter);
app.use('/api', apiRouter);
app.use('*', pageNotFoundHandler);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Starting Proxy at port ${port}`);
});
