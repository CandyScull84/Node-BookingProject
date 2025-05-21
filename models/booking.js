const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  roomId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Room', 
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

   // För konferensrum:
  date: { type: Date }, // t.ex. "2023-10-01"
  startTime: { type: String }, // t.ex. "09:00"
  endTime: { type: String }    // t.ex. "12:00"
}, {
  timestamps: true
});

module.exports = mongoose.model('booking', bookingSchema);
