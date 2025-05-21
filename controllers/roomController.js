const Rooms = require('../models/Rooms');

const createRooms = async (req, res) => {
  try {
    const room = new Rooms(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ error: 'Couldnt create room', details: err.message });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const room = await Rooms.find();
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: 'Fel vid hämtning av boenden' });
  }
};

const updateRooms = async (req, res) => {
  try {
    const updated = await Rooms.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Room not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Could not update room', details: err.message });
  }
};

const deleteRooms = async (req, res) => {
  try {
    const deleted = await Rooms.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Room not found' });
    res.json({ message: 'Room deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete the room' });
  }
};

module.exports = {
  createRooms,
  getAllRooms,
  updateRooms,
  deleteRooms
};

