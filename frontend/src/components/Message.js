import React from "react";
import { Alert } from "react-bootstrap";

const Message = function ({ variant, children }) {
  return (
    <Alert variant={variant}>
      <i class="fas fa-exclamation-circle fa-fw"></i>
      {children}
    </Alert>
  );
};

export default Message;
