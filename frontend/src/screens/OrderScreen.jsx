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
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";

function OrderScreen() {
  const { id: orderId } = useParams();

  const {data: order, isLoading, isError} = useGetOrderDetailsQuery(orderId);
  

  return <div>OrderScreen</div>;
}

export default OrderScreen;
