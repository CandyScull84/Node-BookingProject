import React, { useState } from 'react';
// import { TextField, Button, Box, Typography } from '@mui/material';
import { Container, TextField, Button, Typography } from '@mui/material';
import API from '../utils/API'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom'; 

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('authToken', res.data.token);
      navigate('/accommodations');
    } catch (err) {
      alert('Inloggning misslyckades');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Logga in</Typography>
      <TextField fullWidth label="Användarnamn" name="username" value={form.username} onChange={handleChange} sx={{ mb: 2 }} />
      <TextField fullWidth label="Lösenord" name="password" type="password" value={form.password} onChange={handleChange} sx={{ mb: 2 }} />
      <Button fullWidth variant="contained" onClick={handleLogin}>Logga in</Button>
    </Container>
  );

  // return (
  //   <Box
  //     display="flex"
  //     flexDirection="column"
  //     alignItems="center"
  //     justifyContent="center"
  //     minHeight="100vh"
  //     bgcolor="#f5f5f5"
  //     p={3}
  //   >
  //     <Typography variant="h4" gutterBottom>
  //       Login
  //     </Typography>
  //     <Box
  //       component="form"
  //       display="flex"
  //       flexDirection="column"
  //       width="100%"
  //       maxWidth="400px"
  //       gap={2}
  //     >
  //       <TextField
  //         label="Email"
  //         variant="outlined"
  //         fullWidth
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //       />
  //       <TextField
  //         label="Password"
  //         type="password"
  //         variant="outlined"
  //         fullWidth
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //       />
  //       <Button
  //         variant="contained"
  //         color="primary"
  //         fullWidth
  //         onClick={handleLogin}
  //       >
  //         Login
  //       </Button>
  //     </Box>
  //   </Box>
 // );
};
