import mongoose from "mongoose";

// Creating the transaction schema
const transactionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    plan: { type: String, required: true },
    amount: { type: Number, required: true },
    credits: { type: Number, required: true },
    payment: { type: Boolean, default: false },
    date: { type: Number },
  },
  // Titling the collection where this schema will be stored
  {
    collection: "transactions",
  }
);
const transactionModel =
  mongoose.models.transaction ||
  mongoose.model("transaction", transactionSchema);
export default transactionModel;
