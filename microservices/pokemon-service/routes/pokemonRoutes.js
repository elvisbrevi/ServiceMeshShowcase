const express = require("express");
const router = express.Router();
const { getCardByName } = require("../controllers/pokemonController");

router.get("/card/:name", getCardByName);

module.exports = router;
