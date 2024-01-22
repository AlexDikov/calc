import { useState } from 'react';
import { Form } from 'react-bootstrap';

export default function Concrete(props) {
  const [concreteSp, setConcreteSp] = useState(false);

  const toggleConcrete = () => setConcreteSp((value) => !value);

  return (
    <div className="wallInput">
      <div className="wallInputList">
        <h3 className="wallInputHeader">Железобетон</h3>
        <div className="wallInputUnit">
          <li className="wall-p">
            Толщина<li className="wall-subp">мм</li>
          </li>
          <input className="wallInputValue" id="concrete-t" onChange={props.onConcreteThickness}></input>
        </div>
        <div className="wallInputUnit">
          <li className="wall-p">
            Плотность
            <li className="wall-subp">
              кг/м<sup>3</sup>
            </li>
          </li>
          {concreteSp ? (
            <input
              className="wallInputValue"
              id="concrete-sp-d"
              defaultValue={2500}
              onChange={props.onConcreteDensity}
            ></input>
          ) : (
            <input
              className="wallInputValue"
              id="concrete-d"
              defaultValue={null}
              onChange={props.onConcreteDensity}
            ></input>
          )}
        </div>
        <div className="wallInputUnit">
          <li className="wall-p">
            Теплопроводность
            <li className="wall-subp">
              Вт/м<sup>2</sup>С<sup>o</sup>
            </li>
          </li>
          {concreteSp ? (
            <input
              className="wallInputValue"
              id="concrete-sp-h"
              defaultValue={props.isConcreteSpHeat}
              onChange={props.onConcreteHeat}
            ></input>
          ) : (
            <input
              className="wallInputValue"
              id="concrete-h"
              defaultValue={null}
              onChange={props.onConcreteHeat}
            ></input>
          )}
        </div>
        <div className="wallInputUnit">
          <li className="wall-p">
            Паропроницаемость
            <li className="wall-subp">
              мг/м<sup>2</sup>чПа
            </li>
          </li>
          {concreteSp ? (
            <input
              className="wallInputValue"
              id="concrete-sp-v"
              defaultValue={0.03}
              onChange={props.onConcreteVapor}
            ></input>
          ) : (
            <input
              className="wallInputValue"
              id="concrete-v"
              defaultValue={null}
              onChange={props.onConcreteVapor}
            ></input>
          )}
        </div>
        <div className="wallInputUnit">
          <li className="wall-p">
            Воздухороницаемость
            <li className="wall-subp">
              м<sup>2</sup>чПа/кг
            </li>
          </li>
          {concreteSp ? (
            <input
              className="wallInputValue"
              id="concrete-sp-a"
              defaultValue={20000}
              onChange={props.onConcreteAir}
            ></input>
          ) : (
            <input
              className="wallInputValue"
              id="concrete-a"
              defaultValue={null}
              onChange={props.onConcreteAir}
            ></input>
          )}
        </div>
        <div className="wallInputSP">
          <Form>
            <Form.Check // prettier-ignore
              type="switch"
              id="concrete-sp"
              label="учитывать СП 50.133300.2012"
              onChange={toggleConcrete}
            />
          </Form>
        </div>
      </div>
    </div>
  );
}
