import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
// import cors from "cors";

dotenv.config()

const port = process.env.PORT;
const app = express();
// app.use(cors());


app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((pdt) => pdt._id === req.params.id);
  res.json(product);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
