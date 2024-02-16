import { Col, Form, Row } from 'react-bootstrap';

export default function SystInput(props) {
  return (
    <Row>
      <Col xs={5} className="mt-3">
        <Form.Label htmlFor={props.id} className="position-relative">
          {props.text}
          {props.children}
        </Form.Label>
      </Col>
      <Col xs={3}>
        <Form.Control id={props.id} className="w-25 mt-2 " onChange={props.method} defaultValue={props.iValue} />
      </Col>
    </Row>
  );
}
