// pages/Home.js
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>Välkommen till Hotell Lunden</Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Din plats för bekväma hotellrum och flexibla konferensbokningar.
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mr: 2 }}
        >
          Logga in
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate('/register')}
        >
          Registrera
        </Button>
      </Box>
    </Container>
  );
}
