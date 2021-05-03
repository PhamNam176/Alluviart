import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartAction";

function ShippingView({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );
    history.push("/payment/");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h2>Shipping</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>*Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter address"
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Row>
          <Col md={8}>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                required
                type="text"
                value={city ? city : ""}
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                required
                type="text"
                value={postalCode ? postalCode : ""}
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            type="text"
            value={country ? country : ""}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit">Continue</Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingView;
