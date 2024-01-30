import { useEffect, useMemo, useState } from 'react';
import DkCalc from './DkCalc';

export default function Calculator(props) {
  const [dk, setDk] = useState(0.1);
  const [kState, setK] = useState(0.1);
  const [dState, setD] = useState(0.1);

  function handleDk() {
    setDk();
  }
  function handleD() {
    setD();
  }
  function handleK() {
    setK();
  }

  const k = 1.3;

  const b = () => {
    if (props.isBuildingAim === 1) return 1.4;
    if (props.isBuildingAim === 2) return 1.2;
    if (props.isBuildingAim === 3) return 1;
  };
  const a = () => {
    if (props.isBuildingAim === 1) return 0.00035;
    if (props.isBuildingAim === 2) return 0.0003;
    if (props.isBuildingAim === 3) return 0.0002;
  };
  const gsop =
    (props.isInnerTemp - (props.isBuildingAim === 2 ? props.isCityProp.t8 : props.isCityProp.t10)) *
    (props.isBuildingAim === 2 ? props.isCityProp.z8 : props.isCityProp.z10);

  const rObl = (a() * gsop + b()) * props.isMr;
  const preIns =
    (k * rObl -
      props.isConcreteThickness / props.isConcreteSpHeat -
      props.isBrickThickness / props.isBrickHeat -
      1 / 8.7 -
      1 / 12) *
    (props.isSecondIns
      ? props.isInsThickness +
        props.isSecondInsThickness /
          (props.isInsThickness / props.isInsHeat + props.isSecondInsThickness / props.isSecondInsHeat)
      : props.isInsHeat);

  const linearLoss = props.isWindowHeatLoss * props.isWindowLength;

  const pointLoss = 1;

  const rCond1 =
    props.isBuildingAim === 3
      ? null
      : 1 / 8.7 +
        props.isConcreteThickness / props.isConcreteSpHeat +
        props.isInsThickness / props.isInsHeat +
        props.isSecondInsThickness / props.isSecondInsHeat +
        1 / 12;
  const rCond2 =
    props.isBuildingAim === 1
      ? null
      : 1 / 8.7 +
        props.isBrickThickness / props.isBrickHeat +
        props.isInsThickness / props.isInsHeat +
        props.isSecondInsThickness / props.isSecondInsHeat +
        1 / 12;

  const u1 = props.isBuildingAim === 3 ? null : 1 / rCond1;
  const u2 = props.isBuildingAim === 1 ? null : 1 / rCond2;

  const rRed = 1 / (u1 + u2 + linearLoss + pointLoss);
  const rCond0 = 1 / 8.7 + props.isBuildingAim === 1 ? rCond1 : rCond2 + 1 / 12;
  const r = rRed / rCond0;

  const tempGapInit = props.isCityProp.t + 1;
  const epsilon =
    1.2 * ((props.isVentMed / props.isVentIn) ^ 2) +
    (0.04 * props.isVentHeight) / (2 * props.isVentMed) +
    1.2 * ((props.isVentMed / props.isVentOut) ^ 2);
  const vVent0 = 0.1;
  const m0 = (0.04 * ((273 + tempGapInit) / 100)) ^ 3;
  const alphaC0 = (7.34 * vVent0) ^ (0.656 + 3.78 * Math.E) ^ (-1.91 * vVent0);
  const alphaR0 = m0 / (1 / 5.77 + 1 / 4.4 + 1 / 5.3);
  const alphaGap0 = alphaC0 + 2 * alphaR0;
  const rOuter0 = 1 / alphaGap0 + 1 / 12 + props.isCoverData.r;
  const x00 = (1005 * vVent0 * props.isVentMed * (373 / 273 + tempGapInit)) / (1 / rRed + 1 / rOuter0);
  const temp00 = (props.isInnerTemp / rRed + props.isCityProp.tm / rOuter0) / (1 / rRed + 1 / rOuter0);
  const tempGap0 =
    temp00 - (((temp00 - props.isCityProp.tm) * x00) / props.isVentHeight) * (1 - Math.exp(-props.isVentHeight / x00));

  function vVent(tempGap) {
    return Math.sqrt((0.08 * props.isVentHeight * (tempGap - props.isCityProp.t)) / epsilon);
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
    return m / (1 / 5.77 + 1 / 4, 4 + 1 / props.isCoverData.c);
  }
  const alphaR1 = alphaR(m1);

  function alphaGap(alphaR, alphaC) {
    return alphaC + 2 * alphaR;
  }
  const alphaGap1 = alphaGap(alphaR1, alphaC1);

  function rOuter(alphaGap) {
    return 1 / alphaGap + 1 / 12 + props.isCoverThickness / props.isCoverData.l;
  }
  const rOuter1 = rOuter(alphaGap1);

  function temp0(rOuter) {
    return (props.isInnerTemp / rRed + props.isCityProp.t / rOuter) / (1 / rRed + rOuter);
  }
  const temp01 = temp0(rOuter1);

  function x0(vVent, tempGap, rOuter) {
    return (1005 * vVent * props.isVentMed * (373 / 273 + tempGap)) / (1 / rRed + 1 / rOuter);
  }
  const x01 = x0(vVent1, tempGap0, rOuter1);

  function tempGap(temp0, x0) {
    return temp0 - (((temp0 - props.isCityProp.t) * x0) / props.isHeight) * (1 - Math.exp(-props.isHeight / x0));
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
    props.isConcreteThickness / props.isConcreteVapor +
    props.isBrickThickness / props.isBrickVapor +
    props.isInsThickness / props.isInsVapor +
    props.isSecondInsThickness / props.isSecondInsVapor;
  const rVaporIns = props.isInsThickness / props.isInsVapor + props.isVaporMembraneR + props.isWindMembraneR + 0.02;
  const outE = (1.84 * 10) ^ (11 * Math.exp(-5330 / (273 + props.isCityProp.tm)));
  const inE = (1.84 * 10) ^ (11 * Math.exp(-5330 / (273 + props.isInnerTemp)));
  const eIn = (props.isHumidity / 100) * inE;
  const qVapor = ((1 / 2) * rVaporWhole + (1 / 4) * rVaporIns) * (eIn - outE);

  const eOut = (props.isCityProp.w / 100) * outE;
  const kVapor = qVapor / (eIn - outE);
  const rEq = props.isCoverData.r;
  const e1 = (eOut + rEq * kVapor * eIn) / (kVapor * rEq + 1);
  const x1 = (22100 * (vVent5 * props.isVentMed * 1.005 * rEq)) / (kVapor * rEq + 1);
  const eGap = e1 - (e1 - eOut) * Math.exp(-props.isHeight / x1);
  props.onEgap(eGap);

  const rX =
    1 / 8.7 +
    props.isConcreteThickness / props.isConcreteSpHeat +
    props.isBrickThickness / props.isBrickHeat +
    props.isInsThickness / props.isInsHeat +
    props.isSecondInsThickness / props.isSecondInsHeat;
  const tx =
    props.isInnerTemp - (props.isInnerTemp - props.isCityProp.t / props.isBuildingAim === 1 ? rCond1 : rCond2) * rX;
  const eCond = (1.84 * 10) ^ (11 * Math.exp(-5330 / (273 + tx)));
  const rVaporOuter =
    props.isWindMembraneR +
    1 / (1 / rEq + (28753 / (1 + tempGap4 / 273)) * (props.isVentMed / props.isVentHeight) * vVent5);
  const kAir = 0.1; //rVaporOuter / rVaporWhole;
  const d = 0.1; //(eCond - eOut) / (eIn - eOut);

  const g = dk;
  const gObl = g / (6.14 * rVaporWhole);

  const rU = props.isConcreteAir + props.isBrickAir + props.isInsAir + props.isSecondInsAir + props.isWindMembraneR;
  const yOuter = 3463 / (273 + props.isCityProp.tm);
  const yInner = 3463 / (273 + props.isInnerTemp);
  const deltaP = (0.55 * props.isHeight * (yOuter - yInner) + 0.03 * yOuter * props.isCityProp.v) ^ 2;
  const gU = deltaP / rU;
  props.onGu(gU);

  const dkValues = useMemo(() => {
    return {
      d: d,
      k: kAir,
    };
  }, [d, kAir]);

  return (
    <div>
      <DkCalc isD={dkValues.d} isK={dkValues.k} onDk={handleDk} />
      <h2>Пояснительная записка к расчету энергоэффективности ограждающей конструкции с системой НВФ</h2>
      <h2>Объект : ЖК "Дом", расположенный по адресу : г. Москва, ул. Уютная, стр. 12</h2>
      <br />
      <h5>1. Данные для расчета.</h5>
      <p>
        Климатические данные района строительства: Климатические данные принимаются по СП 131.13330.2020; <br />-
        средняя температура наиболее холодной пятидневки, с обеспеченностью 0,92 = {props.isCityProp.t} °С, по табл.3.1;{' '}
        <br />- средняя температура наиболее холодного месяца = {props.isCityProp.tm} °С, по табл.5.1; <br />- средняя
        температура отопительного периода = {props.isBuildingAim === 2 ? props.isCityProp.z8 : props.isCityProp.z10} °С,
        по табл.3.1; <br />- продолжительность отопительного периода ={' '}
        {props.isBuildingAim === 2 ? props.isCityProp.z8 : props.isCityProp.z10} сут, по табл.3.1;
        <br />- максимальная из скоростей ветра по румбам за январь ν = {props.isCityProp.v} м/c, по табл.3.1. <br />
        Микроклимат в здании: <br /> - расчетная температура внутреннего воздуха = {props.isInnerTemp} °С; <br />-
        расчетная относительная влажность внутреннего воздуха = {props.isHumidity} %, по п.5.7 СП 50.13330.2012; <br />{' '}
        - средняя месячная относительная влажность воздуха наиболее холодного месяца = {props.isCityProp.w} %, по
        табл.3.1 СП 131.13330.2020.
        <br />
        <br /> <b>Состав стены:</b>
        <br />- ж/б конструкции, для расчета требуемого сопротивления перекрытия толщину принимаем{' '}
        {props.isBrickThickness} мм
        <br />- газо- и пенобетон на цементном вяжущем плотностью {props.isBrickDensity} кг/м³, толщиной{' '}
        {props.isBrickThickness} мм
        <br />- внутренний слой теплоизоляции плотностью {props.isInsDensity} кг/м³, толщиной {props.isInsThickness} мм
        <br />- внешний слой теплоизоляции плотностью {props.isSecondInsDensity} кг/м³, толщиной{' '}
        {props.isSecondInsThickness} мм
        <br />
        <br />
        Расчетные характеристики материалов: <br />
        Железобетонные конструкции : <br />- коэффициент теплопроводности материала λ = {props.isConcreteHeat} Вт/(м°С);
        <br />- коэффициент паропроницаемости материала μ = {props.isConcreteVapor} мг/(м∙ч∙Па);
        <br /> - коэффициент воздухопроницаемости ί = {props.isConcreteAir} кг/(м∙ч∙Па);
        <br /> Кладочное заполнение стен :
        <br /> - коэффициент теплопроводности материала λ = {props.isBrickHeat} Вт/(м°С);
        <br /> - коэффициент паропроницаемости материала μ = {props.isBrickVapor} мг/(м∙ч∙Па);
        <br /> - коэффициент воздухопроницаемости ί = {props.isBrickAir} кг/(м∙ч∙Па);
        <br /> Утеплитель :
        <br /> - коэффициент теплопроводности материала λ = {props.isInsHeat} Вт/(м°С);
        <br /> - коэффициент паропроницаемости материала μ = {props.isInsVapor} мг/(м∙ч∙Па); - коэффициент
        воздухопроницаемости ί = 0,1 кг/(м∙ч∙Па);
        <br /> Штукатурка :
        <br /> - коэффициент теплопроводности материала λ = {props.isSecondInsHeat} Вт/(м°С);
        <br /> - коэффициент паропроницаемости материала μ = {props.isSecondInsVapor} мг/(м∙ч∙Па);
        <br /> - коэффициент воздухопроницаемости ί = {props.isSecondInsAir} кг/(м∙ч∙Па);
        <br /> Характеристики элементов НФС: Высота наибольшей непрерывной воздушной прослойки h = 30 м <br />
        Ширина вентилируемого зазора составляет {props.isVentMed} мм <br />
        На входе и на выходе из воздушной прослойки происходит сужение воздушного канала до δ = {props.isVentIn} мм
        <br /> <br />
        Средняя частота кронштейнов на фасаде 2,8 шт/м² из них:
        <br /> StS MFT-MF LH (perf) - 0,67 шт/м²
        <br /> StS MFT-MF M - 0,67 шт/м²
        <br /> StS MFT-MF HS - 0,67 шт/м²
        <br /> StS MFT-MF HS - 0,8 шт/м²
        <br /> AL MFT-MF HS - 0,8 шт/м²
        <br /> StS MFT-MF LH (perf) - 0,8 шт/м²
        <br />
        <br /> Средняя частота установки тарельчатых анкеров для крепления изоляции 6 шт/м²
        <br /> Облицовка - Клинкер толщиной {props.isCoverThickness} мм
        <br />
        Ширина вентилируемого зазора составляет {props.isVentMed} мм <br />
        На входе и на выходе из воздушной прослойки происходит сужение воздушного канала до δ = {props.isVentIn} мм
        <br />
        <br /> <h5>2. Требуемое сопротивление теплопередаче.</h5>
        Градусо-сутки отопительного периода для рассматриваемого случая составляют: ГСОП = ({props.isInnerTemp} -(
        {props.isBuildingAim === 2 ? props.isCityProp.t8 : props.isCityProp.t10})) ∙
        {props.isBuildingAim === 2 ? props.isCityProp.z8 : props.isCityProp.z10} = {gsop}
        °С∙сут. <br />
        Минимально требуемое приведенное сопротивление теплопередаче стен по СП 50.13330.2012 составляет R = ({a()} ∙
        {gsop} +{b()}) ∙ {props.isMr} = {rObl.toFixed(2)} м²°С/Вт.
        <br /> <br />
        <h5>3. Минимально необходимая толщина утеплителя.</h5>
        Приближенная толщина утеплителя : δ = ({k} ∙ {rObl.toFixed(2)} - {props.isConcreteThickness} /
        {props.isConcreteSpHeat} - {props.isBrickThickness} / {props.isBrickHeat} - 1 / 8.7 - 1 / 12) ∙ (
        {props.isSecondIns
          ? `${props.isInsThickness} + ${props.isSecondInsThickness} / ${props.isInsThickness} /
        ${props.isInsHeat} + ${props.isSecondInsThickness} / ${props.isSecondInsHeat}`
          : props.isInsHeat}
        ) ={preIns.toFixed(2) * 1000} мм; <br />У применяемого на данном объекте тарельчатого анкера расстояние от края
        стального распорного элемента до тарелки дюбеля {props.isGribDepth} мм.
        <br /> В соответствии с таблицей Г4 СП 230.1325800.2015 χ = {props.isGribDepth} Вт/°С.
        <br /> Удельные потери теплоты через кронштейны в соответствии с за-ключением НИИСФ РААСН по договору №
        12250(2020) от «09» декабря 2020 г. находятся по таблицам Г.71, Г.73, Г.74, Г.75 СП 230.1325800.2015
        интерполяцией
        <br /> χᵏᵖ¹ = {props.isBracketResult} Вт/°С для кронштейна {props.isBracket} (крепление : блок/кирпич );
        <br /> χᵏᵖ² = 0,0084 Вт/°С для кронштейна StS MFT-MF M (крепление : блок/кирпич );
        <br /> χᵏᵖ³ = 0,0067 Вт/°С для кронштейна StS MFT-MF HS (крепление : блок/кирпич );
        <br /> χᵏᵖ⁴ = 0,0148 Вт/°С для кронштейна StS MFT-MF HS (крепление : бетон );
        <br /> χᵏᵖ⁵ = 0,0452 Вт/°С для кронштейна AL MFT-MF HS (крепление : бетон );
        <br /> χᵏᵖ⁶ = 0,0246 Вт/°С для кронштейна StS MFT-MF LH (perf) (крепление : бетон );
        <h5>
          <br />
          4. Расчет приведенного сопротивления теплопередаче фрагмента стены с НФС по приложению Е СП 50.13330.2012.
        </h5>
        Для учета всех теплотехнических неоднородностей фрагмента стены с НФС необходимо оценить фрагмент теплозащитной
        оболочки здания с НФС в целом. Перечисление элементов составляющих ограждающую конструкцию:
        <br /> - заполнение стены со слоем теплоизоляции (плоский элемент 1);
        <br /> - железобетонное перекрытие со слоем теплоизоляции (плоский элемент 2);
        <br /> - оконный откос, образованный зполнением стены с теплоизоляцией (линейный элемент 1);
        <br /> - дюбель со стальным сердечником, прикрепляющий слой теплоизоляции к основанию (точечный элемент 1).
        <br /> - кронштейн {props.isBracket} (точечный элемент 2);
        <br /> - кронштейн StS MFT-MF M (точечный элемент 3);
        <br /> - кронштейн StS MFT-MF HS (точечный элемент 4);
        <br /> - кронштейн StS MFT-MF HS (точечный элемент 5);
        <br /> - кронштейн AL MFT-MF HS (точечный элемент 6);
        <br /> - кронштейн StS MFT-MF LH (perf) (точечный элемент 6);
        <br /> Геометрические характеристики проекций элементов.
        <br /> Площадь поверхности фрагмента ограждающей конструкции для расчета R составляет: А ={' '}
        {props.isConcreteArea + props.isBrickArea} м²;
        <br /> "Площадь стены с основанием из блоков составляет {props.isConcreteArea + props.isBrickArea} -{' '}
        {props.isConcreteArea} = {props.isBrickArea} м². Доля этой площади от общей площади фрагмента ограждающей
        конструкции равна а ={props.isBrickArea}/{props.isConcreteArea + props.isBrickArea} =
        {props.isConcreteArea / (props.isConcreteArea + props.isBrickArea)};
        <br />" Суммарная площадь торцов перекрытий из монолитного железобетона (т.е. площадь проекции на поверхность
        фрагмента) составляет {props.isConcreteArea} м².
        <br /> Доля этой площади от общей площади фрагмента ограждающей конструкции равна: а = {props.isConcreteArea}/
        {props.isConcreteArea + props.isBrickArea} = {props.isConcreteArea / (props.isConcreteArea + props.isBrickArea)}{' '}
        Общая длина проекции оконного откоса, образованного кладкой из блоков, утепленной слоем минераловатной плиты,
        определяется по экспликации оконных проемов и равна: {props.isWindowLength} м. <br />
        Длина проекции откосов, приходящаяся на 1 м² площади фрагмента равна l ={props.isWindowLength} /{' '}
        {props.isConcreteArea + props.isBrickArea} м²=
        {props.isWindowLength / (props.isConcreteArea + props.isBrickArea)} м/м².
        <br /> Расчет удельных потерь теплоты, обусловленных элементами.
        <br /> Для плоского элемента 1 удельные потери теплоты определяются по формулам Е.6, Е.З СП 50.13330.2012:{' '}
        <br />R = 1/8,7 + {props.isConcreteThickness}/{props.isConcreteHeat} + 0,2/2,04 +{' '}
        {props.isSecondLayer
          ? `${props.isInsThickness}/${props.isInsHeat}`
          : `${props.isInsThickness} / ${props.isInsHeat} + ${props.isInsThickness} / ${props.isInsHeat}`}
        + 1/12 = {rCond1} м²°С/Вт
        <br />
        U1 = 1/ {rCond1} = {u1} Вт/(м²°С)
        <br /> Для плоского элемента 2 удельные потери теплоты определяются аналогично: <br />R = 1/8,7 +{' '}
        {props.isBrickThickness}/{props.isBrickHeat} + 0,2/2,04 +{' '}
        {props.isSecondLayer
          ? `${props.isInsThickness}/${props.isInsHeat}`
          : `${props.isInsThickness} / ${props.isInsHeat} + ${props.isInsThickness} / ${props.isInsHeat}`}
        + 1/12 = {rCond2} м²°С/Вт
        <br />
        U2 = 1/ {rCond1} = {u2} Вт/(м²°С)
        <br />
        Приведенное сопротивление теплопередаче фрагмента стены с НФС представлено в 2 таблицах аналогично приложению Е
        СП 50.13330.2012, что позволяет оценить какое влияние оказывает каждый элемент конструкции. Для учета примыканий
        оконных блоков принимаем характеристики этих узлов по таблице Г.33 приложения Г СП 230.1325800.2015, как для
        рамы сразу за утеплителем, и d = 20 мм.
        <br />
        <tr classname="table">
          <table class="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Элемент конструкции</th>
                <th scope="col">Тип элемента конструкции</th>
                <th scope="col">Удельный геометрический показатель</th>
                <th scope="col">Удельные потери теплоты</th>
                <th scope="col">Удельный поток теплоты, обусловленный эл-том, Вт/(м² °С)</th>
                <th scope="col">Доля общего потока теплоты через фрагмент,%</th>
              </tr>
            </thead>
            <tbody>
              {props.isBuildingType !== 3 ? (
                <tr>
                  <th scope="row">1</th>
                  <td>Стена</td>
                  <td>Плоский</td>
                  <td>{props.isConcreteArea / (props.isConcreteArea + props.isBrickArea)}</td>
                  <td>{props.isConcreteThickness / props.isConcreteHeat}</td>
                  <td>{(props.isConcreteThickness / props.isConcreteHeat) * props.isConcreteArea}</td>
                  <td>@mdo</td>
                </tr>
              ) : null}
              {props.isBuildingType !== 1 ? (
                <tr>
                  <th scope="row">1</th>
                  <td>Стена</td>
                  <td>Плоский</td>
                  <td>{props.isBrickArea / (props.isConcreteArea + props.isBrickArea)}</td>
                  <td>{props.isBrickThickness / props.isBrickHeat}</td>
                  <td>{(props.isBrickThickness / props.isBrickHeat) * props.isBrickArea}</td>
                  <td>@mdo</td>
                </tr>
              ) : null}
              <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </table>
        </tr>
        <br />
        Осредненное по площади условное сопротивление теплопередаче стены с НФС R = 1/8,7 + {props.isConcreteThickness}/
        {props.isConcreteHeat} + {props.isBrickThickness} / {props.isBrickHeat} + {props.isInsThickness}/
        {props.isInsteHeat} + {props.isSecondInsThickness} / {props.isSecondInsHeat} + 1/12 = 4,77 м²°С/Вт <br />
        Коэффициент теплотехнической однородности стены с НФС : r = {rCond0}/{rObl} = {r}
        <br />
        Общее приведенное сопротивление теплопередаче участка с НФС:
        <br />
        <br />
        <h5>5. Воздухообмен в воздушной прослойке.</h5>
        Воздухообмен в воздушной прослойке находится для термического сопротивления стены от внутренней поверхности до
        воздушной прослойки равного требуемому сопротивлению теплопередаче фасада. <br />
        Сумма коэффициентов местных сопротивлений для исследуемой конструкции составляет: = 1,2 ∙ (({props.isVentMed}/
        {props.isVentIn})²) + 0,04 ∙ ({props.isVentHeight}/(2 ∙ {props.isVentMed})) + (1,2 ∙ ({props.isVentMed}/
        {props.isVentOut})²) = {epsilon} <br />R = 1/23 + 1/12 + 0,010 = 0,140 м²˚С/Вт
        <br />
        После 4 иттераций скорость воздуха в прослойке составляет:
        <br />
        <br />
        <h5>6. Поток водяного пара из конструкции в воздушную прослойку.</h5>
        При расчете влажностного режима конструкции используется приближенный метод.
        <br />
        Парциальное давление водяного пара внутреннего воздуха e = ({props.isHumidity}/100) ∙ {inE} = {eIn} Па
        <br /> "Давление насыщенного водяного пара для наружного воздуха в наиболее холодный месяц E = 1,84 ∙ 10^11 ∙
        exp(-5330/(273 + ({props.isCityProp.tm}))) = {outE} Па"
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
        Среднее парциальное давление водяного пара наружного воздуха для января месяца: e = ({outE}/100) ∙ 344,00 ={' '}
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
        Вспомогательные величины: Rx = 1/8,7+ 0,2/0,26+0,2/2,04+0,1/0,04+142/0,93 = 4,680 м²°С/Вт <br />t =
        {props.innerTemp} - ({props.innerTemp} - ({props.isCityProp.tm})/4,770) ∙ 4,680 = -7,3 °С <br />E = 1,84 ∙ 10^11
        ∙ exp(-5330/(273 - ({props.isCityProp.tm}))) = {eOut} Па. <br />D = (356,00 - 289,00)/(817,0 - 289,00) = 0,13
        <br />
        Параметр Г определяется интерполяцией по таблице 1 и составляет {dk}
        <br />
        Требуемая воздухопроницаемость стены с облицовкой на относе составляет:
        <br />
        Сопротивление воздухопроницаемости исследуемой стены составляет: R = {props.isConcreteThickness}/
        {props.isConcreteAir} + {props.isBrickThickness}/{props.isBrickAir} + 0,00 + 142/373 = {rU} м² ∙ ч ∙ Па/кг{' '}
        <br />
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
      </p>
    </div>
  );
}
