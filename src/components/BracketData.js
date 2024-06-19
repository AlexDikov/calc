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
  const [bracketList, setBracketList] = useState([]);

  const { addBracket, airCalc, bracketResult, buildingType, concreteWall, setAddBracket, setUKey, vaporCalc, uKey } =
    useContext(DefaultContext);

  useEffect(() => {
    const updatedBrackets = Object.entries(bracketResult).map(([key, item]) => (
      <Bracket
        key={key}
        isBracket={item.bracket}
        isBracketPcs={item.pcs}
        isBracketType={item.type}
        isBracketWeight={item.weight}
        isWallType={item.wall}
      />
    ));
    setBracketList(updatedBrackets);
  }, []);

  const addBracketInput = () => {
    setAddBracket((prevBrackets) => {
      const newBrackets = [...prevBrackets];
      newBrackets.push(<Bracket key={uKey} ukey={uKey} />);
      return newBrackets;
    });
    setUKey((prevKey) => prevKey + 1);
  };

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
      {bracketList}
      <Bracket key={0} ukey={0} />
      {addBracket}
      <button className="add-bracket" key="add-btn" onClick={addBracketInput}></button>

      <LinearLossCalc />
      {(concreteWall || buildingType === 1) && <LinearLossCalcConcrete />}
    </div>
  );
}
