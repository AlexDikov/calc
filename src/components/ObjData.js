import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { cities } from './cities';
import Stack from 'react-bootstrap/Stack';
import { Button, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';

export default function ObjData(props) {
  const navigate = useNavigate();

  const cityList = cities.map((city, i) => {
    return (
      <option key={i} value={i}>
        {city.c}
      </option>
    );
  });

  const cityPropList = cities.find((city, i) => (i == props.isCityValue ? city : null));

  props.onCityProp(cityPropList);
  console.log(props.isBuildingAim);
  return (
    <div className="objPage">
      <Row className="mb-5 mt-3">
        <Col>
          <Form.Control placeholder="Название объекта" />
        </Col>
        <Col>
          <Form.Control placeholder="Адрес объекта" />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="objData">
            <div className="objData__list">
              <Form.Select className="mb-3" id="city" onChange={props.onCityValue}>
                <option>Город строительства</option>
                {cityList}
              </Form.Select>
              <Form.Select className="mb-3" id="building-aim" onChange={props.onBuildingAim}>
                <option>Назначение здания</option>
                <option value="1">Жилое</option>
                <option value="2">Лечебное</option>
                <option value="3">Коммерческое</option>
              </Form.Select>
              <Form.Select className="mb-4 " id="building-type" onChange={props.onBuildingType}>
                <option>Тип конструкции</option>
                <option value="1">Монолитная</option>
                <option value="2">Монолитно-каркасная</option>
                <option value="3">Безкаркасная</option>
              </Form.Select>
              {props.isBuildingType === 2 ? (
                <Form.Check
                  className="obj-data__check"
                  onClick={props.onConcreteWall}
                  label="Есть стены из железобетона"
                />
              ) : null}

              <Form.Label>
                Температура внутреннего воздуха: {props.isInnerTemp} <sup>o</sup>C
              </Form.Label>
              <Form.Range
                className="mb-3"
                defaultValue="20"
                min="16"
                max="26"
                step="1"
                onChange={props.onInnerTemp}
                id="temp-in"
              />
              <Form.Label className="letter">Влажность внутреннего воздуха: {props.isHumidity} %</Form.Label>
              <Form.Range defaultValue="50" min="35" max="65" step="5" onChange={props.onHumidity} id="humid-in" />
              <Form.Label
                htmlFor="mr"
                data-tooltip-id="mr-tooltip"
                className="position-relative w-25"
                data-tooltip-content="коэф"
              >
                Mr
                <button
                  className="i-btn"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="Высота наибольшего неприрывного участка между входным и выходным зазорами"
                ></button>
              </Form.Label>

              <Form.Control id="mr" defaultValue="0.63" onChange={props.onMr} />
            </div>
          </div>
        </Col>
        <Col>
          <Container className="container">
            <p>Расчетные параметры атмосферы</p>
            <Stack gap={0}>
              <div className="p-2">
                {'Температура наиболее холодной пятидневки обеспеченностью 0,92: ' + (cityPropList?.t || '')}
                <sup>o</sup>C
              </div>
              <div className="p-2">
                {'Средняя температура наиболее холодного месяца: ' + (cityPropList?.tm || '')} <sup>o</sup>C
              </div>
              <div className="p-2">
                {'Средняя температура отопительного периода: ' + props.isBuildingAim === 2
                  ? cityPropList.t10 || ''
                  : cityPropList?.t8 || ''}
                <sup>o</sup>C
              </div>
              <div className="p-2">
                {`Продолжительсность отопительного периода: ${
                  props.isBuildingAim === 2 ? cityPropList?.z10 || '' : cityPropList?.z8 || ''
                }`}
                сут
              </div>
              <div className="p-2">{'Относительная влажность воздуха: ' + (cityPropList?.w || '')} %</div>
              <div className="p-2">
                {'Максимальная из средних скоростей по румбам за январь: ' + (cityPropList?.v || '')} м/с
              </div>
            </Stack>
          </Container>
        </Col>
      </Row>
      <div className="navbnt position-relative mt-3 mb-3">
        <Button
          className="position-absolute end-0"
          variant="outline-secondary"
          size="lg"
          onClick={() => {
            navigate('/walldata');
          }}
          onSubmit={props.onConcreteSpHeat()}
        >
          Далее
        </Button>
      </div>
    </div>
  );
}
