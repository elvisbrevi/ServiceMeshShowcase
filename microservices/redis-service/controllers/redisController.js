const { createClient } = require("redis");
const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.connect();

const setCache = async (req, res, next) => {
  try {
    const { cacheKey, cardInfo } = req.body;
    await redisClient.hSet(cacheKey, cardInfo);
    await redisClient.expire(cacheKey, 20);
    res.send("Cache actualizado");
  } catch (err) {
    next(err);
  }
};

const getCache = async (req, res, next) => {
  try {
    const data = await redisClient.hGetAll(req.params.key);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  setCache,
  getCache,
};
