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
  Chip
} from '@mui/material';

export default function Accommodations() {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/accommodation');
        setAccommodations(res.data);
      } catch (err) {
        console.error('Kunde inte hämta boenden:', err);
      }
    };

    fetchData();
  }, []);

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
                <Button size="small" variant="outlined">
                  Boka
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
