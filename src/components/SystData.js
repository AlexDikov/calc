import { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, Image, ProgressBar, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import winOne from '../images/win1.png';
import winTwo from '../images/win2.png';
import winThee from '../images/win3.png';
import { DefaultContext } from '../contexts/DefaultContext';
import SystInput from './SystInput';

export default function SystData() {
  const { windowDepth } = useContext(DefaultContext);

  const navigate = useNavigate();

  const windowDepthPic = () => {
    if (windowDepth == 1) return winOne;
    if (windowDepth == 2) return winTwo;
    if (windowDepth == 3) return winThee;
  };

  return (
    <DefaultContext.Consumer>
      {({
        brickArea,
        buildingType,
        concreteArea,
        concreteWall,
        gribDepth,
        gribPcs,
        gribConcretePcs,
        windowBrickLength,
        windowConcreteLength,
        handleBrickArea,
        handleConcreteArea,
        handleGrib,
        handleGribConcretePcs,
        handleGribPcs,
        handleWindowDepth,
        handleWindowHeight,
        handleWindowBrickLength,
        handleWindowConcreteLength,
      }) => (
        <div>
          <ProgressBar variant="secondary" now={60} label={`${60}%`} />
          <div className="systData">
            {/* <Image src={windowDepthPic()} alt="a" className="systdata-img " /> */}
            {buildingType !== '1' ? (
              <Row>
                <Col xs={4}>
                  <Form.Label htmlFor="brick-area" className="mt-2">
                    Площадь заполнения стен, м&#178;
                  </Form.Label>
                </Col>
                <Col xs={3}>
                  <Form.Control
                    id="brick-area"
                    className="w-25"
                    value={brickArea}
                    onChange={handleBrickArea}
                  ></Form.Control>
                </Col>
              </Row>
            ) : null}
            {buildingType !== '3' ? (
              <Row className="mt-3">
                <Col xs={4}>
                  <Form.Label htmlFor="concrete-area" className="mt-2">
                    {buildingType === '1'
                      ? 'Площадь стен'
                      : concreteWall
                      ? 'Площадь железобетонных стен'
                      : 'Площадь перекрытий'}
                    , м&#178;
                  </Form.Label>
                </Col>
                <Col xs={3}>
                  <Form.Control
                    id="concrete-area"
                    className="w-25"
                    value={concreteArea}
                    onChange={handleConcreteArea}
                  ></Form.Control>
                </Col>
              </Row>
            ) : null}
            {buildingType === '1' ? (
              <Row className="mt-3">
                <Col xs={4}>
                  <Form.Label htmlFor="window-concrete-length" className="mt-2">
                    Длина оконных откосов, м
                  </Form.Label>
                </Col>
                <Col xs={3}>
                  <Form.Control
                    id="window-length"
                    className="w-25"
                    value={windowConcreteLength}
                    onChange={handleWindowConcreteLength}
                  ></Form.Control>
                </Col>
              </Row>
            ) : (
              <Row className="mt-3">
                <Col xs={4}>
                  <Form.Label htmlFor="window-brick-length" className="mt-2">
                    Длина оконных откосов, {concreteWall ? 'образованных кладкой, ' : null}м
                  </Form.Label>
                </Col>
                <Col xs={3}>
                  <Form.Control
                    id="window-length"
                    className="w-25"
                    value={windowBrickLength}
                    onChange={handleWindowBrickLength}
                  ></Form.Control>
                </Col>
              </Row>
            )}

            {concreteWall ? (
              <Row className="mt-3">
                <Col xs={4}>
                  <Form.Label htmlFor="window-concrete-length" className="mt-2">
                    Длина оконных откосов, образованных ж/б стеной, м
                  </Form.Label>
                </Col>
                <Col xs={3}>
                  <Form.Control
                    id="window-length"
                    className="w-25"
                    value={windowConcreteLength}
                    onChange={handleWindowConcreteLength}
                  ></Form.Control>
                </Col>
              </Row>
            ) : null}

            <Row className="mt-3">
              <Col xs={4}>
                <Form.Label htmlFor="grib-pcs" className="mt-2">
                  Количество тарельчатых дюбелей{concreteWall ? ' на кладке' : null}, шт/м&#178;
                </Form.Label>
              </Col>
              <Col xs={3}>
                <Form.Control id="grib-pcs" className="w-25" value={gribPcs} onChange={handleGribPcs}></Form.Control>
              </Col>
            </Row>

            {concreteWall ? (
              <Row className="mt-3">
                <Col xs={4}>
                  <Form.Label htmlFor="grib-pcs" className="mt-2">
                    Количество тарельчатых дюбелей на ж/б стене, шт/м&#178;
                  </Form.Label>
                </Col>
                <Col xs={3}>
                  <Form.Control
                    id="grib-pcs"
                    className="w-25"
                    value={gribConcretePcs}
                    onChange={handleGribConcretePcs}
                  ></Form.Control>
                </Col>
              </Row>
            ) : null}

            <Row className="mb-3">
              <Col xs={4}>
                <Form.Label htmlFor="grib" className="mt-5">
                  Расстояние от тарелки до распорного элемента, мм
                </Form.Label>
              </Col>
              <Col xs={3}>
                <Form.Select id="grib" className=" w-50 mt-5" value={gribDepth} onChange={handleGrib}>
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
              <Row>
                <Col className="mt-5" xs={4}>
                  <Form.Label htmlFor="window-depth">Положение оконного блока</Form.Label>
                </Col>
                <Col>
                  <Form id="window-depth" className="mt-5" onChange={handleWindowDepth}>
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
                        <Form.Check
                          label="+100 мм"
                          name="group1"
                          type={type}
                          id={`inline-${type}-3w`}
                          value="3"
                          inline
                        />
                      </div>
                    ))}
                  </Form>
                </Col>
              </Row>
              <Col xs={4}>
                <Form.Label htmlFor="window-height">Нахлест утеплителя на оконный блок</Form.Label>
              </Col>
              <Col>
                <Form id="window-height" onChange={handleWindowHeight}>
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
      )}
    </DefaultContext.Consumer>
  );
}
