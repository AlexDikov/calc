import { Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import { brackets } from './brackets';
import PointLossCalc from './PointLossCalc';

export default function Bracket(props) {
  const [bracketType, setBracketType] = useState('');
  const [bracketWeight, setBracketWeight] = useState('');
  const [wallType, setWallType] = useState('');
  const [result, setResult] = useState();
  const [bracket, setBracket] = useState('MFT-MF HS');
  const [bracketPcs, setBracketPcs] = useState('');

  const bracketList = brackets.map((list, i) => {
    if (bracketType && bracketWeight && list.c)
      return (
        <option key={`c-${i}`} value={i}>
          {list.c.name}
        </option>
      );
    if (bracketType && !bracketWeight)
      return (
        <option key={`a-${i}`} value={i}>
          {list.a.name}
        </option>
      );
    if (!bracketType && bracketWeight && list.d)
      return (
        <option key={`d-${i}`} value={i}>
          {list.d.name}
        </option>
      );
    if (!bracketType && !bracketWeight)
      return (
        <option key={`b-${i}`} value={i}>
          {list.b.name}
        </option>
      );
    return null;
  });

  function handleBracket(e) {
    setBracket(e.target.options[e.target.selectedIndex].text);
  }
  function handleBracketPcs(changeEvent) {
    setBracketPcs(changeEvent.target.value);
  }
  const handleResult = (item) => {
    setResult(item);
    props.onBracketResult(item);
  };
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
  const setConcrete = () => {
    setWallType(true);
  };
  const setBrick = () => {
    setWallType(false);
  };

  return (
    <div className="bracket-box" key={props.ukey}>
      <Row>
        <Col>
          <Form>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  key={`${props.ukey}-1m`}
                  label="алюминий"
                  name="group1"
                  type={type}
                  id={`${props.ukey}-1m`}
                  htmlFor={`${props.ukey}-1m`}
                  onClick={setAluminium}
                />
                <Form.Check
                  key={`${props.ukey}-2m`}
                  label="сталь"
                  name="group1"
                  type={type}
                  id={`${props.ukey}-2m`}
                  htmlFor={`${props.ukey}-2m`}
                  onClick={setSteel}
                />
              </div>
            ))}
          </Form>
        </Col>
        <Col>
          <Form>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  label="межэтажный"
                  name="group1"
                  key={`${props.ukey}-1b`}
                  type={type}
                  id={`${props.ukey}-1b`}
                  htmlFor={`${props.ukey}-1b`}
                  onClick={setHeavy}
                />
                <Form.Check
                  label="рядовой"
                  name="group1"
                  key={`${props.ukey}-2b`}
                  type={type}
                  id={`${props.ukey}-2b`}
                  htmlFor={`${props.ukey}-2b`}
                  onClick={setLight}
                />
              </div>
            ))}
          </Form>
        </Col>
        <Col xs={3}>
          <Form.Select
            key={`${props.ukey}-b`}
            htmlFor={`${props.ukey}-b`}
            className="mt-2 w-75"
            id="bracket"
            onChange={handleBracket}
          >
            <option>Тип кронштейна</option>
            {bracketList}
          </Form.Select>
        </Col>
        <Col>
          <Form>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  key={`${props.ukey}-1w`}
                  label="бетон"
                  name="group1"
                  type={type}
                  id={`${props.ukey}-1w`}
                  htmlFor={`${props.ukey}-1w`}
                  onClick={setConcrete}
                />
                <Form.Check
                  key={`${props.ukey}-2w`}
                  label="кладка"
                  name="group1"
                  type={type}
                  id={`${props.ukey}-2w`}
                  htmlFor={`${props.ukey}-2w`}
                  onClick={setBrick}
                />
              </div>
            ))}
          </Form>
        </Col>
        <Col xs={3}>
          <Form.Control
            placeholder="Количество"
            className="w-50 mt-2"
            id="bracket-pcs"
            key={`${props.ukey}-pcs`}
            onChange={handleBracketPcs}
          />
        </Col>
      </Row>
      <PointLossCalc
        ukey={props.ukey}
        isArrayType={props.isArrayType}
        wallValue={props.wallValue}
        insValue={props.insValue}
        isBracket={bracket}
        isBracketPcs={bracketPcs}
        isBracketType={bracketType}
        isBracketWeight={bracketWeight}
        onBracketResult={handleResult}
        isSecondLayer={props.isSecondLayer}
        isInsThickness={props.isInsThickness}
        isSecondInsThickness={props.isSecondInsThickness}
        isInsLambda={props.isInsLambda}
        isSecondInsLambda={props.isSecondInsLambda}
        isBuildingType={props.isBuildingType}
        isConcreteLambda={props.isConcreteLambda}
        isBrickLambda={props.isBrickLambda}
        isWallType={wallType}
      />
    </div>
  );
}
