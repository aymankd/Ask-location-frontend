import React from "react";
import { Row, Col } from "react-bootstrap";
export default function Comment({ props }) {
  return (
    <Row className="my-3">
      <Col xs={4}>
        <strong>{props.author} :</strong>
      </Col>
      <Col>{props.contenu}</Col>
    </Row>
  );
}
