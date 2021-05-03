import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductDetails from "../components/ProductDetails.js";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../actions/productAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import AppPagination from "../components/AppPagination";

const HomeView = function ({ history }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, countPages } = productList;
  let keyword = history.location.search;

  useEffect(() => {
    dispatch(listProduct(keyword));
  }, [dispatch, keyword]);

  const testGit = "Hello World";

  return (
    <div>
      <h1>Latest Product</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} mxl={3}>
                <ProductDetails product={product} />
              </Col>
            ))}
          </Row>
          <AppPagination
            page={page}
            countPages={countPages}
            keyword={keyword}
          />
        </div>
      )}
    </div>
  );
};

export default HomeView;
