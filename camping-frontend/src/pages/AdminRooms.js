import { useEffect, useState } from 'react';
import API from '../utils/API';
import {
  Container, Grid, Typography, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, Button, Snackbar, Select, MenuItem, InputLabel, FormControl, OutlinedInput, Checkbox, ListItemText 
} from '@mui/material';
import RoomCard from '../components/RoomCard';
import { FACILITIES, ROOM_TYPES } from '../constants/sharedData'; 

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
    },
  },
};

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null); // null = nytt rum
  const [form, setForm] = useState({
    name: '',
    type: '',
    capacity: '',
    description: '',
    pricePerNight: '',
    facilities: [],
  });
  const [msg, setMsg] = useState('');
  const [showMsg, setShowMsg] = useState(false);

  const fetchRooms = async () => {
    try {
      const res = await API.get('/rooms');
      setRooms(res.data);
    } catch (err) {
      console.error('Kunde inte hämta rum:', err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Vill du ta bort rummet?')) return;
    try {
      await API.delete(`/rooms/${id}`);
      fetchRooms();
      showMessage('Rum borttaget');
    } catch {
      showMessage('Kunde inte ta bort rum');
    }
  };

  const handleSave = async () => {
    try {
      if (editingRoom) {
        await API.put(`/rooms/${editingRoom._id}`, form);
        showMessage('Rum uppdaterat');
      } else {
        await API.post('/rooms', form);
        showMessage('Rum skapat');
      }
      fetchRooms();
      setOpenForm(false);
      resetForm();
    } catch (err) {
      showMessage('Kunde inte spara rummet');
    }
  };

  const showMessage = (text) => {
    setMsg(text);
    setShowMsg(true);
  };

  const resetForm = () => {
    setEditingRoom(null);
    setForm({
      name: '',
      type: '',
      capacity: '',
      description: '',
      pricePerNight: '',
      facilities: [],
    });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Admin – Hantera Rum</Typography>

      <Button variant="contained" sx={{ mb: 2 }} onClick={() => {
        resetForm();
        setOpenForm(true);
      }}>
        Skapa nytt rum
      </Button>

      <Grid container spacing={3}>
        {rooms.map(room => (
          <Grid item xs={12} sm={6} md={4} key={room._id}>
            <RoomCard
              room={room}
              onEdit={(room) => {
                setEditingRoom(room);
                setForm({
                  name: room.name,
                  type: room.type,
                  capacity: room.capacity,
                  description: room.description,
                  pricePerNight: room.pricePerNight,
                  facilities: room.facilities || [],
                });
                setOpenForm(true);
              }}
              onDelete={handleDelete}
              isAdmin={true}
            />
          </Grid>
        ))}
      </Grid>

      {/* Skapa / Redigera dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>{editingRoom ? 'Redigera rum' : 'Skapa nytt rum'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Namn"
            fullWidth
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="type-label">Typ</InputLabel>
            <Select
              labelId="type-label"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              input={<OutlinedInput label="Typ" />}
            >
              {ROOM_TYPES.map(type => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Kapacitet"
            type="number"
            fullWidth
            value={form.capacity}
            onChange={(e) => setForm({ ...form, capacity: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Beskrivning"
            fullWidth
            multiline
            rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Pris per natt"
            type="number"
            fullWidth
            value={form.pricePerNight}
            onChange={(e) => setForm({ ...form, pricePerNight: e.target.value })}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="facilities-label">Faciliteter</InputLabel>
            <Select
              labelId="facilities-label"
              multiple
              value={form.facilities}
              onChange={(e) => setForm({ ...form, facilities: e.target.value })}
              input={<OutlinedInput label="Faciliteter" />}
              renderValue={(selected) => selected.join(', ')}
            >
              {FACILITIES.map((facility) => (
                <MenuItem key={facility} value={facility}>
                  <Checkbox checked={form.facilities.indexOf(facility) > -1} />
                  <ListItemText primary={facility} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Avbryt</Button>
          <Button onClick={handleSave} variant="contained">
            {editingRoom ? 'Spara ändringar' : 'Skapa'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showMsg}
        autoHideDuration={3000}
        onClose={() => setShowMsg(false)}
        message={msg}
      />
    </Container>
  );
}
