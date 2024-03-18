import React, { useContext, useEffect, useRef, useState } from 'react';
import { DefaultContext } from '../contexts/DefaultContext';
import { Badge, Button, Col, Form, Row } from 'react-bootstrap';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import DkCalc from './DkCalc';

export default function VaporCalc({ brickQ, concreteQ, insQ, rCond1, rCond2, rRed, secondInsQ }) {
  const {
    brickAir,
    brickThickness,
    brickVapor,
    buildingType,
    cityProp,
    concreteAir,
    concreteThickness,
    concreteVapor,
    cover,
    coverThickness,
    handleGU,
    handleGObl,
    height,
    humidity,
    innerTemp,
    insAir,
    insThickness,
    insVapor,
    plaster,
    secondIns,
    secondInsAir,
    secondInsThickness,
    secondInsVapor,
    handleEGap,
    handleOutE,
    vaporMembrane,
    vaporMembraneR,
    ventHeight,
    ventIn,
    ventMed,
    ventOut,
    windMembraneR,
    windMembrane,
  } = useContext(DefaultContext);

  const tempGapInit = cityProp.tm + 1;
  const epsilon = 1.2 * (ventMed / ventIn) ** 2 + (0.04 * ventHeight) / (2 * ventMed) + 1.2 * (ventMed / ventOut) ** 2;

  const rOuter0 = 1 / 23 + 1 / 12 + (coverThickness * 0.001) / cover.l;

  const vVent0 = Math.sqrt((0.08 * ventHeight) / epsilon) * Math.sqrt(((innerTemp - cityProp.tm) * rOuter0) / rRed);
  const x00 = (1005 * vVent0 * ventMed * (373 / (273 + tempGapInit))) / (1 / rRed + 1 / rOuter0);
  const temp00 = (innerTemp / rRed + cityProp.tm / rOuter0) / (1 / rRed + 1 / rOuter0);
  const tempGap0 = temp00 - (temp00 - cityProp.tm) * (x00 / ventHeight) * (1 - Math.exp(-ventHeight / x00));

  function vVent(tempGap) {
    return Math.sqrt((0.08 * ventHeight * (tempGap - cityProp.tm)) / epsilon);
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
    return m / (1 / 4.4 + 1 / cover.c - 1 / 5.77);
  }
  const alphaR1 = alphaR(m1);

  function alphaGap(alphaR, alphaC) {
    return alphaC + 2 * alphaR;
  }
  const alphaGap1 = alphaGap(alphaR1, alphaC1);

  function rOuter(alphaGap) {
    return 1 / alphaGap + 1 / 12 + coverThickness / cover.l;
  }
  const rOuter1 = rOuter(alphaGap1);

  function temp0(rOuter) {
    return (innerTemp / rRed + cityProp.tm / rOuter) / (1 / rRed + 1 / rOuter);
  }
  const temp01 = temp0(rOuter1);

  function x0(vVent, tempGap, rOuter) {
    return (1005 * vVent * ventMed * (373 / (273 + tempGap))) / (1 / rRed + 1 / rOuter);
  }
  const x01 = x0(vVent1, tempGap0, rOuter1);

  function tempGap(temp0, x0) {
    return temp0 - (((temp0 - cityProp.tm) * x0) / height) * (1 - Math.exp(-height / x0));
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

  const plasterV = () => {
    if (plaster === 1) return 0;
    if (plaster === 2) return 0.125;
    if (plaster === 3) return 0.1667;
  };

  const plasterA = () => {
    if (plaster === 1) return 0;
    if (plaster === 2) return 142;
    if (plaster === 3) return 373;
  };

  const rVaporWhole =
    parseFloat(concreteVapor ? concreteThickness / concreteVapor : 0) +
    parseFloat(brickVapor ? brickThickness / brickVapor : 0) +
    parseFloat(secondIns ? insThickness / insVapor + secondInsThickness / secondInsVapor : insThickness / insVapor) +
    plasterV();
  const rVaporIns =
    parseFloat(secondIns ? insThickness / insVapor + secondInsThickness / secondInsVapor : insThickness / insVapor) +
    (vaporMembrane ? vaporMembraneR : 0) +
    (windMembrane ? vaporMembraneR : 0) +
    0.02;
  const outE = 1.84 * 10 ** 11 * Math.exp(-5330 / (273 + cityProp.tm));
  const inE = 1.84 * 10 ** 11 * Math.exp(-5330 / (273 + innerTemp));
  const eIn = (humidity / 100) * inE;
  const qVapor = (1 / (2 * rVaporWhole) + 1 / (4 * rVaporIns)) * (eIn - outE);

  const eOut = (cityProp.w / 100) * outE;
  const kVapor = qVapor / (eIn - outE);
  const rEq = (coverThickness * 0.001) / cover.v;
  const e1 = (eOut + rEq * kVapor * eIn) / (kVapor * rEq + 1);
  const x1 = (22100 * (vVent5 * ventMed * 1.005 * rEq)) / (kVapor * rEq + 1);
  const eGap = e1 - (e1 - eOut) * Math.exp(-height / x1);

  const rX = 1 / 8.7 + concreteQ + brickQ + insQ + secondInsQ;
  const tx = innerTemp - ((innerTemp - cityProp.tm) / (buildingType === 1 ? rCond1 : rCond2)) * rX;
  const eCond = 1.84 * 10 ** 11 * Math.exp(-5330 / (273 + tx));
  const rVaporOuter = windMembraneR + 1 / (1 / rEq + (28753 / (1 + tempGap4 / 273)) * (ventMed / ventHeight) * vVent5);
  const kAir = rVaporOuter / rVaporWhole;
  const d = (eCond - eOut) / (eIn - eOut);

  const g = DkCalc({ d: d, k: kAir });
  const gObl = g / (6.14 * rVaporWhole);

  const rU =
    (concreteAir ? concreteThickness / concreteAir : null) +
    (brickAir ? brickThickness / brickAir : null) +
    (insThickness / insAir + secondInsAir ? secondInsAir : null) +
    (windMembraneR ? windMembraneR : null) +
    plasterA();
  const yOuter = 3463 / (273 + cityProp.tm);
  const yInner = 3463 / (273 + innerTemp);
  const deltaP = 0.55 * height * (yOuter - yInner) + 0.03 * yOuter * cityProp.v ** 2;
  const gU = deltaP / rU;

  handleEGap(eGap);
  handleOutE(outE);
  handleGU(gU);
  handleGObl(gObl);

  return (
    <>
      <h5>5. Воздухообмен в воздушной прослойке.</h5>
      Воздухообмен в воздушной прослойке находится для термического сопротивления стены от внутренней поверхности до
      воздушной прослойки равного требуемому сопротивлению теплопередаче фасада. <br />
      Сумма коэффициентов местных сопротивлений для исследуемой конструкции составляет: <br />ξ = 1.2(S
      <sub>пр</sub>/S<sub>вх</sub>)² + 0.04(h/2S<sub>пр</sub>) + 1.2(S<sub>пр</sub>/S<sub>вых</sub>)²=1.2 ∙ ({ventMed}/
      {ventIn})² + 0.04 ∙ ({ventHeight}/2 ∙ {ventMed}) + 1.2 ∙ ({ventMed}/{ventOut})² = {epsilon.toFixed(2)}
      <br />R<sub>н</sub> = 1/α<sub>н</sub> + 1/α<sub>пр</sub> + R<sub>об</sub> = 1 / 23 + 1 / 12 +{' '}
      {coverThickness * 0.001} / {cover.l}= {rOuter0.toFixed(3)} м²˚С/Вт
      <br />
      После 4 иттераций скорость воздуха в прослойке составляет: V<sub>пр</sub> = {vVent5} м/с
      <br />
      <br />
      <h5>6. Поток водяного пара из конструкции в воздушную прослойку.</h5>
      При расчете влажностного режима конструкции используется приближенный метод.
      <br />
      Парциальное давление водяного пара внутреннего воздуха e<sub>в</sub> = (φ<sub>в</sub> / 100) ∙ E<sub>в</sub> =(
      {humidity}/100) ∙ {inE.toFixed(1)} = {eIn.toFixed(1)} Па
      <br /> Давление насыщенного водяного пара для наружного воздуха в наиболее холодный месяц <br />E<sub>н</sub> =
      1.84 ∙ 10^11 ∙ exp(-5330/(273 + t<sub>м</sub>)) = 1.84 ∙ 10^11 ∙ exp(-5330/(273 + ({cityProp.tm}))) ={' '}
      {outE.toFixed(1)} Па
      <br />
      Полное сопротивление паропроницанию стены составляет:
      <br />R<sub>o</sub>
      <sup>п</sup> = {concreteVapor && `${concreteThickness} / ${concreteVapor} +`}
      {brickVapor && `${brickThickness} / ${brickVapor}`} + {insThickness} / {insVapor}{' '}
      {secondIns && `+ ${secondInsThickness} / ${secondInsVapor}`}
      {plaster && `+ ${plasterV()}`} = {rVaporWhole.toFixed(2)} м² ∙ ч ∙ Па/мг
      <br />
      Сопротивление паропроницанию слоев от основания до воздушной прослойки составляет:
      <br />R<sub>у</sub>
      <sup>п</sup> = {insThickness} / {insVapor} {secondIns && `+ ${secondInsThickness} / ${secondInsVapor}`}
      {vaporMembrane && `+ ${vaporMembraneR}`} {windMembrane && `+ ${windMembraneR}`}+ 0.02 = {rVaporIns} м² ∙ ч ∙ Па/мг
      <br />
      Поток водяного пара из конструкции в воздушную прослойку равен:
      <br />q<sup>п</sup> = 1 / 2 ∙ {rVaporWhole.toFixed(2)} + 1 / 4 ∙ {rVaporIns.toFixed(2)} ∙ ({eIn.toFixed(1)} -{' '}
      {outE.toFixed(1)}) = {qVapor.toFixed(2)} Па
      <br />
      <br />
      <h5>7. Влажность воздуха на выходе из вентилируемой воздушной прослойки.</h5>
      Среднее парциальное давление водяного пара наружного воздуха для января: e<sub>н</sub> = ({outE.toFixed(1)}
      /100) ∙ 344 = {eOut.toFixed(1)}
      Па <br />
      Вспомогательные величины:
      <br />k = q<sub>п</sub> / (e<sub>в</sub> - E<sub>н</sub>) ={qVapor.toFixed(2)} / ({eIn.toFixed(1)} -{' '}
      {outE.toFixed(1)}) = {kVapor.toFixed(2)} мг/м²∙ч∙Па
      <br />e<sub>1</sub> = ({eOut.toFixed(1)} + {rEq.toFixed(3)} ∙ {kVapor.toFixed(2)} ∙ {eIn.toFixed(1)}) / (
      {kVapor.toFixed(2)} ∙ {rEq.toFixed(3)} + 1) = {e1.toFixed(1)} Па
      <br />x<sub>1</sub> = (22100 ∙ ({vVent5} ∙ {ventMed} ∙ 1.005 ∙ {rEq.toFixed(3)})) / {kVapor.toFixed(2)} ∙ (
      {rEq.toFixed(3)} + 1) = {x1.toFixed(1)} м
      <br />R = {coverThickness * 0.001} / {cover.v} = {rEq.toFixed(3)} м²∙ч∙Па/мг <br />
      Парциальное давление водяного пара на выходе из воздушной прослойки:
      <br />e<sub>пр</sub> = {eGap.toFixed(1)} Па
      <br />
      Полученное давление меньше давления насыщенного водяного пара при температуре наружного воздуха в наиболее
      холодный месяц E = {outE.toFixed(1)} Па, что будет препятствовать выпадению конденсата в воздушной прослойке.
      <br />
      <h5>8. Проверка воздухопроницаемости конструкции.</h5>
      Сопротивление влагообмену на наружной границе стены составляет:
      <br /> R<sub>н</sub>
      <sup>п</sup> = {windMembrane && `${windMembraneR} +`} 1 / (1 / {rEq.toFixed(3)} + (28753 / (1 +{' '}
      {tempGap4.toFixed(1)} / 273)) ∙ ({ventMed} / {ventHeight}) ∙ {vVent5}) = {parseFloat(rVaporOuter).toFixed(3)} м² ∙
      ч ∙ Па/мг
      <br />
      Вспомогательные величины:
      <br />R<sub>x</sub> = 1/8.7+ {buildingType !== 3 ? concreteQ : brickQ} +{' '}
      {secondIns ? `${insQ} + ${secondInsQ}` : insQ}+0.015/{plaster === 3 ? 0.93 : 0.81} = {rX.toFixed(3)} м²°С/Вт
      <br />t<sub>x</sub> = t<sub>в</sub> - ((t<sub>в</sub> - t<sub>м</sub>) / R
      {buildingType === 1 ? (
        buildingType === 2 ? (
          <>
            <sub>1</sub>
            <sup>усл</sup>
          </>
        ) : null
      ) : (
        <>
          <sub>2</sub>
          <sup>усл</sup>
        </>
      )}
      ) ∙ R<sub>х</sub>= {innerTemp} - ({innerTemp} - ({cityProp.tm})/
      {buildingType === 1 ? rCond1.toFixed(3) : rCond2.toFixed(3)}) ∙ {rX.toFixed(3)} = {tx.toFixed(1)} °С
      <br />E = 1.84 ∙ 10^11 ∙ exp(-5330/(273 + t<sub>x</sub>)) = 1.84 ∙ 10^11 ∙ exp(-5330/(273 + ({tx.toFixed(1)}
      ))) = {eOut.toFixed(1)} Па
      <br />D = (e<sub>усл</sub> - e<sub>н</sub>) / (e<sub>в</sub> - e<sub>н</sub>)= ({eCond.toFixed(1)} -{' '}
      {eOut.toFixed(1)}) / ({eIn.toFixed(1)} - {eOut.toFixed(1)}) = {d.toFixed(2)}
      <br /> k = {kAir.toFixed(5)} <br />
      Параметр Г определяется интерполяцией по таблице 1 и составляет {g.toFixed(2)}
      <br />
      Требуемая воздухопроницаемость стены с облицовкой на относе составляет: G<sub>тр</sub> = Г / 6.14 ∙ R<sub>0</sub>
      <sup>п</sup> = {g.toFixed(2)} / 6.14 ∙ {rVaporWhole.toFixed(2)} = {gObl.toFixed(5)} кг/м²ч
      <br />
      Сопротивление воздухопроницаемости исследуемой стены составляет: R = ∑R<sub>u</sub> ={' '}
      {concreteThickness
        ? `${concreteThickness} /
          ${concreteAir} + `
        : null}
      {brickThickness
        ? `${brickThickness} /
          ${brickAir} + `
        : null}
      {insThickness} / {insAir}
      {secondIns
        ? ` + ${secondInsThickness} /
          ${secondInsAir}`
        : null}
      {plasterV() !== 0 ? ` + ${plasterV()}` : null} = {rU.toFixed(3)} м²∙ч∙Па/кг <br />
      <br />
      Разность давлений на наружной и внутренней поверхностях ограждения: Δp = 0.55H(γ<sub>н</sub> - γ<sub>в</sub>) +
      0.03γ<sub>н</sub>ν<sup>2</sup> = 0.55 ∙ 48 ∙ ({yOuter.toFixed(1)} - {yInner.toFixed(1)}) + 0.03 ∙{' '}
      {yOuter.toFixed(1)} ∙ {cityProp.v}² = {deltaP.toFixed(1)} Па <br />
      Воздухопроницаемость данной конструкции составляет: G = Δp / R<sub>u</sub> = {deltaP.toFixed(1)}/{rU.toFixed(2)} ={' '}
      {gU.toFixed(2)} кг/м²ч
      <br />
      <br />
    </>
  );
}
