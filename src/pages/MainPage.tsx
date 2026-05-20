import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Container } from '@mui/material';
import { useStores } from '../store';
import { BackdropSection, MovieCarousel, Loader, ErrorMessage } from '../components';

const sections = [
  { key: 'popular' as const, title: 'Popular', accent: '#22c55e' },
  { key: 'trending' as const, title: 'Trending This Week', accent: '#f97316' },
  { key: 'topRated' as const, title: 'Top Rated', accent: '#facc15' },
  { key: 'upcoming' as const, title: 'Upcoming', accent: '#60a5fa' },
  { key: 'action' as const, title: 'Action', accent: '#ef4444' },
  { key: 'adventure' as const, title: 'Adventure', accent: '#10b981' },
  { key: 'animation' as const, title: 'Animation', accent: '#a78bfa' },
  { key: 'comedy' as const, title: 'Comedy', accent: '#fb923c' },
  { key: 'horror' as const, title: 'Horror', accent: '#dc2626' },
  { key: 'thriller' as const, title: 'Thriller', accent: '#64748b' },
  { key: 'fantasy' as const, title: 'Fantasy', accent: '#c084fc' },
  { key: 'history' as const, title: 'History', accent: '#d97706' },
] as const;

export const MainPage = observer(function MainPage() {
  const { movieStore } = useStores();

  useEffect(() => {
    movieStore.fetchAll();
  }, [movieStore]);

  if (movieStore.isLoading) return <Loader />;
  if (movieStore.error) return <ErrorMessage message={movieStore.error} />;

  return (
    <Box>
      {movieStore.backdropMovie && <BackdropSection movie={movieStore.backdropMovie} />}

      <Container maxWidth="xl" sx={{ pb: 4 }}>
        {sections.map(({ key, title, accent }) => (
          <MovieCarousel key={key} title={title} movies={movieStore[key]} accent={accent} />
        ))}
      </Container>
    </Box>
  );
});
