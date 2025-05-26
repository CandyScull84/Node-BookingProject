// src/constants/hotelData.js

export const FACILITIES = [
  'WiFi', 'TV', 'Airconditioning', 'Minibar', 'Balcony', 'Kettle', 'Coffee Maker',
  'Desk', 'Safe', 'Hair Dryer', 'Sauna', 'Spa', 'Gym', 'Indoor Pool', 'Jacuzzi',
  'Massage', 'Restaurant', 'Bar', 'Breakfast Buffet', 'Room Service',
  'Laundry', 'Luggage Storage', '24h Reception', 'Wake-up Service',
  'Free Parking', 'EV Charger', 'Airport Shuttle', 'Bike Rental',
  'Conference Room', 'Projector', 'Whiteboard', 'Sound System',
  'Coffee/Water Station', 'Printer', 'Cribs', 'Playroom', 'Babysitting'
];

export const ROOM_TYPE_IMAGES = {
  Single: '/images/single-room.jpg',
  Double: '/images/double-room.jpg',
  Suite: '/images/suite-room.jpg',
  Conference: '/images/conference-room.jpg',
};

export const DEFAULT_ROOM_IMAGE = '/images/default-room.jpg'; // Om ingen bild finns

export const HERO_IMAGE = '/images/hero-background.jpg'; // Bakgrundsbild för startsidan

export const ROOM_TYPES = [
  'Single', 'Double', 'Suite', 'Conference'
];
export const ROLES = ['User', 'Admin'];

export const DEFAULT_MESSAGES = {
  ROOM_CREATED: 'Rum skapat',
  ROOM_UPDATED: 'Rum uppdaterat',
  ROOM_DELETED: 'Rum borttaget',
  ROOM_SAVE_FAILED: 'Kunde inte spara rummet',
  BOOKING_SUCCESS: 'Bokning lyckades!',
  BOOKING_FAILED: 'Bokning misslyckades',
  BOOKING_DELETED: 'Bokning borttagen',
  BOOKING_UPDATED: 'Bokning uppdaterad!',
  DELETE_CONFIRM: 'Vill du verkligen ta bort detta?'
};

export const DIALOG_TITLES = {
  DELETE_ROOM: 'Bekräfta borttagning',
  DELETE_BOOKING: 'Ta bort bokning',
};
export const DIALOG_CONTENTS = {
  DELETE_ROOM: 'Vill du verkligen ta bort detta rum?',
  DELETE_BOOKING: 'Vill du verkligen ta bort denna bokning?'
};