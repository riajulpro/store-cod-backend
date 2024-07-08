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
<<<<<<< HEAD
=======
      
>>>>>>> 17945ab9a95e1369d9ac2255c85a4b5df292cd5c
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
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Customer",
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: false,
<<<<<<< HEAD
    enum: ["Pending", "On the way", "Delivered"],
=======
    enum: ["Pending", "On the way", "Delivered", "Cancelled"],
>>>>>>> 17945ab9a95e1369d9ac2255c85a4b5df292cd5c
    default: "Pending",
  },
});

const Sell = mongoose.model("Sell", SellSchema);
export default Sell;