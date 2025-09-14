'use client';

import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/lib/emotion-cache';

// Create a cache for emotion - use singleton pattern to ensure consistency
let cache: any = null;

function getEmotionCache() {
  if (!cache) {
    cache = createEmotionCache();
  }
  return cache;
}

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-outfit), Arial, Helvetica, sans-serif',
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: 'var(--font-outfit), Arial, Helvetica, sans-serif',
        },
      },
    },
  },
});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={getEmotionCache()}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
}
