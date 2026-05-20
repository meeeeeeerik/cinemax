import React from 'react';
import { Box, Container, IconButton, Typography } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';

const socialLinks = [
  { href: 'https://t.me/meeeeeeerik', icon: <TelegramIcon /> },
  { href: 'https://github.com/meeeeeeerik', icon: <GitHubIcon /> },
];

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        py: 4,
        borderTop: '1px solid rgba(255,255,255,0.05)',
        bgcolor: 'rgba(0,0,0,0.3)',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Cinemax — powered by TMDB
          </Typography>

          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {socialLinks.map(({ href, icon }) => (
              <IconButton
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'text.secondary',
                  transition: 'all 0.3s ease',
                  '&:hover': { color: 'primary.main', transform: 'translateY(-3px)' },
                }}
              >
                {icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
