import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { materials } from './materials';

export default function WallInput({
  isCityProp,
  isId,
  isName,
  isSpAir,
  isSpDensity,
  isSpLambda,
  isSpVapor,
  isSecondIns,
  onAddSecondIns,
  onAir,
  onDeleteSecondIns,
  onDensity,
  onLambda,
  onSpMaterial,
  onThickness,
  onVapor,
}) {
  const [sp, setSp] = useState(false);
  const [spMaterial, setSpMaterial] = useState('');
  const [spValue, setSpValue] = useState('');

  const materialList = () => {
    if (isId === 'brick')
      return materials.brick.map((item) => (
        <option key={item.value} value={item.value}>
          {item.name}
        </option>
      ));
    if (isId === 'ins-1' || isId === 'ins-2')
      return materials.ins.map((item) => (
        <option key={item.value} value={item.value}>
          {item.name}
        </option>
      ));
    return null;
  };

  const densityList = (itemValue) => {
    const selectedMaterial = materials[isId === 'ins-1' || isId === 'ins-2' ? 'ins' : 'brick'].find(
      (item) => item.value === parseInt(itemValue, 10)
    );
    if (selectedMaterial) {
      return Object.entries(selectedMaterial.d).map(([density, data], index) => (
        <option key={index} value={density}>
          {density}
        </option>
      ));
    }
    return null;
  };

  function handleSpValue(event) {
    const selectedDensity = event.target.value;
    const selectedMaterial = materials[isId === 'ins-1' || isId === 'ins-2' ? 'ins' : 'brick'].find(
      (item) => item.d[selectedDensity]
    );
    if (selectedMaterial) {
      setSpValue(selectedMaterial.d[selectedDensity]);
    }
  }

  const toggleSp = () => setSp((value) => !value);

  return (
    <div className="wallInput" id={isId}>
      <div className="wallInputList">
        {isSecondIns && isId === 'ins-2' ? <button className="wallCloseBtn" onClick={onDeleteSecondIns} /> : null}
        <h3 className="wallInputHeader">
          {isName}{' '}
          {isSecondIns ? <p className="wallInputSub">{isId === 'ins-1' ? 'нижний слой' : 'верхний слой'}</p> : null}
        </h3>
        {isId === 'concrete' ? <br /> : null}
        <div className="wallInputUnit">
          {sp && isId !== 'concrete' ? (
            <div className="wallInputUnit">
              {sp ? (
                isId !== 'concrete' ? (
                  <div>
                    <Form.Select
                      className="mb-1 wall-font"
                      id="ins-type"
                      onChange={(e) => {
                        setSpMaterial(e.target.value);
                      }}
                    >
                      <option>Тип заполнения</option>
                      {materialList()}
                    </Form.Select>
                    <Form.Select className="mb-1 w-50 wall-font " id="ins-sp-d" onChange={handleSpValue}>
                      <option>
                        Плотность, кг/м<sup>3</sup>
                      </option>
                      {densityList(spMaterial)}
                    </Form.Select>
                  </div>
                ) : (
                  <div>
                    <li className="wall-p">
                      Плотность
                      <br />
                      кг/м<sup>3</sup>
                    </li>
                    <input
                      className="wallInputValue"
                      id={`${isId}-sp-d`}
                      defaultValue={isSpDensity}
                      onChange={onDensity}
                    ></input>
                  </div>
                )
              ) : (
                <input className="wallInputValue" id={`${isId}-d`} defaultValue={null} onChange={onDensity}></input>
              )}
            </div>
          ) : null}
        </div>
        {isId === 'concrete' || sp ? null : (
          <Form.Control placeholder="Название" className="h-50 mb-4 mt-3"></Form.Control>
        )}
        <div className="wallInputUnit">
          <li className="wall-p">
            Толщина
            <br />
            мм
          </li>
          <input className="wallInputValue" id={`${isId}-t`} onChange={onThickness}></input>
        </div>
        <div className="wallInputUnit">
          <li className="wall-p">
            Теплопроводность
            <br />
            Вт/м<sup>2</sup>С<sup>o</sup>
          </li>
          {sp ? (
            <input
              className="wallInputValue"
              id={`${isId}-sp-h`}
              defaultValue={isCityProp.s === 'А' ? spValue.la : spValue.lb}
              onChange={onLambda}
            ></input>
          ) : (
            <input className="wallInputValue" id={`${isId}-h`} defaultValue={spValue.la} onChange={onLambda}></input>
          )}
        </div>
        <div className="wallInputUnit">
          <li className="wall-p">
            Паропроницаемость
            <br />
            мг/м<sup>2</sup>чПа
          </li>
          {sp ? (
            <input className="wallInputValue" id={`${isId}-sp-v`} defaultValue={spValue.v} onChange={onVapor}></input>
          ) : (
            <input className="wallInputValue" id={`${isId}-v`} defaultValue={null} onChange={onVapor}></input>
          )}
        </div>
        <div className="wallInputUnit">
          <li className="wall-p">
            Воздухороницаемость
            <br />м<sup>2</sup>чПа/кг
          </li>
          {sp ? (
            <input className="wallInputValue" id={`${isId}-sp-a`} defaultValue={null} onChange={onAir}></input>
          ) : (
            <input className="wallInputValue" id={`${isId}-a`} defaultValue={null} onChange={onAir}></input>
          )}
        </div>
        {!isSecondIns && isId === 'ins-1' ? (
          <button className="wallAddIns" type="button" onClick={onAddSecondIns}>
            Добавить слой утеплителя
          </button>
        ) : null}
        <div className="wallInputSP">
          <Form>
            <Form.Check // prettier-ignore
              type="switch"
              id={`${isId}-sp`}
              label="учитывать СП 50.133300.2012"
              onChange={toggleSp}
            />
          </Form>
        </div>
      </div>
    </div>
  );
}
