import React, { useContext } from 'react';
import { DefaultContext } from '../contexts/DefaultContext';

export default function RTable3({ brickS, u2 }) {
  const { bracketResult, gribDepth, gribPcs, windowBrickLength, windowLoss } = useContext(DefaultContext);

  let a = 3;
  let b = 1;
  const brackets = () =>
    Object.entries(bracketResult).map(([key, item]) => {
      if (!item.wall)
        return (
          <React.Fragment key={key}>
            <tr key={184}>
              <th scope="row">{(a += 1)}</th>
              <td>кронштейн {item.bracket}</td>
              <td>Точечный {(b += 1)}</td>
              <td>{(item.pcs / brickS).toFixed(3)} шт/м²</td>
              <td>{item.value.toFixed(3)} Вт/°С</td>
              <td>{((item.value * item.pcs) / brickS).toFixed(3)}</td>
              <td>{((item.value * item.pcs) / brickS / qPercent()).toFixed(1)}</td>
            </tr>
          </React.Fragment>
        );
    });

  const qPercent = () => {
    let brackets = u2 + (windowLoss * windowBrickLength) / brickS + gribPcs * gribDepth;

    for (const key in bracketResult) {
      const item = bracketResult[key];
      brackets += !item.wall && parseFloat((item.value * item.pcs) / brickS);
    }
    return brackets * 0.01;
  };

  return (
    <>
      <br />
      <h6>Участок с основанием из кладки</h6>
      <table className="table center-text">
        <thead>
          <tr key={181}>
            <th scope="col"></th>
            <th scope="col">Элемент конструкции</th>
            <th scope="col">Тип элемента конструкции</th>
            <th scope="col">
              Удельный
              <br /> геометрический показатель
            </th>
            <th scope="col">
              Удельные
              <br /> потери теплоты
            </th>
            <th scope="col">
              Поток теплоты, <br />
              обусловленный элементом, Вт/(м² °С)
            </th>
            <th scope="col">Доля потока,%</th>
          </tr>
        </thead>
        <tbody>
          <tr key={182}>
            <th scope="row">1</th>
            <td>{'Стена'}</td>
            <td>Плоский </td>
            <td>1 м²/м²</td>
            <td>{u2.toFixed(3)} Вт/(м²°С)</td>
            <td>{u2.toFixed(3)}</td>
            <td>{(u2 / qPercent()).toFixed(1)}</td>
          </tr>
          <tr key={185}>
            <th scope="row">2</th>
            <td>Оконный откос</td>
            <td>Линейный</td>
            <td>{(windowBrickLength / brickS).toFixed(3)} м/м²</td>
            <td>{windowLoss.toFixed(3)} Вт/(м²°С)</td>
            <td>{((windowLoss * windowBrickLength) / brickS).toFixed(3)}</td>
            <td>{((windowLoss * windowBrickLength) / brickS / qPercent()).toFixed(1)}</td>
          </tr>
          <tr key={186}>
            <th scope="row">3</th>
            <td>Тарельчатый анкер</td>
            <td>Точечный 1</td>
            <td>{gribPcs} шт/м²</td>
            <td>{gribDepth} Вт/°С</td>
            <td>{(gribPcs * gribDepth).toFixed(3)}</td>
            <td>{((gribPcs * gribDepth) / qPercent()).toFixed(1)}</td>
          </tr>
          {brackets()}
          <tr key={205}>
            <th></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              {' '}
              ∑ ={(qPercent() * 100).toFixed(3)}(1/R<sub>пр</sub>)
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
