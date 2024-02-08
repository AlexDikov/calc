import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { cities } from './cities';
import Stack from 'react-bootstrap/Stack';
import { Button, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ObjData({
  isBuildingAim,
  isBuildingType,
  isCityValue,
  isCityProp,
  isConcreteWall,
  isHumidity,
  isInnerTemp,
  isMr,
  isObjName,
  isObjAddress,
  onBuildingAim,
  onBuildingType,
  onCityValue,
  onCityProp,
  onConcreteWall,
  onHumidity,
  onInnerTemp,
  onMr,
  onObjName,
  onObjAddress,
}) {
  const navigate = useNavigate();

  const cityList = cities.map((city, i) => {
    return (
      <option key={i} value={i}>
        {city.c}
      </option>
    );
  });

  return (
    <div className="objPage">
      <Row className="mb-5 mt-3">
        <Col>
          <Form.Control placeholder="Название объекта" value={isObjName} onChange={onObjName} />
        </Col>
        <Col>
          <Form.Control placeholder="Адрес объекта" value={isObjAddress} onChange={onObjAddress} />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="objData">
            <div className="objData__list">
              <Form.Select className="mb-3" id="city" value={isCityValue} required onChange={onCityValue}>
                <option>Город строительства</option>
                {cityList}
              </Form.Select>
              <Form.Select className="mb-3" id="building-aim" value={isBuildingAim} required onChange={onBuildingAim}>
                <option>Назначение здания</option>
                <option value="1">Жилое</option>
                <option value="2">Лечебное</option>
                <option value="3">Коммерческое</option>
              </Form.Select>
              <Form.Select
                className="mb-4 "
                id="building-type"
                value={isBuildingType}
                required
                onChange={onBuildingType}
              >
                <option>Тип конструкции</option>
                <option value="1">Монолитная</option>
                <option value="2">Монолитно-каркасная</option>
                <option value="3">Беcкаркасная</option>
              </Form.Select>
              {isBuildingType === 2 ? (
                <Form.Check
                  className="obj-data__check"
                  onClick={onConcreteWall}
                  checked={isConcreteWall}
                  label="Есть стены из железобетона"
                />
              ) : null}

              <Form.Label>
                Температура внутреннего воздуха: {isInnerTemp} <sup>o</sup>C
              </Form.Label>
              <Form.Range
                className="mb-3"
                defaultValue="20"
                min="16"
                max="26"
                step="1"
                onChange={onInnerTemp}
                id="temp-in"
              />
              <Form.Label className="letter">Влажность внутреннего воздуха: {isHumidity} %</Form.Label>
              <Form.Range defaultValue="50" min="35" max="65" step="5" onChange={onHumidity} id="humid-in" />
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

              <Form.Control id="mr" value={isMr} onChange={onMr} />
            </div>
          </div>
        </Col>
        <Col>
          <Container className="container">
            <p>Расчетные параметры атмосферы</p>
            <Stack gap={0}>
              <div className="p-2">
                {`Температура наиболее холодной пятидневки обеспеченностью 0,92: ${isCityProp?.t || ''}`}
                <sup>o</sup>C
              </div>
              <div className="p-2">
                {`Средняя температура наиболее холодного месяца: ${isCityProp?.tm || ''}`} <sup>o</sup>C
              </div>
              <div className="p-2">
                {`Средняя температура отопительного периода: ${
                  isBuildingAim === '2' ? isCityProp.t10 || '' : isCityProp.t8 || ''
                }`}
                <sup>o</sup>C
              </div>
              <div className="p-2">
                {`Продолжительсность отопительного периода: ${
                  isBuildingAim === '2' ? isCityProp?.z10 || '' : isCityProp?.z8 || ''
                }`}
                сут
              </div>
              <div className="p-2">{'Относительная влажность воздуха: ' + (isCityProp?.w || '')} %</div>
              <div className="p-2">
                {'Максимальная из средних скоростей по румбам за январь: ' + (isCityProp?.v || '')} м/с
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
          navigate('/walldata');
        }}
      >
        Далее
      </Button>
    </div>
  );
}
