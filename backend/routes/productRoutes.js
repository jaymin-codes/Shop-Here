import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

//admin routes
router.route("/").post(protect, admin, createProduct);
router.route("/:id").put(protect, admin, updateProduct);
router.route("/:id").delete(protect, admin, deleteProduct);

export default router;
