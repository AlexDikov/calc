import React, { useContext, useEffect, useRef, useState } from 'react';
import { DefaultContext } from '../contexts/DefaultContext';
import { Badge, Button, Col, Form, Row } from 'react-bootstrap';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import DkCalc from './DkCalc';

export default function AirCalc({
  brickQ,
  concreteQ,
  epsilon,
  insQ,
  rCond1,
  rCond2,
  rOuter0,
  tempGap4,
  secondInsQ,
  vVent5,
}) {
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
    vaporMembrane,

    vaporMembraneR,
    ventHeight,
    ventIn,
    ventMed,
    ventOut,
    windMembraneR,
    windMembrane,
  } = useContext(DefaultContext);

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
  const tx = innerTemp - ((innerTemp - cityProp.tm) / (buildingType == '1' ? rCond1 : rCond2)) * rX;
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

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => contentToPrint.current,
    removeAfterPrint: true,
  });

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
      холодный месяц E = {outE.toFixed(1)} Па, что будет препятствовать выпадению конденсата в воздушной прослойке с
      железобетонными конструкциями.
      <br />
    </>
  );
}
