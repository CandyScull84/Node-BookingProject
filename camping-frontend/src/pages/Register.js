import { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import API from '../utils/API';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
  const [snackbarErrorMsg, setSnackbarErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await API.post('/auth/register', form);
      setSnackbarOpen(true); // visa snackbar
      setSuccessMsg('Registrering lyckades!');
      // Vänta en kort stund, sen navigera
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      console.error(err.response?.data || err.message); 
      setSnackbarErrorMsg(err.response?.data?.details || 'Registrering misslyckades');
      setSnackbarErrorOpen(true);

    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Skapa konto</Typography>
      <TextField fullWidth label="Användarnamn" name="username" value={form.username} onChange={handleChange} sx={{ mb: 2 }} />
      <TextField fullWidth label="E-post" name="email" value={form.email} onChange={handleChange} sx={{ mb: 2 }} />
      <TextField fullWidth label="Lösenord" name="password" type="password" value={form.password} onChange={handleChange} sx={{ mb: 2 }} />
      <Button fullWidth variant="contained" onClick={handleRegister}>Registrera</Button>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message= {successMsg}
      />
      <Snackbar
        open={snackbarErrorOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarErrorOpen(false)}
        message={snackbarErrorMsg}
      /> 
    </Container>
  );
}
