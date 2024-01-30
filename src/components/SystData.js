import { useEffect, useState } from 'react';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import winOne from '../images/win1.png';
import winTwo from '../images/win2.png';
import winThee from '../images/win3.png';

import DCalc from './DCalc';
import LinearLossCalc from './LinearLossCalc';

export default function SystData(props) {
  // const [arrayType, setArrayType] = useState();
  // useEffect(() => {
  //   setArrayType('windows');
  // }, [setArrayType]);

  const navigate = useNavigate();

  const [windowHeight, setWindowHeight] = useState('1');
  const [windowDepth, setWindowDepth] = useState('1');

  const windowDepthPic = () => {
    if (props.isWindowDepth == 1) return winOne;
    if (props.isWindowDepth == 2) return winTwo;
    if (props.isWindowDepth == 3) return winThee;
  };

  function handleWindowHeight(e) {
    setWindowHeight(e.target.value);
  }
  function handleWindowDepth(e) {
    setWindowDepth(e.target.value);
  }
  return (
    <div>
      <div className="systData">
        <Image src={windowDepthPic()} alt="a" className="systdata-img" />

        <Row>
          <Col xs={3}>
            <Form.Label htmlFor="brick-area">Площадь заполнения стен, м&#178;</Form.Label>
          </Col>
          <Col xs={3}>
            <Form.Control id="brick-area" className="w-25" onChange={props.onBrickArea}></Form.Control>
          </Col>
          <Col>
            <Form.Label>Положение оконного блока</Form.Label>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={3}>
            <Form.Label htmlFor="brick-area">Площадь перекрытий, м&#178;</Form.Label>
          </Col>
          <Col xs={3}>
            <Form.Control id="brick-area" className="w-25" onChange={props.onConcreteArea}></Form.Control>
          </Col>
          <Col>
            <Form onChange={handleWindowDepth}>
              {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    label="-100 мм"
                    name="group1"
                    type={type}
                    defaultChecked={true}
                    id={`inline-${type}-1w`}
                    value="1"
                    inline
                  />
                  <Form.Check label="0 мм" name="group1" type={type} id={`inline-${type}-2w`} value="2" inline />
                  <Form.Check label="+100 мм" name="group1" type={type} id={`inline-${type}-3w`} value="3" inline />
                </div>
              ))}
            </Form>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={3}>
            <Form.Label htmlFor="window-length">Длина оконных откосов, м</Form.Label>
          </Col>
          <Col xs={3}>
            <Form.Control id="window-length" className="w-25" onChange={props.onWindowLength}></Form.Control>
          </Col>
          <Col>
            <Form.Label>Нахлест утеплителя на оконный блок</Form.Label>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={3}>
            <Form.Label htmlFor="grib-pcs">Количество тарельчатых дюбелей, шт/м&#178;</Form.Label>
          </Col>
          <Col xs={3}>
            <Form.Control id="grib-pcs" className="w-25" onChange={props.onGribPcs}></Form.Control>
          </Col>
          <Col>
            <Form onChange={handleWindowHeight}>
              {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    label="0 мм"
                    defaultChecked={true}
                    name="group1"
                    type={type}
                    id={`inline-${type}-1i`}
                    value="1"
                    inline
                  />
                  <Form.Check label="20 мм" name="group1" type={type} id={`inline-${type}-2i`} value="2" inline />
                  <Form.Check label="60 мм" name="group1" type={type} id={`inline-${type}-3i`} value="3" inline />
                </div>
              ))}
            </Form>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={5}>
            <Form.Label htmlFor="grib">Расстояние от тарелки до распорного элемента, мм</Form.Label>
          </Col>

          <Col xs={7}>
            <Form.Select id="grib" className="w-25" onChange={props.onGribDepth}>
              <option value={0.006}>{'L ≤ 2 мм'}</option>
              <option value={0.005}>{'2 < L ≤ 6 мм'}</option>
              <option value={0.004}>{'6 < L ≤ 11 мм'}</option>
              <option value={0.003}>{'11 < L ≤ 16 мм'}</option>
              <option value={0.0025}>{'16 < L ≤ 24 мм'}</option>
              <option value={0.002}>{'24 < L ≤ 40 мм'}</option>
              <option value={0.0015}>{'40 < L ≤ 70 мм'}</option>
              <option value={0.001}>{'L ≥ 70 мм'}</option>
            </Form.Select>
          </Col>
        </Row>
      </div>
      <div className="navbnt position-relative mt-3 mb-3">
        <Button
          variant="outline-secondary"
          size="lg"
          onClick={() => {
            navigate('/walldata');
          }}
        >
          Назад
        </Button>
        <Button
          className="position-absolute end-0"
          variant="outline-secondary"
          size="lg"
          onClick={() => {
            navigate('/bracketdata');
          }}
        >
          Далее
        </Button>
      </div>
      <LinearLossCalc
        isWindowHeight={windowHeight}
        isWindowDepth={windowDepth}
        onWindowHeatLoss={props.onWindowHeatLoss}
        isSecondLayer={props.isSecondLayer}
        isInsThickness={props.isInsThickness}
        isSecondInsThickness={props.isSecondInsThickness}
        isInsHeat={props.isInsHeat}
        isSecondInsHeat={props.isSecondInsHeat}
        isBuildingType={props.isBuildingType}
        isConcreteHeat={props.isConcreteHeat}
        isBrickHeat={props.isBrickHeat}
      />
    </div>
  );
}
