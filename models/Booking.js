const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rooms',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },

  // För hotellrum:
  startDate: {
    type: Date,
    required: false,
  },
  endDate: {
    type: Date,
    required: false,
  },

  // För konferensrum:
  date: {
    type: Date,
    required: false,
  },
  startTime: {
    type: String,
    required: false,
  },
  endTime: {
    type: String,
    required: false,
  }
}, {
  timestamps: true,
});

// 🛡️ Säkerställ att bokningen är giltig för minst ett bokningstypsscenario
bookingSchema.pre('validate', function (next) {
  const isHotelBooking = this.startDate && this.endDate;
  const isConferenceBooking = this.date && this.startTime && this.endTime;

  if (isHotelBooking || isConferenceBooking) {
    return next();
  }

  return next(new Error('Bokningen måste vara antingen hotell eller konferens'));
});

module.exports = mongoose.model('booking', bookingSchema);
