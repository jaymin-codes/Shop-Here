import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered, //admin route
  getAllOrders, //admin route
  deleteOrder
} from "../controllers/orderController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, admin, getAllOrders);  //admin route

router.route("/mine").get(protect, getMyOrders);

router.route("/:id").get(protect, getOrderById).delete(protect, admin, deleteOrder); 

router.route("/:id/pay").put(protect, updateOrderToPaid);

router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);  //admin route
 
export default router;
