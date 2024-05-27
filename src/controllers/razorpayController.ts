import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import Payment from '../models/Payment';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const createRazorpayPayment = async (req: Request, res: Response) => {
  const { amount, currency } = req.body;

  const options = {
    amount: amount * 100,
    currency,
    receipt: 'receipt_order_74394',
  };

  try {
    const order = await razorpay.orders.create(options);

    const newPayment = new Payment({
      amount,
      currency,
      status: 'created',
      paymentGateway: 'Razorpay',
      paymentId: order.id,
    });

    await newPayment.save();

    res.status(200).json({ order });
  } catch (error : any) {
    res.status(500).json({ error: error.message });
  }
};
