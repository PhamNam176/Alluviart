import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem,
  Container,
} from "react-bootstrap";
import Message from "../components/Message";
import ProductRatings from "../components/ProductRatings";
import { addToCart, removeFromCart } from "../actions/cartAction";
import { QTY_SELECT_LIMIT } from "../config";

const CartView = function ({ match, location, history }) {
  const id = match.params.id;
  const qty = location.search ? +location.search.split("=")[1] : 1;
  console.log(qty);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  // handler to remove item from cart

  const removeFromCartHandler = function (id) {
    dispatch(removeFromCart(id));
  };

  //checkout handler

  const checkoutHandler = function () {
    history.push("/login?redirect=shipping");
  };

  // reduce fuction to returns number of items and subtotal Value
  const numItems = cartItems.reduce((acc, item) => {
    return acc + item.qty;
  }, 0);
  const totalValue = cartItems.reduce((acc, item) => {
    return acc + item.qty * item.price;
  }, 0);

  return (
    <Container fluid>
      {cartItems.length === 0 ? (
        <Col md={8}>
          <Message variant="info"> Your shopping cart is empty.</Message>
          <Link to="/" className="text-info">
            Continue shopping
          </Link>
        </Col>
      ) : (
        <Row>
          <Col md={8}>
            <h2>Shopping Cart</h2>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroupItem key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Link to={`/product/${item.product}`}>
                        <Image src={item.image} alt={item.name} fluid />
                      </Link>
                    </Col>
                    <Col md={4}>
                      <Link to={`/product/${item.product}`}>{item.name} </Link>
                    </Col>

                    <Col md={2}>
                      <Form.Control
                        variant="light"
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(addToCart(item.product, +e.target.value))
                        }
                      >
                        {[
                          ...Array(
                            Math.min(item.stock, QTY_SELECT_LIMIT)
                          ).keys(),
                        ].map((val) => (
                          <option key={val + 1} value={val + 1}>
                            {val + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      {" "}
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i class="fas fa-trash"></i>
                      </Button>
                    </Col>
                    <Col md={2}>{`€${item.price}`}</Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h5>
                    Subtotal ({numItems} {numItems === 1 ? "item" : "items"}): €{" "}
                    {Math.round(totalValue * 100 + Number.EPSILON) / 100}
                  </h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    variant="primary"
                    disabled={numItems === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed to checkout
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button href="/" variant="secondary" className="btn-block ">
                    Continue shopping
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CartView;
