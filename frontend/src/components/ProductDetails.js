import React from "react";
import { Card } from "react-bootstrap";
import ProductRatings from "./ProductRatings";
import { Link } from "react-router-dom";

function productDetails({ product }) {
  return (
    <Card className=" my-3 p-3 rounded ">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong> {product.name} </strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            <ProductRatings
              value={product.rating}
              color={"#FFDF00"}
              text={`${product.numReviews} reviews`}
            />
          </div>
        </Card.Text>
        <Card.Text as="h5">
          <div className="my-3"> €{product.price}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default productDetails;
