import { Request, Response } from "express";
import Stripe from "stripe";
import Payment from "../models/Payment";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
});

export const createStripePayment = async (req: Request, res: Response) => {
  const { amount, currency, description, name, address } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description: description || "Export transaction",
      shipping: {
        name,
        address: {
          line1: address.line1,
          line2: address.line2,
          city: address.city,
          state: address.state,
          postal_code: address.postal_code,
          country: "IN", // Correctly set country code to 'IN'
        },
      },
    });

    const newPayment = new Payment({
      amount,
      currency,
      paymentGateWay: "Stripe",
      paymentID: paymentIntent.id,
      status: paymentIntent.status,
    });

    await newPayment.save();

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
