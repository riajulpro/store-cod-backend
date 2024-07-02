import mongoose from "mongoose";

const SellSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Sell = mongoose.model("Sell", SellSchema);
export default Sell;
