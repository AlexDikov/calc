import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { cities } from './cities';
import { Button, Col, Container, OverlayTrigger, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DefaultContext } from '../contexts/DefaultContext';
import concrete from '../images/concrete.jpg';
import block from '../images/block.jpg';
import brick from '../images/brick.jpg';
import map from '../images/map.jpeg';
import bc from '../images/bc.jpeg';
import manufacture from '../images/manufacture.jpeg';
import hospital from '../images/hospital.jpeg';
import Tooltip from 'react-bootstrap/Tooltip';

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

  const buildingPhoto = () => {
    if (buildingAim === 1) return hospital;
    if (buildingAim === 2) return bc;
    if (buildingAim === 3) return manufacture;
  };

  const wallPhoto = () => {
    if (buildingType === 1) return concrete;
    if (buildingType === 2) return block;
    if (buildingType === 3) return brick;
  };

  return (
    <DefaultContext.Consumer>
      {({
        buildingAim,
        buildingType,
        cityValue,
        cityProp,
        concreteWall,
        handleBuildingAim,
        handleBuildingType,
        handleCityValue,
        handleHumidity,
        handleHumidityZone,
        handleInnerTemp,
        handleMr,
        handleObjAddress,
        handleObjName,
        handleVaporCalc,
        humidity,
        humidityZone,
        innerTemp,
        mr,
        objAddress,
        objName,
        toggleConcreteWall,
        vaporCalc,
      }) => (
        <div className="obj-page">
          <ProgressBar variant="secondary" now={20} label={`${20}%`} />
          <div className="d-flex justify-content-between mt-1">
            <div className="obj-adress">
              <Form.Control placeholder="Название объекта" value={objName} onChange={handleObjName} />
              <Form.Control
                className="ms-2"
                placeholder="Адрес объекта"
                value={objAddress}
                onChange={handleObjAddress}
              />
            </div>
            <Button
              className="mt-1"
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
          <div className="obj-data">
            <div className="obj-container">
              <div className="obj-img">
                <img className="obj-map" src={map} alt="map" />
              </div>
              <Form.Select className="mt-3" id="city" value={cityValue} required onChange={handleCityValue}>
                <option>Город строительства</option>
                {cityList}
              </Form.Select>
            </div>
            <div className="obj-container">
              <div className="obj-img">
                <img className="obj-map" src={buildingAim ? buildingPhoto() : bc} alt="map" />
              </div>
              <Form.Select className="mt-3" id="building-aim" value={buildingAim} required onChange={handleBuildingAim}>
                <option>Назначение здания</option>
                <option value="1">Жилое, лечебное, детское</option>
                <option value="2">Общественное, административное</option>
                <option value="3">Производственное </option>
              </Form.Select>
            </div>
            <div className="obj-container">
              <div className="obj-img">
                <img className="obj-map" src={buildingType ? wallPhoto() : concrete} alt="map" />
              </div>
              <Form.Select
                className="mt-3 mb-3 position-relative"
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
              {buildingType === 2 ? (
                <Form.Check
                  className="obj-data__check"
                  onClick={toggleConcreteWall}
                  checked={concreteWall}
                  label="Есть стены из железобетона"
                />
              ) : null}
            </div>
          </div>
          <div className="d-flex flex-row mt-3 justify-content-between">
            <div className="obj-param ">
              <Form.Label className=" position-relative">
                Температура внутреннего воздуха: {innerTemp} <sup>o</sup>C{' '}
                <OverlayTrigger
                  overlay={
                    <Tooltip id="temp-tooltip">Допустимая температура в помещениях согласно СП 50.13330.2012</Tooltip>
                  }
                >
                  <button className="i-btn position-absolute"></button>
                </OverlayTrigger>
              </Form.Label>
              <Form.Range
                className="mb-3"
                defaultValue="20"
                min="5"
                max="26"
                step="1"
                onChange={handleInnerTemp}
                id="temp-in"
              />
              <Form.Label className=" position-relative">
                Влажность внутреннего воздуха: {humidity} %
                <OverlayTrigger
                  overlay={
                    <Tooltip id="humid-tooltip">
                      Для жилых зданий, лечебных учреждений, домов для престарелых и инвалидов, школ и детских домов –
                      55 %; <br />
                      для кухонь – 60 %; <br />
                      для ванных комнат – 65 %; <br />
                      для теплых подвалов и подполий с коммуникациями – 75 %; <br />
                      для теплых чердаков жилых зданий – 55 %; <br />
                      для других помещений общественных зданий – 50 %.
                    </Tooltip>
                  }
                >
                  <button className="i-btn position-absolute"></button>
                </OverlayTrigger>
              </Form.Label>
              <Form.Range defaultValue="50" min="35" max="100" step="5" onChange={handleHumidity} id="humid-in" />
            </div>
            <div className="obj-param position-relative">
              <Form.Check
                className=" ms-2 position-relative"
                id="mtel-cover"
                label="Учитывать расчет влаго/воздухопроницания"
                checked={vaporCalc}
                onClick={handleVaporCalc}
              ></Form.Check>
              <OverlayTrigger
                overlay={
                  <Tooltip id="vapor-tooltip">
                    Учитывать проверку отсутствия точки росы в утеплителе и излишней проницаемости ограждающей
                    конструкции
                  </Tooltip>
                }
              >
                <button className="i-btn position-absolute"></button>
              </OverlayTrigger>
            </div>
            <div className="obj-param d-flex flex-column">
              <Form.Label
                htmlFor="mr"
                data-tooltip-id="mr-tooltip"
                className="position-relative  w-25"
                data-tooltip-content="коэф"
              >
                m<sub>r</sub>
                <OverlayTrigger
                  overlay={
                    <Tooltip id="vapor-tooltip">
                      Коэффициент, учитывающий особенности региона строительства. По умолчанию принимается 0,63, либо по
                      по разделу 'Энергоэффективность' проекта.
                    </Tooltip>
                  }
                >
                  <button className="i-btn2 position-absolute"></button>
                </OverlayTrigger>
              </Form.Label>

              <Form.Control id="mr" className="w-50" value={mr} onChange={handleMr} min={0.63} max={1} />
            </div>
            <div className="obj-param">
              <Form.Label
                htmlFor="wet-zone"
                data-tooltip-id="wet-zone"
                className="position-relative "
                data-tooltip-content="зона"
              >
                Зона влажности
                <OverlayTrigger
                  overlay={
                    <Tooltip id="vapor-tooltip">
                      Для населенных пунктов без данных в СП 50 о зоне влажности необходимо выбрать: А - для сухой, Б -
                      для нормальной и влажной
                    </Tooltip>
                  }
                >
                  <button className="i-btn2 position-absolute"></button>
                </OverlayTrigger>
              </Form.Label>
              {cityProp.s ? (
                <div>{cityProp.s}</div>
              ) : (
                <div className="d-flex">
                  <Form.Check
                    className=" ms-2"
                    id="humidity-a"
                    label="А"
                    checked={humidityZone}
                    onChange={() => handleHumidityZone(true)}
                  ></Form.Check>
                  <Form.Check
                    className=" ms-2"
                    id="humidity-b"
                    label="Б"
                    checked={!humidityZone}
                    onChange={() => handleHumidityZone(false)}
                  ></Form.Check>
                </div>
              )}
            </div>
          </div>
          {/* <Container className="container">
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
                  <div className="p-2">{'Зона влажности: ' + (cityProp.s || '')}</div>
                </Stack>
              </Container> */}

          <div className="navbnt position-relative mt-3 mb-3"></div>
        </div>
      )}
    </DefaultContext.Consumer>
  );
}
