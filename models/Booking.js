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
  guests: { type: Number, required: true },

  // För hotellrum
  startDate: { 
    type: Date,
    required: function () {
      return !this.date;
    }
  },
  endDate: { 
    type: Date,
    required: function () {
      return !this.date;
    }
  },

  // För konferensrum
  date: { 
    type: Date,
    required: function () {
      return !this.startDate;
    }
  },
  startTime: { type: String },
  endTime: { type: String }

}, { timestamps: true });

module.exports = mongoose.model('booking', bookingSchema);
