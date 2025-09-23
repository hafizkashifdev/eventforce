import Link from 'next/link';
import { Box, Typography, Button, Container } from '@mui/material';
import { Home, ArrowBack } from '@mui/icons-material';

export default function NotFound() {
  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 'bold', color: '#52A4C1', mb: 2 }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ mb: 2, color: '#333' }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          component={Link}
          href="/"
          variant="contained"
          startIcon={<Home />}
          sx={{
            backgroundColor: '#52A4C1',
            '&:hover': { backgroundColor: '#4A8FA8' }
          }}
        >
          Go Home
        </Button>
        
        <Button
          component={Link}
          href="/support"
          variant="outlined"
          startIcon={<ArrowBack />}
          sx={{
            borderColor: '#52A4C1',
            color: '#52A4C1',
            '&:hover': {
              backgroundColor: '#52A4C1',
              color: 'white'
            }
          }}
        >
          Get Support
        </Button>
      </Box>
    </Container>
  );
}
