const axios = require("axios");
const rabbitMQ = require("../rabbitMQ/rabbitmqProducer");

const getCardByName = async (req, res, next) => {
  try {
    const response = await axios.request({
      method: "GET",
      url: `https://api.pokemontcg.io/v2/cards?q=name:${req.params.name}`,
      headers: {
        "X-Api-Key": process.env.POKEMON_API_KEY,
      },
    });

    data = {
      name: req.params.name, //response.data.data[0].name,
      img: response.data.data[0].images.small,
    };

    rabbitMQ.sendMessage("pokemon", JSON.stringify(data));

    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCardByName,
};
