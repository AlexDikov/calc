import { Col, Form, Row } from 'react-bootstrap';

export default function SystInput(props) {
  return (
    <Row>
      <Col xs={5} className="mt-3">
        <Form.Label className="position-relative">
          {props.text}
          {props.children}
        </Form.Label>
      </Col>
      <Col xs={3}>
        <Form.Control className="w-25 mt-2 " onChange={props.method} />
      </Col>
    </Row>
  );
}
