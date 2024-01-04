const { createClient } = require("redis");
const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.connect();

const setCache = async (req, res, next) => {
  try {
    const { cacheKey, cardInfo } = req.body;
    await setCacheDirectly(cacheKey, cardInfo);
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

const setCacheDirectly = async (cacheKey, cardInfo) => {
  try {
    await redisClient.hSet(cacheKey.toLowerCase(), cardInfo);
    await redisClient.expire(cacheKey, 30);
    console.log("Cache actualizado Directamente");
  } catch (err) {
    console.error("Error al actualizar el cache:", err);
  }
};

module.exports = {
  setCache,
  getCache,
  setCacheDirectly,
};
