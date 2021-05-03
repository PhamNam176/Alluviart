import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  NavDropdown,
  Badge,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/userAction";
import ProductSearch from "./ProductSearch";

const AppHeader = function () {
  const dispatch = useDispatch();
  const loginInfo = useSelector((state) => state.userLogin);
  const { userInfo } = loginInfo;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <header>
      <Navbar bg="success" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Alluviart</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <ProductSearch />
            <Nav className="ml-auto">
              <LinkContainer to="/wishlist">
                <Nav.Link className="text-white">
                  <i class="far fa-heart fa-fw"></i> Wishlist
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart fa-fw"></i>
                  {userInfo ? (
                    <Badge
                      pill
                      variant="info"
                      style={{
                        verticalAlign: "top",
                        marginLeft: "-6px",
                      }}
                    >
                      {cartItems
                        ? cartItems.reduce((acc, item) => {
                            return acc + item.qty;
                          }, 0)
                        : 0}
                    </Badge>
                  ) : (
                    ""
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="text-white">
                    <i className="ml-1 fas fa-user fa-fw"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default AppHeader;
