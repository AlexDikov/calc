import { useEffect, useMemo, useState } from 'react';
import DkCalc from './DkCalc';

export default function Calculator({
  isBracketPcs,
  isBracketResult,
  isBrickArea,
  isBrickThickness,
  isBrickDensity,
  isBrickHeat,
  isBrickVapor,
  isBrickAir,
  isBuildingAim,
  isBuildingType,
  isHumidity,
  isInnerTemp,
  isConcreteAir,
  isConcreteArea,
  isConcreteDensity,
  isConcreteHeat,
  isConcreteThickness,
  isConcreteSpHeat,
  isConcreteVapor,
  isConcreteWall,
  isCoverData,
  isCoverHeat,
  isCoverThickness,
  isCityProp,
  isGribDepth,
  isGribPcs,
  isHeight,
  isInsThickness,
  isInsDensity,
  isInsHeat,
  isInsVapor,
  isInsAir,
  isMr,
  isSecondLayer,
  isSecondIns,
  isSecondInsAir,
  isSecondInsThickness,
  isSecondInsDensity,
  isSecondInsHeat,
  isSecondInsVapor,
  isVaporMembraneR,
  isVentIn,
  isVentMed,
  isVentOut,
  isVentHeight,
  isWindMembraneR,
  isWindowLength,
  isWindowHeatLoss,
  isWindowDepth,
  isWindowHeight,
  onEgap,
  onGobl,
  onGu,
}) {
  const [dk, setDk] = useState(0.1);
  //const [kState, setK] = useState(0.1);
  //const [dState, setD] = useState(0.1);

  function handleDk() {
    setDk();
  }
  // function handleD() {
  //   setD();
  // }
  // function handleK() {
  //   setK();
  // }

  const k = 1.3;

  const b = () => {
    if (isBuildingAim === 1) return 1.4;
    if (isBuildingAim === 2) return 1.2;
    if (isBuildingAim === 3) return 1;
  };
  const a = () => {
    if (isBuildingAim === 1) return 0.00035;
    if (isBuildingAim === 2) return 0.0003;
    if (isBuildingAim === 3) return 0.0002;
  };
  const gsop =
    (isInnerTemp - (isBuildingAim === 2 ? isCityProp.t8 : isCityProp.t10)) *
    (isBuildingAim === 2 ? isCityProp.z8 : isCityProp.z10);

  const concreteQ = parseFloat((isConcreteThickness / isConcreteSpHeat).toFixed(3));
  const brickQ = parseFloat((isBrickThickness / isBrickHeat).toFixed(3));
  const insQ = parseFloat((isInsThickness / isInsHeat).toFixed(3));
  const secondInsQ = parseFloat((isSecondInsThickness / isSecondInsHeat).toFixed(3));

  const rObl = (a() * gsop + b()) * isMr;
  const preIns =
    (k * rObl - concreteQ - brickQ - 1 / 8.7 - 1 / 12) *
    (isSecondIns ? isInsThickness + isSecondInsThickness / (insQ + secondInsQ) : isInsHeat);

  const linearLoss = isWindowHeatLoss * isWindowLength;

  const pointLoss = 1;

  const rCond1 = isBuildingAim === 3 ? null : parseFloat(1 / 8.7 + concreteQ + insQ + secondInsQ + 1 / 12).toFixed(3);
  const rCond2 = isBuildingAim === 1 ? null : parseFloat(1 / 8.7 + brickQ + insQ + secondInsQ + 1 / 12).toFixed(3);

  const u1 = isBuildingAim === 3 ? null : parseFloat(1 / rCond1).toFixed(3);
  const u2 = isBuildingAim === 1 ? null : parseFloat(1 / rCond2).toFixed(3);

  const rRed = (1 / parseFloat(u1 + u2 + linearLoss + pointLoss)).toFixed(3);
  const rCond0 = 1 / 8.7 + isBuildingAim === 1 ? rCond1 : parseFloat(rCond1 + rCond2 + 1 / 12);
  const r = parseFloat((rRed / rCond0).toFixed(3));

  const tempGapInit = isCityProp.t + 1;
  const epsilon = parseFloat(
    (
      1.2 * ((isVentMed / isVentIn) ^ 2) +
      (0.04 * isVentHeight) / (2 * isVentMed) +
      1.2 * ((isVentMed / isVentOut) ^ 2)
    ).toFixed(3)
  );
  const vVent0 = 0.1;
  const m0 = (0.04 * ((273 + tempGapInit) / 100)) ^ 3;
  const alphaC0 = (7.34 * vVent0) ^ (0.656 + 3.78 * Math.E) ^ (-1.91 * vVent0);
  const alphaR0 = m0 / (1 / 5.77 + 1 / 4.4 + 1 / 5.3);
  const alphaGap0 = alphaC0 + 2 * alphaR0;
  const rOuter0 = 1 / alphaGap0 + 1 / 12 + isCoverData.r;
  const x00 = (1005 * vVent0 * isVentMed * (373 / 273 + tempGapInit)) / (1 / rRed + 1 / rOuter0);
  const temp00 = (isInnerTemp / rRed + isCityProp.tm / rOuter0) / (1 / rRed + 1 / rOuter0);
  const tempGap0 = temp00 - (((temp00 - isCityProp.tm) * x00) / isVentHeight) * (1 - Math.exp(-isVentHeight / x00));

  function vVent(tempGap) {
    return Math.sqrt((0.08 * isVentHeight * (tempGap - isCityProp.t)) / epsilon);
  }

  const vVent1 = vVent(tempGap0);

  function m(tempGap) {
    return (0.04 * ((273 + tempGap) / 100)) ^ 3;
  }
  const m1 = m(vVent1);

  function alphaC(vVent) {
    return (7.34 * vVent) ^ (0.656 + 3.78 * Math.E) ^ (-1.91 * vVent);
  }
  const alphaC1 = alphaC(vVent1);

  function alphaR(m) {
    return m / (1 / 5.77 + 1 / 4, 4 + 1 / isCoverData.c);
  }
  const alphaR1 = alphaR(m1);

  function alphaGap(alphaR, alphaC) {
    return alphaC + 2 * alphaR;
  }
  const alphaGap1 = alphaGap(alphaR1, alphaC1);

  function rOuter(alphaGap) {
    return 1 / alphaGap + 1 / 12 + isCoverThickness / isCoverData.l;
  }
  const rOuter1 = rOuter(alphaGap1);

  function temp0(rOuter) {
    return (isInnerTemp / rRed + isCityProp.t / rOuter) / (1 / rRed + rOuter);
  }
  const temp01 = temp0(rOuter1);

  function x0(vVent, tempGap, rOuter) {
    return (1005 * vVent * isVentMed * (373 / 273 + tempGap)) / (1 / rRed + 1 / rOuter);
  }
  const x01 = x0(vVent1, tempGap0, rOuter1);

  function tempGap(temp0, x0) {
    return temp0 - (((temp0 - isCityProp.t) * x0) / isHeight) * (1 - Math.exp(-isHeight / x0));
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

  const vVent5 = vVent(tempGap4);

  const rVaporWhole =
    isConcreteThickness / isConcreteVapor +
    isBrickThickness / isBrickVapor +
    isInsThickness / isInsVapor +
    isSecondInsThickness / isSecondInsVapor;
  const rVaporIns = isInsThickness / isInsVapor + isVaporMembraneR + isWindMembraneR + 0.02;
  const outE = 1.84 * (10 ^ 11) * Math.exp(-5330 / (273 + isCityProp.tm));
  const inE = 1.84 * (10 ^ 11) * Math.exp(-5330 / (273 + isInnerTemp));
  const eIn = (isHumidity / 100) * inE;
  const qVapor = ((1 / 2) * rVaporWhole + (1 / 4) * rVaporIns) * (eIn - outE);

  const eOut = (isCityProp.w / 100) * outE;
  const kVapor = qVapor / (eIn - outE);
  const rEq = isCoverData.r;
  const e1 = (eOut + rEq * kVapor * eIn) / (kVapor * rEq + 1);
  const x1 = (22100 * (vVent5 * isVentMed * 1.005 * rEq)) / (kVapor * rEq + 1);
  const eGap = e1 - (e1 - eOut) * Math.exp(-isHeight / x1);
  onEgap(eGap);

  const rX = 1 / 8.7 + concreteQ + brickQ + insQ + secondInsQ;
  const tx = isInnerTemp - ((isInnerTemp - isCityProp.tm) / (isBuildingAim == '1' ? rCond1 : rCond2)) * rX;
  const eCond = 1.84 * (10 ^ 11) * Math.exp(-5330 / (273 + tx));
  const rVaporOuter =
    isWindMembraneR + 1 / (1 / rEq + (28753 / (1 + tempGap4 / 273)) * (isVentMed / isVentHeight) * vVent5);
  const kAir = 0.1; //rVaporOuter / rVaporWhole;
  const d = 0.1; //(eCond - eOut) / (eIn - eOut);

  const g = dk;
  const gObl = g / (6.14 * rVaporWhole);

  const rU = isConcreteAir + isBrickAir + isInsAir + isSecondInsAir + isWindMembraneR;
  const yOuter = 3463 / (273 + isCityProp.tm);
  const yInner = 3463 / (273 + isInnerTemp);
  const deltaP = (0.55 * isHeight * (yOuter - yInner) + 0.03 * yOuter * isCityProp.v) ^ 2;
  const gU = deltaP / rU;
  onGu(gU);

  // const dkValues = useMemo(() => {
  //   return {
  //     d: d,
  //     k: kAir,
  //   };
  // }, [d, kAir]);
  const brackets = () =>
    Object.entries(isBracketResult)
      .map(
        ([key, item]) =>
          `<br /> - ${item.type ? 'алюминиевый' : 'стальной'} ${item.weight ? 'межэтажный' : 'рядовой'} кронштейн ${
            item.bracket
          } - ${item.pcs / isConcreteArea} шт/м²`
      )
      .join(' ');

  const brackets2 = () =>
    Object.entries(isBracketResult)
      .map(
        ([key, item]) =>
          `<br /> χᵏᵖ<sup>${parseInt(key) + 1}</sup> = ${item.value.toFixed(4)} Вт/°С для кронштейна ${
            item.bracket
          } (крепление : ${item.wall ? 'бетон' : 'блок/кирпич'} );`
      )
      .join(' ');

  const brackets3 = () =>
    Object.entries(isBracketResult)
      .map(([key, item]) => `<br /> - кронштейн ${item.bracket} (точечный элемент ${parseInt(key) + 1})`)
      .join(' ');

  const brackets4 = () =>
    Object.entries(isBracketResult).map(([key, item]) => (
      <tr>
        <th scope="row">{isBuildingType === '2' ? parseInt(key) + 6 : parseInt(key) + 4}</th>
        <td>
          кронштейн <br />
          {item.bracket}
        </td>
        <td>Точечный {parseInt(key) + 1}</td>
        <td>{item.value.toFixed(4)}</td>
        <td>{item.value.toFixed(4)}</td>
        <td>{item.value.toFixed(4)}</td>
        <td>@mdo</td>
      </tr>
    ));

  const windowDepth = () => {
    if (isWindowDepth === '1') return 'как для рам, утопленных в стену на 100 мм';
    if (isWindowDepth === '2') return 'как для рам сразу за утеплителем';
    if (isWindowDepth === '3') return 'как для рам, вынесенных за стену на 100мм';
  };

  const windowHeight = () => {
    if (isWindowHeight === '1') return 'без нахлеста утеплителя на раму';
    if (isWindowHeight === '2') return 'как сразу за утеплителем';
    if (isWindowHeight === '3') return 'как вынесенным за стену на 100мм';
  };

  return (
    <>
      <DkCalc isD={d} isK={kAir} onDk={handleDk} />
      <h2>Пояснительная записка к расчету энергоэффективности ограждающей конструкции с системой НВФ</h2>
      <h2>Объект : ЖК "Дом", расположенный по адресу : г. Москва, ул. Уютная, стр. 12</h2>
      <br />
      <h5>1. Данные для расчета.</h5>
      <div>
        Климатические данные района строительства: Климатические данные принимаются по СП 131.13330.2020; <br />-
        средняя температура наиболее холодной пятидневки, с обеспеченностью 0,92 = {isCityProp.t} °С, по табл.3.1;
        <br />- средняя температура наиболее холодного месяца = {isCityProp.tm} °С, по табл.5.1; <br />- средняя
        температура отопительного периода = {isBuildingAim === '2' ? isCityProp.z8 : isCityProp.z10} °С, по табл.3.1;
        <br />- продолжительность отопительного периода = {isBuildingAim === '2' ? isCityProp.z8 : isCityProp.z10} сут,
        по табл.3.1;
        <br />- максимальная из скоростей ветра по румбам за январь ν = {isCityProp.v} м/c, по табл.3.1. <br />
        Микроклимат в здании: <br /> - расчетная температура внутреннего воздуха = {isInnerTemp} °С; <br />- расчетная
        относительная влажность внутреннего воздуха = {isHumidity} %, по п.5.7 СП 50.13330.2012; <br /> - средняя
        месячная относительная влажность воздуха наиболее холодного месяца = {isCityProp.w} %, по табл.3.1 СП
        131.13330.2020.
        <br />
        <br />
        <br /> <b>Состав стены:</b>
        <br />- ж/б конструкции, для расчета требуемого сопротивления перекрытия толщину принимаем{' '}
        {isBrickThickness * 1000} мм
        <br />- газо- и пенобетон на цементном вяжущем плотностью {isBrickDensity} кг/м³, толщиной{' '}
        {isBrickThickness * 1000} мм
        <br />- внутренний слой теплоизоляции плотностью {isInsDensity} кг/м³, толщиной {isInsThickness * 1000} мм
        <br />- внешний слой теплоизоляции плотностью {isSecondInsDensity} кг/м³, толщиной {isSecondInsThickness * 1000}{' '}
        мм
        <br />
        <br />
        Расчетные характеристики материалов: <br />
        Железобетонные конструкции : <br />- коэффициент теплопроводности материала λ = {isConcreteHeat} Вт/(м°С);
        <br />- коэффициент паропроницаемости материала μ = {isConcreteVapor} мг/(м∙ч∙Па);
        <br /> - коэффициент воздухопроницаемости ί = {isConcreteAir} кг/(м∙ч∙Па);
        <br /> Кладочное заполнение стен :
        <br /> - коэффициент теплопроводности материала λ = {isBrickHeat} Вт/(м°С);
        <br /> - коэффициент паропроницаемости материала μ = {isBrickVapor} мг/(м∙ч∙Па);
        <br /> - коэффициент воздухопроницаемости ί = {isBrickAir} кг/(м∙ч∙Па);
        <br /> Утеплитель :
        <br /> - коэффициент теплопроводности материала λ = {isInsHeat} Вт/(м°С);
        <br /> - коэффициент паропроницаемости материала μ = {isInsVapor} мг/(м∙ч∙Па);
        <br />- коэффициент воздухопроницаемости ί = 0,1 кг/(м∙ч∙Па);
        <br /> Штукатурка :
        <br /> - коэффициент теплопроводности материала λ = {isSecondInsHeat} Вт/(м°С);
        <br /> - коэффициент паропроницаемости материала μ = {isSecondInsVapor} мг/(м∙ч∙Па);
        <br /> - коэффициент воздухопроницаемости ί = {isSecondInsAir} кг/(м∙ч∙Па);
        <br />
        <br /> Характеристики элементов НФС:
        <br />
        Высота наибольшей непрерывной воздушной прослойки h = 30 м <br />
        Ширина вентилируемого зазора на входе δ<sub>вх</sub> = {isVentIn * 1000} мм <br />
        Ширина вентилируемого зазора на выходе δ = {isVentOut * 1000} мм
        <br />
        Средняя ширина вентилируемого зазора δ = {isVentMed * 1000} мм
        <br />
        <br />
        Средняя частота кронштейнов на фасаде 2,8 шт/м² из них:
        {<div dangerouslySetInnerHTML={{ __html: brackets() }} />}
        <br /> Средняя частота установки тарельчатых анкеров для крепления изоляции {isGribPcs} шт/м²
        <br />
        <br /> Облицовка - Клинкер толщиной {isCoverThickness} мм
        <br />
        <br /> <h5>2. Требуемое сопротивление теплопередаче.</h5>
        Градусо-сутки отопительного периода для рассматриваемого случая составляют: ГСОП = ({isInnerTemp} -(
        {isBuildingAim === 2 ? isCityProp.t8 : isCityProp.t10})) ∙{isBuildingAim === 2 ? isCityProp.z8 : isCityProp.z10}
        = {gsop}
        °С∙сут. <br />
        Минимально требуемое приведенное сопротивление теплопередаче стен по СП 50.13330.2012 составляет R = ({a()} ∙
        {gsop} +{b()}) ∙ {isMr} = {rObl.toFixed(2)} м²°С/Вт.
        <br /> <br />
        <h5>3. Минимально необходимая толщина утеплителя.</h5>
        Приближенная толщина утеплителя : δ = ({k} ∙ {rObl.toFixed(2)} - {concreteQ} - {brickQ} - 1 / 8.7 - 1 / 12) ∙ (
        {isSecondIns ? `(${isInsThickness} + ${isSecondInsThickness} ) / (${insQ} + ${secondInsQ})` : isInsHeat}) =
        {preIns.toFixed(2) * 1000} мм; <br />У применяемого на данном объекте тарельчатого анкера расстояние от края
        стального распорного элемента до тарелки дюбеля {isGribDepth} мм.
        <br /> В соответствии с таблицей Г4 СП 230.1325800.2015 χ = {isGribDepth} Вт/°С.
        <br /> Удельные потери теплоты через кронштейны в соответствии с заключением НИИСФ РААСН по договору №
        12250(2020) от «09» декабря 2020 г. находятся по таблицам Г.71, Г.73, Г.74, Г.75 СП 230.1325800.2015
        интерполяцией:
        {<div dangerouslySetInnerHTML={{ __html: brackets2() }} />}
        <h5>
          <br />
          4. Расчет приведенного сопротивления теплопередаче фрагмента стены с НФС по приложению Е СП 50.13330.2012.
        </h5>
        Для учета всех теплотехнических неоднородностей фрагмента стены с НФС необходимо оценить фрагмент теплозащитной
        оболочки здания с НФС в целом. Перечисление элементов составляющих ограждающую конструкцию:
        {isBuildingType == 2 ? (
          <>
            - заполнение стены со слоем теплоизоляции (плоский элемент 1)
            <br /> - железобетонное перекрытие со слоем теплоизоляции (плоский элемент 2)
          </>
        ) : null}
        <br />
        {isBuildingType == 1 ? '- железобетонная стена со слоем теплоизоляции (плоский элемент 1)' : null}
        {isBuildingType == 3 ? '- кирпичная стена со слоем теплоизоляции (плоский элемент 1)' : null}
        <br />
        {isBuildingType !== 2 ? (
          '- оконный откос (линейный элемент 1)'
        ) : (
          <>
            - оконный откос, образованный кладкой со слоем теплоизоляции (линейный элемент 1)
            <br /> - оконный откос, образованный железобетонной стеной со слоем теплоизоляции (линейный элемент 2)
          </>
        )}
        <br /> - дюбель со стальным сердечником, прикрепляющий слой теплоизоляции к основанию (точечный элемент 1).
        {<div dangerouslySetInnerHTML={{ __html: brackets3() }} />}
        <br /> Геометрические характеристики проекций элементов.
        <br /> Площадь поверхности фрагмента ограждающей конструкции для расчета R составляет: А =
        {isConcreteArea + isBrickArea} м²;
        <br /> Площадь стены с основанием из блоков составляет {isConcreteArea + isBrickArea} - {isConcreteArea} =
        {isBrickArea} м².
        <br /> Доля этой площади от общей площади фрагмента ограждающей конструкции равна а ={isBrickArea}/
        {isConcreteArea + isBrickArea} ={isConcreteArea / (isConcreteArea + isBrickArea)} м²;
        <br />
        Суммарная площадь торцов перекрытий из монолитного железобетона (т.е. площадь проекции на поверхность фрагмента)
        составляет {isConcreteArea} м².
        <br /> Доля этой площади от общей площади фрагмента ограждающей конструкции равна: а = {isConcreteArea}/
        {isConcreteArea + isBrickArea} = {isConcreteArea / (isConcreteArea + isBrickArea)} м²
        <br />
        Общая длина проекции оконного откоса, образованного кладкой из блоков, утепленной слоем минераловатной плиты,
        определяется по экспликации оконных проемов и равна: {isWindowLength} м. <br />
        Длина проекции откосов, приходящаяся на 1 м² площади фрагмента равна l = {isWindowLength} /
        {isConcreteArea + isBrickArea} = {isWindowLength / (isConcreteArea + isBrickArea)} м/м².
        <br />
        <br /> <b>Расчет удельных потерь теплоты, обусловленных элементами.</b>
        <br /> Для плоского элемента {isConcreteWall === true ? 1 : null} удельные потери теплоты определяются по
        формулам Е.6, Е.З СП 50.13330.2012:
        <br />R = 1/8,7 + {concreteQ} + {isSecondLayer ? `${insQ} + ${secondInsQ}` : `${insQ}`}+ 1/12 = {rCond1} м²°С/Вт
        <br />
        U1 = 1/ {rCond1} = {u1} Вт/(м²°С)
        <br />
        {isConcreteWall && (
          <>
            Для плоского элемента 2 удельные потери теплоты определяются аналогично: <br />R = 1/8.7 + {brickQ} +{' '}
            {isSecondLayer ? `${insQ}+${secondInsQ}` : `${insQ}`} + 1/12 = {rCond2} м²°C/Вт
            <br />
            U2 = 1/ {rCond1} = {u2} Вт/(м²°С)
          </>
        )}
        <br />
        Приведенное сопротивление теплопередаче фрагмента стены с НФС представлено в 2 таблицах аналогично приложению Е
        СП 50.13330.2012, что позволяет оценить какое влияние оказывает каждый элемент конструкции. Для учета примыканий
        оконных блоков принимаем характеристики этих узлов по таблице Г.33 приложения Г СП 230.1325800.2015{' '}
        {windowDepth()} и {windowHeight()}.
        <br />
      </div>

      <table className="table center-text">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Элемент конструкции</th>
            <th scope="col">Тип элемента конструкции</th>
            <th scope="col">Удельный геометрический показатель</th>
            <th scope="col">Удельные потери теплоты</th>
            <th scope="col">
              Удельный поток теплоты, обусловленный эл-том , <br />
              Вт/(м² °С)
            </th>
            <th scope="col">Доля общего потока теплоты через фрагмент,%</th>
          </tr>
        </thead>
        <tbody>
          {isBuildingType !== 3 ? (
            <tr>
              <th scope="row">1</th>
              <td>Стена</td>
              <td>Плоский</td>
              <td>{isConcreteArea / (isConcreteArea + isBrickArea)}</td>
              <td>{concreteQ}</td>
              <td>{concreteQ * isConcreteArea}</td>
              <td>@mdo</td>
            </tr>
          ) : null}
          {isBuildingType !== 1 ? (
            <tr>
              <th scope="row">1</th>
              <td>Стена</td>
              <td>Плоский</td>
              <td>{isBrickArea / (isConcreteArea + isBrickArea)}</td>
              <td>{brickQ}</td>
              <td>{brickQ * isBrickArea}</td>
              <td>@mdo</td>
            </tr>
          ) : null}
          {brackets4()}
        </tbody>
      </table>

      <br />
      <div>
        Осредненное по площади условное сопротивление теплопередаче стены с НФС R = 1/8,7 + {concreteQ} + {brickQ} +
        {insQ} + {secondInsQ} + 1/12 = {rRed} м²°С/Вт <br />
        Коэффициент теплотехнической однородности стены с НФС : r = {rRed}/{rCond0} = {r}
        <br />
        {isBuildingType === '2' ? 'Общее приведенное сопротивление теплопередаче участка с НФС:' : null}
        <br />
        <br />
        <h5>5. Воздухообмен в воздушной прослойке.</h5>
        Воздухообмен в воздушной прослойке находится для термического сопротивления стены от внутренней поверхности до
        воздушной прослойки равного требуемому сопротивлению теплопередаче фасада. <br />
        Сумма коэффициентов местных сопротивлений для исследуемой конструкции составляет: ξ = 1,2 ∙ (({isVentMed}/
        {isVentIn})²) + 0,04 ∙ ({isVentHeight}/(2 ∙ {isVentMed})) + (1,2 ∙ ({isVentMed}/{isVentOut})²) = {epsilon}
        <br />R = 1/23 + 1/12 + 0,010 = 0,140 м²˚С/Вт
        <br />
        После 4 иттераций скорость воздуха в прослойке составляет: V<sub>пр</sub> =
        <br />
        <br />
        <h5>6. Поток водяного пара из конструкции в воздушную прослойку.</h5>
        При расчете влажностного режима конструкции используется приближенный метод.
        <br />
        Парциальное давление водяного пара внутреннего воздуха e = ({isHumidity}/100) ∙ {inE} = {eIn} Па
        <br /> "Давление насыщенного водяного пара для наружного воздуха в наиболее холодный месяц E = 1,84 ∙ 10^11 ∙
        exp(-5330/(273 + ({isCityProp.tm}))) = {outE} Па"
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
        Среднее парциальное давление водяного пара наружного воздуха для января месяца: e = ({outE}/100) ∙ 344,00 =
        {eOut}
        Па
        <br />
        Вспомогательные величины: где R = 0,008/0,11 = 0,07 м² ∙ ч ∙ Па/мг
        <br />
        Парциальное давление водяного пара на выходе из воздушной прослойки:
        <br />
        Полученное давление водяного пара меньше давления насыщенного водяного пара при температуре наружного воздуха в
        наиболее холодный месяц E = 344,00 Па, что будет препятствовать выпадению конденсата в воздушной прослойке с
        железобетонными конструкциями.
        <br />
        <br />
        <h5>8. Проверка воздухопроницаемости конструкции.</h5>
        Сопротивление влагообмену на наружной границе стены составляет:
        <br />
        Вспомогательные величины: Rx = 1/8,7+ 0,2/0,26+0,2/2,04+0,1/0,04+142/0,93 = 4,680 м²°С/Вт <br />t ={isInnerTemp}
        - ({isInnerTemp} - ({isCityProp.tm})/4,770) ∙ 4,680 = -7,3 °С <br />E = 1,84 ∙ 10^11 ∙ exp(-5330/(273 - (
        {isCityProp.tm}))) = {eOut} Па. <br />D = (356,00 - 289,00)/(817,0 - 289,00) = 0,13
        <br />
        Параметр Г определяется интерполяцией по таблице 1 и составляет {dk}
        <br />
        Требуемая воздухопроницаемость стены с облицовкой на относе составляет:
        <br />
        Сопротивление воздухопроницаемости исследуемой стены составляет: R = {isConcreteThickness}/{isConcreteAir} +
        {isBrickThickness}/{isBrickAir} + 0,00 + 142/373 = {rU} м² ∙ ч ∙ Па/кг <br />
        Разность давлений на наружной и внутренней поверхностях ограждения: Δp = 0,55 ∙ 48 ∙ (13,1 - 11,9) + 0,03 ∙ 13,1
        ∙ 2² = {deltaP} Па <br />
        Воздухопроницаемость данной конструкции составляет: G = 24,00/386,00 = 0,062 кг/(м² ∙ ч)
        <br />
        Таким образом, все требования к стене с НФС для исследуемой конструкции выполняются, в доработках она не
        нуждается, нужно уточнить приведенное сопротивление теплопередаче для конечной конструкции. Так как в процессе
        расчетов толщина утеплителя и частота теплозащитных элементов не уточнялись, приведенное сопротивление
        теплопередаче стены с НФС остается без изменений. Вывод: утепление рассматриваемого участка объекта ЖК "Дом" по
        адресу:г. Москва, ул. Уютная, стр. 12 с приведенным сопротивлением теплопередаче 1,79 м²˚С/Вт удовлетворяет
        условию теплотехнического расчета - приведенное сопротивление меньше требуемого, составляющего 3,85 м²˚С/Вт.
      </div>
    </>
  );
}