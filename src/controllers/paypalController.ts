import { Request, Response } from 'express';
import paypal from 'paypal-rest-sdk';
import Payment from '../models/Payment';

paypal.configure({
  mode: 'sandbox', // 'sandbox' or 'live'
  client_id: process.env.PAYPAL_CLIENT_ID!,
  client_secret: process.env.PAYPAL_CLIENT_SECRET!,
});

export const createPayPalPayment = async (req: Request, res: Response) => {
  const { amount, currency } = req.body;

  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    transactions: [
      {
        amount: {
          currency,
          total: amount,
        },
        description: 'Payment description',
      },
    ],
    redirect_urls: {
      return_url: 'http://return.url',
      cancel_url: 'http://cancel.url',
    },
  };

  paypal.payment.create(create_payment_json, async (error, payment) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      const newPayment = new Payment({
        amount,
        currency,
        status: payment.state,
        paymentGateway: 'PayPal',
        paymentId: payment.id,
      });

      await newPayment.save();

      res.status(200).json({ payment });
    }
  });
};
