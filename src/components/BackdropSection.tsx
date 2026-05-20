import React from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../types';

const BACKDROP_BASE = 'https://image.tmdb.org/t/p/w1280';

interface BackdropSectionProps {
  movie: Movie;
}

export function BackdropSection({ movie }: BackdropSectionProps) {
  const navigate = useNavigate();

  if (!movie.backdrop_path) return null;

  function handleDetails() {
    navigate(`/movie/${movie.id}`);
  }

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '58vh', sm: '65vh', md: '78vh' },
        backgroundImage: `url(${BACKDROP_BASE}${movie.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        mb: 7,
        display: 'flex',
        alignItems: 'flex-end',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.1) 100%)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(to bottom, transparent, #0d0d0d)',
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, pb: { xs: 5, md: 8 } }}>
        <Box sx={{ maxWidth: { xs: '100%', sm: 520 } }}>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontWeight: 800,
              letterSpacing: 2,
              display: 'block',
              mb: 1,
            }}
          >
            Featured Today
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              lineHeight: 1.1,
              mb: 2,
              textShadow: '0 2px 12px rgba(0,0,0,0.9)',
              fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' },
            }}
          >
            {movie.title}
          </Typography>

          {movie.overview && (
            <Typography
              variant="body2"
              sx={{
                color: 'grey.400',
                mb: 3,
                lineHeight: 1.7,
                display: { xs: 'none', sm: 'block' },
                maxWidth: 440,
              }}
            >
              {movie.overview.length > 200 ? `${movie.overview.slice(0, 200)}…` : movie.overview}
            </Typography>
          )}

          <Stack direction="row" spacing={1.5} flexWrap="wrap" gap={1}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PlayArrowIcon />}
              onClick={handleDetails}
              sx={{ px: 3, py: 1, fontSize: '0.95rem' }}
            >
              View Details
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              startIcon={<InfoOutlinedIcon />}
              onClick={handleDetails}
              sx={{
                px: 3,
                py: 1,
                fontSize: '0.95rem',
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              More Info
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
