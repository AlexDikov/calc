import { Form } from 'react-bootstrap';

export default function SecondLayer() {
  return (
    <div className="wallInputList">
      <button className="wallCloseBtn" />
      <h3 className="wallInputHeader">Утеплитель</h3>
      <div className="wallInputUnit">
        <li>Толщина, мм</li>
        <input className="wallInputValue"></input>
      </div>
      <div className="wallInputUnit">
        <li>
          Плотность, кг/м<sup>3</sup>
        </li>
        <input className="wallInputValue"></input>
      </div>
      <div className="wallInputUnit">
        <li>
          Теплопроводность, Вт/м<sup>2</sup>С<sup>o</sup>
        </li>
        <input className="wallInputValue"></input>
      </div>
      <div className="wallInputUnit">
        <li>
          Паропроницаемость, мг/м<sup>2</sup>чПа
        </li>
        <input className="wallInputValue"></input>
      </div>
      <div className="wallInputUnit">
        <li>
          Воздухороницаемость, м<sup>2</sup>чПа/кг
        </li>
        <input className="wallInputValue"></input>
      </div>
      <div className="wallInputSP">
        <Form>
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label="учитывать СП 50.133300.2012"
          />
        </Form>
      </div>
    </div>
  );
}
