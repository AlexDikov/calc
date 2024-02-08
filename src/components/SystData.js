import { useEffect, useState } from 'react';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import winOne from '../images/win1.png';
import winTwo from '../images/win2.png';
import winThee from '../images/win3.png';

export default function SystData({
  isBrickLambda,
  isBuildingType,
  isConcreteLambda,
  isGrib,
  isInsLambda,
  isInsThickness,
  isSecondInsThickness,
  isSecondInsLambda,
  isSecondLayer,
  isWindowDepth,
  isWindowLength,
  isWindowHeight,
  isBrickArea,
  onBrickArea,
  isConcreteArea,
  onConcreteArea,
  onGrib,
  isGribPcs,
  onGribPcs,
  onWindowLength,
  onWindowHeight,
  onWindowDepth,
}) {
  // const [arrayType, setArrayType] = useState();
  // useEffect(() => {
  //   setArrayType('windows');
  // }, [setArrayType]);

  const navigate = useNavigate();

  const windowDepthPic = () => {
    if (isWindowDepth == 1) return winOne;
    if (isWindowDepth == 2) return winTwo;
    if (isWindowDepth == 3) return winThee;
  };

  return (
    <div>
      <div className="systData">
        <Image src={windowDepthPic()} alt="a" className="systdata-img" />

        <Row>
          <Col xs={3}>
            <Form.Label htmlFor="brick-area">Площадь заполнения стен, м&#178;</Form.Label>
          </Col>
          <Col xs={3}>
            <Form.Control id="brick-area" className="w-25" value={isBrickArea} onChange={onBrickArea}></Form.Control>
          </Col>
          <Col>
            <Form.Label htmlFor="window-depth">Положение оконного блока</Form.Label>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={3}>
            <Form.Label htmlFor="concrete-area">Площадь перекрытий, м&#178;</Form.Label>
          </Col>
          <Col xs={3}>
            <Form.Control
              id="concrete-area"
              className="w-25"
              value={isConcreteArea}
              onChange={onConcreteArea}
            ></Form.Control>
          </Col>
          <Col>
            <Form id="window-depth" onChange={onWindowDepth}>
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
            <Form.Control
              id="window-length"
              className="w-25"
              value={isWindowLength}
              onChange={onWindowLength}
            ></Form.Control>
          </Col>
          <Col>
            <Form.Label htmlFor="window-height">Нахлест утеплителя на оконный блок</Form.Label>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={3}>
            <Form.Label htmlFor="grib-pcs">Количество тарельчатых дюбелей, шт/м&#178;</Form.Label>
          </Col>
          <Col xs={3}>
            <Form.Control id="grib-pcs" className="w-25" value={isGribPcs} onChange={onGribPcs}></Form.Control>
          </Col>
          <Col>
            <Form id="window-height" onChange={onWindowHeight}>
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
            <Form.Select id="grib" className="w-25" value={isGrib} onChange={onGrib}>
              <option id="g-1" value={0.006}>
                {'L ≤ 2 мм'}
              </option>
              <option id="g-2" value={0.005}>
                {'2 < L ≤ 6 мм'}
              </option>
              <option id="g-3" value={0.004}>
                {'6 < L ≤ 11 мм'}
              </option>
              <option id="g-4" value={0.003}>
                {'11 < L ≤ 16 мм'}
              </option>
              <option id="g-5" value={0.0025}>
                {'16 < L ≤ 24 мм'}
              </option>
              <option id="g-6" value={0.002}>
                {'24 < L ≤ 40 мм'}
              </option>
              <option id="g-7" value={0.0015}>
                {'40 < L ≤ 70 мм'}
              </option>
              <option id="g-8" value={0.001}>
                {'L ≥ 70 мм'}
              </option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      <Button
        className="btn-previous"
        variant="outline-secondary"
        size="sm"
        onClick={() => {
          navigate('/walldata');
        }}
      >
        Назад
      </Button>
      <Button
        className="btn-next"
        variant="outline-secondary"
        size="sm"
        onClick={() => {
          navigate('/bracketdata');
        }}
      >
        Далее
      </Button>
    </div>
  );
}
