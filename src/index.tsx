import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ThemeProvider from './contexts/themes';
import { CharacterStateProvider } from './contexts/characters';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <CharacterStateProvider>
        <App />
      </CharacterStateProvider>
    </ThemeProvider>
  </React.StrictMode>
);
