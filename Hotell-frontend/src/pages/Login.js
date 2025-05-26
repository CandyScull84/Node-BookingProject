// import { getCurrentUser } from '../utils/auth';
import {jwtDecode} from 'jwt-decode';
import { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import API from '../utils/API'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom'; 

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', form);
      console.log('🔍 Inloggad användare från DB:', user);
      const token = res.data.token;
      console.log("✅ Mottagen token:", token);
      localStorage.setItem('authToken', token);
      // localStorage.setItem('authToken', res.data.token);
      const user = jwtDecode(token); // 👈 Direkt från token
      const decoded = jwtDecode(token);
      console.log('👉 Inloggad användare:', decoded);

      if (user?.role === 'Admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert(err.response?.data?.error || 'Inloggning misslyckades');
    }
    //   const decoded = getCurrentUser();

    //   console.log('👉 decoded user:', decoded);

    //   if (decoded?.role === 'Admin') {
    //   navigate('/admin/dashboard');
    // } else {
    //   navigate('/user/dashboard');
    // }
    // } catch (err) {
    //   console.error('Login error:', err.response?.data || err.message);
    //   alert(err.response?.data?.error || 'Inloggning misslyckades');
    // }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Logga in</Typography>
      <TextField fullWidth label="Användarnamn" name="username" value={form.username} onChange={handleChange} sx={{ mb: 2 }} />
      <TextField fullWidth label="Lösenord" name="password" type="password" value={form.password} onChange={handleChange} sx={{ mb: 2 }} />
      <Button fullWidth variant="contained" onClick={handleLogin}>Logga in</Button>
    </Container>
  );


};
