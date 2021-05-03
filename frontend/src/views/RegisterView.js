import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/userAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

const RegisterView = function ({ location, history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.splite("=")[1] : "/";
  const registerInfo = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = registerInfo;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(name, email, password, confirmPassword);
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
    } else {
      dispatch(registerUser(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter your username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm your Password:</Form.Label>
          <Form.Control
            required
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit">Register</Button>
      </Form>
      <Row className="py-3">
        <Col>
          {" "}
          Have an account?{" "}
          <Link to={redirect ? `/login/redirect=${redirect}` : "/login/"}>
            Login.
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterView;
