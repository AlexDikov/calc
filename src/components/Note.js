import { DefaultContext } from '../contexts/DefaultContext';

export default function Note() {
  return (
    <DefaultContext.Consumer>
      {({
        bracketResult,
        brickAir,
        brickArea,
        brickDensity,
        brickLambda,
        brickMaterial,
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
        windowLength,
        windowLoss,
        windowLossConcrete,
        windMembrane,
      }) => (
        <>
          <h2>Пояснительная записка к расчету энергоэффективности ограждающей конструкции с системой НВФ</h2>
          <h2>
            Объект : {objName}, расположенный по адресу : {objAddress}
          </h2>
          <br />
          <h5>1. Данные для расчета.</h5>
          <div>
            Климатические данные района строительства: Климатические данные принимаются по таблице 3.1 СП 131.13330.2020
            и пункту 5.7 СП 50.13330.2012; <br />- средняя температура наиболее холодной пятидневки, с обеспеченностью
            0,92: t = {cityProp.t} °С;
            <br />- средняя температура наиболее холодного месяца: t<sub>м</sub> = {cityProp.tm} °С; <br />- средняя
            температура отопительного периода: t<sub>{buildingAim === '2' ? '8' : '10'}</sub> ={' '}
            {buildingAim === '2' ? cityProp.t8 : cityProp.t10} °С;
            <br />- продолжительность отопительного периода: z<sub>{buildingAim === '2' ? '8' : '10'}</sub> ={' '}
            {buildingAim === '2' ? cityProp.z8 : cityProp.z10} сут;
            <br />- максимальная из скоростей ветра по румбам за январь: ν = {cityProp.v} м/c;
            <br />- расчетная относительная влажность внутреннего воздуха: φ = {humidity} %; <br />
            <br />
            Микроклимат в здании: <br /> - расчетная температура внутреннего воздуха: t<sub>в</sub>= {innerTemp} °С;{' '}
            <br /> - средняя месячная относительная влажность воздуха наиболее холодного месяца: φ<sub>м</sub> ={' '}
            {cityProp.w} %.
            <br />
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
                - {brickMaterial} плотностью {brickDensity} кг/м³, толщиной {brickThickness * 1000} мм
              </div>
            ) : null}
            {secondIns ? (
              <div>
                - внутренний слой теплоизоляции плотностью {insDensity} кг/м³, толщиной {insThickness * 1000} мм <br />-
                внешний слой теплоизоляции плотностью {secondInsDensity} кг/м³, толщиной {secondInsThickness * 1000} мм
              </div>
            ) : (
              <div>
                - слой теплоизоляции плотностью {insDensity} кг/м³, толщиной {insThickness * 1000} мм
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
            {secondIns ? (
              <div>
                Внутренний слой утеплителя:
                <br /> - коэффициент теплопроводности материала λ = {insLambda} Вт/(м°С);
                <br /> - коэффициент паропроницаемости материала μ = {insVapor} мг/(м∙ч∙Па);
                <br />- коэффициент воздухопроницаемости ί = 0,1 кг/(м∙ч∙Па);
                <br />
                Внешний слой утеплителя:
                <br /> - коэффициент теплопроводности материала λ = {secondInsLambda} Вт/(м°С);
                <br /> - коэффициент паропроницаемости материала μ = {insVapor} мг/(м∙ч∙Па);
                <br />- коэффициент воздухопроницаемости ί = 0,1 кг/(м∙ч∙Па);
              </div>
            ) : (
              <div>
                Утеплитель :
                <br /> - коэффициент теплопроводности материала λ = {insLambda} Вт/(м°С);
                <br /> - коэффициент паропроницаемости материала μ = {insVapor} мг/(м∙ч∙Па);
                <br />- коэффициент воздухопроницаемости ί = 0,1 кг/(м∙ч∙Па);{' '}
              </div>
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
            Высота здания h = {height} м
            <br />
            Ширина вентилируемого зазора на входе δ<sub>вх</sub> = {ventIn * 1000} мм <br />
            Ширина вентилируемого зазора на выходе δ<sub>вых</sub> = {ventOut * 1000} мм
            <br />
            Средняя ширина воздушной прослойки δ<sub>ср</sub> = {ventMed * 1000} мм
            <br />
            Высота наибольшего непрерывной воздушной прослойки h = {ventHeight} м <br />
            <br />
            Средняя частота кронштейнов на фасаде {bracketDensity()} шт/м² из них:
            {brackets()}
            <br /> Средняя частота установки тарельчатых анкеров для крепления изоляции {gribPcs} шт/м²
            <br />
            <br /> Облицовка - {coverName} толщиной {coverThickness} мм
            <br />
            <br /> <h5>2. Требуемое сопротивление теплопередаче.</h5>
            Градусо-сутки отопительного периода для рассматриваемого случая составляют: ГСОП = ({innerTemp} -(
            {buildingAim === 2 ? cityProp.t8 : cityProp.t10})) ∙ {buildingAim === 2 ? cityProp.z8 : cityProp.z10}={' '}
            {gsop.toFixed(0)}
            °С∙сут. <br />
            Минимально требуемое приведенное сопротивление теплопередаче стен по СП 50.13330.2012 составляет R = ({a()}{' '}
            ∙ {gsop.toFixed(0)} +{b()}) ∙ {mr} = {rObl.toFixed(2)} м²°С/Вт.
            <br /> <br />
            <h5>3. Минимально необходимая толщина утеплителя.</h5>
            Приближенная толщина утеплителя : δ = ({k} ∙ {rObl.toFixed(2)}
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
            {buildingType === '2' ? (
              <>
                <br /> - заполнение стены со слоем теплоизоляции (плоский элемент 1)
                <br /> - железобетонное перекрытие со слоем теплоизоляции (плоский элемент 2)
              </>
            ) : null}
            <br />
            {buildingType === '1' ? '- железобетонная стена со слоем теплоизоляции (плоский элемент 1)' : null}
            {buildingType === '3' ? '- кирпичная стена со слоем теплоизоляции (плоский элемент 1)' : null}
            <br />
            {buildingType !== '2' ? (
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
            <br /> Площадь поверхности фрагмента ограждающей конструкции для расчета R составляет: А ={' '}
            {concreteArea + brickArea} м²;
            <br />{' '}
            {concreteWall
              ? `Площадь стены с основанием из железобетона составляет: ${concreteArea}`
              : `Суммарная площадь торцов перекрытий из монолитного железобетона (т.е. площадь проекции на поверхность фрагмента)
      составляет ${concreteArea} м².`}
            <br /> Доля этой площади от общей площади фрагмента ограждающей конструкции равна: а = {concreteArea}/
            {concreteArea + brickArea} = {(concreteArea / (concreteArea + brickArea)).toFixed(2)}
            .
            <br />
            {buildingType !== '1' ? `Площадь стены с основанием из блоков составляет ${brickArea} м².` : null}
            <br /> Доля этой площади от общей площади фрагмента ограждающей конструкции равна а ={brickArea}/
            {concreteArea + brickArea} = {(brickArea / (concreteArea + brickArea)).toFixed(2)};
            <br />
            {buildingType === '2' ? (
              <>
                Общая длина проекции оконного откоса, образованного железобетоном, утепленным слоем минераловатной
                плиты, определяется по экспликации оконных проемов и равна: {windowLength} м.
                <br />
                Общая длина проекции оконного откоса, образованного кладкой из блоков, утепленной слоем минераловатной
                плиты, определяется по экспликации оконных проемов и равна: {windowLength} м.
              </>
            ) : null}
            <br />
            Длина проекции откосов, приходящаяся на 1 м² площади фрагмента равна l = {windowBrickLength} /
            {concreteArea + brickArea} = {(windowBrickLength / (concreteArea + brickArea)).toFixed(2)} м/м².
            <br />
            <br /> <b>Расчет удельных потерь теплоты, обусловленных элементами.</b>
            <br /> Для плоского элемента {buildingType === '2' ? 1 : null} удельные потери теплоты определяются по
            формулам Е.6, Е.З СП 50.13330.2012:
            <br />R = 1/8.7 + {buildingType !== '3' ? concreteQ : brickQ} +{' '}
            {secondIns ? `${insQ} + ${secondInsQ}` : insQ}+ 1/12 = {rCond1} м²°С/Вт
            <br />
            U1 = 1/ {rCond1} = {u1} Вт/(м²°С)
            <br />
            {buildingType === '2' ? (
              <>
                Для плоского элемента 2 удельные потери теплоты определяются аналогично: <br />R = 1/8.7 + {brickQ} +{' '}
                {secondIns ? `${insQ}+${secondInsQ}` : `${insQ}`} + 1/12 = {rCond2} м²°C/Вт
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
              {buildingType !== '3' ? (
                <tr key={182}>
                  <th scope="row">1</th>
                  <td>Стена</td>
                  <td>Плоский {buildingType === '2' ? 1 : null} </td>
                  <td>{(concreteArea / (concreteArea + brickArea)).toFixed(3)}</td>
                  <td>{u1.toFixed(3)}</td>
                  <td>{(concreteQ * concreteArea).toFixed(3)}</td>
                  <td>@mdo</td>
                </tr>
              ) : null}
              {buildingType !== '1' ? (
                <tr key={183}>
                  <th scope="row"> {buildingType !== '3' ? 2 : 1}</th>
                  <td>Стена</td>
                  <td>Плоский {buildingType === '2' ? 2 : null}</td>
                  <td>{(brickArea / (concreteArea + brickArea)).toFixed(3)}</td>
                  <td>{u2.toFixed(3)}</td>
                  <td>{brickQ * brickArea}</td>
                  <td>@mdo</td>
                </tr>
              ) : null}
              <tr key={184}>
                <th scope="row">{buildingType !== '2' ? 2 : 3}</th>
                <td>Оконный откос</td>
                <td>Линейный {buildingType === '2' ? 1 : null}</td>
                <td>{(windowBrickLength / (concreteArea + brickArea)).toFixed(3)}</td>
                <td>{brickQ}</td>
                <td>{brickQ * brickArea}</td>
                <td>@mdo</td>
              </tr>
              {buildingType === '2' ? (
                <tr key={185}>
                  <th scope="row">{buildingType !== '2' ? 3 : 4}</th>
                  <td>Оконный откос</td>
                  <td>Линейный {buildingType === '2' ? 2 : null}</td>
                  <td>{(windowLength / (concreteArea + brickArea)).toFixed(3)}</td>
                  <td>{windowLoss}</td>
                  <td>{(windowLoss * (windowLength / (concreteArea + brickArea))).toFixed(4)}</td>
                  <td>@mdo</td>
                </tr>
              ) : null}
              <tr key={186}>
                <th scope="row">{buildingType !== '2' ? 3 : 5}</th>
                <td>Тарельчатый анкер</td>
                <td>Точечный 1</td>
                <td>{gribPcs}</td>
                <td>{gribDepth}</td>
                <td>{(gribPcs * gribDepth).toFixed(3)}</td>
                <td>@mdo</td>
              </tr>
              {brackets4()}
            </tbody>
          </table>

          <br />
          <div>
            Осредненное по площади условное сопротивление теплопередаче стены с НФС R = 1/8,7{' '}
            {concreteQ && `+ ${concreteQ}`} {brickQ && `+ ${brickQ}`} + {insQ} {secondInsQ && `+ 1/${secondInsQ}`} +
            1/12 = {rRed.toFixed(3)} м²°С/Вт <br />
            Коэффициент теплотехнической однородности стены с НФС : r = {rRed.toFixed(3)}/{rCond0.toFixed(3)} ={' '}
            {r.toFixed(3)}
            <br />
            {buildingType === '2' ? 'Общее приведенное сопротивление теплопередаче участка с НФС:' : null}
            <br />
            <br />
            <h5>5. Воздухообмен в воздушной прослойке.</h5>
            Воздухообмен в воздушной прослойке находится для термического сопротивления стены от внутренней поверхности
            до воздушной прослойки равного требуемому сопротивлению теплопередаче фасада. <br />
            Сумма коэффициентов местных сопротивлений для исследуемой конструкции составляет: <br />ξ = 1,2 ∙ ((
            {ventMed}/{ventIn})²) + 0,04 ∙ ({ventHeight}/(2 ∙ {ventMed})) + (1,2 ∙ ({ventMed}/{ventOut})²) ={' '}
            {epsilon.toFixed(2)}
            <br />R = 1 / 23 + 1 / 12 + {cover.r}= {parseInt(rOuter0).toFixed(3)} м²˚С/Вт
            <br />
            После 4 иттераций скорость воздуха в прослойке составляет: V<sub>пр</sub> = {vVent5} м/с
            <br />
            <br />
            <h5>6. Поток водяного пара из конструкции в воздушную прослойку.</h5>
            При расчете влажностного режима конструкции используется приближенный метод.
            <br />
            Парциальное давление водяного пара внутреннего воздуха e<sub>в</sub> = ({humidity}/100) ∙ {inE.toFixed(1)} ={' '}
            {eIn.toFixed(1)} Па
            <br /> Давление насыщенного водяного пара для наружного воздуха в наиболее холодный месяц E<sub>н</sub> =
            1,84 ∙ 10^11 ∙ exp(-5330/(273 + ({cityProp.tm}))) = {outE.toFixed(1)} Па
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
            Среднее парциальное давление водяного пара наружного воздуха для января: e<sub>н</sub> = ({outE.toFixed(1)}
            /100) ∙ 344 = {eOut.toFixed(1)}
            Па <br />
            Вспомогательные величины:
            <br />k = {qVapor.toFixed(2)} / ({eIn.toFixed(1)} - {outE.toFixed(1)}) = {kVapor.toFixed(2)} мг/м²∙ч∙Па
            <br />e<sub>1</sub> = ({eOut.toFixed(1)} + {rEq} * {kVapor.toFixed(2)} * {eIn.toFixed(1)}) / (
            {kVapor.toFixed(2)} * {rEq} + 1) = {e1.toFixed(1)} Па;
            <br />x<sub>1</sub> = (22100 * ({vVent} * {ventMed} * 1.005 * {rEq})) / ({kVapor.toFixed(2)} * {rEq} + 1) ={' '}
            {x1.toFixed(1)} м;
            <br />R = {coverThickness} / {cover.r} = {rEq} м²∙ч∙Па/мг <br />
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
            <br />R<sub>x</sub> = 1/8.7+ {buildingType !== '3' ? concreteQ : brickQ} +{' '}
            {secondIns ? `${insQ} + ${secondInsQ}` : insQ}+0.015/0.93 = {rX.toFixed(3)} м²°С/Вт
            <br />t<sub>x</sub> ={innerTemp}- ({innerTemp} - ({cityProp.tm})/
            {buildingType === '1' ? rCond1 : rCond2}) ∙ {rX.toFixed(3)} = {tx.toFixed(1)} °С
            <br />E = 1,84 ∙ 10^11 ∙ exp(-5330/(273 - ({cityProp.tm}))) = {eOut.toFixed(1)} Па.
            <br />D = {eCond.toFixed(1)} - {eOut.toFixed(1)} / {eIn.toFixed(1)} - {eOut.toFixed(1)} = {d.toFixed(2)}
            <br />
            Параметр Г определяется интерполяцией по таблице 1 и составляет {dk}
            <br />
            Требуемая воздухопроницаемость стены с облицовкой на относе составляет:
            <br />
            Сопротивление воздухопроницаемости исследуемой стены составляет: R = {concreteThickness}/{concreteAir} +
            {brickThickness}/{brickAir} + 0,00 + 142/373 = {rU} м²∙ч∙Па/кг <br />
            Разность давлений на наружной и внутренней поверхностях ограждения: Δp = 0,55 ∙ 48 ∙ ({yOuter.toFixed(
              1
            )} - {yInner.toFixed(1)}) + 0,03 ∙ {yOuter.toFixed(1)} ∙ {cityProp.v}² = {deltaP.toFixed(1)} Па <br />
            Воздухопроницаемость данной конструкции составляет: G = {deltaP.toFixed(1)}/{rU} = {gU.toFixed(2)} кг/(м²∙ч)
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
        </>
      )}
    </DefaultContext.Consumer>
  );
}