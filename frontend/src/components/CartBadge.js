import React from "react";
import { styled } from "styled-components";

const styledCardBadge = styled.span`
  font-size: 0.6rem;
  position: absolute;
  top: -6px;
  right: -5px;
  width: 15px;
  height: 15px;
  color: #fff;
  background-color: #418deb;
  border-radius: 50%;
`;

function CartBadge({ children }) {
  return <styledCardBadge>{children}</styledCardBadge>;
}

export default CartBadge;
