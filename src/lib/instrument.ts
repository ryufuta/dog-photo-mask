import * as Sentry from '@sentry/react';

const dsn = import.meta.env.VITE_SENTRY_DSN;

Sentry.init({
  dsn,
  enabled: import.meta.env.PROD && Boolean(dsn),
  dataCollection: {
    userInfo: false,
    urlQueryParams: false,
  },
});
