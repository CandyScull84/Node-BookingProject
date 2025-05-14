const mongoose = require('mongoose');
const { validate } = require('./user');

const placeSchema = new mongoose.Schema({
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
  capasity: {
    type: Number,
    required: true,
    validate: {
      validator: requireCapacityForCabin,
      message: 'Number of people is required when booking a cabin',
    }
  },
  size: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
