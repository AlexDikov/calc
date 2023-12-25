import Form from 'react-bootstrap/Form';
import frame from '../images/frame building.jpg';
import Row from 'react-bootstrap/Row';
import Cities from './Cities';
import Stack from 'react-bootstrap/Stack';
import { Button, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function ObjData() {
  const navigate = useNavigate();

  const [tValue, setTValue] = useState(20);
  const [hValue, setHValue] = useState(50);
  const [tempJan, setTempJan] = useState('');
  const [tempHeat, setTempHeat] = useState('');
  const [timeHeat, setTimeHeat] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [cityValue, setCityValue] = useState('');

  const cities = Cities();

  const cityList = cities.map((city, i) => {
    return <option value={i}>{city.c}</option>;
  });

  const cityPropList = cities.find((city, i) => cityValue === i);

  return (
    <div>
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
              <Form.Select className="mb-3" onChange={(changeEvent) => setCityValue(changeEvent.target.value)}>
                <option>Город строительства</option>
                {cityList}
              </Form.Select>
              <Form.Select className="mb-3" aria-label="Default select example">
                <option>Назначение здания</option>
                <option value="1">Жилое</option>
                <option value="2">Лечебное</option>
                <option value="3">Коммерческое</option>
              </Form.Select>
              <Form.Select className="mb-3" aria-label="Default select example">
                <option>Тип конструкции</option>
                <option value="1">Монолитная</option>
                <option value="2">Монолитно-каркасная</option>
                <option value="3">Безкаркасная</option>
              </Form.Select>
              <Form.Label>
                Температура внутреннего воздуха: {tValue} <sup>o</sup>C
              </Form.Label>
              <Form.Range
                className="mb-3"
                defaultValue="20"
                min="16"
                max="26"
                step="1"
                value={tValue}
                onChange={(changeEvent) => setTValue(changeEvent.target.value)}
              />
              <Form.Label className="letter">Влажность внутреннего воздуха: {hValue} %</Form.Label>
              <Form.Range
                defaultValue="50"
                min="35"
                max="65"
                step="5"
                value={hValue}
                onChange={(changeEvent) => setHValue(changeEvent.target.value)}
              />
            </div>
          </div>
        </Col>
        <Col>
          <Container>
            <p>Расчетные параметры атмосферы</p>
            <Stack gap={0}>
              <div className="p-2">
                {'Температура наиболее холодной пятидневки обеспеченностью 0,92: ' + cityPropList}
              </div>
              <div className="p-2">{'Средняя температура наиболее холодного месяца: ' + tempJan}</div>
              <div className="p-2">{'Средняя температура отопительного периода: ' + tempHeat}</div>
              <div className="p-2">{'Продолжительсность отопительного периода: ' + timeHeat}</div>
              <div className="p-2">{'Относительная влажность воздуха: ' + humidity}</div>
              <div className="p-2">{'Максимальная из средних скоростей по румбам за январь: ' + windSpeed}</div>
            </Stack>
          </Container>
        </Col>
      </Row>
      <div className="navbnt position-relative mt-3 mb-3">
        <Button
          variant="outline-secondary"
          size="lg"
          onClick={() => {
            navigate('/');
          }}
        >
          Назад
        </Button>
        <Button
          className="position-absolute end-0"
          variant="outline-secondary"
          size="lg"
          onClick={() => {
            navigate('/walldata');
          }}
        >
          Далее
        </Button>
      </div>
    </div>
  );
}
