/**
 * Sentry Edge Runtime Configuration
 * Tracks errors in Edge functions and middleware
 */

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: "https://38009d1665db0ea29e26eb085c7d94f9@o4510601425190912.ingest.de.sentry.io/4510601442754640",
  tracesSampleRate: 1.0,
})
