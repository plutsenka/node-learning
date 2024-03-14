const express = require('express');
const path = require('node:path');
const apiRouter = require('./routes/apiRouter');
const webRouter = require('./routes/webRouter');
const config = require('./config/config');
const errorHandler = require('./middlewares/errorHandler');
const pageNotFoundHandler = require('./middlewares/pageNotFoundHandler');
const Sentry = require('@sentry/node');
const { nodeProfilingIntegration } = require('@sentry/profiling-node');
const nunjucks = require('nunjucks');

const app = express();

Sentry.init({
  dsn: config.server.sentryDsn,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    nodeProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

nunjucks.configure(path.resolve(__dirname, './views'), {
  autoescape: true,
  express: app,
  noCache: true,
});

app.set('view engine', 'html');

const { port } = config.server;

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use('/', webRouter);
app.use('/api', apiRouter);
app.use('*', pageNotFoundHandler);

app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Starting Proxy at port ${port}`);
});
