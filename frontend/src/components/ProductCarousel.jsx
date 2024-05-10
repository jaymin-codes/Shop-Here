import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import Rating from "./Rating";
import { Carousel, Image, Row, Col } from "react-bootstrap";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

function ProductCarousel() {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4">
      {products.map((pdt) => (
        <Carousel.Item key={pdt._id}>
          <Link to={`/product/${pdt._id}`} className="d-block">
            <Row>
              <Col>
                <Image src={pdt.image} alt={pdt.name} fluid />
              </Col>
              <Col className="d-flex align-items-center justify-content-center">
                <Row>
                  <div className="text-white">{pdt.description}</div>
                  <div className="text-white">
                    <Rating value={pdt.rating} />
                  </div>
                </Row>
              </Col>
            </Row>
            <Row>
              <Carousel.Caption className="carousel-caption">
                <h2>
                  {pdt.name} (${pdt.price})
                </h2>
              </Carousel.Caption>
            </Row>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
