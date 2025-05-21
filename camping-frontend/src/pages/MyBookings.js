import { useEffect, useState } from 'react';
import API from '../utils/API';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import dayjs from 'dayjs';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ startDate: '', endDate: '' });

    // Snackbar
  const [bookingMsg, setBookingMsg] = useState('');
  const [bookingErrorMsg, setBookingErrorMsg] = useState('');

  const fetchBookings = async () => {
    try {
      const res = await API.get('/booking');
      setBookings(res.data);
    } catch (err) {
      console.error('Kunde inte hämta bokningar:', err);
    }
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/booking/${selectedBooking._id}`, {
        startDate: form.startDate,
        endDate: form.endDate
      });
      setOpen(false);
      setBookingMsg('Bokning uppdaterad!');
      fetchBookings();
    } catch (err) {
      setBookingErrorMsg('Kunde inte uppdatera bokningen');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Vill du ta bort bokningen?')) return;
    try {
      await API.delete(`/booking/${id}`);
      setBookingMsg('Bokning borttagen');
      fetchBookings();
    } catch (err) {
      setBookingErrorMsg('Kunde inte ta bort bokningen');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Mina Bokningar</Typography>

      <Grid container spacing={3}>
        {bookings.map((b) => (
          <Grid item xs={12} sm={6} md={4} key={b._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{b.roomId?.name || 'Plats saknas'}</Typography>
                <Typography>Typ: {b.roomId?.type}</Typography>
                <Typography>Från: {dayjs(b.startDate).format('YYYY-MM-DD')}</Typography>
                <Typography>Till: {dayjs(b.endDate).format('YYYY-MM-DD')}</Typography>
              </CardContent>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  setSelectedBooking(b);
                  setForm({
                    startDate: b.startDate.slice(0, 10),
                    endDate: b.endDate.slice(0, 10)
                  });
                  setOpen(true);
                }}
              >
                Ändra
              </Button>
              <Button
                fullWidth
                color="error"
                onClick={() => handleDelete(b._id)}
              >
                Ta bort
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Uppdatera bokning</DialogTitle>
        <DialogContent>
          <TextField
            label="Startdatum"
            type="date"
            fullWidth
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Slutdatum"
            type="date"
            fullWidth
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Avbryt</Button>
          <Button onClick={handleUpdate} variant="contained">Spara</Button>
        </DialogActions>
      </Dialog>

          {/* Snackbar för bekräftelse */}
      <Snackbar
        open={!!bookingMsg}
        autoHideDuration={3000}
        onClose={() => setBookingMsg('')}
      >
        <Alert onClose={() => setBookingMsg('')} severity="success" sx={{ width: '100%' }}>
          {bookingMsg}
        </Alert>
      </Snackbar>

      {/* Snackbar för fel */}
      <Snackbar
        open={!!bookingErrorMsg}
        autoHideDuration={4000}
        onClose={() => setBookingErrorMsg('')}
      >
        <Alert onClose={() => setBookingErrorMsg('')} severity="error" sx={{ width: '100%' }}>
          {bookingErrorMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
}
