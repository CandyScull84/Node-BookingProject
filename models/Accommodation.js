const mongoose = require('mongoose');
const { validate } = require('./user');

function requireCapacityForCabin(value) {
  // Om det inte är Cabin, bryr vi oss inte
  if (this.type !== 'Cabin') return true;

  // Om det är Cabin, måste capacity anges och > 0
  return typeof value === 'number' && value > 0;
}

const accommodationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [ 'Cabin', 'Tent', 'Caravan', 'Campervan'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
    validate: {
      validator: requireCapacityForCabin,
      message: 'Number of people is required when booking a cabin',
    }
  },
  size: {
    length: {type: Number},
    width: {type: Number},
  },
  facilities: {
    enum: ['Electricity', 'Water', 'Toilet', 'Shower', 'WiFi', 'Firepit'],
    type: [String],
  },
  pricePerNight: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Accommodation', accommodationSchema);