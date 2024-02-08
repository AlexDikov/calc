import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { materials } from './materials';

export default function FirstLayer(props) {
  const [insSp, setInsSp] = useState(false);

  const materialList = materials.map((item, i) => {
    if (item.u) return <option value={i}>{item.u}</option>;
  });

  const toggleIns = () => setInsSp((value) => !value);
  return (
    <div className="wallInput">
      <div className="wallInputList">
        <h3 className="wallInputHeader">
          Утеплитель{props.isSecondLayer ? <p className="wallInputSub">нижний слой</p> : null}
        </h3>
        {insSp ? (
          <div>
            <Form.Select className="mb-3 wall-font" id="ins-type" onChange={props.onBuildingType}>
              <option>Тип заполнения</option>
              {materialList}
            </Form.Select>
            <Form.Select className="mt-3 w-50 wall-font " id="ins-sp-d">
              <option>
                Плотность, кг/м<sup>3</sup>
              </option>
            </Form.Select>
          </div>
        ) : null}
        <div className="wallInputUnit">
          <li className="wall-p">
            Толщина`
            <br />
            мм
          </li>
          <input className="wallInputValue" id="ins-t" onChange={props.onInsThickness}></input>
        </div>
        {insSp ? null : (
          <div className="wallInputUnit">
            <li className="wall-p">
              Плотность
              <br />
              кг/м<sup>3</sup>
            </li>
            <input className="wallInputValue" id="ins-d" onChange={props.onInsDensity}></input>
          </div>
        )}
        <div className="wallInputUnit">
          <li className="wall-p">
            Теплопроводность
            <br />
            Вт/м<sup>2</sup>С<sup>o</sup>
          </li>
          {insSp ? 5 : <input className="wallInputValue" id="ins-h" onChange={props.onInsLambda}></input>}
        </div>
        <div className="wallInputUnit">
          <li className="wall-p">
            Паропроницаемость
            <br />
            мг/м<sup>2</sup>чПа
          </li>
          {insSp ? 5 : <input className="wallInputValue" id="ins-v" onChange={props.onInsVapor}></input>}
        </div>
        <div className="wallInputUnit">
          <li className="wall-p">
            Воздухороницаемость
            <br />м<sup>2</sup>чПа/кг
          </li>
          {insSp ? 5 : <input className="wallInputValue" id="ins-a" onChange={props.onInsAir}></input>}
        </div>
        <div className="wallInputSP">
          <Form>
            <Form.Check // prettier-ignore
              type="switch"
              id="ins-sp"
              label="учитывать СП 50.133300.2012"
              onChange={toggleIns}
            />
          </Form>
        </div>
        {props.isSecondLayer ? null : (
          <button className="wallAddIns" type="button" onClick={props.onAddSecondLayer}>
            Добавить слой утеплителя
          </button>
        )}
      </div>
    </div>
  );
}
