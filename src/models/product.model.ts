import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  cell: {
    type: String,
    // required: true,
  },
  service: {
    type: Object,
    // required: true,
  }
});

const Product = mongoose.model("Product", productSchema);
export default Product;
