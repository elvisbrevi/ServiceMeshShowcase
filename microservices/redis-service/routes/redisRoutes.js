const express = require("express");
const router = express.Router();
const { setCache, getCache } = require("../controllers/redisController");

router.post("/cache", setCache);
router.get("/cache/:key", getCache);

module.exports = router;
