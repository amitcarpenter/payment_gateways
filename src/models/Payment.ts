import mongoose, { Document, Schema } from "mongoose";

interface IPayment extends Document {
  amount: number;
  currency: string;
  status: string;
  paymentGateWay: string;
  paymentID: string;
}

const paymentSchema = new Schema({
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, required: true },
  paymentGateWay: { type: String, required: true },
  paymentID: { type: String, required: true },
});

export default mongoose.model<IPayment>("Payment", paymentSchema);
