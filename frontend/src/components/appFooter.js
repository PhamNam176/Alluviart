import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function appFooter() {
  return (
    <div>
      <footer>
        <Container>
          <Row>
            <Col className="text-center py-3">
              Copyright &copy; Alluviart. All rights reserved.
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default appFooter;
