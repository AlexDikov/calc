import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { materials } from './materials';
import { DefaultContext } from '../contexts/DefaultContext';

export default function WallInput({
  isAir,
  isDensity,
  isId,
  isLambda,
  isMaterial,
  isName,
  isThickness,
  isSpAir,
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
  onSpMaterial,
  onSp,
  onThickness,
  onVapor,
}) {
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
    <DefaultContext.Consumer>
      {(context) => (
        <div className="wallInput" id={isId}>
          <div className="wallInputList">
            {context.secondIns && isId === 'ins-2' ? (
              <button className="wallCloseBtn" onClick={context.handleDeleteSecondIns} />
            ) : null}
            <h3 className="wallInputHeader">
              {isName}{' '}
              {isSecondIns ? <p className="wallInputSub">{isId === 'ins-1' ? 'нижний слой' : 'верхний слой'}</p> : null}
            </h3>
            {isId === 'concrete' ? <br /> : null}
            <div className="wallInputUnit">
              {isSp && isId !== 'concrete' ? (
                <div className="wallInputUnit">
                  {isSp && isId !== 'concrete' ? (
                    <div>
                      <Form.Select className="mb-1 wall-font" id="ins-type" value={isMaterial} onChange={onName}>
                        <option>Тип заполнения</option>
                        {materialList()}
                      </Form.Select>
                      <Form.Select
                        className="mb-1 w-50 wall-font "
                        id="ins-sp-d"
                        value={isSpDensity}
                        onChange={onDensity}
                      >
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
                onChange={onName}
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
                    id={`${isId}-sp-h`}
                    defaultValue={context.cityProp.s === 'А' ? 1.92 : 2.04}
                    onChange={onLambda}
                  ></input>
                ) : (
                  <input
                    className="wallInputValue"
                    id={`${isId}-sp-h`}
                    defaultValue={
                      isSpData
                        ? context.cityProp.s
                          ? context.cityProp.s === 'А'
                            ? isSpData.la
                            : isSpData.lb
                          : isSpData.lb
                        : null
                    }
                    onChange={onLambda}
                  ></input>
                )
              ) : (
                <input className="wallInputValue" id={`${isId}-h`} defaultValue={isLambda} onChange={onLambda}></input>
              )}
            </div>
            <div className="wallInputUnit">
              <li className="wall-p">
                Паропроницаемость
                <br />
                мг/м<sup>2</sup>чПа
              </li>
              {isSp ? (
                isId === 'concrete' ? (
                  <input className="wallInputValue" id={`${isId}-sp-v`} defaultValue={0.03} onChange={onVapor}></input>
                ) : (
                  <input
                    className="wallInputValue"
                    id={`${isId}-sp-v`}
                    defaultValue={isSpData ? isSpData.v : null}
                    onChange={onVapor}
                  ></input>
                )
              ) : (
                <input className="wallInputValue" id={`${isId}-v`} defaultValue={isVapor} onChange={onVapor}></input>
              )}
            </div>
            <div className="wallInputUnit">
              <li className="wall-p">
                Воздухороницаемость
                <br />
                м²чПа/кг
              </li>
              <input className="wallInputValue" id={`${isId}-a`} defaultValue={isAir} onChange={onAir}></input>
            </div>
            {!context.secondIns && isId === 'ins-1' ? (
              <button className="wallAddIns" type="button" onClick={context.handleAddSecondIns}>
                Добавить слой утеплителя
              </button>
            ) : null}
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
      )}
    </DefaultContext.Consumer>
  );
}
