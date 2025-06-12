const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  roomId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Rooms', 
    required: true
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  },
  guests: { 
    type: Number, 
    required: true 
  },

  // Hotellrum
  startDate: Date,
  endDate: Date,

  // Konferensrum
  date: Date,
  startTime: String,
  endTime: String

}, { timestamps: true });

// 🛡️ Anpassad validering för att skilja hotell och konferens
bookingSchema.pre('validate', function (next) {
  const isHotelBooking = this.startDate || this.endDate;
  const isConferenceBooking = this.date || this.startTime || this.endTime;

  if (isHotelBooking) {
    if (!this.startDate || !this.endDate) {
      return next(new Error('Både startDate och endDate krävs för hotellbokning'));
    }
  }

  if (isConferenceBooking) {
    if (!this.date || !this.startTime || !this.endTime) {
      return next(new Error('Datum, start- och sluttid krävs för konferensbokning'));
    }
  }

  if (!isHotelBooking && !isConferenceBooking) {
    return next(new Error('Bokningen måste vara antingen hotell eller konferens'));
  }

  next();
});

module.exports = mongoose.model('booking', bookingSchema);
