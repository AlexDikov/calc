import React, { useContext, useRef } from 'react';
import { DefaultContext } from '../contexts/DefaultContext';
import { Button, Image } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import VaporCalc from './VaporCalc';
import RTable from './RTable';
import RTable2 from './RTable2';
import RTable3 from './RTable3';
import grib1 from '../images/1.jpg';
import grib2 from '../images/2.jpg';
import grib3 from '../images/3.jpg';
import grib4 from '../images/4.jpg';
import grib5 from '../images/5.jpg';
import grib6 from '../images/6.jpg';
import grib7 from '../images/7.jpg';
import grib8 from '../images/8.jpg';
import win01 from '../images/01.jpg';
import win02 from '../images/02.jpg';
import win03 from '../images/03.jpg';
import win11 from '../images/11.jpg';
import win12 from '../images/12.jpg';
import win13 from '../images/13.jpg';
import win21 from '../images/21.jpg';
import win22 from '../images/22.jpg';
import win23 from '../images/23.jpg';

export default function HeatCalc() {
  const {
    bracketResult,
    brickAir,
    brickArea,
    brickDensity,
    brickLambda,
    brickName,
    brickThickness,
    brickType,
    brickVapor,
    buildingAim,
    buildingType,
    cityProp,
    concreteAir,
    concreteArea,
    concreteLambda,
    concreteThickness,
    concreteVapor,
    concreteWall,
    coverName,
    coverThickness,
    grib,
    gribDepth,
    gribConcretePcs,
    gribPcs,
    height,
    handleRObl,
    handleRRed,
    humidity,
    innerTemp,
    insAir,
    insDensity,
    insLambda,
    insName,
    insThickness,
    insSp,
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
    vaporCalc,
    ventHeight,
    ventIn,
    ventMed,
    ventOut,
    windowBrickLength,
    windowConcreteLength,
    windowDepth,
    windowHeight,
    windowLoss,
    windowLossConcrete,
  } = useContext(DefaultContext);

  const brickThick = brickThickness * 0.001;
  const concreteThick = concreteThickness * 0.001;
  const insThick = insThickness * 0.001;
  const secondInsThick = secondInsThickness * 0.001;

  const brickS = brickArea && parseFloat(brickArea);
  const concreteS = concreteArea && parseFloat(concreteArea);

  const k = () => {
    if (buildingType === 1) return 1.55;
    if (brickType) return 1.3;
    if (buildingType !== 1 && !brickType) return 1.45;
  };

  const b = () => {
    if (buildingAim === 1) return 1.4;
    if (buildingAim === 2) return 1.2;
    if (buildingAim === 3) return 1;
  };
  const a = () => {
    if (buildingAim === 1) return 0.00035;
    if (buildingAim === 2) return 0.0003;
    if (buildingAim === 3) return 0.0002;
  };
  const gsop = buildingAim === 2 ? (innerTemp - cityProp.t10) * cityProp.z10 : (innerTemp - cityProp.t8) * cityProp.z8;

  const concreteQ = buildingType !== 3 && parseFloat((concreteThick / concreteLambda).toFixed(3));
  const brickQ = buildingType !== 1 && parseFloat((brickThick / brickLambda).toFixed(3));
  const insQ = parseFloat((insThick / insLambda).toFixed(3));
  const secondInsQ = secondIns && parseFloat((secondInsThick / secondInsLambda).toFixed(3));

  const rObl = (a() * gsop + b()) * mr;
  const preIns =
    (k() * rObl - concreteQ - brickQ - 1 / 8.7 - 1 / 12) *
    (secondIns
      ? (insThick / (insThick + secondInsThick)) * insLambda +
        (secondInsThick / (insThick + secondInsThick)) * secondInsLambda
      : insLambda);

  const linearLoss =
    !concreteWall &&
    parseFloat(
      buildingType !== 1 ? windowLoss * windowBrickLength : (windowLoss * windowConcreteLength) / (concreteS + brickS)
    );

  const linearLoss1 = concreteWall && parseFloat((windowLossConcrete * windowConcreteLength) / concreteS);

  const linearLoss2 =
    concreteWall &&
    parseFloat(
      (windowLoss * windowBrickLength) / (brickS + concreteS) +
        (windowLossConcrete * windowConcreteLength) / (brickS + concreteS)
    );

  console.log(bracketResult);

  const pointLoss = () => {
    let totalLoss = 0;

    for (const key in bracketResult) {
      const bracketData = bracketResult[key];
      totalLoss += (parseFloat(bracketData.value) * parseInt(bracketData.pcs)) / (concreteS + brickS);
    }
    return totalLoss;
  };

  const pointLoss1 = () => {
    let totalLoss = 0;

    for (const key in bracketResult) {
      const bracketData = bracketResult[key];
      totalLoss += bracketData.wall && (parseFloat(bracketData.value) * parseInt(bracketData.pcs)) / concreteS;
    }
    return totalLoss;
  };

  const pointLoss2 = () => {
    let totalLoss = 0;

    for (const key in bracketResult) {
      const bracketData = bracketResult[key];
      totalLoss += !bracketData.wall && (parseFloat(bracketData.value) * parseInt(bracketData.pcs)) / brickS;
    }
    return totalLoss;
  };

  const rCond1 = 1 / 8.7 + concreteQ + insQ + secondInsQ + 1 / 12;
  const rCond2 = 1 / 8.7 + brickQ + insQ + secondInsQ + 1 / 12;

  const u1 = 1 / rCond1;
  const u2 = 1 / rCond2;

  const rRed =
    1 /
    ((buildingType !== 3 && u1 * (concreteS / (brickS + concreteS))) +
      (buildingType !== 1 && u2 * (brickS / (brickS + concreteS))) +
      linearLoss +
      pointLoss() +
      gribPcs * gribDepth);

  const rRed1 = 1 / (u1 + linearLoss1 + pointLoss1() + gribConcretePcs * gribDepth);

  const rRed2 = 1 / (u2 + linearLoss2 + pointLoss2() + gribPcs * gribDepth);

  const r = rRed / rCond2;

  const r1 = rRed1 / rCond1;

  const r2 = rRed2 / rCond2;

  const bracketDensity = () => {
    let brackets = 0;
    for (const key in bracketResult) {
      const bracketData = bracketResult[key];
      brackets += parseInt(bracketData.pcs);
    }
    return brackets / (brickS + concreteS);
  };

  const brackets = () =>
    Object.entries(bracketResult).map(([key, item]) => (
      <React.Fragment key={key}>
        <br /> - {item.type ? 'алюминиевый' : 'стальной'} {item.weight ? 'межэтажный' : 'рядовой'} кронштейн{' '}
        {item.bracket} - {(item.pcs / (concreteS + brickS)).toFixed(1)} шт/м²
      </React.Fragment>
    ));
  const brackets2 = () =>
    Object.entries(bracketResult).map(([key, item]) => (
      <React.Fragment key={key}>
        <br /> χᵏᵖ<sup>{parseInt(key) + 1}</sup> = {item.value.toFixed(3)} Вт/°С для кронштейна {item.bracket}{' '}
        {buildingType === 2 && `крепление : ${item.wall ? 'бетон' : 'блок/кирпич'}`};
      </React.Fragment>
    ));
  const brackets3 = () =>
    Object.entries(bracketResult).map(([key, item]) => (
      <React.Fragment key={key}>
        <br /> - кронштейн {item.bracket} (точечный элемент {parseInt(key) + 2})
      </React.Fragment>
    ));

  const windowD = () => {
    if (windowDepth === '1') return 'как для рам, утопленных в стену на 100 мм';
    if (windowDepth === '2') return 'как для рам сразу за утеплителем';
    if (windowDepth === '3') return 'как для рам, вынесенных за стену на 100 мм';
  };

  const windowH = () => {
    if (windowHeight === '1') return 'без нахлеста утеплителя на раму';
    if (windowHeight === '2') return 'c нахлестом утеплителя на раму 20 мм';
    if (windowHeight === '3') return 'c нахлестом утеплителя на раму 60 мм';
  };

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => contentToPrint.current,
    removeAfterPrint: true,
  });

  concreteWall ? handleRRed(rRed1) : handleRRed(rRed);
  handleRObl(rObl);
  vaporCalc &&
    VaporCalc({
      brickQ: brickQ,
      concreteQ: concreteQ,
      insQ: insQ,
      rCond1: rCond1,
      rCond2: rCond2,
      rRed: rRed2,
      secondInsQ: secondInsQ,
    });
  const windowPic = () => {
    if (windowDepth == 1 && windowHeight == 1) return win01;
    if (windowDepth == 1 && windowHeight == 2) return win02;
    if (windowDepth == 1 && windowHeight == 3) return win03;
    if (windowDepth == 2 && windowHeight == 1) return win11;
    if (windowDepth == 2 && windowHeight == 2) return win12;
    if (windowDepth == 2 && windowHeight == 3) return win13;
    if (windowDepth == 3 && windowHeight == 1) return win21;
    if (windowDepth == 3 && windowHeight == 2) return win22;
    if (windowDepth == 3 && windowHeight == 3) return win23;
  };

  const gribPic = () => {
    if (gribDepth == 0.006) return grib1;
    if (gribDepth == 0.005) return grib2;
    if (gribDepth == 0.004) return grib3;
    if (gribDepth == 0.003) return grib4;
    if (gribDepth == 0.0025) return grib5;
    if (gribDepth == 0.002) return grib6;
    if (gribDepth == 0.0015) return grib7;
    if (gribDepth == 0.001) return grib8;
  };

  return (
    <>
      <div ref={contentToPrint} className="p-5 position-relative">
        <div className="d-none">
          <div className=" stamp-body"></div>
          <div className="stamp1"></div>
          <div className="stamp2"></div>
          <div className="stamp3"></div>
          <div className="stamp4"></div>
          <div className="stamp5"></div>
          <div className="stamp6"></div>
          <div className="stamp7"></div>
          <div className="stamp8"></div>
          <div className="stamp9"></div>
        </div>
        <h4>Пояснительная записка к расчету энергоэффективности ограждающей конструкции с системой НВФ</h4>
        <h4>
          Объект : {objName}, расположенный по адресу : {objAddress}
        </h4>
        <br />
        <h5>1. Данные для расчета.</h5>
        <div>
          <b>Климатические данные района строительства:</b> <br />
          Климатические данные принимаются по таблице 3.1 СП 131.13330.2020 и пункту 5.7 СП 50.13330.2012; <br />-
          средняя температура наиболее холодной пятидневки, с обеспеченностью 0,92: t = {cityProp.t} °С;
          <br />- средняя температура наиболее холодного месяца: t<sub>м</sub> = {cityProp.tm} °С; <br />- средняя
          температура отопительного периода: t<sub>{buildingAim === 2 ? '10' : '8'}</sub> ={' '}
          {buildingAim === 2 ? cityProp.t10 : cityProp.t8} °С;
          <br />- продолжительность отопительного периода: z<sub>{buildingAim === 2 ? '10' : '8'}</sub> ={' '}
          {buildingAim === 2 ? cityProp.z10 : cityProp.z8} сут;
          <br />- максимальная из скоростей ветра по румбам за январь: ν = {cityProp.v} м/c;
          <br />- расчетная относительная влажность внутреннего воздуха: φ = {humidity} %; <br />
          <br />
          <b>Микроклимат в здании:</b> <br /> - расчетная температура внутреннего воздуха: t<sub>в</sub>= {innerTemp}{' '}
          °С; <br /> - средняя месячная относительная влажность воздуха наиболее холодного месяца: φ<sub>м</sub> ={' '}
          {cityProp.w} %.
          <br />
          <br /> <b>Состав стены:</b>
          <br />
          {plaster &&
            `- ${
              plaster === 2 ? 'гипсовая' : 'цементная'
            } штукатурка средней толщиной 15мм с внутренней стороны стены.`}
          {buildingType !== 3 &&
            (buildingType === 2 ? (
              concreteWall ? (
                <div>- монолитный железобетон толщиной {concreteThickness} мм;</div>
              ) : (
                <div>
                  - монолитный железобетон, для расчета требуемого сопротивления перекрытия толщину принимаем{' '}
                  {brickThickness} мм;
                </div>
              )
            ) : (
              <div>- монолитный железобетон толщиной {concreteThickness} мм;</div>
            ))}
          {buildingType !== 1 && (
            <div>
              - {brickName} плотностью {brickDensity} кг/м³, толщиной {brickThickness} мм;
            </div>
          )}
          {secondIns ? (
            <div>
              - внутренний слой теплоизоляции плотностью {insDensity} кг/м³, толщиной {insThickness} мм; <br />- внешний
              слой теплоизоляции плотностью {secondInsDensity} кг/м³, толщиной {secondInsThickness} мм;
            </div>
          ) : (
            <div>
              - утеплитель {insName} {insSp && <>плотностью {insDensity} кг/м³, толщиной</>} {insThickness} мм;
            </div>
          )}
          <br />
          <b>Расчетные характеристики материалов:</b> <br />
          {buildingType !== 3 && (
            <div>
              {' '}
              Железобетон : <br />- коэффициент теплопроводности материала λ = {concreteLambda} Вт/(м°С);
              <br />- коэффициент паропроницаемости материала μ = {concreteVapor} мг/(м∙ч∙Па);
              <br /> - коэффициент воздухопроницаемости ί = {concreteAir} кг/(м∙ч∙Па);
            </div>
          )}
          {buildingType !== 1 && (
            <div>
              {' '}
              Кладка :
              <br /> - коэффициент теплопроводности материала λ = {brickLambda} Вт/(м°С);
              <br /> - коэффициент паропроницаемости материала μ = {brickVapor} мг/(м∙ч∙Па);
              <br /> - коэффициент воздухопроницаемости ί = {brickAir} кг/(м∙ч∙Па);
            </div>
          )}
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
          {plaster !== 1 && (
            <>
              Штукатурка :
              <br /> - коэффициент теплопроводности материала λ = {plaster === 3 ? '0.93' : '0.81'} Вт/(м°С);
              <br /> - коэффициент паропроницаемости материала μ = {plaster === 3 ? '0.09' : '0.12'} мг/(м∙ч∙Па);
              <br /> - коэффициент воздухопроницаемости ί = {plaster === 3 ? '0.00004' : '0.00004'} кг/(м∙ч∙Па);
              <br />
            </>
          )}
          <br /> <b>Характеристики элементов НФС:</b>
          <br />
          {vaporCalc && (
            <>
              Высота здания H = {height} м
              <br />
              Ширина вентилируемого зазора на входе δ<sub>вх</sub> = {ventIn * 1000} мм <br />
              Ширина вентилируемого зазора на выходе δ<sub>вых</sub> = {ventOut * 1000} мм
              <br />
              Средняя ширина воздушной прослойки δ<sub>ср</sub> = {ventMed * 1000} мм
              <br />
              Высота наибольшего непрерывной воздушной прослойки h = {ventHeight} м <br />
              <br />
            </>
          )}
          Средняя частота кронштейнов на фасаде {bracketDensity().toFixed(1)} шт/м² из них:
          {brackets()}
          <br />
          <br /> Средняя частота установки тарельчатых анкеров для крепления изоляции {concreteWall &&
            'на кладке'}: {gribPcs} шт/м²
          <br />{' '}
          {concreteWall && (
            <>
              Средняя частота установки тарельчатых анкеров для крепления изоляции на железобетоне: {gribConcretePcs}{' '}
              шт/м²
              <br />
            </>
          )}{' '}
          {vaporCalc && (
            <>
              <br />
              Облицовка - {coverName} толщиной {coverThickness} мм
            </>
          )}
          <br /> <h5>2. Требуемое сопротивление теплопередаче.</h5>
          Градусо-сутки отопительного периода для рассматриваемого случая составляют: ГСОП = (t<sub>в</sub> - t
          {buildingAim === 2 ? <sub>10</sub> : <sub>8</sub>}) ∙ z{buildingAim === 2 ? <sub>10</sub> : <sub>8</sub>}= (
          {innerTemp} -(
          {buildingAim === 2 ? cityProp.t10 : cityProp.t8})) ∙ {buildingAim === 2 ? cityProp.z10 : cityProp.z8}={' '}
          {gsop.toFixed(0)}
          °С∙сут. <br />t<sub>в</sub> - температура внутреннего воздуха
          <br />t{buildingAim === 2 ? <sub>10</sub> : <sub>8</sub>} - средняя температура отопительного периода по табл.
          3.1 СП 131.13330.2020
          <br />z{buildingAim === 2 ? <sub>10</sub> : <sub>8</sub>} - продолжительность отопительного периода по табл.
          3.1 СП 131.13330.2020
          <br />
          Минимально требуемое приведенное сопротивление теплопередаче стен по СП 50.13330.2012 составляет: <br />R
          <sub>тр</sub> = (a ∙ ГСОП + b) ∙ m<sub>r</sub> = ({a()} ∙ {gsop.toFixed(0)} + {b()}) ∙ {mr} ={' '}
          {rObl.toFixed(2)} м²°С/Вт.
          <br />a - коэффициент по табл. 3 СП 50.13330.2012
          <br />b - коэффициент по табл. 3 СП 50.13330.2012
          <br /> <br />
          <h5>3. Минимально необходимая толщина утеплителя.</h5>
          Приближенная толщина утеплителя : δ = (k ∙ R<sub>тр</sub> - δ<sub>к</sub>/λ<sub>к</sub> - 1/α<sub>в</sub> -
          1/α<sub>н</sub>) ∙ λ<sub>у</sub> = ({k()} ∙ {rObl.toFixed(2)}
          {concreteQ && ` - ${concreteQ}`}
          {brickQ && ` - ${brickQ}`} - 1 / 8.7 - 1 / 12) ∙ (
          {secondIns
            ? (insThick / (insThick + secondInsThick)) * insLambda +
              (secondInsThick / (insThick + secondInsThick)) * secondInsLambda
            : insLambda}
          ) = {preIns.toFixed(2) * 1000} мм,
          <br />α<sub>в</sub> = 8,7 по табл. 4 СП 50.13330.2012
          <br />α<sub>н</sub> = 12 по табл. 6 СП 50.13330.2012
          <br />k = {k()} для данного типа материала ограждающей конструкции
          <br /> δ<sub>к</sub> - толщина конструкционного слоя
          <br /> λ<sub>к</sub> - коэффициент теплопроводности материала конструкционного слоя
          <br /> λ<sub>у</sub> - коэффициент теплопроводности утеплителя
          <br />
          <br />
          Удельные потери теплоты через кронштейны в соответствии с заключением НИИСФ РААСН по договору № 12250(2020) от
          «09» декабря 2020 г. находятся по таблицам Г.71, Г.73, Г.74, Г.75 СП 230.1325800.2015 интерполяцией:
          {brackets2()}
          <br />У применяемого на данном объекте тарельчатого анкера расстояние от края стального распорного элемента до
          тарелки дюбеля составляет {grib} мм.
          <Image src={gribPic()} alt="a" className="systdata-grib-img d-flex" />
          <br /> В соответствии с таблицей Г4 СП 230.1325800.2015 удельные потери теплоты тарельчатого анкера χ ={' '}
          {gribDepth} Вт/°С.
          <h5>
            <br />
            4. Расчет приведенного сопротивления теплопередаче фрагмента стены с НФС по приложению Е СП 50.13330.2012.
          </h5>
          Для учета всех теплотехнических неоднородностей фрагмента стены с НФС необходимо оценить фрагмент
          теплозащитной оболочки здания с НФС в целом. Перечисление элементов составляющих ограждающую конструкцию:
          <br />
          {buildingType === 2 ? (
            <>
              - заполнение стены со слоем теплоизоляции (плоский элемент 1)
              <br /> - железобетонное перекрытие со слоем теплоизоляции (плоский элемент 2)
            </>
          ) : (
            <>- стена со слоем теплоизоляции (плоский элемент 1)</>
          )}
          <br />
          {buildingType !== 2 ? (
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
          {concreteS + brickS} м²;
          <br />
          {buildingType === 2 ? (
            <>
              {concreteWall ? (
                <>
                  Площадь стены с основанием из железобетона составляет: {concreteS} м² Площадь стены с основанием из
                  кладки составляет {brickS} м². Общая длина проекции оконного откоса, образованного железобетоном,
                  определяется по экспликации оконных проемов и равна: {windowConcreteLength} м.
                  <br />
                  Длина проекции откосов, приходящаяся на 1 м² площади фрагмента равна l = {windowConcreteLength} /
                  {concreteS} = {(windowConcreteLength / concreteS).toFixed(2)} м/м².
                  <br /> Общая длина проекции оконного откоса, образованного кладкой, определяется по экспликации
                  оконных проемов и равна: {windowBrickLength} м.
                  <br />
                  Длина проекции откосов, приходящаяся на 1 м² площади фрагмента равна l = {windowBrickLength} /{brickS}{' '}
                  = {(windowBrickLength / brickS).toFixed(2)} м/м².
                </>
              ) : (
                <>
                  Суммарная площадь торцов перекрытий из монолитного железобетона (т.е. площадь проекции на поверхность
                  фрагмента) составляет {concreteS} м². <br /> Доля этой площади от общей площади фрагмента ограждающей
                  конструкции равна а ={concreteS}/{concreteS + brickS} ={' '}
                  {(concreteS / (concreteS + brickS)).toFixed(2)}.<br />
                  Площадь стены с основанием из кладки составляет {brickS} м².
                  <br /> Доля этой площади от общей площади фрагмента ограждающей конструкции равна а ={brickS}/
                  {concreteS + brickS} = {(brickS / (concreteS + brickS)).toFixed(2)}.
                  <br />
                  Общая длина проекции оконного откоса, образованного кладкой, определяется по экспликации оконных
                  проемов и равна: {windowBrickLength} м.
                  <br />
                  Длина проекции откосов, приходящаяся на 1 м² площади фрагмента равна l = {windowBrickLength} /
                  {concreteS + brickS} = {(windowBrickLength / (concreteS + brickS)).toFixed(2)} м/м².
                </>
              )}
            </>
          ) : (
            <>
              Площадь стены составляет: {buildingType === 1 ? concreteS : brickS} м²
              <br /> Доля этой площади от общей площади фрагмента ограждающей конструкции равна: а ={' '}
              {buildingType === 1 ? concreteS : brickS}/{concreteS + brickS} ={' '}
              {((buildingType === 1 ? concreteS : brickS) / (concreteS + brickS)).toFixed(2)}
              <br />
              Общая длина проекции оконного откоса, образованного стеной, определяется по экспликации оконных проемов и
              равна: {buildingType === 1 ? windowConcreteLength : windowBrickLength} м.
              <br />
              Длина проекции откосов, приходящаяся на 1 м² площади фрагмента равна l ={' '}
              {buildingType === 1 ? windowConcreteLength : windowBrickLength} /{concreteS + brickS} ={' '}
              {((buildingType === 1 ? windowConcreteLength : windowBrickLength) / (concreteS + brickS)).toFixed(2)}{' '}
              м/м².
            </>
          )}
          <br />
          <br /> <b>Расчет удельных потерь теплоты, обусловленных элементами.</b>
          <br /> Для плоского элемента {buildingType === 2 && 1} удельные потери теплоты определяются по формулам Е.6,
          Е.З СП 50.13330.2012:
          <br />R<sub>{buildingType === 2 && 1}</sub>
          <sup>усл</sup> = 1/α<sub>в</sub> + ∑R
          <sub>s</sub> + 1/α<sub>пр0</sub> = 1/8.7 + {buildingType !== 3 ? concreteQ : brickQ} +{' '}
          {secondIns ? `${insQ} + ${secondInsQ}` : insQ}+ 1/12 ={' '}
          {buildingType !== 3 ? rCond1.toFixed(3) : rCond2.toFixed(2)} м²°С/Вт
          <br />U<sub>{buildingType === 2 && 1}</sub> = 1/R<sub>{buildingType === 2 && 1}</sub>
          <sup>усл</sup> = 1/ {buildingType !== 3 ? rCond1.toFixed(2) : rCond2.toFixed(2)} ={' '}
          {buildingType !== 3 ? u1.toFixed(3) : u2.toFixed(3)} Вт/(м²°С)
          <br />
          {buildingType === 2 && (
            <>
              Для плоского элемента 2 удельные потери теплоты определяются аналогично: <br />R<sub>2</sub>
              <sup>усл</sup> = 1/8.7 + {brickQ} + {secondIns ? `${insQ}+${secondInsQ}` : `${insQ}`} + 1/12 ={' '}
              {rCond2.toFixed(2)} м²°C/Вт
              <br />U<sub>2</sub> = 1/ {rCond2.toFixed(2)} = {u2.toFixed(2)} Вт/(м²°С)
            </>
          )}
          <br />
          Для учета примыканий оконных блоков принимаем характеристики этих узлов по таблице Г.33 приложения Г СП
          230.1325800.2015 {windowD()} и {windowH()}.
          <br />
          <Image src={windowPic()} alt="a" className="systdata-window-img " />
          <br />
          Приведенное сопротивление теплопередаче фрагмента стены с НФС представлено в{' '}
          {concreteWall ? '2 таблицах' : 'таблице'} аналогично приложению Е СП 50.13330.2012, что позволяет оценить
          какое влияние оказывает каждый элемент конструкции.
        </div>
        {!concreteWall && (
          <>
            <RTable brickS={brickS} concreteS={concreteS} u1={u1} u2={u2} /> Приведенное сопротивление теплопередаче
            участка с НФС: R<sub>пр</sub> = {rRed.toFixed(2)} м²˚С/Вт
            <br />
            Коэффициент теплотехнической однородности стены с НФС: r = R<sub>пр</sub>/R<sub>усл</sub> ={' '}
            {rRed.toFixed(2)}/{buildingType === 1 ? rCond1.toFixed(2) : rCond2.toFixed(2)} = {r.toFixed(2)}
            <br />
          </>
        )}
        {concreteWall && (
          <>
            <RTable2 concreteS={concreteS} u1={u1} />
            Приведенное сопротивление теплопередаче участка с НФС: R<sub>пр</sub> = {rRed1.toFixed(2)} м²˚С/Вт
            <br />
            Коэффициент теплотехнической однородности стены с НФС: r = R<sub>пр</sub>/R<sub>усл</sub> ={' '}
            {rRed1.toFixed(2)}/{rCond1.toFixed(2)} = {r1.toFixed(2)}
            <br />
            <RTable3 brickS={brickS} u2={u2} />
            Приведенное сопротивление теплопередаче участка с НФС: R<sub>пр</sub> = {rRed2.toFixed(2)}
            <br />
            Коэффициент теплотехнической однородности стены с НФС: r = R<sub>пр</sub>/R<sub>усл</sub> ={' '}
            {rRed2.toFixed(2)}/{rCond2.toFixed(2)} = {r2.toFixed(2)}
          </>
        )}
        <br />
        <br />
        {vaporCalc && (
          <VaporCalc
            brickQ={brickQ}
            concreteQ={concreteQ}
            insQ={insQ}
            rCond1={rCond1}
            rCond2={rCond2}
            secondInsQ={secondInsQ}
          />
        )}
        <b>Вывод:</b>{' '}
        {rRed > rObl
          ? `утепление рассматриваемого участка объекта ${objName} по адресу: ${objAddress} с приведенным
        сопротивлением теплопередаче ${concreteWall ? rRed1.toFixed(2) : rRed.toFixed(2)} м²˚С/Вт удовлетворяет условию
        теплотехнического расчета - приведенное сопротивление больше требуемого, составляющего ${rObl.toFixed(2)} 
        м²˚С/Вт.)`
          : `утепление рассматриваемого участка объекта ${objName} по адресу: ${objAddress} с приведенным
        сопротивлением теплопередаче ${
          concreteWall ? rRed1.toFixed(2) : rRed.toFixed(2)
        } м²˚С/Вт не удовлетворяет условию
        теплотехнического расчета - приведенное сопротивление меньше требуемого, составляющего ${rObl.toFixed(2)} 
        м²˚С/Вт.`}
        <br />
      </div>
      <Button
        className="mt-3 mb-5"
        variant="outline-secondary"
        size="sm"
        onClick={() => {
          handlePrint();
        }}
      >
        Печать
      </Button>
    </>
  );
}
