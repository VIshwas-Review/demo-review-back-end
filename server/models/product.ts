import mongoose from "mongoose";
import { Category } from "./types";

const productSchema = new mongoose.Schema(
  {
    title: String,
    imageUrl: String,
    category: {
      type: String,
      required: true,
      enum: {
        values: Object.values(Category),
      },
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
