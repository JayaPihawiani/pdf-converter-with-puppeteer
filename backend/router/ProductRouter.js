import express from "express";
import {
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getProductById,
} from "../controller/ProductController.js";

const router = express.Router();

router.route("/product").post(createProduct).get(getProduct);
router
  .route("/product/:id")
  .delete(deleteProduct)
  .patch(updateProduct)
  .get(getProductById);

export default router;
