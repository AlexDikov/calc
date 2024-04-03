import { Col, Form, Row } from 'react-bootstrap';

export default function SystInput({ children, id, iValue, max, method, min, text, xs1, xs2 }) {
  return (
    <Row>
      <Col xs={xs1} className="mt-3">
        <Form.Label htmlFor={id}>
          {text}
          {children}
        </Form.Label>
      </Col>
      <Col xs={xs2}>
        <Form.Control
          id={id}
          className="mt-2"
          type="number"
          onChange={method}
          defaultValue={iValue}
          min={min}
          max={max}
        />
      </Col>
    </Row>
  );
}
