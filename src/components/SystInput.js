import { Col, Form, Row } from 'react-bootstrap';

export default function SystInput(props) {
  return (
    <Row>
      <Col xs={props.xs1} className="mt-3">
        <Form.Label htmlFor={props.id}>
          {props.text}
          {props.children}
        </Form.Label>
      </Col>
      <Col xs={props.xs2}>
        <Form.Control
          id={props.id}
          className="mt-2"
          type="number"
          onChange={props.method}
          defaultValue={props.iValue}
        />
      </Col>
    </Row>
  );
}
