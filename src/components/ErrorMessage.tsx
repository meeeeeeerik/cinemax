import React from 'react';
import { Box, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message = 'Something went wrong' }: ErrorMessageProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 2,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 72, color: 'error.main', opacity: 0.6 }} />

      <Typography variant="h6" color="text.secondary" textAlign="center">
        {message}
      </Typography>
    </Box>
  );
}
