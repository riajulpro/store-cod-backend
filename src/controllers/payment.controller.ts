import { Request, Response } from "express";
import Stripe from "stripe";

export const createPaymentIntent = async (req: Request, res: Response) => {
  const stripe = new Stripe(process.env.STRIPE_KEY!);
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
