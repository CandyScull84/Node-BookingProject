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

  // Hotell
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },

  // Konferens
  date: {
    type: Date,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  }
}, {
  timestamps: true
});

// ✅ LÖSNING: Se till att datum konverteras korrekt innan validering
bookingSchema.pre('validate', function (next) {
  // Förvandla inkommande strängar till faktiska Date-objekt
  if (this.startDate) this.startDate = new Date(this.startDate);
  if (this.endDate) this.endDate = new Date(this.endDate);
  if (this.date) this.date = new Date(this.date);

  const isHotelBooking = this.startDate && this.endDate;
  const isConferenceBooking = this.date && this.startTime && this.endTime;

  if (isHotelBooking || isConferenceBooking) {
    return next();
  }

  return next(new Error('Bokningen måste vara antingen hotell eller konferens'));
});

module.exports = mongoose.model('booking', bookingSchema);
