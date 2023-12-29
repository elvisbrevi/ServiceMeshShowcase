const axios = require("axios");

const getCardByName = async (req, res, next) => {
  try {
    const response = await axios.request({
      method: "GET",
      url: `https://api.pokemontcg.io/v2/cards?q=name:${req.params.name}`,
      headers: {
        "X-Api-Key": process.env.POKEMON_API_KEY,
      },
    });

    res.json(response.data.data[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCardByName,
};
