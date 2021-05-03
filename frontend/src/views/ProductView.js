import React, { useState, useEffect } from "react";
import { STOCK_LIMIT, QTY_SELECT_LIMIT } from "../config";
import ProductRatings from "../components/ProductRatings";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productDetails } from "../actions/productAction";
import Loader from "../components/Loader";
import Message from "../components/Message";

// product details view
const ProductView = function ({ match, history }) {
  const [qty, setQty] = useState(1);
  const id = match.params.id;

  const dispatch = useDispatch();
  const detailsProduct = useSelector((state) => state.productDetails);
  const { error, loading, product } = detailsProduct;

  useEffect(() => {
    dispatch(productDetails(id));
  }, [dispatch, match]);

  const stock = product.countInStock;

  // get text for current stock
  let stockText;
  if (stock >= STOCK_LIMIT) {
    stockText = "In stock.";
  } else if (stock === 0) {
    stockText = "Out of stock.";
  } else {
    stockText = `Only ${stock} left in stock.`;
  }

  //handler to add items to cart
  const addToCartHandler = function () {
    console.log("Add to cart handler");
    history.push(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h5>{product.name}</h5>
                <h6 className="text-info"> {product.brand}</h6>

                <ProductRatings
                  value={product.rating}
                  color={"#FFDF00"}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Price: {`€${product.price}`}</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                <h6> About the product</h6>
                <p>{product.shortText}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>{`€${product.price}`}</strong>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h6 className="text-info">
                    <strong>{stockText}</strong>
                  </h6>
                </ListGroup.Item>

                {stock > 0 && (
                  <ListGroup.Item>
                    <Row className="align-items-center">
                      <Col>Quantity:</Col>
                      <Col xs="auto" className="my-1">
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[
                            ...Array(Math.min(stock, QTY_SELECT_LIMIT)).keys(),
                          ].map((val) => (
                            <option key={val + 1} value={val + 1}>
                              {val + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    disabled={stock === 0}
                    type="button"
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProductView;
