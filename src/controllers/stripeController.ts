import { Request, Response } from "express";
import Stripe from "stripe";
import Payment from "../models/Payment";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
});

export const createStripePayment = async (req: Request, res: Response) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    let id = paymentIntent.id;
    let amount1 = paymentIntent.amount;
    console.log(id, amount1);

    // console.log(paymentIntent);
    const newPayment = new Payment({
      amount,
      currency,
      paymentGateway: "Stripe",
      paymentId: id,
      status: paymentIntent.status,
    });

    await newPayment.save();

    res.status(200).json({ paymentIntent });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
