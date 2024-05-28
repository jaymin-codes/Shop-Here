import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
// import { toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import Loader from "../components/Loader";

function PlaceOrderScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = cart;

  //for address
  const { address, city, postalCode, country } = shippingAddress;

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    } else if (!paymentMethod) {
      navigate("/payment");
    }
  }, [shippingAddress, paymentMethod, navigate]);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4 className="text-2xl font-semibold pb-2">Shipping</h4>
              <p className="text-lg">
                <strong>Address: </strong>{" "}
                {`${address}, ${city} - ${postalCode}, ${country}`}
              </p>
            </ListGroup.Item>

            <ListGroup.Item className="text-lg">
              <h4 className="text-2xl font-semibold pb-2">Payment Method</h4>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h4 className="text-2xl font-semibold pb-2">Order Items</h4>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty!!</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className="flex items-center gap-2">
                        <Col md={3}>
                          <Image
                            className="md:w-[100px] w-[150px]"
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            to={`/product/${item._id}`}
                            className="text-lg font-medium text-[#2c2c2c]"
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          <span className="text-xl font-semibold text-[#2c2c2c]">{`${
                            item.qty
                          } x $${item.price} = $${(
                            item.qty * item.price
                          ).toFixed(2)}`}</span>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4 className="text-2xl font-semibold text-center">Order Summary</h4>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row className="text-lg">
                  <Col>Items Cost: </Col>
                  <Col className="font-semibold">${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row className="text-lg">
                  <Col>Shipping Cost: </Col>
                  <Col className="font-semibold">
                    {cart.shippingPrice > 0 ? (
                      <>
                        ${cart.shippingPrice}
                        <br />
                        <span className="small">
                          {`(Add items worth $${(100 - cart.itemsPrice).toFixed(
                            2
                          )} to get free shipping!)`}
                        </span>
                      </>
                    ) : (
                      `$${cart.shippingPrice}`
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row className="text-lg">
                  <Col>Tax Price: </Col>
                  <Col className="font-semibold">${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row className="text-xl">
                  <Col>Total Price: </Col>
                  <Col className="font-semibold">${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {error && (
                <ListGroup.Item>
                  <Message variant="danger">{error.data.message}</Message>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  type="button"
                  className="w-full flex items-center justify-center text-xl font-semibold gap-2"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Toaster />
    </>
  );
}

export default PlaceOrderScreen;
