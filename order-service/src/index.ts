import express from 'express';
import { sendOrder } from './producer';

const app = express();
app.use(express.json());

app.post('/order', async (req, res) => {
  console.log('Received order request');
  const order = req.body;
  console.log('Order details:', order);
  await sendOrder(order);
  res.send('Order received');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);
});

