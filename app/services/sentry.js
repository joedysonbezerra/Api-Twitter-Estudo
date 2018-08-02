const Raven = require('raven');
const sentryConfig = require('../../config/sentry');

const ravenClient = Raven.config(sentryConfig.sentryDsn).install();

module.exports = ravenClient;
