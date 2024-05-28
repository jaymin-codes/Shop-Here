import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
// import { toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from "../slices/ordersApiSlice";
import dateFormat from "../utils/dateFormatUtils";

function OrderScreen() {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  //we will also get user who placed order ass we popolated it in orderController

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment Successfull");
      } catch (error) {
        toast.error(error?.data?.message) || error.message;
      }
    });
  }

  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Payment Successfull", {duration: 3000});
  }

  function onError(err) {
    toast.error(error.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order marked as delivered");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message}</Message>
  ) : (
    <>
      <h2 className="md:text-3xl text-2xl font-semibold pb-2">Order {order._id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item className="text-lg flex flex-col gap-1">
              <h2 className="text-2xl font-semibold">Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order.user.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}-
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {dateFormat(order.deliveredAt)}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item  className="text-lg flex flex-col gap-1">
              <h2 className="text-2xl font-semibold">Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {dateFormat(order.paidAt)}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item  className="text-lg flex flex-col gap-1">
              <h2 className="text-2xl font-semibold pb-1">Order Items</h2>
              {order.orderItems.map((itm, index) => (
                <ListGroup.Item key={index}>
                  <Row className="flex items-center text-lg text-[#2c2c2c]">
                    <Col md={2}>
                      <Image src={itm.image} alt={itm.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${itm.product}`}>{itm.name}</Link>
                    </Col>
                    <Col md={4}>
                      {itm.qty} x ${itm.price} = ${itm.qty * itm.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4} className="mt-4 mt-md-0">
          <Card>
            <ListGroup>
              <ListGroup.Item>
              <h2 className="text-2xl font-semibold text-center">Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item className="flex flex-col gap-1 text-lg">
                <Row>
                  <Col>Items Cost: </Col>
                  <Col className="font-semibold">${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping Cost: </Col>
                  <Col className="font-semibold">${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax: </Col>
                  <Col className="font-semibold">${order.taxPrice}</Col>
                </Row>
                <Row className="text-xl">
                  <Col>Total Cost: </Col>
                  <Col className="font-semibold">${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      {/* <Button
                        onClick={onApproveTest}
                        style={{ marginBottom: "10px" }}
                      >
                        Test Pay Order
                      </Button> */}
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverOrderHandler}
                    >
                      Mark as delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Toaster />
    </>
  );
}

export default OrderScreen;
