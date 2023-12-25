import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SecondLayer from './SecondLayer';

export default function WallData(props) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="wallData">
        <div className="wallInput">
          <div className="wallInputList">
            <h3 className="wallInputHeader">Железобетон</h3>
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
                  id="first-switch"
                  label="учитывать СП 50.133300.2012"
                />
              </Form>
            </div>
          </div>
        </div>
        <div className="wallInput">
          <div className="wallInputList">
            <h3 className="wallInputHeader">Кладка</h3>
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
                  id="second-switch"
                  label="учитывать СП 50.133300.2012"
                />
              </Form>
            </div>
          </div>
        </div>
        <div className="wallInput">
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
                  id="third-switch"
                  label="учитывать СП 50.133300.2012"
                />
              </Form>

              <button className="wallAddIns" type="button" onClick={props.onAdd}>
                Добавить слой утеплителя
              </button>
            </div>
          </div>
          {props.isSecondLayer ? <SecondLayer /> : null}
        </div>
      </div>
      <div className="navbnt position-relative mt-3 mb-3">
        <Button
          variant="outline-secondary"
          size="lg"
          onClick={() => {
            navigate('/objdata');
          }}
        >
          Назад
        </Button>
        <Button
          className="position-absolute end-0 bottom-0"
          variant="outline-secondary"
          size="lg"
          onClick={() => {
            navigate('/systdata');
          }}
        >
          Далее
        </Button>
      </div>
    </div>
  );
}
