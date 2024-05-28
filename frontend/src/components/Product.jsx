import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Rating from "./Rating";

function Product({ product }) {
  //data comes from homescreen
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className=""
    >
      <Card className="my-3 p-3 rounded">
        <Link
          className="md:w-[250px] md:h-[250px] flex items-center"
          to={`/product/${product._id}`}
        >
          <Card.Img
            className="w-full"
            src={product.image}
          />
        </Link>

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div" className="truncate text-xl">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="div" className="text-xl">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>

          <Card.Text className="text-lg font-semibold">
            ${product.price}
          </Card.Text>
        </Card.Body>
      </Card>
    </motion.div>
  );
}

export default Product;
