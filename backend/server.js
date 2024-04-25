import express from "express";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import dotenv from "dotenv";
dotenv.config();

connectDB(); //mongoose connection from db.js

const port = process.env.PORT;
const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
