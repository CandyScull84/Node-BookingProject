import {
  Card, CardContent, CardActions, Typography, Button, Chip
} from '@mui/material';

export default function RoomCard({ room, onBook, onEdit, onDelete, isAdmin }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{room.name}</Typography>
        <Typography variant="body2" color="text.secondary">{room.description}</Typography>
        <Typography sx={{ mt: 1 }}>
          Typ: <b>{room.type}</b>
        </Typography>
        <Typography>Kapacitet: {room.capacity} personer</Typography>
        <Typography>Pris: {room.pricePerNight} kr/natt</Typography>
        <div style={{ marginTop: 8 }}>
          {room.facilities?.map((f, idx) => (
            <Chip key={idx} label={f} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
          ))}
        </div>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={() => onBook(room)}>Boka</Button>

        {isAdmin && (
          <>
            <Button size="small" color="primary" onClick={() => onEdit(room)}>Redigera</Button>
            <Button size="small" color="error" onClick={() => onDelete(room._id)}>Ta bort</Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}
