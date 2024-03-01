import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { cities } from './cities';
import Stack from 'react-bootstrap/Stack';
import { Button, Col, Container, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DefaultContext } from '../contexts/DefaultContext';

export default function ObjData() {
  const navigate = useNavigate();
  const { buildingAim, buildingType, cityValue } = useContext(DefaultContext);

  const checkValidity = () => {
    return buildingAim && buildingType && cityValue;
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
      {({
        buildingAim,
        buildingType,
        cityValue,
        cityProp,
        concreteWall,
        humidity,
        innerTemp,
        mr,
        objAddress,
        objName,
        handleBuildingAim,
        handleBuildingType,
        handleCityValue,
        toggleConcreteWall,
        handleHumidity,
        handleInnerTemp,
        handleMr,
        handleObjAddress,
        handleObjName,
      }) => (
        <div className="objPage">
          <ProgressBar variant="secondary" now={20} label={`${20}%`} />
          <Row className="mb-5 mt-3">
            <Col>
              <Form.Control placeholder="Название объекта" value={objName} onChange={handleObjName} />
            </Col>
            <Col>
              <Form.Control placeholder="Адрес объекта" value={objAddress} onChange={handleObjAddress} />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="objData">
                <div className="objData__list">
                  <Form.Select className="mb-3" id="city" value={cityValue} required onChange={handleCityValue}>
                    <option>Город строительства</option>
                    {cityList}
                  </Form.Select>
                  <Form.Select
                    className="mb-3"
                    id="building-aim"
                    value={buildingAim}
                    required
                    onChange={handleBuildingAim}
                  >
                    <option>Назначение здания</option>
                    <option value="1">Жилое</option>
                    <option value="2">Лечебное</option>
                    <option value="3">Коммерческое</option>
                  </Form.Select>
                  <Form.Select
                    className="mb-4 "
                    id="building-type"
                    value={buildingType}
                    required
                    onChange={handleBuildingType}
                  >
                    <option>Тип конструкции</option>
                    <option value={1}>Монолитная</option>
                    <option value={2}>Монолитно-каркасная</option>
                    <option value={3}>Беcкаркасная</option>
                  </Form.Select>
                  {buildingType === '2' ? (
                    <Form.Check
                      className="obj-data__check"
                      onClick={toggleConcreteWall}
                      checked={concreteWall}
                      label="Есть стены из железобетона"
                    />
                  ) : null}

                  <Form.Label>
                    Температура внутреннего воздуха: {innerTemp} <sup>o</sup>C
                  </Form.Label>
                  <Form.Range
                    className="mb-3"
                    defaultValue="20"
                    min="16"
                    max="26"
                    step="1"
                    onChange={handleInnerTemp}
                    id="temp-in"
                  />
                  <Form.Label className="letter">Влажность внутреннего воздуха: {humidity} %</Form.Label>
                  <Form.Range defaultValue="50" min="35" max="65" step="5" onChange={handleHumidity} id="humid-in" />
                  <Form.Label
                    htmlFor="mr"
                    data-tooltip-id="mr-tooltip"
                    className="position-relative mt-3"
                    data-tooltip-content="коэф"
                  >
                    m<sub>r</sub>
                    <button
                      className="i-btn position-absolute"
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      title="Высота наибольшего неприрывного участка между входным и выходным зазорами"
                    ></button>
                  </Form.Label>
                  <Form.Control id="mr" value={mr} onChange={handleMr} min={0.63} max={1} />
                </div>
              </div>
            </Col>
            <Col>
              <Container className="container">
                <p>Расчетные параметры атмосферы</p>
                <Stack gap={0}>
                  <div className="p-2">
                    {`Температура наиболее холодной пятидневки обеспеченностью 0,92: ${cityProp.t || ''}`}
                    <sup>o</sup>C
                  </div>
                  <div className="p-2">
                    {`Средняя температура наиболее холодного месяца: ${cityProp.tm || ''}`} <sup>o</sup>C
                  </div>
                  <div className="p-2">
                    {`Средняя температура отопительного периода: ${
                      buildingAim === 2 ? cityProp.t10 || '' : cityProp.t8 || ''
                    }`}
                    <sup>o</sup>C
                  </div>
                  <div className="p-2">
                    {`Продолжительсность отопительного периода: ${
                      buildingAim === 2 ? cityProp.z10 || '' : cityProp.z8 || ''
                    }`}
                    сут
                  </div>
                  <div className="p-2">{'Относительная влажность воздуха: ' + (cityProp.w || '')} %</div>
                  <div className="p-2">
                    {'Максимальная из средних скоростей по румбам за январь: ' + (cityProp.v || '')} м/с
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
