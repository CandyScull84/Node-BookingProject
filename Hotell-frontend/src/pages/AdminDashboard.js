// // pages/AdminDashboard.js
// import { Container, Typography, Button, Box } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// export default function AdminDashboard() {
//   const navigate = useNavigate();

//   return (
//     <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
//       <Typography variant="h4" gutterBottom>
//         Adminpanel – Hotell Lunden
//       </Typography>
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
//         <Button variant="contained" onClick={() => navigate('/admin/rooms')}>
//           Hantera Rum
//         </Button>
//         <Button variant="contained" onClick={() => navigate('/booking')}>
//           Hantera Bokningar
//         </Button>
//         <Button variant="contained" onClick={() => navigate('/admin/users')}>
//           Hantera Användare
//         </Button>
//       </Box>
//     </Container>
//   );
// }

// pages/AdminDashboard.js
import { Box, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const items = [
    { title: 'Hantera Rum', path: '/admin/rooms' },
    { title: 'Hantera Bokningar', path: '/booking' },
    { title: 'Hantera Användare', path: '/admin/users' }
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Adminpanel – Hotell Lunden
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4, justifyContent: 'center' }}>
        {items.map(({ title, path }) => (
          <Grid item xs={12} sm={6} md={4} key={title}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: 'center',
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: 'white'
                }
              }}
              onClick={() => navigate(path)}
            >
              <Typography variant="h6">{title}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
