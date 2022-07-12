import express from "express";
import { deleteProduct, postProduct, showProduct, updateProduct } from "../controller/Product/productController";

const router = express.Router();

router.get("/", showProduct);
router.post("/", postProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;