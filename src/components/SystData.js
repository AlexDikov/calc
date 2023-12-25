import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
export default function SystData() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="systData">
        <Form.Label>Площадь заполнения стен </Form.Label>
        <Form.Control className="w-25" type="text" />
        <Form.Label className="mt-3">Длина оконных откосов </Form.Label>
        <Form.Control className="w-25" type="text" />
        <Form.Label className="mt-3">Положение оконного блока </Form.Label>
        <Form.Control className="w-25" type="text" />
        <Form.Label className="mt-3">Нахлест утеплителя на оконный блок </Form.Label>
        <Form.Control className="w-25" type="text" />
        <Form.Label className="mt-3">Количество тарельчатых дюбелей </Form.Label>
        <Form.Control className="w-25" type="text" />
        <Form.Label className="mt-3">Расстояние от тарелки до распорного элемента </Form.Label>
        <Form.Control className="w-25" type="text" />
        <Form.Select className="mt-3 w-25" aria-label="Default select example">
          <option>Тип кронштейна</option>
          <option value="1">One</option>
        </Form.Select>
        <Form.Label className="mt-3">Ширина вентилируемого зазора на входе </Form.Label>
        <Form.Control className="w-25" type="text" />
        <Form.Label className="mt-3">Средняя вентилируемого зазора </Form.Label>
        <Form.Control className="w-25" type="text" />
        <Form.Label className="mt-3">Ширина вентилируемого зазора на выходе </Form.Label>
        <Form.Control className="w-25" type="text" />
        <Form.Label className="mt-3">Высота наибольшего зазора </Form.Label>
        <Form.Control className="w-25" type="text" />
        <Form.Label className="mt-3">Тип облицовки </Form.Label>
        <Form.Control className="w-25" type="text" />
        <Form.Label className="mt-3">Теплопроводность облицовки</Form.Label>
        <Form.Control className="w-25" type="text" />
        <Form.Label className="mt-3">Коэффициент паропроницания облицовки</Form.Label>
        <Form.Control className="w-25" type="text" />
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
