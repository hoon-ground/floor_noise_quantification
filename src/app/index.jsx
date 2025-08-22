import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@app/App.jsx';
import { GlobalStyle } from '@shared/ui/GlobalStyle.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>
);
