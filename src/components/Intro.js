import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Intro() {
  const navigate = useNavigate();
  return (
    <div className="intro">
      <p>
        Так как кронштейны навесной фасадной системы хоть и частично закрыты утеплителем, но все равно контактируют с
        наружным воздухом, а учитывая их большое количество на фасаде, они являются достаточно серьезным источником
        тепловых потерь здания.
        <br />
        <br />
        Данный расчет основан на отчете НИИСФ РААСН по итогам испытаний кронштейнов Хилти и позволяет проверить основные
        показатели, влияющие на тепло-влажностный режим фасада, тем самым предотвращая ошибки проектирования, ведущие к
        сокращению эффективности и срока службы фасадной системы.
        <br />
        <br />
        Порядок работы калькулятора:
        <br />− ввод исходных данных с предварительной толщиной утеплителя
        <br />− сравнение полученного сопротивления теплопередачи стены с требуемым
        <br />− в случае различия на более чем 10% производится корректировка толщины утеплителя
        <br />
        <br />− расчитывается скорость воздуха в вентилируемом зазоре
        <br />− расчитывается влажностный режим, при необходимости добавляются слои пароизоляции и ветрозащиты
        <br />− сравнивается давление пара на выходе из воздушного зазора с давлением пара наружнего воздуха в самом
        холодном месяце
        <br />
        <br />− в случае превышения рекомендуется уменьшить высоту наибольшей неразрывной воздушной прослойки
        <br />− расчитывается величина воздухопроницания стены и сравнивается с требуемой
        <br />− в случае превышения рекомендуется добавить пароизоляцию между стеной и утеплителем или слой штукатурки
        на внутренней стене
        <br />− при необходимости пересчитывается сопротивление теплопередаче
        <br />
        <br />
        Как итог мы получаем необходимую толщину утеплителя для данного конструктивного решения фасада, а также
        нобходимость принятия мер, обеспечивающих эффективное удаление влаги и необходимую воздухопроницаемость наружной
        стены.
      </p>
      <Button
        variant="outline-secondary"
        onClick={() => {
          navigate('/objdata');
        }}
      >
        Далее
      </Button>
    </div>
  );
}
