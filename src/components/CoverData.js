import { Button, Form, Row } from 'react-bootstrap';
import SystInput from './SystInput';
import { useNavigate } from 'react-router-dom';
import { covers } from './App';
import { DefaultContext } from '../contexts/DefaultContext';
import LinearLossCalc from './LinearLossCalc';
import DkCalc from './DkCalc';

export default function CoverData({
  isCover,
  isCoverName,
  isCoverThickness,
  isHeight,
  isOwnCover,
  isVentIn,
  isVentMed,
  isVentOut,
  isVentHeight,
  onCoverLambda,
  onCoverName,
  onCoverThickness,
  onCoverVapor,
  onHeight,
  onMetallCover,
  onVentHeight,
  onVentIn,
  onVentMed,
  onVentOut,
  onOwnCover,
}) {
  const navigate = useNavigate();

  return (
    <DefaultContext.Consumer>
      {(context) => (
        <div>
          <div>
            <SystInput
              id={'ventin'}
              text="Ширина вентилируемого зазора на входе, мм"
              iValue={context.ventIn * 1000}
              method={context.handleVentIn}
            />
            <SystInput
              id={'ventin'}
              text="Средняя ширина вентилируемого зазора, мм"
              iValue={context.ventMed * 1000}
              method={context.handleVentMed}
            />
            <SystInput
              id={'ventin'}
              text="Ширина вентилируемого зазора на выходе, мм"
              iValue={context.ventOut * 1000}
              method={context.handleVentOut}
            />
            <SystInput
              id={'ventin'}
              text="Высота наибольшего зазора, м"
              iValue={context.ventHeight}
              method={context.handleVentHeight}
            >
              <button
                className="i-btn"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title="Высота наибольшего неприрывного участка между входным и выходным зазорами"
              ></button>
            </SystInput>
            <SystInput id={'height'} text="Высота объекта, м" iValue={context.height} method={context.handleHeight} />
            <Row>
              <Form.Check
                className="mt-3 ms-2"
                id="own-cover"
                label="Своя облицовка"
                onChange={context.toggleOwnCover}
              ></Form.Check>
              {context.ownCover ? (
                <Form.Control
                  className="w-25 ms-2"
                  id="covers-list"
                  placeholder="Название облицовки"
                  onChange={context.handleCoverName}
                />
              ) : (
                <Form.Select
                  id="cover-name"
                  className="w-25 ms-2"
                  type="text"
                  value={context.coverName}
                  onChange={context.handleCoverName}
                >
                  <option>Тип облицовки</option>
                  {Object.entries(covers).map(([key, value]) => {
                    return (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    );
                  })}
                </Form.Select>
              )}
            </Row>
            {context.ownCover ? (
              <Row>
                <Form.Check
                  className="mt-3 ms-2"
                  id="mtel-cover"
                  label="Металлическая"
                  onChange={context.handleMetallCover}
                ></Form.Check>
              </Row>
            ) : null}

            <SystInput
              id="cover-thickness"
              text="Толщина облицовки, мм"
              iValue={context.coverThickness}
              method={context.handleCoverThickness}
            />

            {context.ownCover ? (
              <SystInput
                id="cover-sp-lambda"
                text="Теплопроводность облицовки, Вт/м&#178;С&#176;"
                iValue={context.coverLambda}
                method={context.handleCoverLambda}
              />
            ) : (
              <SystInput
                id="cover-lambda"
                text="Теплопроводность облицовки, Вт/м&#178;С&#176;"
                iValue={context.cover ? context.cover.l : null}
                method={context.handleCoverLambda}
              />
            )}
            {context.ownCover ? (
              <SystInput
                id="cover-sp-vapor"
                text="Коэффициент паропроницания облицовки, мг/м&#178;∙ч∙Па"
                method={context.handleCoverVapor}
              />
            ) : (
              <SystInput
                id="cover-vapor"
                text="Коэффициент паропроницания облицовки, мг/м&#178;∙ч∙Па"
                iValue={context.cover ? context.cover.r : null}
                method={context.handleCoverVapor}
              />
            )}
          </div>

          <Button
            className="btn-previous"
            variant="outline-secondary"
            size="sm"
            onClick={() => {
              navigate('/bracketdata');
            }}
          >
            Назад
          </Button>
          <Button
            className="btn-next"
            variant="outline-secondary"
            size="sm"
            onClick={() => {
              navigate('/final');
            }}
          >
            Далее
          </Button>
          <LinearLossCalc />
          <DkCalc />
        </div>
      )}
    </DefaultContext.Consumer>
  );
}
