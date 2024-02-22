import { Button, Form, Row } from 'react-bootstrap';
import SystInput from './SystInput';
import { useNavigate } from 'react-router-dom';
import { covers } from './App';
import { DefaultContext } from '../contexts/DefaultContext';
import LinearLossCalc from './LinearLossCalc';
import DkCalc from './DkCalc';
import LinearLossCalcConcrete from './LinearLossCalcConcrete';

export default function CoverData() {
  const navigate = useNavigate();

  return (
    <DefaultContext.Consumer>
      {({
        concreteWall,
        cover,
        coverLambda,
        coverName,
        coverThickness,
        coverVapor,
        height,
        metallCover,
        ownCover,
        ventHeight,
        ventIn,
        ventMed,
        ventOut,
        handleCoverLambda,
        handleCoverName,
        handleCoverVapor,
        handleCoverThickness,
        handleHeight,
        handleMetallCover,
        handleVentHeight,
        handleVentIn,
        handleVentMed,
        handleVentOut,
        toggleOwnCover,
      }) => (
        <div>
          <div>
            <SystInput
              id={'ventin'}
              text="Ширина вентилируемого зазора на входе, мм"
              iValue={ventIn ? ventIn * 1000 : null}
              method={handleVentIn}
            />
            <SystInput
              id={'ventin'}
              text="Средняя ширина вентилируемого зазора, мм"
              iValue={ventMed ? ventMed * 1000 : null}
              method={handleVentMed}
            />
            <SystInput
              id={'ventin'}
              text="Ширина вентилируемого зазора на выходе, мм"
              iValue={ventOut ? ventOut * 1000 : null}
              method={handleVentOut}
            />
            <SystInput id={'ventin'} text="Высота наибольшего зазора, м" iValue={ventHeight} method={handleVentHeight}>
              <button
                className="i-btn"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title="Высота наибольшего неприрывного участка между входным и выходным зазорами"
              ></button>
            </SystInput>
            <SystInput id={'height'} text="Высота объекта, м" iValue={height} method={handleHeight} />
            <Row>
              <Form.Check
                className="mt-3 ms-2"
                id="own-cover"
                label="Своя облицовка"
                onChange={toggleOwnCover}
              ></Form.Check>
              {ownCover ? (
                <Form.Control
                  className="w-25 ms-2"
                  id="covers-list"
                  placeholder="Название облицовки"
                  onChange={handleCoverName}
                />
              ) : (
                <Form.Select
                  id="cover-name"
                  className="w-25 ms-2"
                  type="text"
                  value={coverName}
                  onChange={handleCoverName}
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
            {ownCover ? (
              <Row>
                <Form.Check
                  className="mt-3 ms-2"
                  id="mtel-cover"
                  label="Металлическая"
                  checked={metallCover}
                  onChange={handleMetallCover}
                ></Form.Check>
              </Row>
            ) : null}

            <SystInput
              id="cover-thickness"
              text="Толщина облицовки, мм"
              iValue={coverThickness}
              method={handleCoverThickness}
            />

            {ownCover ? (
              <SystInput
                id="cover-sp-lambda"
                text="Теплопроводность облицовки, Вт/м&#178;С&#176;"
                iValue={coverLambda}
                method={handleCoverLambda}
              />
            ) : (
              <SystInput
                id="cover-lambda"
                text="Теплопроводность облицовки, Вт/м&#178;С&#176;"
                iValue={cover ? cover.l : null}
                method={handleCoverLambda}
              />
            )}
            {ownCover ? (
              <SystInput
                id="cover-sp-vapor"
                text="Коэффициент паропроницания облицовки, мг/м&#178;∙ч∙Па"
                iValue={coverVapor}
                method={handleCoverVapor}
              />
            ) : (
              <SystInput
                id="cover-vapor"
                text="Коэффициент паропроницания облицовки, мг/м&#178;∙ч∙Па"
                iValue={cover ? cover.r : null}
                method={handleCoverVapor}
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
              navigate('/pz');
            }}
          >
            Далее
          </Button>
          <LinearLossCalc />
          {concreteWall ? <LinearLossCalcConcrete /> : null}
          <DkCalc />
        </div>
      )}
    </DefaultContext.Consumer>
  );
}
