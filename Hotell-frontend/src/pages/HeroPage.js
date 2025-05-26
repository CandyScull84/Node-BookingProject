// pages/HeroPage.js
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function HeroPage() {
  const navigate = useNavigate();

 return (
     <Box
      sx={{
        height: '100vh',
        backgroundImage: `url('/Hero.jpg')`, // ✅ Använd absolut sökväg från public/
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
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
        Hotell Lunden
      </Typography>
      <Typography variant="h5" sx={{ mb: 4, backgroundColor: 'rgba(0,0,0,0.5)', px: 2 }}>
        Boka hotell- och konferensrum smidigt
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" onClick={() => navigate('/login')}>
          Logga in
        </Button>
        <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }} onClick={() => navigate('/register')}>
          Registrera
        </Button>
      </Box>
    </Box>
  );
}
