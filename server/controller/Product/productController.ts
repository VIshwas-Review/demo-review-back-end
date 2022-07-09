import mongoose from "mongoose";
import type { Request, Response } from "express";
import Product from "../../models/product";

export const showProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: "Found", products: products });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const postProduct = async (req: Request, res: Response) => {
  const product = req.body;
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Added successfully", product: newProduct });
  } catch (error: any) {
    res.status(409).json({ message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  const product = req.body.product;
  if (mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Product not found");

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res
      .status(202)
      .json({ message: "Updated succesfully", product: updatedProduct });
  } catch (error: any) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Product not found");

  try {
    await Product.findByIdAndRemove(id);
    res.status(203).json({ message: "Deleted successfully" });
  } catch (error: any) {
    res.status(411).json({ message: error.message });
  }
};
