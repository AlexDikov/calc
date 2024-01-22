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
        <SystInput text="Ширина вентилируемого зазора на входе, мм" onVentIn={props.onVentIn} />
        <SystInput text="Средняя ширина вентилируемого зазора, мм" onVentIn={props.onVentMed} />
        <SystInput text="Ширина вентилируемого зазора на выходе, мм" onVentIn={props.onVentOut} />
        <SystInput text="Высота наибольшего зазора, м" onVentIn={props.onVentHeigth} />
        <Row>
          <Form.Check className="mt-3 ms-2" label="Своя облицовка" onChange={props.onOwnCover}></Form.Check>
          {props.isOwnCover ? (
            <Form.Select className="w-25 ms-2" type="text">
              <option>Тип облицовки</option>
              <option value="1">Алюминий</option>
              <option value="2">Гранит, гнейс, базальт</option>
              <option value="3">Известняк</option>
              <option value="4">Клинкер</option>
              <option value="5">Медь</option>
              <option value="6">Мрамор</option>
              <option value="7">Стекло</option>
              <option value="8">Фиброцемент</option>
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
          <SystInput text="Теплопроводность облицовки, Вт/м&#178;С&#176;" />
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
            navigate('/final');
          }}
        >
          Далее
        </Button>
      </div>
    </div>
  );
}
