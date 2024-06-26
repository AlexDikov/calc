import { Button, Form, ProgressBar, Row } from 'react-bootstrap';
import SystInput from './SystInput';
import { useNavigate } from 'react-router-dom';
import { covers } from './covers';
import { DefaultContext } from '../contexts/DefaultContext';

export default function CoverData() {
  const navigate = useNavigate();

  return (
    <DefaultContext.Consumer>
      {({
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
          <ProgressBar variant="secondary" now={99} label={`${99}%`} />
          <div className="d-flex justify-content-between">
            <Button
              className="mt-2"
              variant="outline-secondary"
              size="sm"
              onClick={() => {
                navigate('/bracketdata');
              }}
            >
              Назад
            </Button>
            <Button
              className="mt-2"
              variant="outline-secondary"
              size="sm"
              onClick={() => {
                navigate('/final');
              }}
            >
              Далее
            </Button>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <SystInput
                min={1}
                xs1={9}
                xs2={2}
                id={'ventin'}
                type="number"
                text="Ширина вентилируемого зазора на входе, мм"
                iValue={ventIn ? ventIn * 1000 : null}
                method={handleVentIn}
              />
              <SystInput
                min={1}
                xs1={9}
                xs2={2}
                id={'ventin'}
                type="number"
                text="Средняя ширина вентилируемого зазора, мм"
                iValue={ventMed ? ventMed * 1000 : null}
                method={handleVentMed}
              />
              <SystInput
                min={1}
                xs1={9}
                xs2={2}
                id={'ventin'}
                type="number"
                text="Ширина вентилируемого зазора на выходе, мм"
                iValue={ventOut ? ventOut * 1000 : null}
                method={handleVentOut}
              />
              <SystInput
                min={1}
                xs1={9}
                xs2={2}
                id={'ventin'}
                text="Высота наибольшего зазора, м"
                iValue={ventHeight}
                method={handleVentHeight}
              >
                <button
                  className="i-btn"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="Высота наибольшего неприрывного участка между входным и выходным зазорами"
                ></button>
              </SystInput>
              <SystInput xs1={9} xs2={2} id={'height'} text="Высота объекта, м" iValue={height} method={handleHeight} />
            </div>
            <div>
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
                    id="metal-cover"
                    label="Металлическая"
                    checked={metallCover}
                    onChange={handleMetallCover}
                  ></Form.Check>
                </Row>
              ) : null}

              <SystInput
                min={1}
                xs1={9}
                xs2={2}
                id="cover-thickness"
                text="Толщина облицовки, мм"
                iValue={coverThickness}
                method={handleCoverThickness}
              />

              {ownCover ? (
                <SystInput
                  min={0.0001}
                  xs1={9}
                  xs2={2}
                  id="cover-sp-lambda"
                  text="Теплопроводность облицовки, Вт/м&#178;С&#176;"
                  iValue={coverLambda}
                  method={handleCoverLambda}
                />
              ) : (
                <SystInput
                  min={0.0001}
                  xs1={9}
                  xs2={2}
                  id="cover-lambda"
                  text="Теплопроводность облицовки, Вт/м&#178;С&#176;"
                  iValue={cover ? cover.l : null}
                  method={handleCoverLambda}
                />
              )}
              {ownCover ? (
                <SystInput
                  min={0.00001}
                  xs1={9}
                  xs2={2}
                  id="cover-sp-vapor"
                  text="Коэффициент паропроницания облицовки, мг/м&#178;∙ч∙Па"
                  iValue={coverVapor}
                  method={handleCoverVapor}
                />
              ) : (
                <SystInput
                  min={0.00001}
                  xs1={9}
                  xs2={2}
                  id="cover-vapor"
                  text="Коэффициент паропроницания облицовки, мг/м&#178;∙ч∙Па"
                  iValue={cover ? cover.v : null}
                  method={handleCoverVapor}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </DefaultContext.Consumer>
  );
}
