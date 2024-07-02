import mongoose from "mongoose";

const SellSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product"
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
    ref: "Customer"
  },
});

const Sell = mongoose.model("Sell", SellSchema);
export default Sell;
