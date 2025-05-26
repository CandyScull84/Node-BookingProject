// pages/Home.js
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../constants/sharedData'; // Justera sökvägen till din bakgrundsbild
export default function HeroPage() {
  const navigate = useNavigate();

 return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Typography variant="h2" sx={{ mb: 2, backgroundColor: 'rgba(0,0,0,0.6)', px: 2 }}>
        Välkommen till Hotell Lunden
      </Typography>
      <Typography variant="h5" sx={{ mb: 4, backgroundColor: 'rgba(0,0,0,0.5)', px: 2 }}>
        Boka hotellrum eller konferensrum smidigt – som admin eller användare.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" size="large" onClick={() => navigate('/login')}>
          Logga in
        </Button>
        <Button variant="outlined" size="large" onClick={() => navigate('/register')} sx={{ color: 'white', borderColor: 'white' }}>
          Registrera dig
        </Button>
      </Box>
    </Box>
  );
}
