import { useEffect, useState } from 'react';
import API from '../utils/API';
import {
  Container, Typography, Table, TableHead, TableRow,
  TableCell, TableBody, Select, MenuItem, Paper
} from '@mui/material';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get('/auth/all');
      setUsers(res.data);
    } catch (err) {
      console.error('Kunde inte hämta användare', err);
    }
  };

  const updateRole = async (userId, newRole) => {
    try {
      await API.patch(`/auth/role/${userId}`, { role: newRole });
      fetchUsers(); // Hämta igen efter uppdatering
    } catch (err) {
      console.error('Kunde inte uppdatera roll', err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Admin – Hantera Användare</Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Namn</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Roll</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(u => (
              <TableRow key={u._id}>
                <TableCell>{u.username}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <Select
                    value={u.role}
                    onChange={(e) => updateRole(u._id, e.target.value)}
                    size="small"
                  >
                    <MenuItem value="User">User</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
