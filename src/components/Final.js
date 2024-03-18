import React, { useContext, useRef, useState } from 'react';
import { DefaultContext } from '../contexts/DefaultContext';
import { Button, Col, Form, Row } from 'react-bootstrap';
import HeatCalc from './HeatCalc';
import { useNavigate } from 'react-router-dom';

export default function Final() {
  const {
    airCalc,
    eGap,
    gObl,
    gU,
    handleInsThickness,
    handleSecondInsThickness,
    handleVaporMembraneAir,
    handlePlasterValue,
    handleRObl,
    handleRRed,
    handleVaporMembraneR,
    handleVentHeight,
    handleVentIn,
    handleVentMed,
    handleVentOut,
    insThickness,
    plaster,
    outE,
    rObl,
    rRed,
    secondIns,
    secondInsThickness,
    vaporCalc,
    vaporMembraneAir,
    vaporMembraneR,
    ventHeight,
    ventIn,
    ventMed,
    ventOut,
  } = useContext(DefaultContext);

  const [pz, setPz] = useState(false);
  const navigate = useNavigate();

  function handlePz() {
    setPz(true);
  }

  HeatCalc();

  return (
    <div className="final">
      <div className="final-container">
        {rRed > rObl ? (
          <div className="final rounded shadow p-2 mb-2 bg-body-tertiary w-100">
            <h4>
              R<sub>пр({rRed.toFixed(2)})</sub> {'>'} R<sub>тр({rObl.toFixed(2)})</sub>
            </h4>
            <h6>Условие выполнено</h6>
          </div>
        ) : (
          <div className="final  rounded shadow p-2 mb-2 bg-body-tertiary w-100">
            <h4>
              R<sub>у({rRed.toFixed(2)})</sub> {'<'} R<sub>тр({rObl.toFixed(2)})</sub>
            </h4>
            <Row className="mx-auto">
              <Col xs={7} className="mt-2">
                <p>Увеличьте слой утеплителя:</p>
              </Col>
              {secondIns ? (
                <Col xs={4}>
                  <Form.Control
                    className="w-25"
                    placeholder="нижний слой, мм"
                    value={insThickness ? insThickness * 1000 : null}
                    onChange={handleInsThickness}
                  ></Form.Control>
                  <Form.Control
                    className="w-25"
                    placeholder="верхний слой, мм"
                    value={secondInsThickness ? secondInsThickness * 1000 : null}
                    onChange={handleSecondInsThickness}
                  ></Form.Control>
                </Col>
              ) : (
                <Col xs={2}>
                  <Form.Control
                    placeholder="мм"
                    value={insThickness ? insThickness * 1000 : null}
                    onChange={handleInsThickness}
                  ></Form.Control>
                </Col>
              )}
            </Row>
          </div>
        )}
        {vaporCalc &&
          (eGap < outE ? (
            <div class="final rounded shadow p-2 mb-2 bg-body-tertiary w-100">
              <h4>
                e<sub>пр({eGap.toFixed(0)})</sub> {'<'} E<sub>н({outE.toFixed(0)})</sub>
              </h4>
              <h6>Условие выполнено</h6>
            </div>
          ) : (
            <div className="final mt-1 rounded shadow p-3 mb-2 bg-body-tertiary ">
              <h4>
                e<sub>пр({eGap.toFixed(0)})</sub> {'>'} E<sub>н({outE.toFixed(0)})</sub>
              </h4>
              <Row className="ms-auto">
                <Col xs={7} className="mt-2">
                  <p>Уменьшите высоту прослойки отсечкой: </p>
                </Col>
                <Col xs={2}>
                  <Form.Control
                    className=" ms-4"
                    placeholder="м"
                    value={ventHeight}
                    onChange={handleVentHeight}
                  ></Form.Control>
                </Col>
              </Row>
              <Row>
                <Col xs={14} className="mt-2">
                  <Form.Label>Увеличьте ширину зазора или точек входа/выхода воздуха </Form.Label>
                </Col>
              </Row>
              <Row>
                <Col xs={3}>
                  <Form.Control placeholder="вход, мм" value={ventIn * 1000} onChange={handleVentIn}></Form.Control>
                </Col>
                <Col xs={3} className="mx-auto">
                  <Form.Control placeholder="ширина, мм" value={ventMed * 1000} onChange={handleVentMed}></Form.Control>
                </Col>
                <Col xs={3}>
                  <Form.Control placeholder="выход, мм" value={ventOut * 1000} onChange={handleVentOut}></Form.Control>
                </Col>
              </Row>
            </div>
          ))}
        {vaporCalc &&
          (gU < gObl ? (
            <div class="final rounded shadow p-2 mb-2 bg-body-tertiary w-100">
              <h4>
                G<sub>у({gU.toFixed(3)})</sub> {'<'} G<sub>тр({gObl.toFixed(3)})</sub>
              </h4>
              <h6>Условие выполнено</h6>
            </div>
          ) : (
            <div className="final rounded shadow p-3 mb-5 bg-body-tertiary ">
              <h4>
                G<sub>у({gU.toFixed(3)})</sub> {'>'} G<sub>тр({gObl.toFixed(3)})</sub>
              </h4>
              <p>Добавьте штукатурку или пароизоляцию</p>
              {plaster ? null : (
                <Row>
                  <Col>
                    <Form.Select id="plaster" className=" mx-auto" onChange={handlePlasterValue}>
                      <option>Штукатурка изнутри</option>
                      <option value={1}>Нет</option>
                      <option value={2}>Гипсовая</option>
                      <option value={3}>Цементная</option>
                    </Form.Select>
                  </Col>
                </Row>
              )}
              <Row>
                <Col xs={11}>
                  <Form.Control
                    id="vapor-membrane-air"
                    placeholder="Сопротивление воздухопроницанию, м²чПа/кг"
                    value={vaporMembraneAir}
                    onChange={handleVaporMembraneAir}
                  />
                </Col>
                <Col xs={11}>
                  <Form.Control
                    id="vapor-membrane-r"
                    placeholder="Сопротивление паропроницанию, м²чПа/мг"
                    value={vaporMembraneR}
                    onChange={handleVaporMembraneR}
                  />
                </Col>
              </Row>
            </div>
          ))}
      </div>
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={() => {
          handlePz();
        }}
      >
        Пояснительная записка
      </Button>
      {pz && <HeatCalc setRRed={handleRRed} setRObl={handleRObl} />}
      <Button
        className="mb-5"
        variant="outline-secondary"
        size="sm"
        onClick={() => {
          navigate(vaporCalc || airCalc ? '/coverdata' : '/bracketdata');
        }}
      >
        Назад
      </Button>
    </div>
  );
}
