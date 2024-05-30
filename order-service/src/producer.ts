import amqp from 'amqplib';

const queue = 'orders';

export async function sendOrder(order: any) {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel()
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)), {
      persistent: true
    });
    console.log(`Order sent: ${JSON.stringify(order)}`);

    setTimeout(() => {
      connection.close();
    }, 5000);
  } catch (error) {
    console.error('Error sending order: ', error);

  }
}
