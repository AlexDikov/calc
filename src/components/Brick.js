import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { materials } from './materials';

export default function Brick(props) {
  const [brickSp, setBrickSp] = useState(false);

  const materialList = materials.map((item, i) => {
    if (item.n) return <option value={i}>{item.n}</option>;
  });

  const densityList = materials.find((item, i) => (i == props.isBrickDensity ? item.d : null));

  const toggleBrick = () => setBrickSp((value) => !value);
  return (
    <div className="wallInput">
      <div className="wallInputList">
        <h3 className="wallInputHeader">Кладка</h3>
        {brickSp ? (
          <div>
            <Form.Select className="mb-3 wall-font" id="brick-type" onChange={props.onBuildingType}>
              <option>Тип заполнения</option>
              {materialList}
            </Form.Select>
            <Form.Select className="mt-3 w-50 wall-font " id="brick-sp-d">
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
          <input className="wallInputValue" onChange={props.onBrickThickness}></input>
        </div>
        {brickSp ? null : (
          <div className="wallInputUnit">
            <li className="wall-p">
              Плотность
              <li className="wall-subp">
                кг/м<sup>3</sup>
              </li>
            </li>
            <input className="wallInputValue" id="brick-d" onChange={props.onBrickDensity}></input>
          </div>
        )}
        <div className="wallInputUnit">
          <li className="wall-p">
            Теплопроводность
            <li className="wall-subp">
              Вт/м<sup>2</sup>С<sup>o</sup>
            </li>
          </li>
          {brickSp ? 5 : <input className="wallInputValue" id="brick-h" onChange={props.onBrickHeat}></input>}
        </div>
        <div className="wallInputUnit">
          <li className="wall-p">
            Паропроницаемость
            <li className="wall-subp">
              мг/м<sup>2</sup>чПа
            </li>
          </li>
          {brickSp ? 5 : <input className="wallInputValue" id="brick-v" onChange={props.onBrickVapor}></input>}
        </div>
        <div className="wallInputUnit">
          <li className="wall-p">
            Воздухороницаемость
            <li className="wall-subp">
              м<sup>2</sup>чПа/кг
            </li>
          </li>
          {brickSp ? 5 : <input className="wallInputValue" id="brick-a" onChange={props.onBrickAir}></input>}
        </div>
        <div className="wallInputSP">
          <Form>
            <Form.Check // prettier-ignore
              type="switch"
              id="brick-sp"
              label="учитывать СП 50.133300.2012"
              onChange={toggleBrick}
            />
          </Form>
        </div>
      </div>
    </div>
  );
}
