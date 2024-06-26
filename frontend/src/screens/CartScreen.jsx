import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";

function CartScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login/?redirect=/shipping');
    // if not logged in redirect to login else to shipping page
  }

  return (
    <Row>
      <Col md={8}>
        <h1 className="text-2xl font-semibold pb-2">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <span className="text-lg"><Message>
            Your cart is empty!! <br/><Link to="/" className="underline">Go Back</Link>
          </Message></span>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row className="text-lg flex gap-2 font-semibold text-[#2c2c2c]">
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>${item.price}</Col>

                  <Col md={2}>
                    <Form.Control
                    className="text-center text-xl p-1 w-[80px]"
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                      {/* this gives us an array of indexes [0,1,2,3] whose length is equal to countInStocks */}
                    </Form.Control>
                  </Col>

                  <Col md={2}>
                    <Button type="button" variant="light" onClick={() => removeFromCartHandler(item._id)}>
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2 className="text-2xl font-medium pb-2">
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              
              <span className="text-2xl font-semibold">$ {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}</span>
              
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="w-full flex items-center justify-center text-xl font-semibold gap-2"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Procced To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
