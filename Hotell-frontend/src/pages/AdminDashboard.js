// pages/AdminDashboard.js
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Adminpanel – Hotell Lunden
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
        <Button variant="contained" onClick={() => navigate('/admin/rooms')}>
          Hantera Rum
        </Button>
        <Button variant="contained" onClick={() => navigate('/booking')}>
          Hantera Bokningar
        </Button>
        <Button variant="contained" onClick={() => navigate('/admin/users')}>
          Hantera Användare
        </Button>
      </Box>
    </Container>
  );
}
