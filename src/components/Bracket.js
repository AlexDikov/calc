import { Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import { brackets } from './brackets';
import HeatLossCalc from './HeatLossCalc';

export default function Bracket(props) {
  const [bracketType, setBracketType] = useState('');
  const [bracketWeight, setBracketWeight] = useState('');
  const [bracket, setBracket] = useState('');

  const bracketList = brackets.map((list, i) => {
    if (bracketType && bracketWeight && list.c) return <option value={i}>{list.c.name}</option>;
    if (bracketType && !bracketWeight) return <option value={i}>{list.a.name}</option>;
    if (!bracketType && bracketWeight && list.d) return <option value={i}>{list.d.name}</option>;
    if (!bracketType && !bracketWeight) return <option value={i}>{list.b.name}</option>;
    return null;
  });

  const setAluminium = () => {
    setBracketType(true);
  };
  const setSteel = () => {
    setBracketType(false);
  };

  const setHeavy = () => {
    setBracketWeight(true);
  };
  const setLight = () => {
    setBracketWeight(false);
  };

  function handleBracket(e) {
    setBracket(e.target.options[e.target.selectedIndex].text);
  }

  return (
    <div className="bracket-box">
      <Row>
        <Col>
          <Form>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  label="алюминий"
                  name="group1"
                  type={type}
                  id={`inline-${type}-1m`}
                  onClick={setAluminium}
                />
                <Form.Check label="сталь" name="group1" type={type} id={`inline-${type}-2m`} onClick={setSteel} />
              </div>
            ))}
          </Form>
        </Col>
        <Col>
          <Form>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check label="межэтажный" name="group1" type={type} id={`inline-${type}-1b`} onClick={setHeavy} />
                <Form.Check label="рядовой" name="group1" type={type} id={`inline-${type}-2b`} onClick={setLight} />
              </div>
            ))}
          </Form>
        </Col>
        <Col xs={3}>
          <Form.Select className="mt-2 w-75" id="bracket" onChange={handleBracket} defaultValue={1}>
            <option>Тип кронштейна</option>
            {bracketList}
          </Form.Select>
        </Col>
        <Col>
          <Form>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  label="бетон"
                  checked={window ? null : true}
                  name="group1"
                  type={type}
                  id={`inline-${type}-1w`}
                />
                <Form.Check label="кладка" name="group1" type={type} id={`inline-${type}-2w`} />
              </div>
            ))}
          </Form>
        </Col>
        <Col xs={3}>
          <Form.Control placeholder="Количество" className="w-50 mt-2" id="bracket-pcs" onChange={props.onBracketPcs} />
        </Col>
      </Row>
      <HeatLossCalc
        wallValue={props.wallValue}
        insValue={props.insValue}
        isBracket={bracket}
        onBracketResult={props.onBracketResult}
      />
    </div>
  );
}
