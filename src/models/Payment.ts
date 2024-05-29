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
  paymentGateWay: { type: String,},
  paymentID: { type: String },
});

export default mongoose.model<IPayment>("Payment", paymentSchema);
