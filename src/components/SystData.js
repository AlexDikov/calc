import { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, Image, ProgressBar, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { DefaultContext } from '../contexts/DefaultContext';
import grib1 from '../images/1.jpg';
import grib2 from '../images/2.jpg';
import grib3 from '../images/3.jpg';
import grib4 from '../images/4.jpg';
import grib5 from '../images/5.jpg';
import grib6 from '../images/6.jpg';
import grib7 from '../images/7.jpg';
import grib8 from '../images/8.jpg';
import win01 from '../images/01.jpg';
import win02 from '../images/02.jpg';
import win03 from '../images/03.jpg';
import win11 from '../images/11.jpg';
import win12 from '../images/12.jpg';
import win13 from '../images/13.jpg';
import win21 from '../images/21.jpg';
import win22 from '../images/22.jpg';
import win23 from '../images/23.jpg';
import SystInput from './SystInput';

export default function SystData() {
  const {
    brickArea,
    buildingType,
    concreteArea,
    concreteWall,
    windowDepth,
    windowConcreteLength,
    windowLength,
    windowHeight,
    gribDepth,
    gribConcretePcs,
    gribPcs,
  } = useContext(DefaultContext);

  const navigate = useNavigate();

  const checkValidity = () => {
    if (buildingType === 1) return concreteArea && windowConcreteLength && gribPcs;
    if (buildingType === 2)
      return (
        brickArea &&
        windowLength &&
        gribPcs &&
        (concreteWall ? concreteArea && windowConcreteLength && gribConcretePcs : true)
      );
    if (buildingType === 3) return brickArea && windowLength && gribPcs;
  };

  const windowPic = () => {
    if (windowDepth == 1 && windowHeight == 1) return win01;
    if (windowDepth == 1 && windowHeight == 2) return win02;
    if (windowDepth == 1 && windowHeight == 3) return win03;
    if (windowDepth == 2 && windowHeight == 1) return win11;
    if (windowDepth == 2 && windowHeight == 2) return win12;
    if (windowDepth == 2 && windowHeight == 3) return win13;
    if (windowDepth == 3 && windowHeight == 1) return win21;
    if (windowDepth == 3 && windowHeight == 2) return win22;
    if (windowDepth == 3 && windowHeight == 3) return win23;
  };

  const gribPic = () => {
    if (gribDepth == 0.006) return grib1;
    if (gribDepth == 0.005) return grib2;
    if (gribDepth == 0.004) return grib3;
    if (gribDepth == 0.003) return grib4;
    if (gribDepth == 0.0025) return grib5;
    if (gribDepth == 0.002) return grib6;
    if (gribDepth == 0.0015) return grib7;
    if (gribDepth == 0.001) return grib8;
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
          <div className="d-flex justify-content-between mt-1">
            <div>
              {buildingType !== 1 ? (
                <SystInput
                  xs1={9}
                  xs2={2}
                  id={'brick-area'}
                  type="number"
                  text="Площадь заполнения стен, м²"
                  iValue={brickArea}
                  method={handleBrickArea}
                />
              ) : null}
              {buildingType !== 3 ? (
                <SystInput
                  xs1={9}
                  xs2={2}
                  id={'concrete-area'}
                  type="number"
                  text={`
                    ${
                      buildingType === 1
                        ? 'Площадь стен'
                        : concreteWall
                        ? 'Площадь железобетонных стен'
                        : 'Площадь перекрытий'
                    }, м²`}
                  iValue={concreteArea}
                  method={handleConcreteArea}
                />
              ) : null}
              {buildingType === 1 ? (
                <SystInput
                  xs1={9}
                  xs2={2}
                  id={'window-concrete-length'}
                  type="number"
                  text="Длина оконных откосов, м"
                  iValue={windowConcreteLength}
                  method={handleWindowConcreteLength}
                />
              ) : (
                <SystInput
                  xs1={9}
                  xs2={2}
                  id={'window-length'}
                  type="number"
                  text={`Длина оконных откосов, ${concreteWall ? 'образованных кладкой, ' : null}м`}
                  iValue={windowBrickLength}
                  method={handleWindowBrickLength}
                />
              )}

              {concreteWall && (
                <SystInput
                  xs1={9}
                  xs2={2}
                  id={'window-concrete-length'}
                  type="number"
                  text="Длина оконных откосов, образованных ж/б стеной, м"
                  iValue={windowConcreteLength}
                  method={handleWindowConcreteLength}
                />
              )}
              <SystInput
                xs1={9}
                xs2={2}
                id={'grib-pcs'}
                type="number"
                text={`Количество тарельчатых дюбелей${concreteWall ? ' на кладке' : ''}, шт/м²`}
                iValue={gribPcs}
                method={handleGribPcs}
              />
              {concreteWall && (
                <SystInput
                  xs1={9}
                  xs2={2}
                  id={'grib-concrete-pcs'}
                  type="number"
                  text="Количество тарельчатых дюбелей на ж/б стене, шт/м²"
                  iValue={gribConcretePcs}
                  method={handleGribConcretePcs}
                />
              )}
            </div>
            <div className="d-flex flex-column">
              <Image src={gribPic()} alt="a" className="systdata-grib-img d-flex" />
              <div className="d-flex">
                <Form.Label htmlFor="grib" className="mt-2">
                  Расстояние от тарелки до распорного элемента, мм
                </Form.Label>
                <Form.Select id="grib" className=" ms-1 w-25" value={gribDepth} onChange={handleGrib}>
                  <option id="g-1" value={0.006}>
                    {'L ≤ 2'}
                  </option>
                  <option id="g-2" value={0.005}>
                    {'2 < L ≤ 6'}
                  </option>
                  <option id="g-3" value={0.004}>
                    {'6 < L ≤ 11'}
                  </option>
                  <option id="g-4" value={0.003}>
                    {'11 < L ≤ 16'}
                  </option>
                  <option id="g-5" value={0.0025}>
                    {'16 < L ≤ 24'}
                  </option>
                  <option id="g-6" value={0.002}>
                    {'24 < L ≤ 40'}
                  </option>
                  <option id="g-7" value={0.0015}>
                    {'40 < L ≤ 70'}
                  </option>
                  <option id="g-8" value={0.001}>
                    {'L ≥ 70'}
                  </option>
                </Form.Select>
              </div>
              <Image src={windowPic()} alt="a" className="systdata-window-img " />
              <div className="d-flex">
                <Form.Label htmlFor="window-depth" className="me-5">
                  Положение оконного блока, мм
                </Form.Label>
                <Form id="window-depth" className="ms-5" onChange={handleWindowDepth}>
                  {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        label="-100"
                        name="group1"
                        type={type}
                        defaultChecked={true}
                        id={`inline-${type}-1w`}
                        value="1"
                        inline
                      />
                      <Form.Check label="0" name="group1" type={type} id={`inline-${type}-2w`} value="2" inline />
                      <Form.Check
                        label="+100"
                        name="group1"
                        type={type}
                        id={`inline-${type}-3w`}
                        value="3"
                        inline
                        className="ms-2"
                      />
                    </div>
                  ))}
                </Form>
              </div>{' '}
              <div className="d-flex ">
                <Form.Label htmlFor="window-height" className="me-3">
                  Нахлест утеплителя на оконный блок, мм
                </Form.Label>
                <Form id="window-height" onChange={handleWindowHeight}>
                  {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        label="0"
                        defaultChecked={true}
                        name="group1"
                        type={type}
                        id={`inline-${type}-1i`}
                        value="1"
                        inline
                        className="me-4"
                      />
                      <Form.Check
                        label="20"
                        name="group1"
                        type={type}
                        id={`inline-${type}-2i`}
                        value="2"
                        inline
                        className="ms-3"
                      />
                      <Form.Check
                        label="60"
                        name="group1"
                        type={type}
                        id={`inline-${type}-3i`}
                        value="3"
                        inline
                        className="me-5"
                      />
                    </div>
                  ))}
                </Form>
              </div>
            </div>
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
              if (checkValidity()) {
                navigate('/bracketdata');
              }
            }}
            disabled={!checkValidity()}
          >
            Далее
          </Button>
        </div>
      )}
    </DefaultContext.Consumer>
  );
}
