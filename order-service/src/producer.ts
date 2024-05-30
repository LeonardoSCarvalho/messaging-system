import amqp from 'amqplib';

const queue = 'orders';
const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://rabbitmq';

export async function sendOrder(order: any) {
  try {
    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)), {
      persistent: true,
    });
    console.log(`Order sent: ${JSON.stringify(order)}`);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Error sending order:', error);
  }
}

