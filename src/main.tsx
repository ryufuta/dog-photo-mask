import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import App from './App.tsx';

import './index.css';

import './lib/instrument.ts';

const root = createRoot(document.getElementById('root')!, {
  onUncaughtError: (error, errorInfo) =>
    Sentry.reactErrorHandler()(error, {
      componentStack: errorInfo.componentStack ?? null,
    }),
  onRecoverableError: Sentry.reactErrorHandler(),
});

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
