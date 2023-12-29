require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pokemonRoutes = require("./routes/pokemonRoutes");
const errorHandler = require("./utils/errorHandling");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/pokemon", pokemonRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Pokemon TCG Service running on port ${PORT}`)
);
