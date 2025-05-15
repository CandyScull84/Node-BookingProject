const Accommodation = require('../models/Accommodation');

const createAccommodation = async (req, res) => {
  try {
    const accommodation = new Accommodation(req.body);
    await accommodation.save();
    res.status(201).json(accommodation);
  } catch (err) {
    res.status(400).json({ error: 'Couldnt create accommodation', details: err.message });
  }
};

const getAllAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find();
    res.json(accommodations);
  } catch (err) {
    res.status(500).json({ error: 'Fel vid hämtning av boenden' });
  }
};

const updateAccommodation = async (req, res) => {
  try {
    const updated = await Accommodation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Accommodation not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Could not update accommodation', details: err.message });
  }
};

const deleteAccommodation = async (req, res) => {
  try {
    const deleted = await Accommodation.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Accommodation not found' });
    res.json({ message: 'Accommodation deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete the accommodation' });
  }
};

module.exports = {
  createAccommodation,
  getAllAccommodations,
  updateAccommodation,
  deleteAccommodation
};

