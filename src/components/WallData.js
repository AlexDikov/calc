import { Button, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import WallInput from './WallInput';
import { useState } from 'react';
import { DefaultContext } from '../contexts/DefaultContext';

export default function WallData({
  isBuildingType,

  onPlaster,

  onWindMembraneR,
}) {
  const navigate = useNavigate();

  return (
    <DefaultContext.Consumer>
      {(context) => (
        <div className="wall">
          <div className="wallData">
            {context.buildingType !== '3' ? (
              <WallInput
                isName="Железобетон"
                isId="concrete"
                isSp={context.concreteSp}
                isSpAir={1}
                isSpLambda={context.cityProp.s === 'A' ? 1.72 : 2.04}
                isSpVapor={20000}
                isThickness={context.concreteThickness}
                onAir={context.handleconcreteAir}
                onDensity={context.handleConcreteDensity}
                onLambda={context.handleConcreteLambda}
                onSp={context.toggleConcreteSp}
                onThickness={context.handleConcreteThickness}
                onVapor={context.handleConcreteVapor}
              />
            ) : null}
            {context.buildingType !== '1' ? (
              <WallInput
                isName="Кладка"
                isId="brick"
                isSp={context.brickSp}
                isSpData={context.brickData}
                isSpDensity={context.brickDensity}
                isThickness={context.brickThickness}
                isMaterial={context.brickMaterial}
                onAir={context.handleBrickAir}
                onDensity={context.handleBrickDensity}
                onLambda={context.handleBrickLambda}
                onSp={context.toggleBrickSp}
                onThickness={context.handleBrickThickness}
                onVapor={context.handleBrickVapor}
                onName={context.handleBrickMaterial}
              />
            ) : null}
            <WallInput
              isId="ins-1"
              isName="Утеплитель"
              isSp={context.insSp}
              isSpData={context.insData}
              isSpDensity={context.insDensity}
              isThickness={context.insThickness}
              isMaterial={context.insMaterial}
              onAddSecondIns={context.handleAddSecondIns}
              isSecondIns={context.secondIns}
              onAir={context.handleInsAir}
              onDensity={context.handleInsDensity}
              onLambda={context.handleInsLambda}
              onSp={context.toggleInsSp}
              onThickness={context.handleInsThickness}
              onVapor={context.handleInsVapor}
              onName={context.handleInsMaterial}
            />
            {context.secondIns ? (
              <WallInput
                isName="Утеплитель"
                isId="ins-2"
                isSp={context.secondInsSp}
                isSpData={context.secondInsData}
                isSpDensity={context.secondInsDensity}
                isThickness={context.secondInsThickness}
                isMaterial={context.secondInsMaterial}
                onDeleteSecondIns={context.handleDeleteSecondIns}
                isSecondIns={context.secondIns}
                onAir={context.handleSecondInsAir}
                onDensity={context.handleSecondInsDensity}
                onLambda={context.handleSecondInsLambda}
                onSp={context.toggleSecondInsSp}
                onThickness={context.handleSecondInsThickness}
                onVapor={context.handleSecondInsVapor}
                onName={context.handleSecondInsMaterial}
              />
            ) : null}
          </div>
          <div className="wall-options">
            <Form.Select id="plaster" onChange={onPlaster}>
              <option>Штукатурка изнутри</option>
              <option value={1}>Нет</option>
              <option value={2}>Гипсовая</option>
              <option value={3}>Цементная</option>
            </Form.Select>
            <Form.Check
              className="mt-3 ms-2"
              id="vapor-membrane"
              label="Пароизоляция"
              onChange={context.handleVaporMembrane}
            ></Form.Check>
            {context.vaporMembrane ? (
              <>
                <Form.Control
                  id="vapor-membrane-r"
                  placeholder="Сопротивление паропроницанию, м²чПа/мг"
                  value={context.VaporMembraneR}
                  onChange={context.handleVaporMembraneR}
                />
                <Form.Control
                  id="vapor-membrane-air"
                  placeholder="Сопротивление воздухопроницанию, м²чПа/кг"
                  onChange={context.handleVaporMembraneAir}
                />
              </>
            ) : null}
            <Form.Check
              className="mt-3 ms-2"
              id="wind-membrane"
              label="Ветрозащита"
              onChange={context.handleWindMembrane}
            ></Form.Check>
            {context.windMembrane ? (
              <Form.Control
                id="wind-membrane-r"
                placeholder="Сопротивление паропроницанию, м²чПа/мг"
                value={context.windMembraneR}
                onChange={onWindMembraneR}
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
