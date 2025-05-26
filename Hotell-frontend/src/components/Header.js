import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
// import SidebarDrawer from './SidebarDrawer';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../utils/auth';

export default function Header() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
      setDrawerOpen(open);
    };

  const handleLogout = () => {
    logout();
    navigate('/');
    setDrawerOpen(false);
  };

  const navLinks = user?.role === 'Admin'
    ? [
        { text: 'Dashboard', path: '/admin/dashboard' },
        { text: 'Hantera Rum', path: '/admin/rooms' },
        { text: 'Hantera Användare', path: '/admin/users' },
        { text: 'Se Bokningar', path: '/booking' }
      ]
    : [
        { text: 'Dashboard', path: '/user/dashboard' },
        { text: 'Lediga Rum', path: '/rooms' },
        { text: 'Mina Bokningar', path: '/booking' }
      ];

   return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Hotell Lunden
          </Typography>

          <Box>
            {user ? (
              <IconButton color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate('/login')}>Logga in</Button>
                <Button color="inherit" onClick={() => navigate('/register')}>Registrera</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {navLinks.map(({ text, path }) => (
              <ListItem button key={text} onClick={() => navigate(path)}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logga ut" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}


// // src/components/Header.js
// import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { getCurrentUser, logout } from '../utils/auth';

// export default function Header() {
//   const navigate = useNavigate();
//   const user = getCurrentUser();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//     window.location.reload();
//   };

//   return (
//     <AppBar position="static">
//       <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//         <Typography
//           variant="h6"
//           onClick={() => navigate('/')}
//           sx={{ cursor: 'pointer' }}
//         >
//           Hotell Lunden
//         </Typography>

//         <Box sx={{ display: 'flex', gap: 2 }}>
//           {user ? (
//             <Button color="inherit" onClick={handleLogout}>
//               Logga ut
//             </Button>
//           ) : (
//             <>
//               <Button color="inherit" onClick={() => navigate('/login')}>
//                 Logga in
//               </Button>
//               <Button color="inherit" onClick={() => navigate('/register')}>
//                 Registrera
//               </Button>
//             </>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }
