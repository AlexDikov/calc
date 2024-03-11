import React, { useContext, useEffect, useRef, useState } from 'react';
import { DefaultContext } from '../contexts/DefaultContext';
import { Badge, Button, Col, Form, Row } from 'react-bootstrap';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import DkCalc from './DkCalc';

export default function VaporCalc() {
  const {
    bracketResult,
    brickAir,
    brickArea,
    brickDensity,
    brickLambda,
    brickMaterial,
    brickName,
    brickOrConcrete,
    brickThickness,
    brickType,
    brickVapor,
    buildingAim,
    buildingType,
    cityProp,
    concreteAir,
    concreteArea,
    concreteDensity,
    concreteLambda,
    concreteThickness,
    concreteVapor,
    concreteWall,
    cover,
    coverName,
    coverThickness,
    coverVapor,
    dk,
    grib,
    gribDepth,
    gribConcretePcs,
    gribPcs,
    handleInsThickness,
    handleD,
    handleK,
    handleSecondInsThickness,
    handlePlasterValue,
    handleVaporMembraneAir,
    handleVaporMembraneR,
    handleVentHeight,
    handleVentIn,
    handleVentMed,
    handleVentOut,
    height,
    humidity,
    innerTemp,
    insAir,
    insDensity,
    insLambda,
    insName,
    insThickness,
    insVapor,
    mr,
    objAddress,
    objName,
    plaster,
    secondIns,
    secondInsAir,
    secondInsDensity,
    secondInsLambda,
    secondInsThickness,
    secondInsVapor,
    vaporMembrane,
    vaporMembraneAir,
    vaporMembraneR,
    ventHeight,
    ventIn,
    ventMed,
    ventOut,
    windMembraneR,
    windowBrickLength,
    windowConcreteLength,
    windowDepth,
    windowHeight,
    windowLength,
    windowLoss,
    windowLossConcrete,
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
      <br />
      Таким образом, все требования к стене с НФС для исследуемой конструкции выполняются, в доработках она не
      нуждается, нужно уточнить приведенное сопротивление теплопередаче для конечной конструкции. Так как в процессе
      расчетов толщина утеплителя и частота теплозащитных элементов не уточнялись, приведенное сопротивление
      теплопередаче стены с НФС остается без изменений. <br />
      Вывод: утепление рассматриваемого участка объекта {objName} по адресу: {objAddress} с приведенным сопротивлением
      теплопередаче {rRed.toFixed(2)} м²˚С/Вт удовлетворяет условию теплотехнического расчета - приведенное
      сопротивление меньше требуемого, составляющего {rObl.toFixed(2)} м²˚С/Вт.
      <br /> <br />
    </>
  );
}
