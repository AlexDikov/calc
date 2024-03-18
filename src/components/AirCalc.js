import React, { useContext, useEffect, useRef, useState } from 'react';
import { DefaultContext } from '../contexts/DefaultContext';
import { Badge, Button, Col, Form, Row } from 'react-bootstrap';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import DkCalc from './DkCalc';

export default function AirCalc({
  brickQ,
  concreteQ,
  eIn,
  eOut,
  insQ,
  rCond1,
  rCond2,
  rEq,
  rVaporWhole,
  secondInsQ,
  tempGap4,
  vVent5,
}) {
  const {
    brickAir,
    brickThickness,
    buildingType,
    cityProp,
    concreteAir,
    concreteThickness,
    height,
    innerTemp,
    insAir,
    insThickness,
    plaster,
    secondIns,
    secondInsAir,
    secondInsThickness,
    ventHeight,
    ventMed,
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

  return (
    <>
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
      {concreteAir}
      Разность давлений на наружной и внутренней поверхностях ограждения: Δp = 0.55H(γ<sub>н</sub> - γ<sub>в</sub>) +
      0.03γ<sub>н</sub>ν<sup>2</sup> = 0.55 ∙ 48 ∙ ({yOuter.toFixed(1)} - {yInner.toFixed(1)}) + 0.03 ∙{' '}
      {yOuter.toFixed(1)} ∙ {cityProp.v}² = {deltaP.toFixed(1)} Па <br />
      Воздухопроницаемость данной конструкции составляет: G = Δp / R<sub>u</sub> = {deltaP.toFixed(1)}/{rU.toFixed(2)} ={' '}
      {gU.toFixed(2)} кг/м²ч
      <br />
    </>
  );
}
