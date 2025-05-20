import { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import API from '../utils/API';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await API.post('/auth/register', form);
      alert('Registrering lyckades! Du kan nu logga in.');
      navigate('/');
    } catch (err) {
      alert('Registrering misslyckades');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Skapa konto</Typography>
      <TextField fullWidth label="Användarnamn" name="username" value={form.username} onChange={handleChange} sx={{ mb: 2 }} />
      <TextField fullWidth label="E-post" name="email" value={form.email} onChange={handleChange} sx={{ mb: 2 }} />
      <TextField fullWidth label="Lösenord" name="password" type="password" value={form.password} onChange={handleChange} sx={{ mb: 2 }} />
      <Button fullWidth variant="contained" onClick={handleRegister}>Registrera</Button>
    </Container>
  );
}
