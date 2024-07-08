import mongoose from "mongoose";

const SellSchema = new mongoose.Schema({
  sellData: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      quantity: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Customer",
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    default: "unpaid",
  },
  status: {
    type: String,
    required: false,
    enum: ["Pending", "On the way", "Delivered"],
    default: "Pending",
  },
});

const Sell = mongoose.model("Sell", SellSchema);
export default Sell;
