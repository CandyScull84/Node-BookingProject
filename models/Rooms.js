const mongoose = require('mongoose');

function requireCapacity(value) {
  // Lista av rumstyper som MÅSTE ha kapacitet angivet
   const typesRequiringCapacity = ['single', 'double', 'suite', 'conference'];

  if (!typesRequiringCapacity.includes(this.type)) return true;

  // Om det är Cabin, måste capacity anges och > 0
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
      'WiFi', 'TV', 'Airconditioning', 'Minibar', 'Balcony', 'Kettle', 'Coffee Maker', 'Desk', 'Safe', 'Hair Dryer', 'Balcony with seaview',

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
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Rooms', roomSchema);