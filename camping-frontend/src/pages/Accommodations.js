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
  TextField
} from '@mui/material';

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
    if (!form.startDate || !form.endDate) {
      alert('Vänligen välj datum');
      return;
    }

    try {
      await API.post('/booking', {
        accommodationId: selectedAcc._id,
        startDate: form.startDate,
        endDate: form.endDate,
        guests: form.guests
      });

      alert('Bokning genomförd!');
      setOpen(false);
      setForm({ startDate: '', endDate: '', guests: 1 });
    } catch (err) {
      alert('Kunde inte boka. Kontrollera att du är inloggad.');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Alla Boenden</Typography>
      <Grid container spacing={3}>
        {accommodations.map(acc => (
          <Grid item xs={12} sm={6} md={4} key={acc._id}>
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
                    setSelectedAcc(acc);
                    setOpen(true);
                  }}>
                  Boka
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

        {/* Dialogruta */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Boka: {selectedAcc?.name}</DialogTitle>
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
            sx={{ mb: 2 }}
          />
          <TextField
            label="Antal gäster"
            type="number"
            fullWidth
            value={form.guests}
            onChange={(e) => setForm({ ...form, guests: parseInt(e.target.value) })}
            inputProps={{ min: 1, max: selectedAcc?.capacity || 10 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Avbryt</Button>
          <Button onClick={handleBooking} variant="contained">Boka</Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}
