require("dotenv").config();
const express = require("express");
const cors = require("cors");
const redisRoutes = require("./routes/redisRoutes");
const errorHandler = require("./utils/errorHandling");
const app = express();
const rabbitMQ = require("./rabbitMQ/rabbitmqConsumer");

app.use(cors());
app.use(express.json());

app.use("/redis", redisRoutes);
app.use(errorHandler);

rabbitMQ.receiveMessage();

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Redis Service running on port ${PORT}`));
