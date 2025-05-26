import { useEffect, useState } from 'react';
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
  FormControl, 
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';

import RoomCard from '../components/RoomCard';
import useCurrentUser from '../hooks/useCurrentUser';
import SnackbarAlert from '../components/SnackbarAlert';
import { ROOM_TYPES } from '../constants/sharedData'; 
import BookingForm from '../components/BookingForm';

export default function Rooms() {
  const currentUser = useCurrentUser(); 
  const [room, setRoom] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [open, setRoomOpen] = useState(false);
  const [form, setRoomForm] = useState({
    startDate: '',
    endDate: '',
    date: '',
    startTime: '',
    endTime: '',
    guests: 1
  });

  const [bookingMsg, setBookingMsg] = useState('');
  const [bookingErrorMsg, setBookingErrorMsg] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const [showError, setShowError] = useState(false);

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
    if (!selectedRoom) return;

    const isHotel = selectedRoom.type.toLowerCase() === 'hotel' || selectedRoom.type.toLowerCase() === 'workspace';
    const isConference = selectedRoom.type.toLowerCase() === 'conference';

    // Enkel validering
    if (isHotel && (!form.startDate || !form.endDate)) {
      alert('Fyll i start- och slutdatum.');
      return;
    }
    if (isConference && (!form.date || !form.startTime || !form.endTime)) {
      alert('Fyll i datum samt start- och sluttid.');
      return;
    }

    const bookingData = {
      roomId: selectedRoom._id,
      guests: form.guests
    };

    if (isHotel) {
      bookingData.startDate = form.startDate;
      bookingData.endDate = form.endDate;
    }

    if (isConference) {
      bookingData.date = form.date;
      bookingData.startTime = form.startTime;
      bookingData.endTime = form.endTime;
    }

    try {
      await API.post('/booking', bookingData);
      setShowMsg(true);
      setBookingMsg('Bokning lyckades!');
      setRoomOpen(false);
      resetForm();
    } catch (err) {
      console.error('❌ Fel vid bokning:', err.response?.data || err.message);
      setBookingErrorMsg(err.response?.data?.details || 'Bokning misslyckades');
      setShowError(true);
    }
  };

  const resetForm = () => {
    setRoomForm({
      startDate: '',
      endDate: '',
      date: '',
      startTime: '',
      endTime: '',
      guests: 1
    });
  };


  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Alla Tillgängliga Rum</Typography>
      <FormControl sx={{ mb: 3, minWidth: 200 }}>
        <InputLabel id="room-type-label">Filtrera typ</InputLabel>
        <Select
          labelId="room-type-label"
          value={selectedType}
          label="Filtrera typ"
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <MenuItem value="">Alla typer</MenuItem>
          {ROOM_TYPES.map(type => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={3}>
       {room.filter(r => !selectedType || r.type === selectedType) 
       .map(r => (
        <Grid key={r._id} xs={12} sm={6} md={4}>
         <RoomCard
            room={r}
            onBook={() => {
              setSelectedRoom(r);
              setRoomOpen(true);
            }}
            isAdmin={currentUser?.role === 'Admin'}
         />
        </Grid>
      ))}
      </Grid>

      <Dialog open={open} onClose={() => setRoomOpen(false)}>
        <DialogTitle>Boka: {selectedRoom?.name}</DialogTitle>
        <DialogContent>
           <BookingForm form={form} setForm={setRoomForm} room={selectedRoom} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRoomOpen(false)}>Avbryt</Button>
          <Button onClick={handleBooking} variant="contained">Boka</Button>
        </DialogActions>
      </Dialog>
      <SnackbarAlert open={showMsg} message={bookingMsg} severity="success" onClose={() => setShowMsg(false)} />
      <SnackbarAlert open={showError} message={bookingErrorMsg} severity="error" onClose={() => setShowError(false)} />
    </Container>
  );
}
