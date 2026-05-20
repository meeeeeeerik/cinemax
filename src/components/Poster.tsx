import React from 'react';
import { Box, Card, CardActionArea, CardMedia, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../types';

const POSTER_BASE = 'https://image.tmdb.org/t/p/w342';
const FALLBACK = 'https://placehold.co/150x225/181818/666?text=No+Image';

interface PosterProps {
  movie: Movie;
}

export function Poster({ movie }: PosterProps) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/movie/${movie.id}`);
  }

  return (
    <Card
      onClick={handleClick}
      sx={{
        width: 150,
        flexShrink: 0,
        bgcolor: 'background.paper',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 2,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'box-shadow 0.25s ease, border-color 0.25s ease, filter 0.25s ease',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: '0 0 0 1px #22c55e, 0 0 20px rgba(34,197,94,0.3)',
          filter: 'brightness(1.12)',
        },
      }}
    >
      <CardActionArea sx={{ height: '100%' }} disableRipple>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="225"
            image={movie.poster_path ? `${POSTER_BASE}${movie.poster_path}` : FALLBACK}
            alt={movie.title}
            sx={{ display: 'block' }}
          />

          {movie.vote_average > 0 && (
            <Box
              sx={{
                position: 'absolute',
                top: 6,
                right: 6,
                bgcolor: 'rgba(0,0,0,0.75)',
                backdropFilter: 'blur(4px)',
                borderRadius: 1,
                px: 0.6,
                py: 0.25,
                display: 'flex',
                alignItems: 'center',
                gap: 0.3,
              }}
            >
              <StarIcon sx={{ fontSize: 10, color: '#fbbf24' }} />

              <Typography
                sx={{ fontSize: '0.65rem', fontWeight: 700, lineHeight: 1, color: 'white' }}
              >
                {movie.vote_average.toFixed(1)}
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 100%)',
              p: 1,
              pt: 3,
              opacity: 0,
              transition: 'opacity 0.25s ease',
              '.MuiCard-root:hover &': { opacity: 1 },
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: 'white', fontWeight: 700, lineHeight: 1.3, display: 'block' }}
            >
              {movie.title}
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}
