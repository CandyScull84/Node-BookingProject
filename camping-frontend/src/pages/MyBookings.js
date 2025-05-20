import { useEffect, useState } from 'react';
import API from '../utils/API';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button
} from '@mui/material';
import dayjs from 'dayjs';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await API.get('/booking');
      setBookings(res.data);
    } catch (err) {
      console.error('Kunde inte hämta bokningar:', err);
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
                <Typography variant="h6">{b.accommodationId?.name || 'Plats saknas'}</Typography>
                <Typography>Typ: {b.accommodationId?.type}</Typography>
                <Typography>Från: {dayjs(b.startDate).format('YYYY-MM-DD')}</Typography>
                <Typography>Till: {dayjs(b.endDate).format('YYYY-MM-DD')}</Typography>
              </CardContent>
              <Button disabled fullWidth variant="outlined">Ändra / Ta bort (senare)</Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
