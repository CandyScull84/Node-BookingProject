const { createClient } = require('redis');

const redisUrl = process.env.REDIS_URL; // Sätt din Redis Cloud URL i miljövariabeln REDIS_URL

const redisClient = createClient({
  url: redisUrl,
});

redisClient.on('connect', () => {
  console.log('🔌 Redis connected');
});

redisClient.on('error', (err) => {
  console.error('❌ Redis error:', err);
});

async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}

module.exports = {
  redisClient,
  connectRedis,
};