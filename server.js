require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const { connectRedis } = require('./utils/redisClient');
const {setupSocketIO} = require('./utils/socket');

const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');


const app = express();
const server = http.createServer(app);

async function startServer() {
  try {
    
    await connectRedis();
    console.log('✅ Redis connected');

    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    setupSocketIO(server);

    const allowedOrigins = [
      'http://localhost:3000',
      'https://din-frontend.netlify.app'
    ];
    
    // app.use(cors({
    //   origin: process.env.CLIENT_URL,
    //   credentials: true,
    // }));
    app.use(cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
    }));
    
    app.use(express.json());

    
    app.use('/api/auth', authRoutes);
    app.use('/api/rooms', roomRoutes);
    app.use('/api/booking', bookingRoutes);

    
    const PORT = process.env.PORT || 8080;
    server.listen(PORT, () => {
      console.log(`🚀 Server körs på port ${PORT}`);
    });

  } catch (err) {
    console.error('❌ Serverfel vid uppstart:', err.message);
    process.exit(1); // Avsluta med felkod
  }
}

startServer();