// components/Navbar.js
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';
import useCurrentUser from '../hooks/useCurrentUser';

export default function Navbar() {
  const navigate = useNavigate();
  const user = useCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/');
    window.location.reload(); // uppdatera appen
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">Hotell Lunden</Typography>
        {user && (
            <Button color="inherit" onClick={handleLogout}>
              Logga ut
            </Button>
          )}
      </Toolbar>
    </AppBar>
  );
}
