import { Request, Response } from "express";
import Stripe from "stripe";
import Payment from "../models/Payment";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;

console.log(STRIPE_SECRET_KEY)

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

    const newPayment = new Payment({
      amount,
      currency,
      status: paymentIntent.status,
      paymentGateway: "Stripe",
      paymentId: paymentIntent.id,
    });

    await newPayment.save();

    res.status(200).json({ paymentIntent });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
