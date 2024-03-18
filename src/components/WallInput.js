import { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import { materials } from './materials';
import { DefaultContext } from '../contexts/DefaultContext';

export default function WallInput({
  isAir,
  isId,
  isLambda,
  isMaterial,
  isName,
  isPreIns,
  isThickness,
  isSpData,
  isSpDensity,
  isSpLambda,
  isSpMaterial,
  isSpVapor,
  isSecondIns,
  isSp,
  isVapor,
  onAir,
  onDensity,
  onLambda,
  onName,
  onName2,
  onSpMaterial,
  onSp,
  onThickness,
  onVapor,
}) {
  const { cityProp, concreteLambda, handleAddSecondIns, handleDeleteSecondIns, secondIns, vaporCalc } =
    useContext(DefaultContext);

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

  return (
    <div className="wallInput" id={isId}>
      <div className="wallInputList">
        {secondIns && isId === 'ins-2' ? <button className="wallCloseBtn" onClick={handleDeleteSecondIns} /> : null}
        <h3 className="wallInputHeader">
          {isName} {isSecondIns && <p className="wallInputSub">{isId === 'ins-1' ? 'нижний слой' : 'верхний слой'}</p>}
        </h3>
        {isId === 'concrete' && <br />}
        <div className="wallInputUnit">
          {isSp && isId !== 'concrete' ? (
            <div className="wallInputUnit">
              {isSp && isId !== 'concrete' ? (
                <div>
                  <Form.Select className="mb-1 wall-font" id="mat-type" value={isMaterial} onChange={onName}>
                    <option>Тип заполнения</option>
                    {materialList()}
                  </Form.Select>
                  <Form.Select className="mb-1 w-50 wall-font " id="ins-sp-d" value={isSpDensity} onChange={onDensity}>
                    <option>Плотность, кг/м³</option>
                    {densityList(isMaterial)}
                  </Form.Select>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
        {isId === 'concrete' || isSp ? null : (
          <Form.Control
            placeholder="Название"
            id={`${isId}-n`}
            className="h-50 mb-4 mt-3"
            onChange={onName2}
          ></Form.Control>
        )}
        <div className="wallInputUnit">
          <li className="wall-p">
            Толщина
            <br />
            мм
          </li>
          <input
            className="wallInputValue"
            type="number"
            id={`${isId}-t`}
            value={isThickness ? isThickness * 1000 : null}
            onChange={onThickness}
          ></input>
        </div>
        <div className="wallInputUnit">
          <li className="wall-p">
            Теплопроводность
            <br />
            Вт/м²С°
          </li>
          {isSp ? (
            isId === 'concrete' ? (
              <input
                className="wallInputValue"
                type="number"
                id={`${isId}-sp-h`}
                value={concreteLambda}
                onChange={onLambda}
              ></input>
            ) : (
              <input
                className="wallInputValue"
                type="number"
                id={`${isId}-sp-h`}
                value={isSpData ? (cityProp.s === 'А' ? isSpData.la : isSpData.lb) : null}
                onChange={onLambda}
              ></input>
            )
          ) : (
            <input
              className="wallInputValue"
              type="number"
              id={`${isId}-h`}
              defaultValue={isLambda}
              onChange={onLambda}
            ></input>
          )}
        </div>
        {vaporCalc && (
          <>
            <div className="wallInputUnit">
              <li className="wall-p">
                Паропроницаемость
                <br />
                мг/м<sup>2</sup>чПа
              </li>
              {isSp ? (
                isId === 'concrete' ? (
                  <input
                    className="wallInputValue"
                    type="number"
                    id={`${isId}-sp-v`}
                    defaultValue={0.03}
                    onChange={onVapor}
                  ></input>
                ) : (
                  <input
                    className="wallInputValue"
                    type="number"
                    id={`${isId}-sp-v`}
                    defaultValue={isSpData ? isSpData.v : null}
                    onChange={onVapor}
                  ></input>
                )
              ) : (
                <input
                  className="wallInputValue"
                  id={`${isId}-v`}
                  type="number"
                  defaultValue={isVapor}
                  onChange={onVapor}
                ></input>
              )}
            </div>
            <div className="wallInputUnit">
              <li className="wall-p">
                Воздухороницаемость
                <br />
                кг/м²чПа
              </li>
              <input
                className="wallInputValue"
                type="number"
                id={`${isId}-a`}
                value={isSp && isId === 'concrete' ? 0.00004 : isAir}
                onChange={onAir}
              ></input>
            </div>
          </>
        )}
        {!secondIns && isId === 'ins-1' ? (
          <button className="wallAddIns" type="button" onClick={handleAddSecondIns}>
            Добавить слой утеплителя
          </button>
        ) : null}
        {isId === 'ins-1' && isPreIns ? <p className="ins-thickness">Минимальная толщина : {isPreIns}мм</p> : null}
        <div className="wallInputSP">
          <Form>
            <Form.Check
              type="switch"
              id={`${isId}-sp`}
              label="учитывать СП 50.133300.2012"
              checked={isSp}
              onChange={onSp}
            />
          </Form>
        </div>
      </div>
    </div>
  );
}
