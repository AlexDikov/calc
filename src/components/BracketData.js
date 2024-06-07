import { useNavigate } from 'react-router-dom';
import Bracket from './Bracket';
import { Button, ProgressBar } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { DefaultContext } from '../contexts/DefaultContext';
import LinearLossCalc from './LinearLossCalc';
import LinearLossCalcConcrete from './LinearLossCalcConcrete';

export default function BracketData(props) {
  const navigate = useNavigate();

  const { addBracket, airCalc, bracketResult, buildingType, concreteWall, setAddBracket, setUKey, vaporCalc, uKey } =
    useContext(DefaultContext);

  useEffect(() => {
    addBracket.map((item) => {
      React.cloneElement(<Bracket />, {
        key: uKey,
        ukey: uKey,
      });
    });
  });

  function addBracketInput() {
    setAddBracket((prevBrackets) => [
      ...prevBrackets,
      React.cloneElement(<Bracket />, {
        key: uKey,
        ukey: uKey,
      }),
    ]);
    setUKey((prevKey) => prevKey + 1);
  }

  return (
    <div className="bracketData">
      <ProgressBar variant="secondary" now={80} label={`${80}%`} />
      <div className="d-flex justify-content-between">
        <Button
          className="mt-2"
          variant="outline-secondary"
          size="sm"
          onClick={() => {
            navigate('/systdata');
          }}
        >
          Назад
        </Button>
        <Button
          className="mt-2"
          variant="outline-secondary"
          size="sm"
          onClick={() => {
            navigate(vaporCalc || airCalc ? '/coverdata' : '/final');
          }}
        >
          Далее
        </Button>
      </div>
      <Bracket ukey={0} hide={true} />
      {addBracket}
      <button className="add-bracket" key="add-btn" onClick={addBracketInput}></button>

      <LinearLossCalc />
      {(concreteWall || buildingType === 1) && <LinearLossCalcConcrete />}
    </div>
  );
}
