import { Router, Response } from "express";
import { createStripePayment } from "../controllers/stripeController";
import { createRazorpayPayment } from "../controllers/razorpayController";
import { createPayPalPayment } from "../controllers/paypalController";

const router = Router();

router.post("/stripe", createStripePayment);
router.post("/razorpay", createRazorpayPayment);

router.get("/", (_, res: Response) => {
  res.render("paymentForm.ejs");
});

router.post("/paypal", createPayPalPayment);

router.get("/success", (_, res: Response) => {
  res.send("success");
});
router.get("/failure", (_, res: Response) => {
  res.send("failure ");
});

export default router;
