import React, { useContext } from 'react';
import { DefaultContext } from '../contexts/DefaultContext';

export default function RTable({ brickS, concreteS, u1, u2 }) {
  const {
    bracketResult,
    buildingType,
    concreteWall,
    gribDepth,
    gribPcs,
    windowBrickLength,
    windowConcreteLength,
    windowLoss,
    windowLossConcrete,
  } = useContext(DefaultContext);

  const brackets = () =>
    Object.entries(bracketResult).map(([key, item]) => (
      <React.Fragment key={key}>
        <tr key={184}>
          <th scope="row">
            {concreteWall ? parseInt(key) + 7 : buildingType === 2 ? parseInt(key) + 5 : parseInt(key) + 4}
          </th>
          <td>кронштейн {item.bracket}</td>
          <td>Точечный {parseInt(key) + 2}</td>
          <td>{(item.pcs / (concreteS + brickS)).toFixed(3)}</td>
          <td>{item.value.toFixed(3)}</td>
          <td>{((item.value * item.pcs) / (concreteS + brickS)).toFixed(3)}</td>
          <td>{((item.value * item.pcs) / (concreteS + brickS) / qPercent()).toFixed(1)}</td>
        </tr>
      </React.Fragment>
    ));
  const qPercent = () => {
    let brackets =
      (u1 * concreteS) / (brickS + concreteS) +
      (windowLossConcrete * windowConcreteLength) / (brickS + concreteS) +
      (u2 * brickS) / (brickS + concreteS) +
      (windowLoss * windowBrickLength) / (brickS + concreteS) +
      gribPcs * gribDepth;
    for (const key in bracketResult) {
      const item = bracketResult[key];
      brackets += parseFloat((item.value * item.pcs) / (concreteS + brickS));
    }
    return brackets * 0.01;
  };

  return (
    <table className="table center-text pe-1">
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
        {buildingType !== 3 && (
          <tr key={182}>
            <th scope="row">1</th>
            <td>{buildingType === 1 ? 'Стена' : 'Перекрытие'}</td>
            <td>Плоский {buildingType === 2 ? 1 : null} </td>
            <td>{(concreteS / (concreteS + brickS)).toFixed(3)}</td>
            <td>{u1.toFixed(3)}</td>
            <td>{((u1 * concreteS) / (concreteS + brickS)).toFixed(3)}</td>
            <td>{((u1 * concreteS) / (concreteS + brickS) / qPercent()).toFixed(1)}</td>
          </tr>
        )}
        {buildingType !== 1 && (
          <tr key={183}>
            <th scope="row"> {buildingType !== 3 ? 2 : 1}</th>
            <td>Стена</td>
            <td>Плоский {buildingType === 2 ? 2 : null}</td>
            <td>{(brickS / (concreteS + brickS)).toFixed(3)}</td>
            <td>{u2.toFixed(3)}</td>
            <td>{((u2 * brickS) / (concreteS + brickS)).toFixed(3)}</td>
            <td>{((u2 * brickS) / (concreteS + brickS) / qPercent()).toFixed(1)}</td>
          </tr>
        )}
        <tr key={184}>
          <th scope="row">{buildingType !== 2 ? 2 : 3}</th>
          <td>Оконный откос</td>
          <td>Линейный </td>
          {buildingType === 1 ? (
            <>
              <td>{(windowConcreteLength / concreteS).toFixed(3)}</td>
              <td> {windowLossConcrete.toFixed(3)}</td>
              <td>{((windowLossConcrete * windowConcreteLength) / concreteS).toFixed(3)}</td>
              <td>{((windowLossConcrete * windowConcreteLength) / concreteS / qPercent()).toFixed(1)}</td>
            </>
          ) : (
            <>
              <td>{(windowBrickLength / (concreteS + brickS)).toFixed(3)}</td>
              <td> {windowLoss.toFixed(3)}</td>
              <td>{((windowLoss * windowBrickLength) / (concreteS + brickS)).toFixed(3)}</td>
              <td>{((windowLoss * windowBrickLength) / (concreteS + brickS) / qPercent()).toFixed(1)}</td>
            </>
          )}
        </tr>
        <tr key={186}>
          <th scope="row">{buildingType === 2 ? 4 : 3}</th>
          <td>Тарельчатый анкер</td>
          <td>Точечный 1</td>
          <td>{gribPcs}</td>
          <td>{gribDepth}</td>
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
            1/R<sub>пр</sub> = {(qPercent() * 100).toFixed(3)}
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}
