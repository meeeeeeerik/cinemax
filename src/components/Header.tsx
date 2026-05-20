import React, { useState, useRef } from 'react';
import { AppBar, Toolbar, Box, InputBase, IconButton, Typography, Container } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { Link, useNavigate } from 'react-router-dom';

const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 24,
  backgroundColor: alpha(theme.palette.common.white, 0.07),
  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.11) },
  '&:focus-within': {
    backgroundColor: alpha(theme.palette.common.white, 0.11),
    borderColor: theme.palette.primary.main,
  },
  transition: 'all 0.25s ease',
  display: 'flex',
  alignItems: 'center',
  width: 220,
  [theme.breakpoints.down('sm')]: { width: 170 },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  flex: 1,
  '& .MuiInputBase-input': {
    padding: theme.spacing(0.875, 0, 0.875, 1.5),
    fontSize: '0.875rem',
    width: '100%',
    '&::placeholder': { color: theme.palette.text.secondary },
  },
}));

export function Header() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchValue(value);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (value.trim()) {
        navigate(`/search?q=${encodeURIComponent(value.trim())}`);
      }
    }, 800);
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'rgba(13,13,13,0.88)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ gap: 2, px: { xs: 0 }, minHeight: { xs: 56, sm: 64 } }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            <MovieFilterIcon sx={{ color: 'primary.main', fontSize: 30 }} />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: 'white',
                letterSpacing: '-0.5px',
                display: { xs: 'none', sm: 'block' },
                '& span': { color: 'primary.main' },
              }}
            >
              Cine<span>max</span>
            </Typography>
          </Box>

          <SearchWrapper>
            <StyledInputBase
              placeholder="Search movies…"
              value={searchValue}
              onChange={handleChange}
            />

            <IconButton size="small" sx={{ mr: 0.5, color: 'text.secondary', flexShrink: 0 }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </SearchWrapper>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
