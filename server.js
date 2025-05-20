require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const authRoutes = require('./routes/authRoutes');
const accommodationRoutes = require('./routes/accommodationRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const {setupSocketIO} = require('./utils/socket');

const app = express();
const server = http.createServer(app);
setupSocketIO(server);

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });
  // console.log('verifyToken:', typeof verifyToken);
  // console.log('accommodationRoutes:', typeof accommodationRoutes);
//Routes
app.use('/api/auth', authRoutes);
app.use('/api/accommodation', accommodationRoutes);
app.use('/api/booking', bookingRoutes);

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});