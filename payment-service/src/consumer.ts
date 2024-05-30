import amqp from 'amqplib';

const queue = 'orders';
const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://rabbitmq';

export async function receiveOrder() {
  try {
    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });

    console.log('Waiting for orders...');
    channel.consume(
      queue,
      (msg) => {
        if (msg !== null) {
          const order = JSON.parse(msg.content.toString());
          console.log(`Order received: ${JSON.stringify(order)}`);
          channel.ack(msg);
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error('Error receiving order', error);
  }
}

