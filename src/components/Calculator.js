import React, { useContext, useEffect, useState } from 'react';
import { DefaultContext } from '../contexts/DefaultContext';
import { Badge } from 'react-bootstrap';

export default function Calculator() {
  const context = useContext(DefaultContext);

  const k = 1.3;

  const b = () => {
    if (context.buildingAim === '1') return 1.4;
    if (context.buildingAim === '2') return 1.2;
    if (context.buildingAim === '3') return 1;
  };
  const a = () => {
    if (context.buildingAim === '1') return 0.00035;
    if (context.buildingAim === '2') return 0.0003;
    if (context.buildingAim === '3') return 0.0002;
  };
  const gsop =
    context.buildingAim === '2'
      ? (context.innerTemp - context.cityProp.t8) * context.cityProp.z8
      : (context.innerTemp - context.cityProp.t10) * context.cityProp.z10;

  const concreteQ = parseFloat((context.concreteThickness / context.concreteLambda).toFixed(3));
  const brickQ = parseFloat((context.brickThickness / context.brickLambda).toFixed(3));
  const insQ = parseFloat((context.insThickness / context.insLambda).toFixed(3));
  const secondInsQ = parseFloat((context.secondInsThickness / context.secondInsLambda).toFixed(3));

  const rObl = (a() * gsop + b()) * context.mr;
  const preIns =
    (k * rObl - concreteQ - brickQ - 1 / 8.7 - 1 / 12) *
    (context.secondIns
      ? (context.insThickness / (context.insThickness + context.secondInsThickness)) * context.insLambda +
        (context.secondInsThickness / (context.insThickness + context.secondInsThickness)) * context.secondInsLambda
      : context.insLambda);

  const linearLoss = context.windowLoss * context.windowLength;

  const pointLoss = () => {
    return Object.entries(context.bracketResult).reduce((a, item) => (a = a + item.bracket * item.pcs), 0);
  };

  const rCond1 =
    context.buildingType === '3' ? null : parseFloat((1 / 8.7 + concreteQ + insQ + secondInsQ + 1 / 12).toFixed(3));
  const rCond2 =
    context.buildingType === '1' ? 0 : parseFloat((1 / 8.7 + brickQ + insQ + secondInsQ + 1 / 12).toFixed(3));

  const u1 = context.buildingType === '3' ? 0 : parseFloat(1 / rCond1).toFixed(3);
  const u2 = context.buildingType === '1' ? 0 : parseFloat(1 / rCond2).toFixed(3);

  const rRed = parseFloat((1 / parseFloat(u1 + u2 + linearLoss + pointLoss())).toFixed(3));
  const rCond0 = parseFloat((1 / 8.7 + context.buildingType === '1' ? rCond1 : rCond1 + rCond2 + 1 / 12).toFixed(3));
  const r = parseFloat((rRed / rCond0).toFixed(3));

  const tempGapInit = context.cityProp.tm + 1;
  const epsilon = parseFloat(
    (
      1.2 * (context.ventMed / context.ventIn) ** 2 +
      (0.04 * context.ventHeight) / (2 * context.ventMed) +
      1.2 * (context.ventMed / context.ventOut) ** 2
    ).toFixed(3)
  );

  const rOuter0 = 1 / 23 + 1 / 12 + context.cover.r;

  const vVent0 =
    Math.sqrt((0.08 * context.ventHeight) / epsilon) *
    Math.sqrt(((context.innerTemp - context.cityProp.tm) * rOuter0) / rRed);
  const x00 = (1005 * vVent0 * context.ventMed * (373 / (273 + tempGapInit))) / (1 / rRed + 1 / rOuter0);
  const temp00 = (context.innerTemp / rRed + context.cityProp.tm / rOuter0) / (1 / rRed + 1 / rOuter0);
  const tempGap0 =
    temp00 - (temp00 - context.cityProp.tm) * (x00 / context.ventHeight) * (1 - Math.exp(-context.ventHeight / x00));

  function vVent(tempGap) {
    return Math.sqrt((0.08 * context.ventHeight * (tempGap - context.cityProp.tm)) / epsilon);
  }

  const vVent1 = vVent(tempGap0);

  function m(tempGap) {
    return 0.04 * ((273 + tempGap) / 100) ** 3;
  }
  const m1 = m(tempGap0);

  function alphaC(vVent) {
    return 7.34 * vVent ** 0.656 + 3.78 * Math.E ** (-1.91 * vVent);
  }
  const alphaC1 = alphaC(vVent1);

  function alphaR(m) {
    return m / (1 / 4.4 + 1 / context.cover.c - 1 / 5.77);
  }
  const alphaR1 = alphaR(m1);

  function alphaGap(alphaR, alphaC) {
    return alphaC + 2 * alphaR;
  }
  const alphaGap1 = alphaGap(alphaR1, alphaC1);

  function rOuter(alphaGap) {
    return 1 / alphaGap + 1 / 12 + context.coverThickness / context.cover.l;
  }
  const rOuter1 = rOuter(alphaGap1);

  function temp0(rOuter) {
    return (context.innerTemp / rRed + context.cityProp.tm / rOuter) / (1 / rRed + 1 / rOuter);
  }
  const temp01 = temp0(rOuter1);

  function x0(vVent, tempGap, rOuter) {
    return (1005 * vVent * context.ventMed * (373 / (273 + tempGap))) / (1 / rRed + 1 / rOuter);
  }
  const x01 = x0(vVent1, tempGap0, rOuter1);

  function tempGap(temp0, x0) {
    return temp0 - (((temp0 - context.cityProp.tm) * x0) / context.height) * (1 - Math.exp(-context.height / x0));
  }
  const tempGap1 = tempGap(temp01, x01);

  const vVent2 = vVent(tempGap1);
  const m2 = m(vVent2);
  const alphaC2 = alphaC(vVent2);
  const alphaR2 = alphaR(m2);
  const alphaGap2 = alphaGap(alphaR2, alphaC2);
  const rOuter2 = rOuter(alphaGap2);
  const temp02 = temp0(rOuter2);
  const x02 = x0(vVent2, tempGap1, rOuter2);
  const tempGap2 = tempGap(temp02, x02);

  const vVent3 = vVent(tempGap2);
  const m3 = m(vVent3);
  const alphaC3 = alphaC(vVent3);
  const alphaR3 = alphaR(m3);
  const alphaGap3 = alphaGap(alphaR3, alphaC3);
  const rOuter3 = rOuter(alphaGap3);
  const temp03 = temp0(rOuter3);
  const x03 = x0(vVent3, tempGap2, rOuter3);
  const tempGap3 = tempGap(temp03, x03);

  const vVent4 = vVent(tempGap3);
  const m4 = m(vVent4);
  const alphaC4 = alphaC(vVent4);
  const alphaR4 = alphaR(m4);
  const alphaGap4 = alphaGap(alphaR4, alphaC4);
  const rOuter4 = rOuter(alphaGap4);
  const temp04 = temp0(rOuter4);
  const x04 = x0(vVent4, tempGap3, rOuter4);
  const tempGap4 = tempGap(temp04, x04);

  const vVent5 = parseFloat(vVent(tempGap4).toFixed(3));

  const plaster = () => {
    if (context.plaster === '1') return null;
    if (context.plaster === '2') return 0.125;
    if (context.plaster === '3') return 0.16667;
  };

  const rVaporWhole =
    (context.buildingType !== '3' ? context.concreteThickness / context.concreteVapor : null) +
    (context.buildingType !== '1' ? context.brickThickness / context.brickVapor : null) +
    context.secondIns
      ? context.insThickness / context.insVapor + context.secondInsThickness / context.secondInsVapor
      : context.insThickness / context.insVapor + plaster();
  const rVaporIns = context.insThickness / context.insVapor + context.vaporMembraneR + context.windMembraneR + 0.02;
  const outE = parseFloat((1.84 * 10 ** 11 * Math.exp(-5330 / (273 + context.cityProp.tm))).toFixed(2));
  const inE = 1.84 * 10 ** 11 * Math.exp(-5330 / (273 + context.innerTemp));
  const eIn = parseFloat(((context.humidity / 100) * inE).toFixed(2));
  const qVapor = ((1 / 2) * rVaporWhole + (1 / 4) * rVaporIns) * (eIn - outE);

  const eOut = parseFloat(((context.cityProp.w / 100) * outE).toFixed(2));
  const kVapor = qVapor / (eIn - outE);
  const rEq = context.cover.r;
  const e1 = (eOut + rEq * kVapor * eIn) / (kVapor * rEq + 1);
  const x1 = (22100 * (vVent5 * context.ventMed * 1.005 * rEq)) / (kVapor * rEq + 1);
  const eGap = e1 - (e1 - eOut) * Math.exp(-context.height / x1);
  const rX = 1 / 8.7 + 1;
  // (concreteQ + brickQ + insQ + secondInsQ);
  const tx =
    context.innerTemp -
    ((context.innerTemp - context.cityProp.tm) / (context.buildingType == '1' ? rCond1 : rCond2)) * rX;
  const eCond = 1.84 * 10 ** 11 * Math.exp(-5330 / (273 + tx));
  const rVaporOuter =
    context.windMembraneR +
    1 / (1 / rEq + (28753 / (1 + tempGap4 / 273)) * (context.ventMed / context.ventHeight) * vVent5);
  const kAir = rVaporOuter / rVaporWhole;
  const d = (eCond - eOut) / (eIn - eOut);
  // onD(0.1);
  // onK(0.1);

  const g = context.dk;
  const gObl = g / (6.14 * rVaporWhole);

  const rU = parseFloat(
    context.concreteAir + context.brickAir + context.insAir + context.secondInsAir + context.windMembraneR
  );
  const yOuter = 3463 / (273 + context.cityProp.tm);
  const yInner = 3463 / (273 + context.innerTemp);
  const deltaP = 0.55 * context.height * (yOuter - yInner) + 0.03 * yOuter * context.cityProp.v ** 2;
  const gU = deltaP / rU;

  const brackets = () =>
    Object.entries(context.bracketResult).map(([key, item]) => (
      <React.Fragment key={key}>
        <br /> - {item.type ? 'алюминиевый' : 'стальной'} {item.weight ? 'межэтажный' : 'рядовой'} кронштейн{' '}
        {item.bracket} - {item.pcs / context.concreteArea} шт/м²
      </React.Fragment>
    ));
  const brackets2 = () =>
    Object.entries(context.bracketResult).map(([key, item]) => (
      <React.Fragment key={key}>
        <br /> χᵏᵖ<sup>{parseInt(key) + 1}</sup> = {item.value.toFixed(4)} Вт/°С для кронштейна {item.bracket}{' '}
        (крепление : {item.wall ? 'бетон' : 'блок/кирпич'} );
      </React.Fragment>
    ));
  const brackets3 = () =>
    Object.entries(context.bracketResult).map(([key, item]) => (
      <React.Fragment key={key}>
        <br /> - кронштейн {item.bracket} (точечный элемент {parseInt(key) + 2})
      </React.Fragment>
    ));
  console.log(context.bracketResult);
  const brackets4 = () =>
    Object.entries(context.bracketResult).map(([key, item]) => (
      <React.Fragment key={key}>
        <tr key={184}>
          <th scope="row">{context.buildingType === '2' ? parseInt(key) + 6 : parseInt(key) + 4}</th>
          <td>
            кронштейн <br />
            {item.bracket}
          </td>
          <td>Точечный {parseInt(key) + 2}</td>
          <td>{(item.pcs / (context.concreteArea + context.brickAir)).toFixed(4)}</td>
          <td>{item.value.toFixed(4)}</td>
          <td>{((item.value * item.pcs) / (context.concreteArea + context.brickAir)).toFixed(4)}</td>
          <td>@mdo</td>
        </tr>
      </React.Fragment>
    ));

  const windowDepth = () => {
    if (context.windowDepth === '1') return 'как для рам, утопленных в стену на 100 мм';
    if (context.windowDepth === '2') return 'как для рам сразу за утеплителем';
    if (context.windowDepth === '3') return 'как для рам, вынесенных за стену на 100мм';
  };

  const windowHeight = () => {
    if (context.windowHeight === '1') return 'без нахлеста утеплителя на раму';
    if (context.windowHeight === '2') return 'как сразу за утеплителем';
    if (context.windowHeight === '3') return 'как вынесенным за стену на 100мм';
  };

  return (
    <>
      <div className="final">
        {rRed > rObl ? (
          <div>
            <h1>
              <Badge bg="secondary">
                R<sub>у</sub> {'<'} R<sub>тр</sub>
              </Badge>
            </h1>
            <h1>Условие выполнено</h1>
          </div>
        ) : (
          <div>
            <h1>
              <Badge bg="secondary" size="lg">
                R<sub>у</sub> {'>'} R<sub>тр</sub>
              </Badge>
            </h1>
            <h1>Условие не выполнено! Увеличьте слой утеплителя.</h1>
          </div>
        )}
        {eOut < outE ? (
          <div>
            <h1>
              <Badge bg="secondary">
                R<sub>у</sub> {'<'} R<sub>тр</sub>
              </Badge>
            </h1>
            <h1>Условие выполнено!</h1>
          </div>
        ) : (
          <div>
            <h1>
              <Badge bg="secondary" size="lg">
                e<sub>в</sub> {'>'} E<sub>н</sub>
              </Badge>
            </h1>
            <h1>Условие не выполнено!</h1>
          </div>
        )}
        {gU < gObl ? (
          <div className="final">
            <h1>
              <Badge bg="secondary">
                G {'<'} G<sub>тр</sub>
              </Badge>
            </h1>
            <h1>Условие выполнено!</h1>
          </div>
        ) : (
          <div>
            <h1>
              <Badge bg="secondary" size="lg">
                G<sub>у</sub> {'>'} G<sub>тр</sub>
              </Badge>
            </h1>
            <h1>Условие не выполнено!</h1>
          </div>
        )}
      </div>
      {rRed > rObl && eOut < outE && gU < gObl ? (
        <>
          <h2>Пояснительная записка к расчету энергоэффективности ограждающей конструкции с системой НВФ</h2>
          <h2>
            Объект : {context.objName}, расположенный по адресу : {context.objAddress}
          </h2>
          <br />
          <h5>1. Данные для расчета.</h5>
          <div>
            Климатические данные района строительства: Климатические данные принимаются по таблице 3.1 СП 131.13330.2020
            и пункту 5.7 СП 50.13330.2012; <br />- средняя температура наиболее холодной пятидневки, с обеспеченностью
            0,92: t = {context.cityProp.t} °С;
            <br />- средняя температура наиболее холодного месяца: t<sub>м</sub> = {context.cityProp.tm} °С; <br />-
            средняя температура отопительного периода: t<sub>{context.buildingAim === '2' ? '8' : '10'}</sub> ={' '}
            {context.buildingAim === '2' ? context.cityProp.t8 : context.cityProp.t10} °С;
            <br />- продолжительность отопительного периода: z<sub>
              {context.buildingAim === '2' ? '8' : '10'}
            </sub> = {context.buildingAim === '2' ? context.cityProp.z8 : context.cityProp.z10} сут;
            <br />- максимальная из скоростей ветра по румбам за январь: ν = {context.cityProp.v} м/c;
            <br />- расчетная относительная влажность внутреннего воздуха: φ = {context.humidity} %; <br />
            <br />
            Микроклимат в здании: <br /> - расчетная температура внутреннего воздуха: t<sub>в</sub>= {context.innerTemp}{' '}
            °С; <br /> - средняя месячная относительная влажность воздуха наиболее холодного месяца: φ<sub>м</sub> ={' '}
            {context.cityProp.w} %.
            <br />
            <br />
            <br /> <b>Состав стены:</b>
            {context.buildingType !== '1' ? (
              context.concreteWall ? (
                <div>
                  - монолитный железобетон, плотностью {context.concreteDensity} кг/м³, толщиной{' '}
                  {context.concreteThickness * 1000} мм
                </div>
              ) : (
                <div>
                  - монолитный железобетон, для расчета требуемого сопротивления перекрытия толщину принимаем{' '}
                  {context.brickThickness * 1000} мм
                </div>
              )
            ) : (
              <div>
                - монолитный железобетон, плотностью {context.concreteDensity} кг/м³, толщиной{' '}
                {context.concreteThickness * 1000} мм
              </div>
            )}
            {context.buildingType !== '1' ? (
              <div>
                - {context.brickName} плотностью {context.brickDensity} кг/м³, толщиной {context.brickThickness * 1000}{' '}
                мм
              </div>
            ) : null}
            {context.secondIns ? (
              <div>
                - внутренний слой теплоизоляции плотностью {context.insDensity} кг/м³, толщиной{' '}
                {context.insThickness * 1000} мм <br />- внешний слой теплоизоляции плотностью{' '}
                {context.secondInsDensity} кг/м³, толщиной {context.secondInsThickness * 1000} мм
              </div>
            ) : (
              <div>
                - слой теплоизоляции плотностью {context.insDensity} кг/м³, толщиной {context.insThickness * 1000} мм
              </div>
            )}
            <br />
            <b>Расчетные характеристики материалов:</b> <br />
            {context.buildingType !== '3' ? (
              <div>
                {' '}
                Железобетон : <br />- коэффициент теплопроводности материала λ = {context.concreteLambda} Вт/(м°С);
                <br />- коэффициент паропроницаемости материала μ = {context.concreteVapor} мг/(м∙ч∙Па);
                <br /> - коэффициент воздухопроницаемости ί = {context.concreteAir} кг/(м∙ч∙Па);
              </div>
            ) : null}
            {context.buildingType !== '1' ? (
              <div>
                {' '}
                Кладка :
                <br /> - коэффициент теплопроводности материала λ = {context.brickLambda} Вт/(м°С);
                <br /> - коэффициент паропроницаемости материала μ = {context.brickVapor} мг/(м∙ч∙Па);
                <br /> - коэффициент воздухопроницаемости ί = {context.brickAir} кг/(м∙ч∙Па);
              </div>
            ) : null}
            {context.secondIns ? (
              <div>
                Внутренний слой утеплителя:
                <br /> - коэффициент теплопроводности материала λ = {context.insLambda} Вт/(м°С);
                <br /> - коэффициент паропроницаемости материала μ = {context.insVapor} мг/(м∙ч∙Па);
                <br />- коэффициент воздухопроницаемости ί = 0,1 кг/(м∙ч∙Па);
                <br />
                Внешний слой утеплителя:
                <br /> - коэффициент теплопроводности материала λ = {context.secondInsLambda} Вт/(м°С);
                <br /> - коэффициент паропроницаемости материала μ = {context.insVapor} мг/(м∙ч∙Па);
                <br />- коэффициент воздухопроницаемости ί = 0,1 кг/(м∙ч∙Па);
              </div>
            ) : (
              <div>
                Утеплитель :
                <br /> - коэффициент теплопроводности материала λ = {context.insLambda} Вт/(м°С);
                <br /> - коэффициент паропроницаемости материала μ = {context.insVapor} мг/(м∙ч∙Па);
                <br />- коэффициент воздухопроницаемости ί = 0,1 кг/(м∙ч∙Па);{' '}
              </div>
            )}
            Штукатурка :
            <br /> - коэффициент теплопроводности материала λ = 0.93 Вт/(м°С);
            <br /> - коэффициент паропроницаемости материала μ = {context.secondInsVapor} мг/(м∙ч∙Па);
            <br /> - коэффициент воздухопроницаемости ί = {context.secondInsAir} кг/(м∙ч∙Па);
            <br />
            <br /> <b>Характеристики элементов НФС:</b>
            <br />
            Высота здания h = {context.height} м
            <br />
            Ширина вентилируемого зазора на входе δ<sub>вх</sub> = {context.ventIn * 1000} мм <br />
            Ширина вентилируемого зазора на выходе δ<sub>вых</sub> = {context.ventOut * 1000} мм
            <br />
            Средняя ширина воздушной прослойки δ<sub>ср</sub> = {context.ventMed * 1000} мм
            <br />
            Высота наибольшего непрерывной воздушной прослойки h = {context.ventHeight} м <br />
            <br />
            Средняя частота кронштейнов на фасаде 2,8 шт/м² из них:
            {brackets()}
            <br /> Средняя частота установки тарельчатых анкеров для крепления изоляции {context.gribPcs} шт/м²
            <br />
            <br /> Облицовка - {context.coverName} толщиной {context.coverThickness} мм
            <br />
            <br /> <h5>2. Требуемое сопротивление теплопередаче.</h5>
            Градусо-сутки отопительного периода для рассматриваемого случая составляют: ГСОП = ({context.innerTemp} -(
            {context.buildingAim === 2 ? context.cityProp.t8 : context.cityProp.t10})) ∙{' '}
            {context.buildingAim === 2 ? context.cityProp.z8 : context.cityProp.z10}= {gsop.toFixed(0)}
            °С∙сут. <br />
            Минимально требуемое приведенное сопротивление теплопередаче стен по СП 50.13330.2012 составляет R = ({a()}{' '}
            ∙ {gsop.toFixed(0)} +{b()}) ∙ {context.mr} = {rObl.toFixed(2)} м²°С/Вт.
            <br /> <br />
            <h5>3. Минимально необходимая толщина утеплителя.</h5>
            Приближенная толщина утеплителя : δ = ({k} ∙ {rObl.toFixed(2)}
            {concreteQ ? ` - ${concreteQ}` : null}
            {brickQ ? ` - ${brickQ}` : null} - 1 / 8.7 - 1 / 12) ∙ (
            {context.secondIns
              ? (context.insThickness / (context.insThickness + context.secondInsThickness)) * context.insLambda +
                (context.secondInsThickness / (context.insThickness + context.secondInsThickness)) *
                  context.secondInsLambda
              : context.insLambda}
            ) ={preIns.toFixed(2) * 1000} мм;
            <br /> Удельные потери теплоты через кронштейны в соответствии с заключением НИИСФ РААСН по договору №
            12250(2020) от «09» декабря 2020 г. находятся по таблицам Г.71, Г.73, Г.74, Г.75 СП 230.1325800.2015
            интерполяцией:
            {brackets2()}
            <br />У применяемого на данном объекте тарельчатого анкера расстояние от края стального распорного элемента
            до тарелки дюбеля {context.grib}.
            <br /> В соответствии с таблицей Г4 СП 230.1325800.2015 удельные потери теплоты тарельчатого анкера χ ={' '}
            {context.gribDepth} Вт/°С.
            <h5>
              <br />
              4. Расчет приведенного сопротивления теплопередаче фрагмента стены с НФС по приложению Е СП 50.13330.2012.
            </h5>
            Для учета всех теплотехнических неоднородностей фрагмента стены с НФС необходимо оценить фрагмент
            теплозащитной оболочки здания с НФС в целом. Перечисление элементов составляющих ограждающую конструкцию:
            {context.buildingType === '2' ? (
              <>
                <br /> - заполнение стены со слоем теплоизоляции (плоский элемент 1)
                <br /> - железобетонное перекрытие со слоем теплоизоляции (плоский элемент 2)
              </>
            ) : null}
            <br />
            {context.buildingType === '1' ? '- железобетонная стена со слоем теплоизоляции (плоский элемент 1)' : null}
            {context.buildingType === '3' ? '- кирпичная стена со слоем теплоизоляции (плоский элемент 1)' : null}
            {context.buildingType !== '2' ? (
              '- оконный откос (линейный элемент 1)'
            ) : (
              <>
                - оконный откос, образованный кладкой со слоем теплоизоляции (линейный элемент 1)
                <br /> - оконный откос, образованный железобетонной стеной со слоем теплоизоляции (линейный элемент 2)
              </>
            )}
            <br /> - дюбель со стальным сердечником, прикрепляющий слой теплоизоляции к основанию (точечный элемент 1).
            {brackets3()}
            <br /> <b>Геометрические характеристики проекций элементов.</b>
            <br /> Площадь поверхности фрагмента ограждающей конструкции для расчета R составляет: А =
            {parseInt(context.concreteArea) + parseInt(context.brickArea)} м²;
            <br />{' '}
            {context.concreteWall
              ? `Площадь стены с основанием из железобетона составляет: ${context.concreteArea}`
              : `Суммарная площадь торцов перекрытий из монолитного железобетона (т.е. площадь проекции на поверхность фрагмента)
        составляет ${context.concreteArea} м².`}
            <br /> Доля этой площади от общей площади фрагмента ограждающей конструкции равна: а ={' '}
            {context.concreteArea}/{parseInt(context.concreteArea) + parseInt(context.brickArea)} ={' '}
            {(parseInt(context.concreteArea) / (parseInt(context.concreteArea) + parseInt(context.brickArea))).toFixed(
              2
            )}
            .
            <br />
            {context.buildingType !== '1'
              ? `Площадь стены с основанием из блоков составляет ${
                  parseInt(context.concreteArea) + parseInt(context.brickArea)
                } - 
        ${context.concreteArea} = ${context.brickArea} м².`
              : null}
            <br /> Доля этой площади от общей площади фрагмента ограждающей конструкции равна а ={context.brickArea}/
            {parseInt(context.concreteArea) + parseInt(context.brickArea)} ={' '}
            {(parseInt(context.brickArea) / (parseInt(context.concreteArea) + parseInt(context.brickArea))).toFixed(2)};
            <br />
            {context.buildingType === '2' ? (
              <>
                Общая длина проекции оконного откоса, образованного железобетоном, утепленным слоем минераловатной
                плиты, определяется по экспликации оконных проемов и равна: {context.windowLength} м.
                <br />
                Общая длина проекции оконного откоса, образованного кладкой из блоков, утепленной слоем минераловатной
                плиты, определяется по экспликации оконных проемов и равна: {context.windowLength} м.
              </>
            ) : null}
            <br />
            Длина проекции откосов, приходящаяся на 1 м² площади фрагмента равна l = {context.windowLength} /
            {parseInt(context.concreteArea) + parseInt(context.brickArea)} ={' '}
            {(context.windowLength / (parseInt(context.concreteArea) + parseInt(context.brickArea))).toFixed(3)} м/м².
            <br />
            <br /> <b>Расчет удельных потерь теплоты, обусловленных элементами.</b>
            <br /> Для плоского элемента {context.buildingType === '2' ? 1 : null} удельные потери теплоты определяются
            по формулам Е.6, Е.З СП 50.13330.2012:
            <br />R = 1/8.7 + {context.buildingType !== '3' ? concreteQ : brickQ} +{' '}
            {context.secondIns ? `${insQ} + ${secondInsQ}` : `${insQ}`}+ 1/12 = {rCond1} м²°С/Вт
            <br />
            U1 = 1/ {rCond1} = {u1} Вт/(м²°С)
            <br />
            {context.buildingType === '2' ? (
              <>
                Для плоского элемента 2 удельные потери теплоты определяются аналогично: <br />R = 1/8.7 + {brickQ} +{' '}
                {context.secondIns ? `${insQ}+${secondInsQ}` : `${insQ}`} + 1/12 = {rCond2} м²°C/Вт
                <br />
                U2 = 1/ {rCond2} = {u2} Вт/(м²°С)
              </>
            ) : null}
            <br />
            Приведенное сопротивление теплопередаче фрагмента стены с НФС представлено в 2 таблицах аналогично
            приложению Е СП 50.13330.2012, что позволяет оценить какое влияние оказывает каждый элемент конструкции. Для
            учета примыканий оконных блоков принимаем характеристики этих узлов по таблице Г.33 приложения Г СП
            230.1325800.2015 {windowDepth()} и {windowHeight()}.
            <br />
          </div>

          <table className="table center-text">
            <thead>
              <tr key={181}>
                <th scope="col"></th>
                <th scope="col">Элемент конструкции</th>
                <th scope="col">Тип элемента конструкции</th>
                <th scope="col">Удельный геометрический показатель</th>
                <th scope="col">Удельные потери теплоты</th>
                <th scope="col">
                  Удельный поток теплоты, обусловленный эл-том 1,
                  <br />
                  Вт/(м² °С)
                </th>
                <th scope="col">Доля общего потока теплоты через фрагмент,%</th>
              </tr>
            </thead>
            <tbody>
              {context.buildingType !== '3' ? (
                <tr key={182}>
                  <th scope="row">1</th>
                  <td>Стена</td>
                  <td>Плоский {context.buildingType === '2' ? 1 : null} </td>
                  <td>{(context.concreteArea / (context.concreteArea + context.brickArea)).toFixed(3)}</td>
                  <td>{u1}</td>
                  <td>{(concreteQ * context.concreteArea).toFixed(3)}</td>
                  <td>@mdo</td>
                </tr>
              ) : null}
              {context.buildingType !== '1' ? (
                <tr key={183}>
                  <th scope="row"> {context.buildingType !== '3' ? 2 : 1}</th>
                  <td>Стена</td>
                  <td>Плоский {context.buildingType === '2' ? 2 : null}</td>
                  <td>{(context.brickArea / (context.concreteArea + context.brickArea)).toFixed(3)}</td>
                  <td>{u2}</td>
                  <td>{brickQ * context.brickArea}</td>
                  <td>@mdo</td>
                </tr>
              ) : null}
              <tr key={184}>
                <th scope="row">{context.buildingType !== '2' ? 2 : 3}</th>
                <td>Оконный откос</td>
                <td>Линейный {context.buildingType === '2' ? 1 : null}</td>
                <td>{(context.windowLength / (context.concreteArea + context.brickArea)).toFixed(3)}</td>
                <td>{brickQ}</td>
                <td>{brickQ * context.brickArea}</td>
                <td>@mdo</td>
              </tr>
              {context.buildingType === '2' ? (
                <tr key={185}>
                  <th scope="row">{context.buildingType !== '2' ? 3 : 4}</th>
                  <td>Оконный откос</td>
                  <td>Линейный {context.buildingType === '2' ? 2 : null}</td>
                  <td>{(context.windowLength / (context.concreteArea + context.brickArea)).toFixed(3)}</td>
                  <td>{context.windowLoss}</td>
                  <td>
                    {(context.windowLoss * (context.windowLength / (context.concreteArea + context.brickArea))).toFixed(
                      4
                    )}
                  </td>
                  <td>@mdo</td>
                </tr>
              ) : null}
              <tr key={186}>
                <th scope="row">{context.buildingType !== '2' ? 3 : 5}</th>
                <td>Тарельчатый анкер</td>
                <td>Точечный 1</td>
                <td>{context.gribPcs}</td>
                <td>{context.gribDepth}</td>
                <td>{(context.gribPcs * context.gribDepth).toFixed(3)}</td>
                <td>@mdo</td>
              </tr>
              {brackets4()}
            </tbody>
          </table>

          <br />
          <div>
            Осредненное по площади условное сопротивление теплопередаче стены с НФС R = 1/8,7 + {concreteQ} + {brickQ} +
            {insQ} + {secondInsQ} + 1/12 = {rRed} м²°С/Вт <br />
            Коэффициент теплотехнической однородности стены с НФС : r = {rRed}/{rCond0} = {r}
            <br />
            {context.buildingType === '2' ? 'Общее приведенное сопротивление теплопередаче участка с НФС:' : null}
            <br />
            <br />
            <h5>5. Воздухообмен в воздушной прослойке.</h5>
            Воздухообмен в воздушной прослойке находится для термического сопротивления стены от внутренней поверхности
            до воздушной прослойки равного требуемому сопротивлению теплопередаче фасада. <br />
            Сумма коэффициентов местных сопротивлений для исследуемой конструкции составляет: <br />ξ = 1,2 ∙ ((
            {context.ventMed}/{context.ventIn})²) + 0,04 ∙ ({context.ventHeight}/(2 ∙ {context.ventMed})) + (1,2 ∙ (
            {context.ventMed}/{context.ventOut})²) = {epsilon.toFixed(2)}
            <br />R = 1 / 23 + 1 / 12 + {context.cover.r}= {parseInt(rOuter0).toFixed(3)} м²˚С/Вт
            <br />
            После 4 иттераций скорость воздуха в прослойке составляет: V<sub>пр</sub> = {vVent5} м/с
            <br />
            <br />
            <h5>6. Поток водяного пара из конструкции в воздушную прослойку.</h5>
            При расчете влажностного режима конструкции используется приближенный метод.
            <br />
            Парциальное давление водяного пара внутреннего воздуха e<sub>в</sub> = ({context.humidity}/100) ∙{' '}
            {inE.toFixed(1)} = {eIn} Па
            <br /> Давление насыщенного водяного пара для наружного воздуха в наиболее холодный месяц E<sub>н</sub> =
            1,84 ∙ 10^11 ∙ exp(-5330/(273 + ({context.cityProp.tm}))) = {outE.toFixed(1)} Па
            <br /> Полное сопротивление паропроницанию стены из железобетона составляет:
            <br /> Сопротивление паропроницанию слоев от основания до воздушной прослойки составляет:
            <br />
            Поток водяного пара из конструкции в воздушную прослойку равен:
            <br />
            Полное сопротивление паропроницанию стены из кладки составляет:
            <br />
            Сопротивление паропроницанию слоев от основания до воздушной прослойки составляет:
            <br />
            Поток водяного пара из конструкции в воздушную прослойку равен:
            <br />
            <br />
            <h5>7. Влажность воздуха на выходе из вентилируемой воздушной прослойки.</h5>
            Среднее парциальное давление водяного пара наружного воздуха для января месяца: e<sub>н</sub> = ({outE}/100)
            ∙ 344 = {eOut.toFixed(1)}
            Па <br />
            Вспомогательные величины:
            <br />k = qVapor / (eIn - outE) = {kVapor} мг/м²∙ч∙Па
            <br />e<sub>1</sub> = ({eOut} + {rEq} * {kVapor} * {eIn}) / ({kVapor} * {rEq} + 1) = {e1.toFixed(1)} Па;
            <br />x<sub>1</sub> = (22100 * ({vVent} * {context.ventMed} * 1.005 * {rEq})) / ({kVapor} * {rEq} + 1) ={' '}
            {x1.toFixed(1)} м;
            <br />R = {context.coverThickness} / {context.coverVapor} = {rEq} м²∙ч∙Па/мг <br />
            Парциальное давление водяного пара на выходе из воздушной прослойки:
            <br />e<sub>пр</sub> = {eGap.toFixed(1)} Па
            <br />
            Полученное давление меньше давления насыщенного водяного пара при температуре наружного воздуха в наиболее
            холодный месяц E = 344 Па, что будет препятствовать выпадению конденсата в воздушной прослойке с
            железобетонными конструкциями.
            <br />
            <br />
            <h5>8. Проверка воздухопроницаемости конструкции.</h5>
            Сопротивление влагообмену на наружной границе стены составляет:
            <br />
            Вспомогательные величины:
            <br />R<sub>x</sub> = 1/8.7+ {brickQ}+{concreteQ}+{insQ}+{secondInsQ}+0.015/0.93 = {rX.toFixed(3)} м²°С/Вт
            <br />t<sub>x</sub> ={context.innerTemp}- ({context.innerTemp} - ({context.cityProp.tm})/
            {context.buildingType === '1' ? rCond1 : rCond2}) ∙ {rX.toFixed(3)} = {tx.toFixed(1)} °С
            <br />E = 1,84 ∙ 10^11 ∙ exp(-5330/(273 - ({context.cityProp.tm}))) = {eOut.toFixed(1)} Па.
            <br />D = {eCond.toFixed(1)} - {eOut.toFixed(1)} / {eIn.toFixed(1)} - {eOut.toFixed(1)} = {d.toFixed(2)}
            <br />
            Параметр Г определяется интерполяцией по таблице 1 и составляет {context.dk}
            <br />
            Требуемая воздухопроницаемость стены с облицовкой на относе составляет:
            <br />
            Сопротивление воздухопроницаемости исследуемой стены составляет: R = {context.concreteThickness}/
            {context.concreteAir} +{context.brickThickness}/{context.brickAir} + 0,00 + 142/373 = {rU} м²∙ч∙Па/кг <br />
            Разность давлений на наружной и внутренней поверхностях ограждения: Δp = 0,55 ∙ 48 ∙ ({yOuter.toFixed(
              1
            )} - {yInner.toFixed(1)}) + 0,03 ∙ {yOuter.toFixed(1)} ∙ {context.cityProp.v}² = {deltaP.toFixed(1)} Па{' '}
            <br />
            Воздухопроницаемость данной конструкции составляет: G = {deltaP.toFixed(1)}/{rU} = {gU} кг/(м²∙ч)
            <br />
            Таким образом, все требования к стене с НФС для исследуемой конструкции выполняются, в доработках она не
            нуждается, нужно уточнить приведенное сопротивление теплопередаче для конечной конструкции. Так как в
            процессе расчетов толщина утеплителя и частота теплозащитных элементов не уточнялись, приведенное
            сопротивление теплопередаче стены с НФС остается без изменений. Вывод: утепление рассматриваемого участка
            объекта ЖК "Дом" по адресу:г. Москва, ул. Уютная, стр. 12 с приведенным сопротивлением теплопередаче 1,79
            м²˚С/Вт удовлетворяет условию теплотехнического расчета - приведенное сопротивление меньше требуемого,
            составляющего 3,85 м²˚С/Вт.
          </div>
        </>
      ) : null}
    </>
  );
}
