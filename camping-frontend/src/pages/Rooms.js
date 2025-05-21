import { useEffect, useState } from 'react';
import API from '../utils/API';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar
} from '@mui/material';

const [bookingMsg, setBookingMsg] = useState('');
const [bookingErrorMsg, setBookingErrorMsg] = useState('');
const [showMsg, setShowMsg] = useState(false);
const [showError, setShowError] = useState(false);


export default function Accommodations() {
  const [accommodations, setAccommodations] = useState([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [open, setAccommodationOpen] = useState(false);
  const [form, setAccommodationForm] = useState({
    startDate: '',
    endDate: '',
    guests: 1
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/accommodation');
        console.log('API-svar:', res.data); 
        setAccommodations(res.data);
      } catch (err) {
        console.error('Kunde inte hämta boenden:', err);
      }
    };
    fetchData();
  }, []);

    const handleBooking = async () => {
    if (!form.startDate || !form.endDate || !selectedAccommodation) {
      alert('Vänligen fyll i alla fält.');
      return;
    }

    console.log('📦 Skickar bokning:', {
      accommodationId: selectedAccommodation._id,
      startDate: form.startDate,
      endDate: form.endDate,
      guests: form.guests
    });
    
    try {
      await API.post('/booking', {
        accommodationId: selectedAccommodation._id,
        startDate: form.startDate,
        endDate: form.endDate,
        guests: form.guests
      });

      setShowMsg(true);
      setBookingMsg('Bokning lyckades!');
     
      setAccommodationOpen(false);
      setAccommodationForm({ startDate: '', endDate: '', guests: 1 });
    } catch (err) {
      console.error('❌ Fel vid bokning:', err.response?.data || err.message);
      setBookingErrorMsg(err.response?.data?.details || 'Bokning misslyckades');
      setShowError(true);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Alla Boenden</Typography>
      <Grid container spacing={3}>
        {accommodations.map(acc => (
          <Grid key={acc._id} lg={4} md={6} xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">{acc.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {acc.description}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  Typ: <b>{acc.type}</b>
                </Typography>
                <Typography>
                  Kapacitet: {acc.capacity || 'N/A'} personer
                </Typography>
                <Typography>
                  Pris: {acc.pricePerNight} kr/natt
                </Typography>
                <div style={{ marginTop: 8 }}>
                  {acc.facilities?.map((f, idx) => (
                    <Chip key={idx} label={f} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                  ))}
                </div>
              </CardContent>
              <CardActions>
                <Button size="small" variant="outlined" 
                  onClick={() => {
                    setSelectedAccommodation(acc);
                    setAccommodationOpen(true);
                  }}>
                  Boka
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

        {/* Dialogruta */}
      <Dialog open={open} onClose={() => setAccommodationOpen(false)}>
        <DialogTitle>Boka: {selectedAccommodation?.name}</DialogTitle>
        <DialogContent>
          <TextField
            label="Startdatum"
            type="date"
            fullWidth
            value={form.startDate}
            onChange={(e) => setAccommodationForm({ ...form, startDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Slutdatum"
            type="date"
            fullWidth
            value={form.endDate}
            onChange={(e) => setAccommodationForm({ ...form, endDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Antal gäster"
            type="number"
            fullWidth
            value={form.guests}
            onChange={(e) => setAccommodationForm({ ...form, guests: parseInt(e.target.value) || 1 })}
            inputProps={{ min: 1, max: selectedAccommodation?.capacity ?? 10 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAccommodationOpen(false)}>Avbryt</Button>
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
