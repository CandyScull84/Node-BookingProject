import { use, useEffect, useState } from 'react';
import API from '../utils/API';
import {
  Container,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar
} from '@mui/material';
import RoomCard from '../components/RoomCard';
import { getCurrentUser } from '../utils/auth';

export default function Rooms() {
  const [room, setRoom] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [open, setRoomOpen] = useState(false);
  const [form, setRoomForm] = useState({
    startDate: '',
    endDate: '',
    guests: 1
  });

  const [bookingMsg, setBookingMsg] = useState('');
  const [bookingErrorMsg, setBookingErrorMsg] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const [showError, setShowError] = useState(false);

  const isAdmin = getCurrentUser()?.role === 'admin';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/rooms');
        console.log('API-svar:', res.data); 
        setRoom(res.data);
      } catch (err) {
        console.error('Kunde inte hämta rum:', err);
      }
    };
    fetchData();
  }, []);

  const handleBooking = async () => {
  if (!form.startDate || !form.endDate || !selectedRoom) {
    alert('Vänligen fyll i alla fält.');
    return;
  }

  console.log('📦 Skickar bokning:', {
    roomId: selectedRoom._id,
    startDate: form.startDate,
    endDate: form.endDate,
    guests: form.guests
  });
  
  try {
    await API.post('/booking', {
      roomId: selectedRoom._id,
      startDate: form.startDate,
      endDate: form.endDate,
      guests: form.guests
    });

    setShowMsg(true);
    setBookingMsg('Bokning lyckades!');
    setRoomOpen(false);
    setRoomForm({ startDate: '', endDate: '', guests: 1 });
  } catch (err) {
    console.error('❌ Fel vid bokning:', err.response?.data || err.message);
    setBookingErrorMsg(err.response?.data?.details || 'Bokning misslyckades');
    setShowError(true);
  }
};

  const handleDeleteRoom = async (roomId) => {
    if (!window.confirm('Vill du verkligen ta bort rummet?')) return;
    try {
      await API.delete(`/rooms/${roomId}`);
      setRoom(room.filter(r => r._id !== roomId));
      setBookingMsg('Rum borttaget');
      setShowMsg(true);
    } catch (err) {
      console.error('Kunde inte ta bort rum:', err);
      setBookingErrorMsg('Raderingen misslyckades');
      setShowError(true);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Alla Tillgängliga Rum</Typography>
      <Grid container spacing={3}>
       {room.map(r => (
        <Grid key={r._id} item xs={12} sm={6} md={4}>
         <RoomCard
            room={r}
            onBook={() => {
              setSelectedRoom(r);
              setRoomOpen(true);
            }}
            onEdit={handleEditRoom}
            onDelete={handleDeleteRoom}
            isAdmin={isAdmin}
         />
        </Grid>
      ))}
      </Grid>

        {/* Dialogruta */}
      <Dialog open={open} onClose={() => setRoomOpen(false)}>
        <DialogTitle>Boka: {selectedRoom?.name}</DialogTitle>
        <DialogContent>
          <TextField
            label="Startdatum"
            type="date"
            fullWidth
            value={form.startDate}
            onChange={(e) => setRoomForm({ ...form, startDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Slutdatum"
            type="date"
            fullWidth
            value={form.endDate}
            onChange={(e) => setRoomForm({ ...form, endDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Antal gäster"
            type="number"
            fullWidth
            value={form.guests}
            onChange={(e) => setRoomForm({ ...form, guests: parseInt(e.target.value) || 1 })}
            inputProps={{ min: 1, max: selectedRoom?.capacity ?? 10 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRoomOpen(false)}>Avbryt</Button>
          <Button onClick={handleBooking} variant="contained">Boka</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showMsg}
        autoHideDuration={3000}
        onClose={() => setShowMsg(false)}
        message={bookingMsg}
      >
      </Snackbar>  
      <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={() => setShowError(false)}
        message={bookingErrorMsg}
      >
      </Snackbar>

    </Container>
  );
}
