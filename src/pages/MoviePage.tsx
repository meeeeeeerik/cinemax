import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Chip,
  Button,
  Avatar,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useStores } from '../store';
import { MovieCarousel, Loader, ErrorMessage } from '../components';

const BACKDROP_BASE = 'https://image.tmdb.org/t/p/w1280';
const POSTER_BASE = 'https://image.tmdb.org/t/p/w500';
const PROFILE_BASE = 'https://image.tmdb.org/t/p/w185';

export const MoviePage = observer(function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const { movieDetailStore } = useStores();
  const [trailerOpen, setTrailerOpen] = useState(false);

  useEffect(() => {
    if (id) movieDetailStore.fetchMovie(id);
    return () => setTrailerOpen(false);
  }, [id, movieDetailStore]);

  if (movieDetailStore.isLoading) return <Loader />;
  if (movieDetailStore.error) return <ErrorMessage message={movieDetailStore.error} />;

  const movie = movieDetailStore.movie;
  if (!movie) return null;

  const trailer = movie.videos.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer');
  const cast = movie.credits.cast.slice(0, 24);
  const directors = movie.credits.crew.filter((c) => c.job === 'Director');
  const writers = movie.credits.crew.filter((c) =>
    ['Screenplay', 'Writer', 'Story'].includes(c.job)
  );
  const similar = movie.similar.results.slice(0, 20);

  const year = movie.release_date?.split('-')[0];
  const hours = movie.runtime ? Math.floor(movie.runtime / 60) : 0;
  const mins = movie.runtime ? movie.runtime % 60 : 0;
  const runtimeStr = movie.runtime > 0 ? (hours > 0 ? `${hours}h ${mins}m` : `${mins}m`) : null;

  return (
    <Box>
      {movie.backdrop_path && (
        <Box
          sx={{
            position: 'relative',
            height: { xs: '38vh', sm: '45vh', md: '58vh' },
            backgroundImage: `url(${BACKDROP_BASE}${movie.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, #0d0d0d 100%)',
            },
          }}
        />
      )}

      <Container
        maxWidth="xl"
        sx={{
          mt: movie.backdrop_path ? { xs: -6, sm: -10, md: -16 } : 4,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Grid container spacing={{ xs: 3, md: 5 }}>
          <Grid item xs={12} sm={4} md={3}>
            <Box
              component="img"
              src={
                movie.poster_path
                  ? `${POSTER_BASE}${movie.poster_path}`
                  : 'https://placehold.co/300x450/181818/666?text=No+Poster'
              }
              alt={movie.title}
              sx={{
                width: '100%',
                maxWidth: { xs: 200, sm: '100%' },
                borderRadius: 2.5,
                boxShadow: '0 20px 60px rgba(0,0,0,0.85)',
                display: 'block',
                mx: { xs: 'auto', sm: 0 },
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            />
          </Grid>

          <Grid item xs={12} sm={8} md={9}>
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ mb: 0.5, lineHeight: 1.15, fontSize: { xs: '1.6rem', md: '2.125rem' } }}
            >
              {movie.title}
            </Typography>

            {movie.tagline && (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 2, fontStyle: 'italic' }}
              >
                {movie.tagline}
              </Typography>
            )}

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              flexWrap="wrap"
              gap={1}
              sx={{ mb: 2.5 }}
            >
              {movie.vote_average > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                  <StarIcon sx={{ color: '#fbbf24', fontSize: 20 }} />

                  <Typography fontWeight={700} fontSize="1rem">
                    {movie.vote_average.toFixed(1)}
                  </Typography>

                  <Typography color="text.secondary" fontSize="0.8rem">
                    /10
                  </Typography>
                </Box>
              )}

              {runtimeStr && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                  <AccessTimeIcon sx={{ color: 'text.secondary', fontSize: 18 }} />

                  <Typography color="text.secondary" fontSize="0.9rem">
                    {runtimeStr}
                  </Typography>
                </Box>
              )}

              {year && (
                <Typography
                  color="text.secondary"
                  fontSize="0.9rem"
                  sx={{
                    px: 1.2,
                    py: 0.2,
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 1,
                  }}
                >
                  {year}
                </Typography>
              )}
            </Stack>

            {movie.genres?.length > 0 && (
              <Stack direction="row" flexWrap="wrap" gap={0.8} sx={{ mb: 3 }}>
                {movie.genres.map((g) => (
                  <Chip
                    key={g.id}
                    label={g.name}
                    size="small"
                    variant="outlined"
                    sx={{ borderColor: 'primary.main', color: 'primary.main', fontWeight: 600 }}
                  />
                ))}
              </Stack>
            )}

            {movie.overview && (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 3, lineHeight: 1.8, maxWidth: 680 }}
              >
                {movie.overview}
              </Typography>
            )}

            {(directors.length > 0 || writers.length > 0) && (
              <Stack spacing={0.5} sx={{ mb: 3 }}>
                {directors.length > 0 && (
                  <Typography variant="body2" color="text.secondary">
                    <Box component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>
                      Director:{' '}
                    </Box>
                    {directors.map((d) => d.name).join(', ')}
                  </Typography>
                )}

                {writers.length > 0 && (
                  <Typography variant="body2" color="text.secondary">
                    <Box component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>
                      Screenplay:{' '}
                    </Box>
                    {writers
                      .slice(0, 3)
                      .map((w) => w.name)
                      .join(', ')}
                  </Typography>
                )}
              </Stack>
            )}

            {trailer && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<PlayArrowIcon />}
                onClick={() => setTrailerOpen(true)}
                sx={{ px: 3.5, py: 1.1, fontSize: '0.95rem' }}
              >
                Watch Trailer
              </Button>
            )}
          </Grid>
        </Grid>

        {cast.length > 0 && (
          <Box sx={{ mt: 7 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
              <Box
                sx={{
                  width: 4,
                  height: 22,
                  borderRadius: 1,
                  bgcolor: 'primary.main',
                  flexShrink: 0,
                }}
              />

              <Typography variant="h6" fontWeight={700}>
                Cast
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                overflowX: 'auto',
                pb: 1,
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
              }}
            >
              {cast.map((person) => (
                <Box
                  key={`${person.id}-${person.character}`}
                  sx={{ flexShrink: 0, width: 90, textAlign: 'center' }}
                >
                  <Avatar
                    src={person.profile_path ? `${PROFILE_BASE}${person.profile_path}` : undefined}
                    sx={{
                      width: 72,
                      height: 72,
                      mx: 'auto',
                      mb: 1,
                      border: '2px solid rgba(255,255,255,0.1)',
                    }}
                  />

                  <Typography
                    variant="caption"
                    fontWeight={700}
                    display="block"
                    sx={{ lineHeight: 1.3, mb: 0.3 }}
                    noWrap
                  >
                    {person.name}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="primary.main"
                    display="block"
                    noWrap
                    sx={{ fontSize: '0.6rem' }}
                  >
                    {person.character}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {similar.length > 0 && (
          <Box sx={{ mt: 7 }}>
            <MovieCarousel title="Similar Movies" movies={similar} />
          </Box>
        )}
      </Container>

      <Dialog
        open={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { bgcolor: '#111', borderRadius: 2, overflow: 'hidden' } }}
      >
        <DialogContent sx={{ p: 0, position: 'relative', aspectRatio: '16/9' }}>
          <IconButton
            onClick={() => setTrailerOpen(false)}
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 10,
              bgcolor: 'rgba(0,0,0,0.6)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.85)' },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          {trailer && (
            <Box
              component="iframe"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              sx={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
});
