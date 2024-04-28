import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
//routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

connectDB(); //mongoose connection from db.js

const port = process.env.PORT;
const app = express();

app.get("/", (req, res) => {
  res.send("Shop-Here, API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
