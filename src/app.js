const express = require('express');
const meteorsDataRouter = require('./routes/meteorsRoute');
const userDataRouter = require('./routes/userRoute');
const config = require('./config/config');
const errorHandler = require('./middlewares/errorHandler');
const pageNotFoundHandler = require('./middlewares/pageNotFoundHandler');
const Sentry = require('@sentry/node');
const { nodeProfilingIntegration } = require('@sentry/profiling-node');

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

const { port } = config.server;

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use('/meteors', meteorsDataRouter);
app.use('/user', userDataRouter);
app.use('*', pageNotFoundHandler);

app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Starting Proxy at port ${port}`);
});
