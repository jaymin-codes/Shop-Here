import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

//@desc    fetch all products
//@route   GET /api/products
//@access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@desc    fetch a single product
//@route   GET /api/products/:id
//@access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error("Resource not found");
});

//@desc    create a new product
//@route   POST /api/products/
//@access  Private Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "edit name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "edit brand",
    category: "edit category",
    countInStock: 0,
    numReviews: 0,
    description: "edit description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc    update a product
//@route   PUT /api/products/:id
//@access  Private Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

//@desc    delete a product
//@route   DELETE /api/products/:id
//@access  Private Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

//@desc    create a new review
//@route   POST /api/products/:id/reviews
//@access  Private
const createPdtReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      //matching the review userId to logged in userId
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "review added" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createPdtReview,
};
