import { Button, Col, Form, Row } from 'react-bootstrap';
import SystInput from './SystInput';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CoverData(props) {
  const navigate = useNavigate();

  const [insSp, setInsSp] = useState();

  const toggleIns = () => setInsSp((value) => !value);

  return (
    <div>
      <div>
        <SystInput text="Ширина вентилируемого зазора на входе, мм" method={props.onVentIn} />
        <SystInput text="Средняя ширина вентилируемого зазора, мм" method={props.onVentMed} />
        <SystInput text="Ширина вентилируемого зазора на выходе, мм" method={props.onVentOut} />
        <SystInput text="Высота наибольшего зазора, м" method={props.onVentHeight}>
          <button
            className="i-btn"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Высота наибольшего неприрывного участка между входным и выходным зазорами"
          ></button>
        </SystInput>
        <SystInput text="Высота объекта, м" method={props.onHeight} />
        <Row>
          <Form.Check className="mt-3 ms-2" label="Своя облицовка" onChange={props.onOwnCover}></Form.Check>
          {props.isOwnCover ? (
            <Form.Select className="w-25 ms-2" type="text">
              <option>Тип облицовки</option>
              <option value={{ r: 0.001, c: 0.05, l: 221 }}>Алюминий</option>
              <option value={{ r: 0.008, c: 5.3, l: 3.49 }}>Гранит, гнейс, базальт</option>
              <option value={{ r: 0.06, c: 5.3, l: 1.28 }}>Известняк</option>
              <option value={{ r: 0.11, c: 5.3, l: 0.81 }}>Клинкер</option>
              <option value={{ r: 0.001, c: 0.05, l: 407 }}>Медь</option>
              <option value={{ r: 0.008, c: 5.3, l: 2.91 }}>Мрамор</option>
              <option value={{ r: 0.001, c: 5.3, l: 0.76 }}>Стекло</option>
              <option value={{ r: 0.03, c: 5.3, l: 0.52 }}>Фиброцемент</option>
            </Form.Select>
          ) : (
            <Form.Control className="w-25 ms-2" placeholder="Название облицовки" />
          )}
        </Row>
        {props.isOwnCover ? (
          <Row>
            <Col xs={4}>
              <Form.Label className="mt-3">Толщина облицовки, мм</Form.Label>
            </Col>
            <Col>
              <Form.Label className="mt-3">5</Form.Label>{' '}
            </Col>
          </Row>
        ) : (
          <SystInput text="Толщина облицовки, мм" />
        )}
        {props.isOwnCover ? (
          <Row>
            <Col xs={4}>
              <Form.Label className="mt-3">Теплопроводность облицовки, Вт/м&#178;С&#176;</Form.Label>
            </Col>
            <Col>
              <Form.Label className="mt-3">5</Form.Label>
            </Col>
          </Row>
        ) : (
          <SystInput text="Теплопроводность облицовки, Вт/м&#178;С&#176;" method={props.onCoverHeat} />
        )}
        {props.isOwnCover ? (
          <Row>
            <Col xs={4}>
              <Form.Label className="mt-3">Коэффициент паропроницания облицовки, мг/м∙ч∙ Па</Form.Label>
            </Col>
            <Col>
              <Form.Label className="mt-3">5</Form.Label>
            </Col>
          </Row>
        ) : (
          <SystInput text="Коэффициент паропроницания облицовки, мг/м∙ч∙Па" />
        )}
      </div>
      <div className="navbnt position-relative mt-3 mb-3">
        <Button
          variant="outline-secondary"
          size="lg"
          onClick={() => {
            navigate('/walldata');
          }}
        >
          Назад
        </Button>
        <Button
          className="position-absolute end-0"
          variant="outline-secondary"
          size="lg"
          onClick={() => {
            navigate('/pz');
          }}
        >
          Далее
        </Button>
      </div>
    </div>
  );
}
