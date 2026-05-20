import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { useStores } from '../store';
import { Poster, Loader, ErrorMessage } from '../components';

export const SearchPage = observer(function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const { searchStore } = useStores();

  useEffect(() => {
    searchStore.search(query);
  }, [query, searchStore]);

  if (searchStore.isLoading) return <Loader />;
  if (searchStore.error) return <ErrorMessage message={searchStore.error} />;

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        {query ? `Results for "${query}"` : 'Search for movies'}
      </Typography>

      {searchStore.movies.length === 0 && query ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 12,
            gap: 2,
          }}
        >
          <SearchOffIcon sx={{ fontSize: 80, color: 'text.secondary', opacity: 0.35 }} />

          <Typography color="text.secondary" variant="h6">
            Nothing found for &ldquo;{query}&rdquo;
          </Typography>

          <Typography color="text.secondary" variant="body2">
            Try a different title or check the spelling
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {searchStore.movies.map((movie) => (
            <Poster key={movie.id} movie={movie} />
          ))}
        </Box>
      )}
    </Container>
  );
});
