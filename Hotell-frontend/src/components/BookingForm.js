// components/BookingForm.js
import { TextField } from '@mui/material';
import useCurrentUser from '../hooks/useCurrentUser';
export default function BookingForm({ form, setForm, room }) {
  const isHotel = room?.type?.toLowerCase() === 'hotel';
  const isConference = room?.type?.toLowerCase() === 'conference';
  const currentUser = useCurrentUser();
  
  return (
    <>
      {isHotel && (
        <>
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
            sx={{ mb: 2 }}
          />
        </>
      )}

      {isConference && (
        <>
          <TextField
            label="Datum"
            type="date"
            fullWidth
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Starttid"
            type="time"
            fullWidth
            value={form.startTime}
            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Sluttid"
            type="time"
            fullWidth
            value={form.endTime}
            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
        </>
      )}
      
      <TextField
        label="Användare"
        disabled
        value={currentUser?.username}
      />

      <TextField
        label="Antal gäster"
        type="number"
        fullWidth
        value={form.guests}
        onChange={(e) => setForm({ ...form, guests: parseInt(e.target.value) || 1 })}
        inputProps={{ min: 1, max: room?.capacity ?? 10 }}
      />
    </>
  );
}
