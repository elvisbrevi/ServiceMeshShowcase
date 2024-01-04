const amqp = require("amqplib/callback_api");
const { setCacheDirectly } = require("../controllers/redisController");

function receiveMessage() {
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

      console.log(
        " [*] Waiting for messages in %s. To exit press CTRL+C",
        queue
      );

      channel.consume(
        queue,
        function (msg) {
          console.log(" [x] Received %s", msg.content.toString());
          const cardInfo = JSON.parse(msg.content.toString());
          setCacheDirectly("card:" + cardInfo.name, cardInfo);
        },
        {
          noAck: true,
        }
      );
    });
  });
}

module.exports = { receiveMessage };
