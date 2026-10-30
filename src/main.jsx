import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Self-hosted fonts (no third-party font requests)
import '@fontsource/libre-caslon-display/400.css';
import '@fontsource/libre-caslon-text/400.css';
import '@fontsource/libre-caslon-text/400-italic.css';
import '@fontsource/libre-caslon-text/700.css';
import '@fontsource/mukta-malar/400.css';
import '@fontsource/mukta-malar/500.css';
import '@fontsource/tiro-tamil/400.css';

import './index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
