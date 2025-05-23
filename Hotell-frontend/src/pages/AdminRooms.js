import { useEffect, useState } from 'react';
import API from '../utils/API';
import {
  Container, Grid, Typography, Dialog, DialogTitle,
  DialogContent, DialogActions, Button 
} from '@mui/material';
import RoomCard from '../components/RoomCard';
import SnackbarAlert from '../components/SnackbarAlert';
import ConfirmDialog from '../components/ConfirmDialog';
import RoomForm from '../components/RoomForm';


export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
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

 // 🧹 Nollställ formulär
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

  // 🗑️ Bekräfta radering
  const handleDelete = (room) => {
    setRoomToDelete(room);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!roomToDelete) return;
    try {
      await API.delete(`/rooms/${roomToDelete._id}`);
      showMessage('Rum borttaget');
      fetchRooms();
    } catch {
      showMessage('Kunde inte ta bort rum');
    } finally {
      setConfirmOpen(false);
      setRoomToDelete(null);
    }
  };


  const showMessage = (text) => {
    setMsg(text);
    setShowMsg(true);
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
          <RoomForm form={form} setForm={setForm} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Avbryt</Button>
          <Button onClick={handleSave} variant="contained">
            {editingRoom ? 'Spara ändringar' : 'Skapa'}
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarAlert open={showMsg} message={msg} onClose={() => setShowMsg(false)} />
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Bekräfta borttagning"
        message={`Vill du verkligen ta bort rummet "${roomToDelete?.name}"?`}
      />
    </Container>
  );
}
