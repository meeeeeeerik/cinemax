import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { StoreContext, movieStore, searchStore, movieDetailStore } from './store';
import { App } from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <StoreContext.Provider value={{ movieStore, searchStore, movieDetailStore }}>
          <App />
        </StoreContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
