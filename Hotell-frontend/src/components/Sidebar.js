// src/components/Sidebar.js
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

export default function Sidebar() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  if (!user || user.role !== 'Admin') return null;

  const navItems = [
    { text: 'Dashboard', path: '/admin/dashboard' },
    { text: 'Hantera Rum', path: '/admin/rooms' },
    { text: 'Bokningar', path: '/booking' },
    { text: 'Användare', path: '/admin/users' }
  ];

  return (
    <Box
      sx={{
        width: 200,
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        bgcolor: 'primary.main',
        color: 'white',
        pt: 8,
      }}
    >
      <List>
        {navItems.map(({ text, path }) => (
          <ListItem button key={text} onClick={() => navigate(path)}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
