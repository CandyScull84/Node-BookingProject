// components/RoomForm.js
import {
  TextField, FormControl, InputLabel, Select,
  MenuItem, OutlinedInput, Checkbox, ListItemText
} from '@mui/material';
import { FACILITIES, ROOM_TYPES } from '../constants/sharedData';

const MenuProps = {
  PaperProps: { style: { maxHeight: 300 } },
};

export default function RoomForm({ form, setForm }) {
  return (
    <>
      <h3 style={{ marginBottom: '1rem' }}>
        {form.name || 'Nytt rum'} {form.type && `(${form.type})`}
      </h3>

      <TextField
        label="Namn"
        fullWidth
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="type-label">Typ</InputLabel>
        <Select
          labelId="type-label"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          input={<OutlinedInput label="Typ" />}
        >
          {ROOM_TYPES.map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Kapacitet"
        type="number"
        fullWidth
        value={form.capacity}
        onChange={(e) => setForm({ ...form, capacity: e.target.value })}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Beskrivning"
        fullWidth
        multiline
        rows={2}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Pris per natt"
        type="number"
        fullWidth
        value={form.pricePerNight}
        onChange={(e) => setForm({ ...form, pricePerNight: e.target.value })}
        sx={{ mb: 2 }}
      />
      
      <TextField
        label="Bildlänk (URL)"
        fullWidth
        value={form.imageUrl}
        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="facilities-label">Faciliteter</InputLabel>
        <Select
          labelId="facilities-label"
          multiple
          value={form.facilities}
          onChange={(e) => setForm({ ...form, facilities: e.target.value })}
          input={<OutlinedInput label="Faciliteter" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {FACILITIES.map((facility) => (
            <MenuItem key={facility} value={facility}>
              <Checkbox checked={form.facilities.includes(facility)} />
              <ListItemText primary={facility} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
