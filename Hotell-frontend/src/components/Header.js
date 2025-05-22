// components/Header.js
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useCurrentUser from '../hooks/useCurrentUser';

export default function Header() {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6">
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              Coworking Booking
            </Link>
          </Typography>
        </Box>

        <Box>
          {currentUser ? (
            <>
              <Typography variant="body1" sx={{ mr: 2, display: 'inline-block' }}>
                Välkommen, {currentUser.username}
              </Typography>

              {currentUser.role === 'Admin' && (
                <Button color="inherit" component={Link} to="/admin/rooms">
                  Adminpanel
                </Button>
              )}

              <Button color="inherit" onClick={handleLogout}>
                Logga ut
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Logga in
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Registrera
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
