// src/components/SidebarDrawer.js
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Toolbar,
  Box,
  Button
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../utils/auth';

export default function SidebarDrawer() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = getCurrentUser();

  if (!user || !user.role) return null;

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
      {/* Enkel menyknapp som fungerar på alla enheter */}
      <Button color="inherit" onClick={toggleDrawer(true)} sx={{ ml: 1 }}>
        ☰ Meny
      </Button>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <Toolbar /> {/* Avstånd från toppen */}
          <List>
            {navItems.map(({ text, path }) => (
              <ListItem button key={text} onClick={() => navigate(path)}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
            <Divider />
            <ListItem
              button
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              <ListItemText primary="Logga ut" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
