import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import 'katex/dist/katex.min.css';
import './index.css';
import App from './App';
import { ProgressProvider } from './store/progress';
import { ThemeProvider } from './store/theme';
import { SettingsProvider } from './store/settings';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <SettingsProvider>
      <ProgressProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </ProgressProvider>
      </SettingsProvider>
    </ThemeProvider>
  </StrictMode>,
);
