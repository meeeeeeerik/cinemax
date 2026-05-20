import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { Header, Footer } from './components';
import { MainPage, MoviePage, SearchPage } from './pages';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      <ScrollToTop />

      <Header />

      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>

      <Footer />
    </Box>
  );
}
