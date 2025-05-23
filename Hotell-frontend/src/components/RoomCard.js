import {
  Card, CardContent, CardActions, Typography, Button, Chip, CardMedia
} from '@mui/material';
import { DEFAULT_ROOM_IMAGE } from '../constants/sharedData';

export default function RoomCard({ room, onBook, onEdit, onDelete, isAdmin }) {
  return (
    <Card sx={{ maxWidth: 400 }}>
        <CardMedia
        component="img"
        height="200"
        image={room.imageUrl || DEFAULT_ROOM_IMAGE}
        alt={room.name}
      />
      <CardContent>
        <Typography variant="h6">{room.name}</Typography>
        <Typography variant="body2" color="text.secondary">{room.description}</Typography>
        <Typography sx={{ mt: 1 }}>
          Typ: <b>{room.type}</b>
        </Typography>
        <Typography>Kapacitet: {room.capacity} personer</Typography>
        <Typography>Pris: {room.pricePerNight} kr/natt</Typography>
        
        {room.facilities?.length > 0 && (
          <div style={{ marginTop: 8 }}>
            {room.facilities?.map((f, idx) => (
              <Chip key={idx} label={f} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
            ))}
          </div>
        )}
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
