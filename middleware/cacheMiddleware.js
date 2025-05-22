const redisClient = require('../utils/redisClient');

const cache = async (req, res, next) => {
  const key = req.originalUrl;

  try {
    const cached = await redisClient.get(key);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    // Override res.json to cache the response
    const originalJson = res.json.bind(res);
    res.json = (data) => {
      redisClient.setEx(key, 3600, JSON.stringify(data)); // Cache for 1 hour
      return originalJson(data);
    };

    next();
  } catch (err) {
    // On Redis error, just continue without cache
    next();
  }
};

module.exports = cache;
