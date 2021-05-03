import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartAction";

function PaymentView({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const submitHandler = (e) => {
    e.preventDefault();
    history.push("/placeorder");
    dispatch(savePaymentMethod(paymentMethod));
  };

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h2>Payment</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="country">
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            {" "}
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="paypal"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit">Continue</Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentView;
