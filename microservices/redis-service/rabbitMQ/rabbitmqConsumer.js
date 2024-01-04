const amqp = require("amqplib/callback_api");

const startConsumer = (queue, onMessage) => {
  amqp.connect("amqp://rabbitmq:5672", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      channel.assertQueue(queue, { durable: false });
      console.log(
        " [*] Waiting for messages in %s. To exit press CTRL+C",
        queue
      );

      channel.consume(queue, onMessage, { noAck: true });
    });
  });
};

module.exports = { startConsumer };
