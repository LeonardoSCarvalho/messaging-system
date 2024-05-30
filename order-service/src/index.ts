import express, { Request, Response } from 'express';
import { sendOrder } from './producer';

const app = express();

const port = 3000;

app.us(express.json());
app.post('./order', (req: Request, res: Response) => {
  const order = req.body;
  sendOrder(order);
  res.status(200).send('Order sent to RabbitMQ');
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
