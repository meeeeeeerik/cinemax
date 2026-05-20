import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export function Loader() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
      }}
    >
      <CircularProgress color="primary" size={52} thickness={3} />
    </Box>
  );
}
