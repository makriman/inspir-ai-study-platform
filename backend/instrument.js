/**
 * Sentry Instrumentation for Express Backend
 * This file MUST be imported first in server.js
 */

const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "https://42d228242cefd6da6bc1eafc569df65d@o4510601425190912.ingest.de.sentry.io/4510601428795472",

  // Performance Monitoring
  tracesSampleRate: 1.0,

  // Enable PII data (IP addresses, user info)
  sendDefaultPii: true,

  // Environment
  environment: process.env.NODE_ENV || "production",

  // Integrations
  integrations: [
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],
});

module.exports = Sentry;
