// pages/Home.js
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

 return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Välkommen till Hotell Lunden
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        Boka hotellrum eller konferensrum smidigt – som admin eller användare.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained" size="large" onClick={() => navigate('/login')}>
          Logga in
        </Button>
        <Button variant="outlined" size="large" onClick={() => navigate('/register')}>
          Registrera dig
        </Button>
      </Box>
    </Container>
  );
}
