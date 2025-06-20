import { useCallback, useEffect, useState } from 'react';
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
  DialogActions
} from '@mui/material';
import dayjs from 'dayjs';
import SnackbarAlert from '../components/SnackbarAlert';
import useCurrentUser from '../hooks/useCurrentUser';
import ConfirmDialog from '../components/ConfirmDialog';
import BookingForm from '../components/BookingForm';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ 
    startDate: '', 
    endDate: '',
    date: '',
    startTime: '',
    endTime: '',
    guests: 1});

    // Snackbar & ConfirmDialog
  const [bookingMsg, setBookingMsg] = useState('');
  const [bookingErrorMsg, setBookingErrorMsg] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  const currentUser = useCurrentUser();

  const fetchBookings = useCallback(async () => {
    try {
      const res = currentUser?.role === 'Admin'
      ? await API.get('/booking')         // Alla bokningar
      : await API.get('/booking/me'); // Endast mina bokningar
      
      setBookings(res.data);
    } catch (err) {
      console.error('Kunde inte hämta bokningar:', err);
    }
  }, [currentUser]); // 🧠 lägg till dependency här

  useEffect(() => {
    if (currentUser) {
      fetchBookings();
    }
  }, [fetchBookings, currentUser]);

  const handleUpdate = async () => {
    try {
      await API.put(`/booking/${selectedBooking._id}`, form )
      setOpen(false);
      setBookingMsg('Bokning uppdaterad!');
      fetchBookings();
    } catch (err) {
      setBookingErrorMsg('Kunde inte uppdatera bokningen');
    }
  };

  const handleDelete = (booking) => {
    setBookingToDelete(booking);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!bookingToDelete) return;
    try {
      await API.delete(`/booking/${bookingToDelete._id}`);
      setBookingMsg('Bokning borttagen');
      fetchBookings();
    } catch {
      setBookingErrorMsg('Kunde inte ta bort bokningen');
    } finally {
      setConfirmOpen(false);
      setBookingToDelete(null);
    }
  };


  return (
     <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {currentUser?.role === 'Admin' ? 'Alla Bokningar' : `Mina Bokningar – ${currentUser?.username}`}
      </Typography>

      {bookings.length === 0 ? (
        <Typography>Inga bokningar att visa.</Typography>
      ) : (
        <Grid container spacing={3}>
          {bookings.map((b) => (
            <Grid item xs={12} sm={6} md={4} key={b._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{b.roomId?.name || 'Plats saknas'}</Typography>
                  <Typography>Typ: {b.roomId?.type}</Typography>
                  <Typography>Från: {dayjs(b.startDate).format('YYYY-MM-DD')}</Typography>
                  <Typography>Till: {dayjs(b.endDate).format('YYYY-MM-DD')}</Typography>
                  <Typography>Gäster: {b.guests}</Typography>
                  {currentUser?.role === 'Admin' && (
                    <Typography variant="body2">
                      Bokad av: {b.userId?.username || 'Okänd användare'}
                    </Typography>
                  )}
                </CardContent>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    setSelectedBooking(b);
                    setForm({
                      startDate: b.startDate?.slice(0, 10) || '',
                      endDate: b.endDate?.slice(0, 10) || '',
                      date: b.date || '',
                      startTime: b.startTime || '',
                      endTime: b.endTime || '',
                      guests: b.guests
                    });
                    setOpen(true);
                  }}
                >
                  Ändra
                </Button>
                <Button
                  fullWidth
                  color="error"
                  onClick={() => handleDelete(b)}
                >
                  Ta bort
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Uppdatera bokning</DialogTitle>
        <DialogContent>
          <BookingForm form={form} setForm={setForm} room={selectedBooking?.roomId} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Avbryt</Button>
          <Button onClick={handleUpdate} variant="contained">Spara</Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Bekräfta borttagning"
        message="Vill du verkligen ta bort bokningen?"
      />
      
      <SnackbarAlert open={!!bookingMsg} message={bookingMsg} severity="success" onClose={() => setBookingMsg('')} />
      <SnackbarAlert open={!!bookingErrorMsg} message={bookingErrorMsg} severity="error" onClose={() => setBookingErrorMsg('')} />
    </Container>
  );
}
// // pages/MyBookings.js
// import { useEffect, useState } from 'react';
// import API from '../utils/API';
// import {
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   Grid,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions
// } from '@mui/material';
// import dayjs from 'dayjs';
// import SnackbarAlert from '../components/SnackbarAlert';
// import useCurrentUser from '../hooks/useCurrentUser';
// import ConfirmDialog from '../components/ConfirmDialog';
// import BookingForm from '../components/BookingForm';

// export default function MyBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [form, setForm] = useState({
//     startDate: '',
//     endDate: '',
//     date: '',
//     startTime: '',
//     endTime: '',
//     guests: 1
//   });

//   const [bookingMsg, setBookingMsg] = useState('');
//   const [bookingErrorMsg, setBookingErrorMsg] = useState('');
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [bookingToDelete, setBookingToDelete] = useState(null);

//   const currentUser = useCurrentUser();

//   useEffect(() => {
//   const fetchBookings = async () => {
//     try {
//       const res = currentUser?.role === 'Admin'
//         ? await API.get('/booking')
//         : await API.get('/booking/me');

//       setBookings(res.data);
//     } catch (err) {
//       console.error('Kunde inte hämta bokningar:', err);
//     }
//   };

//   if (currentUser) {
//     fetchBookings();
//   }
// }, [currentUser]);

//   const handleUpdate = async () => {
//     try {
//       await API.put(`/booking/${selectedBooking._id}`, form);
//       setOpen(false);
//       setBookingMsg('Bokning uppdaterad!');
//       fetchBookings();
//     } catch (err) {
//       setBookingErrorMsg('Kunde inte uppdatera bokningen');
//     }
//   };

//   const handleDelete = (booking) => {
//     setBookingToDelete(booking);
//     setConfirmOpen(true);
//   };

//   const confirmDelete = async () => {
//     if (!bookingToDelete) return;
//     try {
//       await API.delete(`/booking/${bookingToDelete._id}`);
//       setBookingMsg('Bokning borttagen');
//       fetchBookings();
//     } catch {
//       setBookingErrorMsg('Kunde inte ta bort bokningen');
//     } finally {
//       setConfirmOpen(false);
//       setBookingToDelete(null);
//     }
//   };

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         {currentUser?.role === 'Admin' ? 'Alla Bokningar' : `Mina Bokningar – ${currentUser?.username}`}
//       </Typography>

//       {bookings.length === 0 ? (
//         <Typography>Inga bokningar att visa.</Typography>
//       ) : (
//         <Grid container spacing={3}>
//           {bookings.map((b) => (
//             <Grid item xs={12} sm={6} md={4} key={b._id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h6">{b.roomId?.name || 'Plats saknas'}</Typography>
//                   <Typography>Typ: {b.roomId?.type}</Typography>
//                   <Typography>Från: {dayjs(b.startDate).format('YYYY-MM-DD')}</Typography>
//                   <Typography>Till: {dayjs(b.endDate).format('YYYY-MM-DD')}</Typography>
//                   <Typography>Gäster: {b.guests}</Typography>
//                   {currentUser?.role === 'Admin' && (
//                     <Typography variant="body2">
//                       Bokad av: {b.userId?.username || 'Okänd användare'}
//                     </Typography>
//                   )}
//                 </CardContent>
//                 <Button
//                   fullWidth
//                   variant="outlined"
//                   onClick={() => {
//                     setSelectedBooking(b);
//                     setForm({
//                       startDate: b.startDate?.slice(0, 10) || '',
//                       endDate: b.endDate?.slice(0, 10) || '',
//                       date: b.date || '',
//                       startTime: b.startTime || '',
//                       endTime: b.endTime || '',
//                       guests: b.guests
//                     });
//                     setOpen(true);
//                   }}
//                 >
//                   Ändra
//                 </Button>
//                 <Button
//                   fullWidth
//                   color="error"
//                   onClick={() => handleDelete(b)}
//                 >
//                   Ta bort
//                 </Button>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <DialogTitle>Uppdatera bokning</DialogTitle>
//         <DialogContent>
//           <BookingForm form={form} setForm={setForm} room={selectedBooking?.roomId} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)}>Avbryt</Button>
//           <Button onClick={handleUpdate} variant="contained">Spara</Button>
//         </DialogActions>
//       </Dialog>

//       <ConfirmDialog
//         open={confirmOpen}
//         onClose={() => setConfirmOpen(false)}
//         onConfirm={confirmDelete}
//         title="Bekräfta borttagning"
//         message="Vill du verkligen ta bort bokningen?"
//       />

//       <SnackbarAlert open={!!bookingMsg} message={bookingMsg} severity="success" onClose={() => setBookingMsg('')} />
//       <SnackbarAlert open={!!bookingErrorMsg} message={bookingErrorMsg} severity="error" onClose={() => setBookingErrorMsg('')} />
//     </Container>
//   );
// }
