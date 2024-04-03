import React, { useContext } from 'react';
import { DefaultContext } from '../contexts/DefaultContext';

export default function RTable2({ concreteS, u1 }) {
  const { bracketResult, gribDepth, gribConcretePcs, windowConcreteLength, windowLossConcrete } =
    useContext(DefaultContext);

  let a = 3;
  let b = 1;
  const brackets = () =>
    Object.entries(bracketResult).map(([key, item]) => {
      if (item.wall)
        return (
          <React.Fragment key={key}>
            <tr key={184}>
              <th scope="row">{(a += 1)}</th>
              <td>кронштейн {item.bracket}</td>
              <td>Точечный {(b += 1)}</td>
              <td>{(item.pcs / concreteS).toFixed(3)}</td>
              <td>{item.value.toFixed(3)}</td>
              <td>{((item.value * item.pcs) / concreteS).toFixed(3)}</td>
              <td>{((item.value * item.pcs) / concreteS / qPercent()).toFixed(1)}</td>
            </tr>
          </React.Fragment>
        );
    });

  const qPercent = () => {
    let brackets = u1 + (windowLossConcrete * windowConcreteLength) / concreteS + gribConcretePcs * gribDepth;
    for (const key in bracketResult) {
      const item = bracketResult[key];
      brackets += item.wall && parseFloat((item.value * item.pcs) / concreteS);
    }
    return brackets * 0.01;
  };

  return (
    <>
      <br />
      <h6>Участок с основанием из железобетона</h6>
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
            <td>1</td>
            <td>{u1.toFixed(3)}</td>
            <td>{u1.toFixed(3)}</td>
            <td>{(u1 / qPercent()).toFixed(1)}</td>
          </tr>
          <tr key={185}>
            <th scope="row">2</th>
            <td>Оконный откос</td>
            <td>Линейный</td>
            <td>{(windowConcreteLength / concreteS).toFixed(3)}</td>
            <td>{windowLossConcrete.toFixed(3)}</td>
            <td>{((windowLossConcrete * windowConcreteLength) / concreteS).toFixed(3)}</td>
            <td>{((windowLossConcrete * windowConcreteLength) / concreteS / qPercent()).toFixed(1)}</td>
          </tr>
          <tr key={186}>
            <th scope="row">3</th>
            <td>Тарельчатый анкер</td>
            <td>Точечный 1</td>
            <td>{gribConcretePcs}</td>
            <td>{gribDepth}</td>
            <td>{(gribConcretePcs * gribDepth).toFixed(3)}</td>
            <td>{((gribConcretePcs * gribDepth) / qPercent()).toFixed(1)}</td>
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
              1/R<sub>пр</sub> ={(qPercent() * 100).toFixed(3)}
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
