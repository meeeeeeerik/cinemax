import React from 'react';
import { Box, Typography } from '@mui/material';
import { Movie } from '../types';
import { Poster } from './Poster';

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  accent?: string;
}

export function MovieCarousel({ title, movies, accent }: MovieCarouselProps) {
  if (!movies.length) return null;

  return (
    <Box sx={{ mb: 5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        <Box
          sx={{
            width: 4,
            height: 22,
            borderRadius: 1,
            bgcolor: accent ?? 'primary.main',
            flexShrink: 0,
          }}
        />

        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '-0.3px' }}>
          {title}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          overflowX: 'auto',
          pb: 1,
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
        }}
      >
        {movies.map((movie) => (
          <Poster key={movie.id} movie={movie} />
        ))}
      </Box>
    </Box>
  );
}
