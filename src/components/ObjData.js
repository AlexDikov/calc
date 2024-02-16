import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { cities } from './cities';
import Stack from 'react-bootstrap/Stack';
import { Button, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { DefaultContext } from '../contexts/DefaultContext';

export default function ObjData() {
  const navigate = useNavigate();
  const context = useContext(DefaultContext);

  const checkValidity = () => {
    return context.buildingAim && context.buildingType && context.cityValue;
  };

  const cityList = cities.map((city, i) => {
    return (
      <option key={i} value={i}>
        {city.c}
      </option>
    );
  });

  return (
    <DefaultContext.Consumer>
      {(context) => (
        <div className="objPage">
          <Row className="mb-5 mt-3">
            <Col>
              <Form.Control placeholder="Название объекта" value={context.objName} onChange={context.handleObjName} />
            </Col>
            <Col>
              <Form.Control
                placeholder="Адрес объекта"
                value={context.objAddress}
                onChange={context.handleObjAddress}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="objData">
                <div className="objData__list">
                  <Form.Select
                    className="mb-3"
                    id="city"
                    value={context.cityValue}
                    required
                    onChange={context.handleCityValue}
                  >
                    <option>Город строительства</option>
                    {cityList}
                  </Form.Select>
                  <Form.Select
                    className="mb-3"
                    id="building-aim"
                    value={context.buildingAim}
                    required
                    onChange={context.handleBuildingAim}
                  >
                    <option>Назначение здания</option>
                    <option value="1">Жилое</option>
                    <option value="2">Лечебное</option>
                    <option value="3">Коммерческое</option>
                  </Form.Select>
                  <Form.Select
                    className="mb-4 "
                    id="building-type"
                    value={context.buildingType}
                    required
                    onChange={context.handleBuildingType}
                  >
                    <option>Тип конструкции</option>
                    <option value="1">Монолитная</option>
                    <option value="2">Монолитно-каркасная</option>
                    <option value="3">Беcкаркасная</option>
                  </Form.Select>
                  {context.buildingType === 2 ? (
                    <Form.Check
                      className="obj-data__check"
                      onClick={context.handleConcreteWall}
                      checked={context.concreteWall}
                      label="Есть стены из железобетона"
                    />
                  ) : null}

                  <Form.Label>
                    Температура внутреннего воздуха: {context.innerTemp} <sup>o</sup>C
                  </Form.Label>
                  <Form.Range
                    className="mb-3"
                    defaultValue="20"
                    min="16"
                    max="26"
                    step="1"
                    onChange={context.handleInnerTemp}
                    id="temp-in"
                  />
                  <Form.Label className="letter">Влажность внутреннего воздуха: {context.humidity} %</Form.Label>
                  <Form.Range
                    defaultValue="50"
                    min="35"
                    max="65"
                    step="5"
                    onChange={context.handleHumidity}
                    id="humid-in"
                  />
                  <Form.Label
                    htmlFor="mr"
                    data-tooltip-id="mr-tooltip"
                    className="position-relative mt-3"
                    data-tooltip-content="коэф"
                  >
                    Mr
                    <button
                      className="i-btn position-absolute"
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      title="Высота наибольшего неприрывного участка между входным и выходным зазорами"
                    ></button>
                  </Form.Label>
                  <Form.Control id="mr" value={context.mr} onChange={context.handleMr} min={0.63} max={1} />
                </div>
              </div>
            </Col>
            <Col>
              <Container className="container">
                <p>Расчетные параметры атмосферы</p>
                <Stack gap={0}>
                  <div className="p-2">
                    {`Температура наиболее холодной пятидневки обеспеченностью 0,92: ${context?.cityProp.t || ''}`}
                    <sup>o</sup>C
                  </div>
                  <div className="p-2">
                    {`Средняя температура наиболее холодного месяца: ${context?.cityProp.tm || ''}`} <sup>o</sup>C
                  </div>
                  <div className="p-2">
                    {`Средняя температура отопительного периода: ${
                      context.buildingAim === '2' ? context.cityProp.t10 || '' : context.cityProp.t8 || ''
                    }`}
                    <sup>o</sup>C
                  </div>
                  <div className="p-2">
                    {`Продолжительсность отопительного периода: ${
                      context.buildingAim === '2' ? context?.cityProp.z10 || '' : context?.cityProp.z8 || ''
                    }`}
                    сут
                  </div>
                  <div className="p-2">{'Относительная влажность воздуха: ' + (context?.cityProp.w || '')} %</div>
                  <div className="p-2">
                    {'Максимальная из средних скоростей по румбам за январь: ' + (context?.cityProp.v || '')} м/с
                  </div>
                </Stack>
              </Container>
            </Col>
          </Row>
          <div className="navbnt position-relative mt-3 mb-3"></div>
          <Button
            className="btn-next"
            variant="outline-secondary"
            size="sm"
            onClick={() => {
              if (checkValidity()) {
                navigate('/walldata');
              } else {
                alert('ХУЙ!');
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
