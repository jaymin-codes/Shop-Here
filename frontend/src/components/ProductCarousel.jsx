import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import Rating from "./Rating";
import { Carousel, Image, Row, Col } from "react-bootstrap";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import { motion } from "framer-motion";

function ProductCarousel() {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    >
    <Carousel pause="hover" className="bg-[#3e3e3e]">
      {products.map((pdt) => (
        <Carousel.Item key={pdt._id}>
          <Link to={`/product/${pdt._id}`} className="d-block">
            <Row>
              <Col>
                <Image src={pdt.image} alt={pdt.name} fluid />
              </Col>
              <Col className="d-none d-sm-block d-md-flex align-items-center justify-content-center">
                <Row>
                  <div className="text-white text-xl pb-2">{pdt.description}</div>
                  <div className="flex items-center gap-1">
                    Rating: <Rating value={pdt.rating} />
                  </div>
                </Row>
              </Col>
            </Row>
            <Row>
              <Carousel.Caption className="p-2">
                <p className="text-xl font-light pb-6">
                  <strong>{pdt.name} (${pdt.price})</strong>
                </p>
              </Carousel.Caption>
            </Row>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
    </motion.div>
  );
}

export default ProductCarousel;
