import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { materials } from './materials';

export default function SecondLayer(props) {
  function handleDeleteClick() {
    props.onDelete();
  }
  const [secondInsSp, setSecondInsSp] = useState(false);

  const materialList = materials.map((item, i) => {
    if (item.u) return <option value={i}>{item.u}</option>;
  });

  const toggleSecondIns = () => setSecondInsSp((value) => !value);

  return (
    <div className="wallInput">
      <div className="wallInputList">
        <button className="wallCloseBtn" onClick={handleDeleteClick} />
        <h3 className="wallInputHeader">
          Утеплитель<p className="wallInputSub">верхний слой</p>
        </h3>
        {secondInsSp ? (
          <div>
            <Form.Select className="mb-3 wall-font" id="second-ins-type" onChange={props.onBuildingType}>
              <option>Тип заполнения</option>
              {materialList}
            </Form.Select>
            <Form.Select className="mt-3 w-50 wall-font " id="second-ins-sp-d">
              <option>
                Плотность, кг/м<sup>3</sup>
              </option>
            </Form.Select>
          </div>
        ) : null}
        <div className="wallInputUnit">
          <li className="wall-p">
            Толщина<li className="wall-subp">мм</li>
          </li>
          <input className="wallInputValue" id="second-ins-t" onChange={props.onSecondInsThickness}></input>
        </div>
        {secondInsSp ? null : (
          <div className="wallInputUnit">
            <li className="wall-p">
              Плотность
              <li className="wall-subp">
                кг/м<sup>3</sup>
              </li>
            </li>
            <input className="wallInputValue" id="second-ins-d" onChange={props.onSecondInsDensity}></input>
          </div>
        )}
        <div className="wallInputUnit">
          <li className="wall-p">
            Теплопроводность
            <li className="wall-subp">
              Вт/м<sup>2</sup>С<sup>o</sup>
            </li>
          </li>
          {secondInsSp ? (
            5
          ) : (
            <input className="wallInputValue" id="second-ins-h" onChange={props.onSecondInsLambda}></input>
          )}
        </div>
        <div className="wallInputUnit">
          <li className="wall-p">
            Паропроницаемость
            <li className="wall-subp">
              мг/м<sup>2</sup>чПа
            </li>
          </li>
          {secondInsSp ? (
            5
          ) : (
            <input className="wallInputValue" id="second-ins-v" onChange={props.onSecondInsVapor}></input>
          )}
        </div>
        <div className="wallInputUnit">
          <li className="wall-p">
            Воздухороницаемость
            <li className="wall-subp">
              м<sup>2</sup>чПа/кг
            </li>
          </li>
          {secondInsSp ? (
            5
          ) : (
            <input className="wallInputValue" id="second-ins-a" onChange={props.onSecondInsAir}></input>
          )}
        </div>
        <div className="wallInputSP">
          <Form>
            <Form.Check // prettier-ignore
              type="switch"
              id="second-ins-sp"
              label="учитывать СП 50.133300.2012"
              onChange={toggleSecondIns}
            />
          </Form>
        </div>
      </div>
    </div>
  );
}
