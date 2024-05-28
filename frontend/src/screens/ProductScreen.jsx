import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import dateFormat from "../utils/dateFormatUtils";

function ProductScreen() {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);
  // console.log(product);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  const [createReview, { isLoading: loadingPdtreview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Added to cart 🛒", { duration: 2500 });
    // navigate("/cart");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review Submitted");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Meta title={product.name} />
          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush" className="rounded-xl">
                <ListGroupItem>
                  <h3 className="text-2xl font-semibold">{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem className="text-xl">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem className="text-xl font-bold">
                  Price: ${product.price}
                </ListGroupItem>
                <ListGroupItem>
                  Description: {product.description}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush" className="text-xl">
                  <ListGroupItem>
                    <Row>
                      <Col className="font-semibold">Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col className="font-semibold">Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of stock."}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroupItem>

                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row className="flex items-center">
                        <Col className="font-semibold">Quantity:</Col>
                        <Col>
                          <FormControl
                            className="text-center text-xl p-1 w-[80px]"
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                            {/* this gives us an array of indexes [0,1,2,3] whose length is equal to countInStocks */}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}

                  <ListGroupItem>
                    <Button
                      className="w-full flex items-center justify-center text-xl font-semibold gap-2"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To
                      <FaShoppingCart className="text-xl text-white text-center" />
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row className="review">
            <Col md={6}>
              <h2 className="text-2xl font-semibold">Reviews</h2>
              {product.reviews.length === 0 && (
                <span className="mx-2"><Message>No reviews yet</Message></span>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroupItem className=" flex flex-col space-y-1" key={review._id}>
                    <strong className="text-lg">{review.name}</strong>
                    <span className="text-lg"><Rating value={review.rating} /></span>
                    <p className="small">{dateFormat(review.createdAt)}</p>
                    <p className="text-lg">{review.comment}</p>
                  </ListGroupItem>
                ))}

                <ListGroupItem>
                  <h2 className="text-xl font-semibold">Write a review</h2>
                  {loadingPdtreview && <Loader />}
                  {userInfo ? (
                    <Form onSubmit={handleSubmit}>
                      <FormGroup controlId="rating" className="my-1">
                        <FormLabel>Rating</FormLabel>
                        <FormControl
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </FormControl>
                      </FormGroup>
                      <FormGroup controlId="comment" className="my-1">
                        <FormLabel>Comment</FormLabel>
                        <FormControl
                          as="textarea"
                          rows="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></FormControl>
                        <Button
                          disabled={loadingPdtreview}
                          type="submit"
                          variant="primary"
                        >
                          Submit
                        </Button>
                      </FormGroup>
                    </Form>
                  ) : (
                    <span className="mx-2"><Message>
                      Please <Link className="underline" to="/login">SignIn</Link> to write a review
                    </Message></span>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </motion.div>
      )}
      <Toaster />
    </>
  );
}

export default ProductScreen;
