import React, { useContext, useEffect, useRef, useState } from 'react';
import { DefaultContext } from '../contexts/DefaultContext';
import { Badge, Button, Col, Form, Row } from 'react-bootstrap';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import DkCalc from './DkCalc';

export default function Calculator() {
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
    plasterValue,
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

  const [pz, setPz] = useState(false);

  function togglePz() {
    setPz(!pz);
  }

  const k = 1.3;

  const b = () => {
    if (buildingAim === '1') return 1.4;
    if (buildingAim === '2') return 1.2;
    if (buildingAim === '3') return 1;
  };
  const a = () => {
    if (buildingAim === '1') return 0.00035;
    if (buildingAim === '2') return 0.0003;
    if (buildingAim === '3') return 0.0002;
  };
  const gsop =
    buildingAim === '2' ? (innerTemp - cityProp.t8) * cityProp.z8 : (innerTemp - cityProp.t10) * cityProp.z10;

  const concreteQ = buildingType !== '3' ? parseFloat((concreteThickness / concreteLambda).toFixed(3)) : null;
  const brickQ = buildingType !== '1' ? parseFloat((brickThickness / brickLambda).toFixed(3)) : null;
  const insQ = parseFloat((insThickness / insLambda).toFixed(3));
  const secondInsQ = secondIns ? parseFloat((secondInsThickness / secondInsLambda).toFixed(3)) : null;

  const rObl = (a() * gsop + b()) * mr;
  const preIns =
    (k * rObl - concreteQ - brickQ - 1 / 8.7 - 1 / 12) *
    (secondIns
      ? (insThickness / (insThickness + secondInsThickness)) * insLambda +
        (secondInsThickness / (insThickness + secondInsThickness)) * secondInsLambda
      : insLambda);

  const linearLoss = parseFloat(
    (windowLoss * windowBrickLength) / (brickArea + concreteArea) +
      (windowLossConcrete * windowConcreteLength) / (brickArea + concreteArea)
  );

  const pointLoss = () => {
    let totalLoss = 0;

    for (const key in bracketResult) {
      const bracketData = bracketResult[key];
      totalLoss += (parseFloat(bracketData.value) * parseInt(bracketData.pcs)) / (concreteArea + brickArea);
    }
    return totalLoss;
  };

  const rCond1 = buildingType !== '3' ? 1 / 8.7 + concreteQ + insQ + secondInsQ + 1 / 12 : null;
  const rCond2 = buildingType !== '1' ? 1 / 8.7 + brickQ + insQ + secondInsQ + 1 / 12 : null;

  const u1 = buildingType !== '3' ? 1 / rCond1 : null;
  const u2 = buildingType !== '1' ? 1 / rCond2 : null;

  const rRed = u1 + u2 + linearLoss + pointLoss();
  const rCond0 = 1 / 8.7 + rCond1 + rCond2 + 1 / 12;
  const r = rRed / rCond0;

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
    if (plasterValue === '1') return 0;
    if (plasterValue === '2') return 0.125;
    if (plasterValue === '3') return 0.16667;
  };

  const rVaporWhole =
    parseFloat(concreteVapor ? concreteThickness / concreteVapor : 0) +
    parseFloat(brickVapor ? brickThickness / brickVapor : 0) +
    parseFloat(secondIns ? insThickness / insVapor + secondInsThickness / secondInsVapor : insThickness / insVapor) +
    parseFloat(plaster ? plasterV() : 0);
  const rVaporIns =
    parseFloat(secondIns ? insThickness / insVapor + secondInsThickness / secondInsVapor : insThickness / insVapor) +
    (vaporMembrane ? vaporMembraneR : 0) +
    (windMembrane ? vaporMembraneR : 0) +
    0.02;
  const outE = 1.84 * 10 ** 11 * Math.exp(-5330 / (273 + cityProp.tm));
  const inE = 1.84 * 10 ** 11 * Math.exp(-5330 / (273 + innerTemp));
  const eIn = (humidity / 100) * inE;
  const qVapor = ((1 / 2) * rVaporWhole + (1 / 4) * rVaporIns) * (eIn - outE);

  const eOut = (cityProp.w / 100) * outE;
  const kVapor = qVapor / (eIn - outE);
  const rEq = (coverThickness * 0.001) / cover.v;
  const e1 = (eOut + rEq * kVapor * eIn) / (kVapor * rEq + 1);
  const x1 = (22100 * (vVent5 * ventMed * 1.005 * rEq)) / (kVapor * (rEq + 1));
  const eGap = e1 - (e1 - eOut) * Math.exp(-height / x1);
  const rX = 1 / 8.7 + concreteQ + brickQ + insQ + secondInsQ;
  const tx = innerTemp - ((innerTemp - cityProp.tm) / (buildingType == '1' ? rCond1 : rCond2)) * rX;
  const eCond = 1.84 * 10 ** 11 * Math.exp(-5330 / (273 + tx));
  const rVaporOuter = windMembraneR + 1 / (1 / rEq + (28753 / (1 + tempGap4 / 273)) * (ventMed / ventHeight) * vVent5);
  const kAir = rVaporOuter / rVaporWhole;
  const d = (eCond - eOut) / (eIn - eOut);

  const g = DkCalc({ d: d, k: kAir });
  const gObl = g / (6.14 * rVaporWhole);

  const rU = concreteAir
    ? concreteThickness / concreteAir
    : null + brickAir
    ? brickThickness / brickAir
    : null + insThickness / insAir + secondInsAir
    ? secondInsAir
    : null + windMembraneR
    ? windMembraneR
    : null;
  const yOuter = 3463 / (273 + cityProp.tm);
  const yInner = 3463 / (273 + innerTemp);
  const deltaP = 0.55 * height * (yOuter - yInner) + 0.03 * yOuter * cityProp.v ** 2;
  const gU = deltaP / rU;

  const wallType = (wall, item) => {
    if (wall === '1') return concreteArea;
    if (wall === '3') return brickArea;
    if (wall === '2') return item.wallType ? concreteArea : brickArea;
  };

  const bracketDensity = () => {
    let brackets = 0;
    for (const key in bracketResult) {
      const bracketData = bracketResult[key];
      brackets += parseInt(bracketData.pcs);
    }
    return brackets / (brickArea + concreteArea);
  };

  const brackets = () =>
    Object.entries(bracketResult).map(([key, item]) => (
      <React.Fragment key={key}>
        <br /> - {item.type ? 'алюминиевый' : 'стальной'} {item.weight ? 'межэтажный' : 'рядовой'} кронштейн{' '}
        {item.bracket} - {(item.pcs / wallType(buildingType, item)).toFixed(1)} шт/м²
      </React.Fragment>
    ));
  const brackets2 = () =>
    Object.entries(bracketResult).map(([key, item]) => (
      <React.Fragment key={key}>
        <br /> χᵏᵖ<sup>{parseInt(key) + 1}</sup> = {item.value.toFixed(4)} Вт/°С для кронштейна {item.bracket}{' '}
        {buildingType === '2' ? `крепление : ${item.wall ? 'бетон' : 'блок/кирпич'}` : null};
      </React.Fragment>
    ));
  const brackets3 = () =>
    Object.entries(bracketResult).map(([key, item]) => (
      <React.Fragment key={key}>
        <br /> - кронштейн {item.bracket} (точечный элемент {parseInt(key) + 2})
      </React.Fragment>
    ));
  const qPercent = () => {
    let brackets =
      +(u1 * concreteArea) / (concreteArea + brickArea) +
      (u2 * brickArea) / (concreteArea + brickArea) +
      (windowLoss * windowBrickLength) / (concreteArea + brickArea) +
      (windowLossConcrete * windowConcreteLength) / (concreteArea + brickArea) +
      gribPcs * gribDepth +
      gribConcretePcs * gribDepth;
    for (const key in bracketResult) {
      const item = bracketResult[key];
      brackets += parseFloat((item.value * item.pcs) / (concreteArea + brickArea));
    }
    return brackets * 0.01;
  };

  const brackets4 = () =>
    Object.entries(bracketResult).map(([key, item]) => (
      <React.Fragment key={key}>
        <tr key={184}>
          <th scope="row">
            {concreteWall ? parseInt(key) + 7 : buildingType === '2' ? parseInt(key) + 5 : parseInt(key) + 4}
          </th>
          <td>кронштейн {item.bracket}</td>
          <td>Точечный {parseInt(key) + 2}</td>
          <td>{(item.pcs / (concreteArea + brickArea)).toFixed(3)}</td>
          <td>{item.value.toFixed(4)}</td>
          <td>{((item.value * item.pcs) / (concreteArea + brickArea)).toFixed(4)}</td>
          <td>{((item.value * item.pcs) / (concreteArea + brickArea) / qPercent()).toFixed(1)}</td>
        </tr>
      </React.Fragment>
    ));

  const windowD = () => {
    if (windowDepth === '1') return 'как для рам, утопленных в стену на 100 мм';
    if (windowDepth === '2') return 'как для рам сразу за утеплителем';
    if (windowDepth === '3') return 'как для рам, вынесенных за стену на 100мм';
  };

  const windowH = () => {
    if (windowHeight === '1') return 'без нахлеста утеплителя на раму';
    if (windowHeight === '2') return 'как сразу за утеплителем';
    if (windowHeight === '3') return 'как вынесенным за стену на 100мм';
  };

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => contentToPrint.current,
    removeAfterPrint: true,
  });

  return (
    <>
      <div className="final">
        <div className="final-container">
          {rRed > rObl ? (
            <div className="final rounded shadow p-2 mb-2 bg-body-tertiary w-100">
              <h4>
                R<sub>у</sub> {'>'} R<sub>тр</sub>
              </h4>
              <h6>Условие выполнено</h6>
            </div>
          ) : (
            <div className="final  rounded shadow p-2 mb-2 bg-body-tertiary w-100">
              <h4>
                R<sub>у</sub> {'<'} R<sub>тр</sub>
              </h4>
              <Row className="mx-auto">
                <Col xs={7} className="mt-2">
                  <p>Увеличьте слой утеплителя:</p>
                </Col>
                {secondIns ? (
                  <Col xs={4}>
                    <Form.Control
                      className="w-25"
                      placeholder="нижний слой, мм"
                      value={insThickness ? insThickness * 1000 : null}
                      onChange={handleInsThickness}
                    ></Form.Control>
                    <Form.Control
                      className="w-25"
                      placeholder="верхний слой, мм"
                      value={secondInsThickness ? secondInsThickness * 1000 : null}
                      onChange={handleSecondInsThickness}
                    ></Form.Control>
                  </Col>
                ) : (
                  <Col xs={2}>
                    <Form.Control
                      placeholder="мм"
                      value={insThickness ? insThickness * 1000 : null}
                      onChange={handleInsThickness}
                    ></Form.Control>
                  </Col>
                )}
              </Row>
            </div>
          )}
          {eGap < outE ? (
            <div class="final rounded shadow p-2 mb-2 bg-body-tertiary w-100">
              <h4>
                e<sub>пр</sub> {'<'} E<sub>н</sub>
              </h4>
              <h6>Условие выполнено</h6>
            </div>
          ) : (
            <div className="final mt-1 rounded shadow p-3 mb-2 bg-body-tertiary ">
              <h4>
                e<sub>пр</sub> {'>'} E<sub>н</sub>
              </h4>
              <Row className="ms-auto">
                <Col xs={7} className="mt-2">
                  <p>Уменьшите высоту прослойки отсечкой: </p>
                </Col>
                <Col xs={2}>
                  <Form.Control
                    className=" ms-4"
                    placeholder="м"
                    value={ventHeight}
                    onChange={handleVentHeight}
                  ></Form.Control>
                </Col>
              </Row>
              <Row>
                <Col xs={14} className="mt-2">
                  <Form.Label>Увеличьте ширину зазора или точек входа/выхода воздуха </Form.Label>
                </Col>
              </Row>
              <Row>
                <Col xs={3}>
                  <Form.Control placeholder="вход, мм" value={ventIn * 1000} onChange={handleVentIn}></Form.Control>
                </Col>
                <Col xs={3} className="mx-auto">
                  <Form.Control placeholder="ширина, мм" value={ventMed * 1000} onChange={handleVentMed}></Form.Control>
                </Col>
                <Col xs={3}>
                  <Form.Control placeholder="выход, мм" value={ventOut * 1000} onChange={handleVentOut}></Form.Control>
                </Col>
              </Row>
            </div>
          )}
          {gU < gObl ? (
            <div class="border border-secondary">
              G<sub>у</sub> {'<'} G<sub>тр</sub>
              <h6>Условие выполнено</h6>
            </div>
          ) : (
            <div className="final rounded shadow p-3 mb-5 bg-body-tertiary ">
              <h4>
                G<sub>у</sub> {'>'} G<sub>тр</sub>
              </h4>
              <p>Добавьте штукатурку или пароизоляцию</p>
              <Row>
                <Col>
                  <Form.Select id="plaster" className=" mx-auto" onChange={handlePlasterValue}>
                    <option>Штукатурка изнутри</option>
                    <option value={1}>Нет</option>
                    <option value={2}>Гипсовая</option>
                    <option value={3}>Цементная</option>
                  </Form.Select>
                </Col>
              </Row>
              <Row>
                <Col xs={11}>
                  <Form.Control
                    id="vapor-membrane-air"
                    placeholder="Сопротивление воздухопроницанию, м²чПа/кг"
                    value={vaporMembraneAir}
                    onChange={handleVaporMembraneAir}
                  />
                </Col>
                <Col xs={11}>
                  <Form.Control
                    id="vapor-membrane-r"
                    placeholder="Сопротивление паропроницанию, м²чПа/мг"
                    value={vaporMembraneR}
                    onChange={handleVaporMembraneR}
                  />
                </Col>
              </Row>
            </div>
          )}
        </div>
      </div>
      <Button size="sm" variant="outline-secondary" className="btn-pz" onClick={handlePrint}>
        Пояснительная записка
      </Button>

      <>
        <div ref={contentToPrint}>
          <h2>Пояснительная записка к расчету энергоэффективности ограждающей конструкции с системой НВФ</h2>
          <h2>
            Объект : {objName}, расположенный по адресу : {objAddress}
          </h2>
          <br />
          <h5>1. Данные для расчета.</h5>
          <div>
            <b>Климатические данные района строительства:</b> <br />
            Климатические данные принимаются по таблице 3.1 СП 131.13330.2020 и пункту 5.7 СП 50.13330.2012; <br />-
            средняя температура наиболее холодной пятидневки, с обеспеченностью 0,92: t = {cityProp.t} °С;
            <br />- средняя температура наиболее холодного месяца: t<sub>м</sub> = {cityProp.tm} °С; <br />- средняя
            температура отопительного периода: t<sub>{buildingAim === '2' ? '8' : '10'}</sub> ={' '}
            {buildingAim === '2' ? cityProp.t8 : cityProp.t10} °С;
            <br />- продолжительность отопительного периода: z<sub>{buildingAim === '2' ? '8' : '10'}</sub> ={' '}
            {buildingAim === '2' ? cityProp.z8 : cityProp.z10} сут;
            <br />- максимальная из скоростей ветра по румбам за январь: ν = {cityProp.v} м/c;
            <br />- расчетная относительная влажность внутреннего воздуха: φ = {humidity} %; <br />
            <br />
            <b>Микроклимат в здании:</b> <br /> - расчетная температура внутреннего воздуха: t<sub>в</sub>= {innerTemp}{' '}
            °С; <br /> - средняя месячная относительная влажность воздуха наиболее холодного месяца: φ<sub>м</sub> ={' '}
            {cityProp.w} %.
            <br />
            <br /> <b>Состав стены:</b>
            {buildingType !== '3' ? (
              buildingType === '2' ? (
                concreteWall ? (
                  <div>- монолитный железобетон толщиной {concreteThickness * 1000} мм</div>
                ) : (
                  <div>
                    - монолитный железобетон, для расчета требуемого сопротивления перекрытия толщину принимаем{' '}
                    {brickThickness * 1000} мм
                  </div>
                )
              ) : (
                <div>- монолитный железобетон толщиной {concreteThickness * 1000} мм</div>
              )
            ) : null}
            {buildingType !== '1' ? (
              <div>
                - {brickName} плотностью {brickDensity} кг/м³, толщиной {brickThickness * 1000} мм
              </div>
            ) : null}
            {secondIns ? (
              <div>
                - внутренний слой теплоизоляции плотностью {insDensity} кг/м³, толщиной {insThickness * 1000} мм <br />-
                внешний слой теплоизоляции плотностью {secondInsDensity} кг/м³, толщиной {secondInsThickness * 1000} мм
              </div>
            ) : (
              <div>
                - {insName} плотностью {insDensity} кг/м³, толщиной {insThickness * 1000} мм
              </div>
            )}
            <br />
            <b>Расчетные характеристики материалов:</b> <br />
            {buildingType !== '3' ? (
              <div>
                {' '}
                Железобетон : <br />- коэффициент теплопроводности материала λ = {concreteLambda} Вт/(м°С);
                <br />- коэффициент паропроницаемости материала μ = {concreteVapor} мг/(м∙ч∙Па);
                <br /> - коэффициент воздухопроницаемости ί = {concreteAir} кг/(м∙ч∙Па);
              </div>
            ) : null}
            {buildingType !== '1' ? (
              <div>
                {' '}
                Кладка :
                <br /> - коэффициент теплопроводности материала λ = {brickLambda} Вт/(м°С);
                <br /> - коэффициент паропроницаемости материала μ = {brickVapor} мг/(м∙ч∙Па);
                <br /> - коэффициент воздухопроницаемости ί = {brickAir} кг/(м∙ч∙Па);
              </div>
            ) : null}
            <>
              {secondIns ? 'Внутренний слой утеплителя' : 'Утеплитель'} :
              <br /> - коэффициент теплопроводности материала λ = {insLambda} Вт/(м°С);
              <br /> - коэффициент паропроницаемости материала μ = {insVapor} мг/(м∙ч∙Па);
              <br />- коэффициент воздухопроницаемости ί = {insAir} кг/(м∙ч∙Па);
              <br />
            </>
            {secondIns && (
              <>
                Внешний слой утеплителя:
                <br /> - коэффициент теплопроводности материала λ = {secondInsLambda} Вт/(м°С);
                <br /> - коэффициент паропроницаемости материала μ = {insVapor} мг/(м∙ч∙Па);
                <br />- коэффициент воздухопроницаемости ί = {secondInsAir} кг/(м∙ч∙Па);
              </>
            )}
            {plaster ? (
              <>
                Штукатурка :
                <br /> - коэффициент теплопроводности материала λ = {plaster === '3' ? '0,93' : '0.81'} Вт/(м°С);
                <br /> - коэффициент паропроницаемости материала μ = {plaster === '3' ? '0,93' : '0.81'} мг/(м∙ч∙Па);
                <br /> - коэффициент воздухопроницаемости ί = {plaster === '3' ? '0,93' : '0.81'} кг/(м∙ч∙Па);
                <br />
              </>
            ) : null}
            <br /> <b>Характеристики элементов НФС:</b>
            <br />
            Высота здания H = {height} м
            <br />
            Ширина вентилируемого зазора на входе δ<sub>вх</sub> = {ventIn * 1000} мм <br />
            Ширина вентилируемого зазора на выходе δ<sub>вых</sub> = {ventOut * 1000} мм
            <br />
            Средняя ширина воздушной прослойки δ<sub>ср</sub> = {ventMed * 1000} мм
            <br />
            Высота наибольшего непрерывной воздушной прослойки h = {ventHeight} м <br />
            <br />
            Средняя частота кронштейнов на фасаде {bracketDensity().toFixed(1)} шт/м² из них:
            {brackets()}
            <br />
            <br /> Средняя частота установки тарельчатых анкеров для крепления изоляции{' '}
            {concreteWall ? 'на кладке' : null}: {gribPcs} шт/м²
            <br />{' '}
            {concreteWall ? (
              <>
                Средняя частота установки тарельчатых анкеров для крепления изоляции на железобетоне: {gribConcretePcs}{' '}
                шт/м²
                <br />
              </>
            ) : null}
            <br /> Облицовка - {coverName} толщиной {coverThickness} мм
            <br />
            <br /> <h5>2. Требуемое сопротивление теплопередаче.</h5>
            Градусо-сутки отопительного периода для рассматриваемого случая составляют: ГСОП = (t<sub>в</sub> - t
            {buildingAim === 2 ? <sub>8</sub> : <sub>10</sub>}) ∙ z{buildingAim === 2 ? <sub>8</sub> : <sub>10</sub>}= (
            {innerTemp} -(
            {buildingAim === 2 ? cityProp.t8 : cityProp.t10})) ∙ {buildingAim === 2 ? cityProp.z8 : cityProp.z10}={' '}
            {gsop.toFixed(0)}
            °С∙сут. <br />
            Минимально требуемое приведенное сопротивление теплопередаче стен по СП 50.13330.2012 составляет <br />R
            <sub>тр</sub> = (a ∙ ГСОП + b) ∙ m<sub>r</sub> = ({a()} ∙ {gsop.toFixed(0)} + {b()}) ∙ {mr} ={' '}
            {rObl.toFixed(2)} м²°С/Вт.
            <br /> <br />
            <h5>3. Минимально необходимая толщина утеплителя.</h5>
            Приближенная толщина утеплителя : δ = (k ∙ R<sub>тр</sub> - δ<sub>к</sub>/λ<sub>к</sub> - 1/α<sub>в</sub> -
            1/α<sub>н</sub>)= ({k} ∙ {rObl.toFixed(2)}
            {concreteQ ? ` - ${concreteQ}` : null}
            {brickQ ? ` - ${brickQ}` : null} - 1 / 8.7 - 1 / 12) ∙ (
            {secondIns
              ? (insThickness / (insThickness + secondInsThickness)) * insLambda +
                (secondInsThickness / (insThickness + secondInsThickness)) * secondInsLambda
              : insLambda}
            ) = {preIns.toFixed(2) * 1000} мм;
            <br /> Удельные потери теплоты через кронштейны в соответствии с заключением НИИСФ РААСН по договору №
            12250(2020) от «09» декабря 2020 г. находятся по таблицам Г.71, Г.73, Г.74, Г.75 СП 230.1325800.2015
            интерполяцией:
            {brackets2()}
            <br />У применяемого на данном объекте тарельчатого анкера расстояние от края стального распорного элемента
            до тарелки дюбеля {grib}.
            <br /> В соответствии с таблицей Г4 СП 230.1325800.2015 удельные потери теплоты тарельчатого анкера χ ={' '}
            {gribDepth} Вт/°С.
            <h5>
              <br />
              4. Расчет приведенного сопротивления теплопередаче фрагмента стены с НФС по приложению Е СП 50.13330.2012.
            </h5>
            Для учета всех теплотехнических неоднородностей фрагмента стены с НФС необходимо оценить фрагмент
            теплозащитной оболочки здания с НФС в целом. Перечисление элементов составляющих ограждающую конструкцию:
            <br />
            {buildingType === '2' ? (
              <>
                - заполнение стены со слоем теплоизоляции (плоский элемент 1)
                <br /> - железобетонное перекрытие со слоем теплоизоляции (плоский элемент 2)
              </>
            ) : (
              <>- стена со слоем теплоизоляции (плоский элемент 1)</>
            )}
            <br />
            {buildingType !== '2' ? (
              '- оконный откос (линейный элемент 1)'
            ) : (
              <>
                - оконный откос, образованный кладкой со слоем теплоизоляции (линейный элемент 1)
                <br /> - оконный откос, образованный железобетонной стеной со слоем теплоизоляции (линейный элемент 2)
              </>
            )}
            <br /> - тарельчатый анкер, крепящий теплоизоляцию к основанию (точечный элемент 1).
            {brackets3()}
            <br />
            <br /> <b>Геометрические характеристики проекций элементов.</b>
            <br /> Площадь поверхности фрагмента ограждающей конструкции для расчета R составляет: А ={' '}
            {concreteArea + brickArea} м²;
            <br />
            {buildingType === '2'
              ? concreteWall
                ? `Площадь стены с основанием из железобетона составляет: ${concreteArea} м²`
                : `Суммарная площадь торцов перекрытий из монолитного железобетона (т.е. площадь проекции на поверхность фрагмента)
        составляет ${concreteArea} м².`
              : null}
            {buildingType === '2' ? (
              <>
                <br /> Доля этой площади от общей площади фрагмента ограждающей конструкции равна: а = {concreteArea}/
                {concreteArea + brickArea} = {(concreteArea / (concreteArea + brickArea)).toFixed(2)}
                .
                <br />
                {concreteWall ? (
                  <>
                    Площадь стены с основанием из блоков составляет {brickArea} м².
                    <br /> Доля этой площади от общей площади фрагмента ограждающей конструкции равна а ={brickArea}/
                    {concreteArea + brickArea} = {(brickArea / (concreteArea + brickArea)).toFixed(2)}.
                    <br />
                    Общая длина проекции оконного откоса, образованного железобетоном, утепленным слоем минераловатной
                    плиты, определяется по экспликации оконных проемов и равна: {windowBrickLength} м.
                    <br />
                    Длина проекции откосов, приходящаяся на 1 м² площади фрагмента равна l = {windowBrickLength} /
                    {concreteArea + brickArea} = {(windowBrickLength / (concreteArea + brickArea)).toFixed(2)} м/м².
                    <br />{' '}
                  </>
                ) : null}
                Общая длина проекции оконного откоса, образованного кладкой из блоков, утепленной слоем минераловатной
                плиты, определяется по экспликации оконных проемов и равна: {windowBrickLength} м.
                <br />
                Длина проекции откосов, приходящаяся на 1 м² площади фрагмента равна l = {windowBrickLength} /
                {concreteArea + brickArea} = {(windowBrickLength / (concreteArea + brickArea)).toFixed(2)} м/м².
              </>
            ) : (
              <>
                <br />
                Общая длина проекции оконного откоса, образованного cтеной с утеплителем, определяется по экспликации
                оконных проемов и равна: {buildingType === '1' ? windowConcreteLength : windowBrickLength} м.
                <br />
                Длина проекции откосов, приходящаяся на 1 м² площади фрагмента равна l ={' '}
                {buildingType === '1' ? windowConcreteLength : windowBrickLength} /{concreteArea + brickArea} ={' '}
                {buildingType === '1'
                  ? windowConcreteLength
                  : (windowBrickLength / (concreteArea + brickArea)).toFixed(2)}{' '}
                м/м².
              </>
            )}
            <br />
            <br /> <b>Расчет удельных потерь теплоты, обусловленных элементами.</b>
            <br /> Для плоского элемента {buildingType === '2' ? 1 : null} удельные потери теплоты определяются по
            формулам Е.6, Е.З СП 50.13330.2012:
            <br />R<sub>{buildingType === '2' ? 1 : null}</sub>
            <sup>усл</sup> = 1/α<sub>в</sub> + ∑R
            <sub>s</sub> + 1/α<sub>пр0</sub> = 1/8.7 + {buildingType !== '3' ? concreteQ : brickQ} +{' '}
            {secondIns ? `${insQ} + ${secondInsQ}` : insQ}+ 1/12 ={' '}
            {buildingType !== '3' ? rCond1.toFixed(2) : rCond2.toFixed(2)} м²°С/Вт
            <br />U<sub>{buildingType === '2' ? 1 : null}</sub> = 1/R<sub>{buildingType === '2' ? 1 : null}</sub>
            <sup>усл</sup> = 1/ {buildingType !== '3' ? rCond1.toFixed(2) : rCond2.toFixed(2)} ={' '}
            {buildingType !== '3' ? u1.toFixed(3) : u2.toFixed(3)} Вт/(м²°С)
            <br />
            {buildingType === '2' ? (
              <>
                Для плоского элемента 2 удельные потери теплоты определяются аналогично: <br />R<sub>2</sub>
                <sup>усл</sup> = 1/8.7 + {brickQ} + {secondIns ? `${insQ}+${secondInsQ}` : `${insQ}`} + 1/12 ={' '}
                {rCond2.toFixed(2)} м²°C/Вт
                <br />U<sub>2</sub> = 1/ {rCond2.toFixed(2)} = {u2.toFixed(2)} Вт/(м²°С)
              </>
            ) : null}
            <br />
            Приведенное сопротивление теплопередаче фрагмента стены с НФС представлено в 2 таблицах аналогично
            приложению Е СП 50.13330.2012, что позволяет оценить какое влияние оказывает каждый элемент конструкции. Для
            учета примыканий оконных блоков принимаем характеристики этих узлов по таблице Г.33 приложения Г СП
            230.1325800.2015 {windowD()} и {windowH()}.
            <br />
          </div>

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
                <th scope="col">
                  Доля общего
                  <br /> потока теплоты <br />
                  через фрагмент,%
                </th>
              </tr>
            </thead>
            <tbody>
              {buildingType !== '3' ? (
                <tr key={182}>
                  <th scope="row">1</th>
                  <td>{concreteWall ? 'Перекрытие' : 'Стена'}</td>
                  <td>Плоский {buildingType === '2' ? 1 : null} </td>
                  <td>{(concreteArea / (concreteArea + brickArea)).toFixed(3)}</td>
                  <td>{u1.toFixed(3)}</td>
                  <td>{((u1 * concreteArea) / (concreteArea + brickArea)).toFixed(3)}</td>
                  <td>{((u1 * concreteArea) / (concreteArea + brickArea) / qPercent()).toFixed(1)}</td>
                </tr>
              ) : null}
              {buildingType !== '1' ? (
                <tr key={183}>
                  <th scope="row"> {buildingType !== '3' ? 2 : 1}</th>
                  <td>Стена</td>
                  <td>Плоский {buildingType === '2' ? 2 : null}</td>
                  <td>{(brickArea / (concreteArea + brickArea)).toFixed(3)}</td>
                  <td>{u2.toFixed(3)}</td>
                  <td>{((u2 * brickArea) / (concreteArea + brickArea)).toFixed(3)}</td>
                  <td>{((u2 * brickArea) / (concreteArea + brickArea) / qPercent()).toFixed(1)}</td>
                </tr>
              ) : null}
              <tr key={184}>
                <th scope="row">{buildingType !== '2' ? 2 : 3}</th>
                <td>Оконный откос</td>
                <td>Линейный {buildingType === '2' ? 1 : null}</td>
                <td>
                  {buildingType === '1'
                    ? (windowConcreteLength / (concreteArea + brickArea)).toFixed(3)
                    : (windowBrickLength / (concreteArea + brickArea)).toFixed(3)}
                </td>
                <td>{buildingType === '1' ? windowLossConcrete.toFixed(3) : windowLoss.toFixed(3)}</td>
                <td>
                  {buildingType === '1'
                    ? ((windowLossConcrete * windowConcreteLength) / (concreteArea + brickArea)).toFixed(3)
                    : ((windowLoss * windowBrickLength) / (concreteArea + brickArea)).toFixed(3)}
                </td>
                <td>
                  {buildingType === '1'
                    ? ((windowLossConcrete * windowConcreteLength) / (concreteArea + brickArea) / qPercent()).toFixed(1)
                    : ((windowLoss * windowBrickLength) / (concreteArea + brickArea) / qPercent()).toFixed(1)}
                </td>
              </tr>
              {concreteWall ? (
                <tr key={185}>
                  <th scope="row">{buildingType !== '2' ? 3 : 4}</th>
                  <td>Оконный откос</td>
                  <td>Линейный {buildingType === '2' ? 2 : null}</td>
                  <td>{(windowConcreteLength / (concreteArea + brickArea)).toFixed(3)}</td>
                  <td>{windowLossConcrete}</td>
                  <td>{((windowLossConcrete * windowConcreteLength) / (concreteArea + brickArea)).toFixed(4)}</td>
                  <td>
                    {((windowLossConcrete * windowConcreteLength) / (concreteArea + brickArea) / qPercent()).toFixed(1)}
                  </td>
                </tr>
              ) : null}
              <tr key={186}>
                <th scope="row">{concreteWall ? 5 : buildingType === '2' ? 4 : 3}</th>
                <td>Тарельчатый анкер</td>
                <td>Точечный 1</td>
                <td>{gribPcs}</td>
                <td>{gribDepth}</td>
                <td>{(gribPcs * gribDepth).toFixed(3)}</td>
                <td>{((gribPcs * gribDepth) / qPercent()).toFixed(1)}</td>
              </tr>
              {concreteWall ? (
                <tr key={186}>
                  <th scope="row">{6}</th>
                  <td>Тарельчатый анкер</td>
                  <td>Точечный 2</td>
                  <td>{gribConcretePcs}</td>
                  <td>{gribDepth}</td>
                  <td>{(gribConcretePcs * gribDepth).toFixed(3)}</td>
                  <td>{((gribConcretePcs * gribDepth) / qPercent()).toFixed(1)}</td>
                </tr>
              ) : null}
              {brackets4()}
            </tbody>
          </table>

          <br />
          <div>
            Осредненное по площади условное сопротивление теплопередаче стены с НФС R<sub>у</sub> = 1/8.7{' '}
            {concreteQ && `+ ${concreteQ}`} {brickQ && `+ ${brickQ}`} + {(1 / insQ).toFixed(3)}{' '}
            {secondInsQ && `+ 1/${secondInsQ}`} + 1/12 = {rRed.toFixed(3)} м²°С/Вт <br />
            Коэффициент теплотехнической однородности стены с НФС : r = {rRed.toFixed(3)}/{rCond0.toFixed(3)} ={' '}
            {r.toFixed(3)}
            <br />
            {buildingType === '2' ? 'Общее приведенное сопротивление теплопередаче участка с НФС:' : null}
            <br />
            <br />
            <h5>5. Воздухообмен в воздушной прослойке.</h5>
            Воздухообмен в воздушной прослойке находится для термического сопротивления стены от внутренней поверхности
            до воздушной прослойки равного требуемому сопротивлению теплопередаче фасада. <br />
            Сумма коэффициентов местных сопротивлений для исследуемой конструкции составляет: <br />ξ = 1.2(S
            <sub>пр</sub>/S<sub>вх</sub>)² + 0.04(h/2S<sub>пр</sub>) + 1.2(S<sub>пр</sub>/S<sub>вых</sub>)²=1.2 ∙ (
            {ventMed}/{ventIn})² + 0.04 ∙ ({ventHeight}/2 ∙ {ventMed}) + 1.2 ∙ ({ventMed}/{ventOut})² ={' '}
            {epsilon.toFixed(2)}
            <br />R<sub>н</sub> = 1/α<sub>н</sub> + 1/α<sub>пр</sub> + R<sub>об</sub> = 1 / 23 + 1 / 12 +{' '}
            {coverThickness * 0.001} / {cover.l}= {rOuter0.toFixed(3)} м²˚С/Вт
            <br />
            После 4 иттераций скорость воздуха в прослойке составляет: V<sub>пр</sub> = {vVent5} м/с
            <br />
            <br />
            <h5>6. Поток водяного пара из конструкции в воздушную прослойку.</h5>
            При расчете влажностного режима конструкции используется приближенный метод.
            <br />
            Парциальное давление водяного пара внутреннего воздуха e<sub>в</sub> = (φ<sub>в</sub> / 100) ∙ E<sub>в</sub>{' '}
            =({humidity}/100) ∙ {inE.toFixed(1)} = {eIn.toFixed(1)} Па
            <br /> Давление насыщенного водяного пара для наружного воздуха в наиболее холодный месяц <br />E
            <sub>н</sub> = 1.84 ∙ 10^11 ∙ exp(-5330/(273 + t<sub>м</sub>)) = 1.84 ∙ 10^11 ∙ exp(-5330/(273 + (
            {cityProp.tm}))) = {outE.toFixed(1)} Па
            <br />
            Полное сопротивление паропроницанию стены составляет:
            <br />R<sub>o</sub>
            <sup>п</sup> ={concreteVapor && `${concreteThickness} / ${concreteVapor} +`}
            {brickVapor && `${brickThickness} / ${brickVapor}`} + {insThickness} / {insVapor}{' '}
            {secondIns && `+ ${secondInsThickness} / ${secondInsVapor}`}
            {plaster && `+ ${plasterV()}`} = {rVaporWhole.toFixed(2)} м² ∙ ч ∙ Па/мг
            <br />
            Сопротивление паропроницанию слоев от основания до воздушной прослойки составляет:
            <br />R<sub>у</sub>
            <sup>п</sup> ={insThickness} / {insVapor} {secondIns && `+ ${secondInsThickness} / ${secondInsVapor}`}
            {vaporMembrane && `+ ${vaporMembraneR}`} {windMembrane && `+ ${windMembraneR}`}+ 0.02 = {rVaporIns} м² ∙ ч ∙
            Па/мг
            <br />
            Поток водяного пара из конструкции в воздушную прослойку равен:
            <br />q<sup>п</sup> = 1 / 2 ∙ {rVaporWhole.toFixed(2)} + 1 / 4 ∙ {rVaporIns.toFixed(2)} ∙ ({eIn.toFixed(1)}{' '}
            - {outE.toFixed(1)}) = {qVapor.toFixed(2)} Па
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
            <br />x<sub>1</sub> = (22100 ∙ ({vVent} ∙ {ventMed} ∙ 1.005 ∙ {rEq.toFixed(3)})) / ({kVapor.toFixed(2)} ∙{' '}
            {rEq.toFixed(3)} + 1) = {x1.toFixed(1)} м
            <br />R = {coverThickness * 0.001} / {cover.v} = {rEq.toFixed(3)} м²∙ч∙Па/мг <br />
            Парциальное давление водяного пара на выходе из воздушной прослойки:
            <br />e<sub>пр</sub> = {eGap.toFixed(1)} Па
            <br />
            Полученное давление меньше давления насыщенного водяного пара при температуре наружного воздуха в наиболее
            холодный месяц E = {outE.toFixed(1)} Па, что будет препятствовать выпадению конденсата в воздушной прослойке
            с железобетонными конструкциями.
            <br />
            <br />
            <h5>8. Проверка воздухопроницаемости конструкции.</h5>
            Сопротивление влагообмену на наружной границе стены составляет:
            <br /> R<sub>н</sub>
            <sup>п</sup> = {windMembrane && `${windMembraneR} +`} 1 / (1 / {rEq.toFixed(3)} + (28753 / (1 +{' '}
            {tempGap4.toFixed(1)} / 273)) ∙ ({ventMed} / {ventHeight}) ∙ {vVent5}) = {rVaporOuter} м² ∙ ч ∙ Па/мг
            <br />
            Вспомогательные величины:
            <br />R<sub>x</sub> = 1/8.7+ {buildingType !== '3' ? concreteQ : brickQ} +{' '}
            {secondIns ? `${insQ} + ${secondInsQ}` : insQ}+0.015/0.93 = {rX.toFixed(3)} м²°С/Вт
            <br />t<sub>x</sub> = t<sub>в</sub> - ((t<sub>в</sub> - t<sub>м</sub>) / R
            {buildingType === '1' ? (
              buildingType === '2' ? (
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
            {buildingType === '1' ? rCond1.toFixed(3) : rCond2.toFixed(3)}) ∙ {rX.toFixed(3)} = {tx.toFixed(1)} °С
            <br />E = 1.84 ∙ 10^11 ∙ exp(-5330/(273 + t<sub>x</sub>)) = 1.84 ∙ 10^11 ∙ exp(-5330/(273 + ({tx.toFixed(1)}
            ))) = {eOut.toFixed(1)} Па.
            <br />D = (e<sub>усл</sub> - e<sub>н</sub>) / (e<sub>в</sub> - e<sub>н</sub>)= ({eCond.toFixed(1)} -{' '}
            {eOut.toFixed(1)}) / ({eIn.toFixed(1)} - {eOut.toFixed(1)}) = {d.toFixed(2)}
            <br /> k = {kAir.toFixed(3)} <br />
            Параметр Г определяется интерполяцией по таблице 1 и составляет {g.toFixed(2)}
            <br />
            Требуемая воздухопроницаемость стены с облицовкой на относе составляет: G<sub>тр</sub> = Г / 6.14 ∙ R
            <sub>0</sub>
            <sup>п</sup> = {g.toFixed(2)} / 6.14 ∙ {rVaporWhole.toFixed(2)} = {gObl.toFixed(1)} Па
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
            {insThickness} / {insAir} +{' '}
            {secondIns
              ? `${secondInsThickness} /
            ${secondInsAir} + `
              : null}
            142/373 = {rU} м²∙ч∙Па/кг <br />
            Разность давлений на наружной и внутренней поверхностях ограждения: Δp = 0.55H(γ<sub>н</sub> - γ<sub>в</sub>
            ) + 0.03γ<sub>н</sub>ν<sup>2</sup> = 0.55 ∙ 48 ∙ ({yOuter.toFixed(1)} - {yInner.toFixed(1)}) + 0.03 ∙{' '}
            {yOuter.toFixed(1)} ∙ {cityProp.v}² = {deltaP.toFixed(1)} Па <br />
            Воздухопроницаемость данной конструкции составляет: G = Δp / R<sub>u</sub> = {deltaP.toFixed(1)}/
            {rU.toFixed(2)} = {gU.toFixed(2)} кг/(м²∙ч)
            <br />
            <br />
            Таким образом, все требования к стене с НФС для исследуемой конструкции выполняются, в доработках она не
            нуждается, нужно уточнить приведенное сопротивление теплопередаче для конечной конструкции. Так как в
            процессе расчетов толщина утеплителя и частота теплозащитных элементов не уточнялись, приведенное
            сопротивление теплопередаче стены с НФС остается без изменений. <br />
            Вывод: утепление рассматриваемого участка объекта {objName} по адресу: {objAddress} с приведенным
            сопротивлением теплопередаче {rCond0.toFixed(2)} м²˚С/Вт удовлетворяет условию теплотехнического расчета -
            приведенное сопротивление меньше требуемого, составляющего {rObl.toFixed(2)} м²˚С/Вт.
            <br /> <br />
          </div>
        </div>
      </>
    </>
  );
}
