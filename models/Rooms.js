const mongoose = require('mongoose');

function requireCapacity(value) {
  // Lista av rumstyper som MÅSTE ha kapacitet angivet
   const typesRequiringCapacity = ['single', 'double', 'suite', 'conference'];

  if (!typesRequiringCapacity.includes(this.type)) return true;

  return typeof value === 'number' && value > 0;
}

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [ 'Single', 'Double', 'Suite', 'Conference'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    validate: {
      validator: requireCapacity,
      message: 'Number of people is required when booking rooms',
    }
  },

  facilities: {
    enum: [
      // 🛏️ Rumsfaciliteter
      'WiFi', 'TV', 'Airconditioning', 'Minibar', 'Balcony', 'Kettle', 'Coffee Maker', 'Desk', 'Safe', 'Hair Dryer',

      // 🧖‍♀️ Wellness
      'Sauna', 'Spa', 'Gym', 'Indoor Pool', 'Jacuzzi', 'Massage',

      // 🍽️ Mat & Dryck
      'Restaurant', 'Bar', 'Breakfast Buffet', 'Room Service', 

      // 🧳 Tjänster
      'Laundry', 'Luggage Storage', '24h Reception', 'Wake-up Service',

      // 🅿️ Parkering & Transport
      'Free Parking', 'EV Charger', 'Airport Shuttle', 'Bike Rental',

      // 💼 Konferens
      'Conference Room', 'Projector', 'Whiteboard', 'Sound System', 'Coffee/Water Station', 'Printer',

      // 👶 Familjevänligt
      'Cribs', 'Playroom', 'Babysitting'
    ],
    type: [String],
  },
 pricePerNight: {
  type: Number,
  validate: {
    validator: function (value) {
      if (this.type === 'Conference') return value === undefined;
      return typeof value === 'number' && value > 0;
    },
    message: 'Pris per natt krävs för hotellrum, ej för konferensrum'
  }
},
pricePerHour: {
  type: Number,
  validate: {
    validator: function (value) {
      if (this.type === 'Conference') return typeof value === 'number' && value > 0;
      return value === undefined;
    },
    message: 'Pris per timme krävs för konferensrum, ej för hotellrum'
  }
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Rooms', roomSchema);