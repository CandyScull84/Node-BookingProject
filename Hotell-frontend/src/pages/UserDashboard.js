// pages/UserDashboard.js
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Välkommen till Hotell Lunden
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
        <Button variant="contained" onClick={() => navigate('/rooms')}>
          Visa lediga rum
        </Button>
        <Button variant="contained" onClick={() => navigate('/booking')}>
          Mina bokningar
        </Button>
      </Box>
    </Container>
  );
}
