import { Button, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import WallInput from './WallInput';
import { useState } from 'react';
import { DefaultContext } from '../contexts/DefaultContext';

export default function WallData() {
  const navigate = useNavigate();

  return (
    <DefaultContext.Consumer>
      {({
        brickAir,
        brickData,
        brickDensity,
        brickLambda,
        brickMaterial,
        brickSp,
        brickThickness,
        buildingType,
        concreteAir,
        concreteLambda,
        concreteSp,
        cityProp,
        concreteThickness,
        insAir,
        insData,
        insDensity,
        insLambda,
        insMaterial,
        insSp,
        insThickness,
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
        handleVaporMembrane,
        handleVaporMembraneAir,
        handleVaporMembraneR,
        handleWindMembrane,
        handleWindMembraneR,
        secondIns,
        secondInsAir,
        secondInsData,
        secondInsDensity,
        secondInsLambda,
        secondInsMaterial,
        secondInsSp,
        secondInsThickness,
        toggleBrickSp,
        toggleConcreteSp,
        toggleInsSp,
        toggleSecondInsSp,
        vaporMembrane,
        vaporMembraneAir,
        vaporMembraneR,
        windMembrane,
        windMembraneR,
      }) => (
        <div className="wall">
          <div className="wallData">
            {buildingType !== '3' ? (
              <WallInput
                isAir={concreteAir}
                isName="Железобетон"
                isId="concrete"
                isLambda={concreteLambda}
                isSp={concreteSp}
                isSpAir={1}
                isSpLambda={cityProp.s === 'A' ? 1.72 : 2.04}
                isSpVapor={20000}
                isThickness={concreteThickness}
                onAir={handleConcreteAir}
                onDensity={handleConcreteDensity}
                onLambda={handleConcreteLambda}
                onSp={toggleConcreteSp}
                onThickness={handleConcreteThickness}
                onVapor={handleConcreteVapor}
              />
            ) : null}
            {buildingType !== '1' ? (
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
              isAir={insAir}
              isId="ins-1"
              isName="Утеплитель"
              isLambda={insLambda}
              isSp={insSp}
              isSpData={insData}
              isSpDensity={insDensity}
              isThickness={insThickness}
              isMaterial={insMaterial}
              onAddSecondIns={handleAddSecondIns}
              isSecondIns={secondIns}
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
                onDeleteSecondIns={handleDeleteSecondIns}
                isSecondIns={secondIns}
                onAir={handleSecondInsAir}
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
            <Form.Select id="plaster" onChange={handlePlaster}>
              <option>Штукатурка изнутри</option>
              <option value={1}>Нет</option>
              <option value={2}>Гипсовая</option>
              <option value={3}>Цементная</option>
            </Form.Select>
            <Form.Check
              className="mt-3 ms-2"
              id="vapor-membrane"
              label="Пароизоляция"
              checked={vaporMembrane}
              onChange={handleVaporMembrane}
            ></Form.Check>
            {vaporMembrane ? (
              <>
                <Form.Control
                  id="vapor-membrane-r"
                  placeholder="Сопротивление паропроницанию, м²чПа/мг"
                  value={vaporMembraneR}
                  onChange={handleVaporMembraneR}
                />
                <Form.Control
                  id="vapor-membrane-air"
                  placeholder="Сопротивление воздухопроницанию, м²чПа/кг"
                  value={vaporMembraneAir}
                  onChange={handleVaporMembraneAir}
                />
              </>
            ) : null}
            <Form.Check
              className="mt-3 ms-2"
              id="wind-membrane"
              label="Ветрозащита"
              checked={windMembrane}
              onChange={handleWindMembrane}
            ></Form.Check>
            {windMembrane ? (
              <Form.Control
                id="wind-membrane-r"
                placeholder="Сопротивление паропроницанию, м²чПа/мг"
                value={windMembraneR}
                onChange={handleWindMembraneR}
              />
            ) : null}
          </div>
          <Button
            className="btn-previous"
            variant="outline-secondary"
            size="sm"
            onClick={() => {
              navigate('/');
            }}
          >
            Назад
          </Button>
          <Button
            className="btn-next"
            variant="outline-secondary"
            size="sm"
            onClick={() => {
              navigate('/systdata');
            }}
          >
            Далее
          </Button>
        </div>
      )}
    </DefaultContext.Consumer>
  );
}
