import { Button, Col, Form, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import WallInput from './WallInput';
import { useContext } from 'react';
import { DefaultContext } from '../contexts/DefaultContext';
import VaporCalc from './VaporCalc';

export default function WallData() {
  const navigate = useNavigate();

  const {
    brickAir,
    brickData,
    brickDensity,
    brickLambda,
    brickMaterial,
    brickSp,
    brickThickness,
    brickVapor,
    buildingAim,
    buildingType,
    concreteAir,
    concreteLambda,
    concreteSp,
    concreteVapor,
    cityProp,
    concreteThickness,
    innerTemp,
    insAir,
    insData,
    insDensity,
    insLambda,
    insMaterial,
    insSp,
    insThickness,
    insVapor,
    handleBrickAir,
    handleBrickDensity,
    handleBrickLambda,
    handleBrickMaterial,
    handleBrickName,
    handleBrickThickness,
    handleBrickVapor,
    handleConcreteAir,
    handleConcreteDensity,
    handleConcreteLambda,
    handleConcreteThickness,
    handleConcreteVapor,
    handleInsAir,
    handleInsDensity,
    handleInsLambda,
    handleInsMaterial,
    handleInsName,
    handleInsThickness,
    handleInsVapor,
    handleAddSecondIns,
    handleDeleteSecondIns,
    handlePlaster,
    handleSecondInsAir,
    handleSecondInsDensity,
    handleSecondInsLambda,
    handleSecondInsMaterial,
    handleSecondInsName,
    handleSecondInsThickness,
    handleSecondInsVapor,
    handleWindMembrane,
    handleWindMembraneR,
    mr,
    plaster,
    secondIns,
    secondInsAir,
    secondInsData,
    secondInsDensity,
    secondInsLambda,
    secondInsMaterial,
    secondInsSp,
    secondInsThickness,
    secondInsVapor,
    toggleBrickSp,
    toggleConcreteSp,
    toggleInsSp,
    toggleSecondInsSp,
    vaporCalc,
    windMembrane,
    windMembraneR,
  } = useContext(DefaultContext);

  const checkValidity = () => {
    if (buildingType === 1)
      return (
        concreteThickness &&
        concreteLambda &&
        insThickness &&
        insLambda &&
        (secondIns
          ? secondInsThickness && secondInsLambda && (vaporCalc ? secondInsVapor && secondInsAir : true)
          : true) &&
        (vaporCalc ? concreteVapor && concreteAir && insVapor && insAir : true)
      );
    if (buildingType === 2)
      return (
        concreteThickness &&
        concreteLambda &&
        brickThickness &&
        brickLambda &&
        insThickness &&
        insLambda &&
        (secondIns
          ? secondInsThickness && secondInsLambda && (vaporCalc ? secondInsVapor && secondInsAir : true)
          : true) &&
        (vaporCalc ? concreteVapor && concreteAir && brickVapor && brickAir && insVapor && insAir : true)
      );
    if (buildingType === 3)
      return (
        brickThickness &&
        brickLambda &&
        insThickness &&
        insLambda &&
        (secondIns
          ? secondInsThickness && secondInsLambda && (vaporCalc ? secondInsVapor && secondInsAir : true)
          : true) &&
        (vaporCalc ? brickVapor && brickAir && insVapor && insAir : true)
      );
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
  const gsop = buildingAim === 2 ? (innerTemp - cityProp.t8) * cityProp.z8 : (innerTemp - cityProp.t10) * cityProp.z10;

  const k = () => {
    if (buildingType === 1) return 1.3;
    if (buildingType === 2) return 1.35;
    if (buildingType === 3) return 1.4;
  };

  const brickQ = brickThickness * 0.001 && (brickThickness * 0.001) / brickLambda;

  const concreteQ = concreteThickness * 0.001 && (concreteThickness * 0.001) / concreteLambda;

  const rObl = (a() * gsop + b()) * mr;
  const preIns =
    Math.ceil(
      (k() * rObl - concreteQ - brickQ - 1 / 8.7 - 1 / 12) *
        (secondIns
          ? (insThickness / (insThickness + secondInsThickness)) * 0.001 * insLambda +
            (secondInsThickness / (insThickness + secondInsThickness)) * 0.001 * secondInsLambda
          : insLambda) *
        100
    ) * 10;

  return (
    <>
      <ProgressBar variant="secondary" now={40} label={`${40}%`} />
      <div className="d-flex justify-content-between">
        <Button
          className="mt-2"
          variant="outline-secondary"
          size="sm"
          onClick={() => {
            navigate('/');
          }}
        >
          Назад
        </Button>
        <Button
          className="mt-2"
          variant="outline-secondary"
          size="sm"
          onClick={() => {
            if (checkValidity()) {
              navigate('/systdata');
            }
          }}
          disabled={!checkValidity()}
        >
          Далее
        </Button>
      </div>
      <div className="wall">
        <div className="wallData">
          {buildingType !== 3 ? (
            <WallInput
              isAir={concreteAir}
              isName="Железобетон"
              isId="concrete"
              isLambda={concreteLambda}
              isSp={concreteSp}
              isThickness={concreteThickness}
              isVapor={concreteVapor}
              onAir={handleConcreteAir}
              onDensity={handleConcreteDensity}
              onLambda={handleConcreteLambda}
              onSp={toggleConcreteSp}
              onThickness={handleConcreteThickness}
              onVapor={handleConcreteVapor}
            />
          ) : null}
          {buildingType !== 1 ? (
            <WallInput
              isAir={brickAir}
              isName="Кладка"
              isId="brick"
              isLambda={brickLambda}
              isSp={brickSp}
              isSpData={brickData}
              isSpDensity={brickDensity}
              isThickness={brickThickness}
              isMaterial={brickMaterial}
              isVapor={brickVapor}
              onAir={handleBrickAir}
              onDensity={handleBrickDensity}
              onLambda={handleBrickLambda}
              onSp={toggleBrickSp}
              onThickness={handleBrickThickness}
              onVapor={handleBrickVapor}
              onName={handleBrickMaterial}
              onName2={handleBrickName}
            />
          ) : null}
          <WallInput
            isPreIns={preIns}
            isAir={insAir}
            isId="ins-1"
            isName="Утеплитель"
            isLambda={insLambda}
            isSp={insSp}
            isSpData={insData}
            isSpDensity={insDensity}
            isThickness={insThickness}
            isMaterial={insMaterial}
            isSecondIns={secondIns}
            isVapo={insVapor}
            onAddSecondIns={handleAddSecondIns}
            onAir={handleInsAir}
            onDensity={handleInsDensity}
            onLambda={handleInsLambda}
            onSp={toggleInsSp}
            onThickness={handleInsThickness}
            onVapor={handleInsVapor}
            onName={handleInsMaterial}
            onName2={handleInsName}
          />
          {secondIns ? (
            <WallInput
              isAir={secondInsAir}
              isName="Утеплитель"
              isId="ins-2"
              isLambda={secondInsLambda}
              isSp={secondInsSp}
              isSpData={secondInsData}
              isSpDensity={secondInsDensity}
              isThickness={secondInsThickness}
              isMaterial={secondInsMaterial}
              isSecondIns={secondIns}
              isVapor={secondInsVapor}
              onAir={handleSecondInsAir}
              onDeleteSecondIns={handleDeleteSecondIns}
              onDensity={handleSecondInsDensity}
              onLambda={handleSecondInsLambda}
              onSp={toggleSecondInsSp}
              onThickness={handleSecondInsThickness}
              onVapor={handleSecondInsVapor}
              onName={handleSecondInsMaterial}
              onName2={handleSecondInsName}
            />
          ) : null}
        </div>
        <div className="wall-options">
          <Form.Label className="ms-3">Штукатурка изнутри</Form.Label>
          <Form.Select id="plaster" onChange={handlePlaster} value={plaster}>
            <option value={1}>Нет</option>
            <option value={2}>Гипсовая</option>
            <option value={3}>Цементная</option>
          </Form.Select>
          <Form.Check
            className="mt-3 ms-4 w-25"
            id="wind-membrane"
            label="Ветрозащита"
            checked={windMembrane}
            onChange={handleWindMembrane}
          ></Form.Check>
          {windMembrane ? (
            <Form.Control
              className="w-50"
              id="wind-membrane-r"
              type="number"
              placeholder="м²чПа/мг"
              value={windMembraneR}
              onChange={handleWindMembraneR}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
