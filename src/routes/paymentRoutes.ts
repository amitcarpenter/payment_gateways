import { Router, Response } from "express";
import { createStripePayment } from "../controllers/stripeController";
import { createRazorpayPayment } from "../controllers/razorpayController";
import { createPayPalPayment } from "../controllers/paypalController";

const router = Router();

router.post("/stripe", createStripePayment);
router.post("/razorpay", createRazorpayPayment);
router.post("/paypal", createPayPalPayment);

router.get("/", (_, res: Response) => {
  res.render("paymentForm.ejs");
});

export default router;
