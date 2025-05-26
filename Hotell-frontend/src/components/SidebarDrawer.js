// components/SidebarDrawer.js
import {
  Drawer, IconButton, List, ListItem, ListItemText, Divider, Toolbar, Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../utils/auth';

export default function SidebarDrawer() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = getCurrentUser();

  if (!user) return null; // Visa inte drawer om inte inloggad

  const toggleDrawer = (val) => () => setOpen(val);

  const navItems = user.role === 'Admin'
    ? [
        { text: 'Dashboard', path: '/admin/dashboard' },
        { text: 'Rum', path: '/admin/rooms' },
        { text: 'Bokningar', path: '/booking' },
        { text: 'Användare', path: '/admin/users' }
      ]
    : [
        { text: 'Dashboard', path: '/user/dashboard' },
        { text: 'Lediga rum', path: '/rooms' },
        { text: 'Mina bokningar', path: '/booking' }
      ];

  return (
    <>
      <IconButton color="inherit" onClick={toggleDrawer(true)} sx={{ ml: 1 }}>
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <Toolbar />
          <List>
            {navItems.map(({ text, path }) => (
              <ListItem button key={text} onClick={() => navigate(path)}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
            <Divider />
            <ListItem button onClick={() => { logout(); navigate('/'); }}>
              <ListItemText primary="Logga ut" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
