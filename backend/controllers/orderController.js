import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//@desc    Create new Order
//@route   POST /api/orders
//@access  Private
const addOrderItems = asyncHandler(async (req, res) => { //createOrder
  const {
    orderItems,
    itemsPrice,
    paymentMethod,
    shippingAddress,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((itm) => ({
        ...itm,
        product: itm._id,
        _id: undefined,
      })),
      user: req.user._id,
      itemsPrice,
      paymentMethod,
      shippingAddress,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    const createOrder = await order.save();
    res.status(200).json(createOrder);
  }
});

//@desc    get logged in users order
//@route   GET /api/orders/myorders
//@access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

//@desc    update order to paid
//@route   GET /api/orders/:id/pay
//@access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("update order to paid");
});

//@desc    get order by id
//@route   GET /api/orders/:id
//@access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//@desc    update order to delivered
//@route   GET /api/orders/:id/deliver
//@access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered");
});

//@desc    get all orders
//@route   GET /api/orders
//@access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  res.send("get all orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
};
