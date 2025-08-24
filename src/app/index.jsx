import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@app/App.jsx';
import { GlobalStyle } from '@shared/ui/GlobalStyle.js';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@shared/lib/react-query';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <App />
    </QueryClientProvider>
  </StrictMode>
);
