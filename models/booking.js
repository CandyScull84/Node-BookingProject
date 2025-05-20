const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  accommodationId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Accommodation', 
    required: true,
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
  },
  guests: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
