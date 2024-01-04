require("dotenv").config();
const express = require("express");
const cors = require("cors");
const redisRoutes = require("./routes/redisRoutes");
const errorHandler = require("./utils/errorHandling");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/redis", redisRoutes);
app.use(errorHandler);

var amqp = require("amqplib/callback_api");

amqp.connect("amqp://rabbitmq:5672", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    var queue = "pokemon";
    console.log("creando canal POKEMON!");
    channel.assertQueue(queue, {
      durable: false,
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(
      queue,
      function (msg) {
        console.log(" [x] Received %s", msg.content.toString());
      },
      {
        noAck: true,
      }
    );
  });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Redis Service running on port ${PORT}`));
