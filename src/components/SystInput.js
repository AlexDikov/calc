import { Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';

export default function SystInput({ children, id, iValue, max, method, min, text, xs1, xs2, tooltip, tooltipText }) {
  return (
    <Row>
      <Col xs={xs1} className="mt-3">
        <Form.Label htmlFor={id} className="obj-param position-relative">
          {text}
          {children}
          {tooltip ? (
            <OverlayTrigger overlay={<Tooltip id="vapor-tooltip">{tooltipText}</Tooltip>}>
              <button className="i-btn position-absolute"></button>
            </OverlayTrigger>
          ) : null}
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
