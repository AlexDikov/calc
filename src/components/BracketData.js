import { useNavigate } from 'react-router-dom';
import Bracket from './Bracket';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import React from 'react';

export default function BracketData(props) {
  const navigate = useNavigate();
  const [addBracket, setAddBracket] = useState([]);

  const uniqueKey = Math.random();
  function addBracketInput() {
    const newKey = Math.random();
    setAddBracket((prevBrackets) => [
      ...prevBrackets,
      React.cloneElement(<Bracket />, {
        key: newKey,
        ukey: uniqueKey,
        isSecondLayer: props.isSecondLayer,
        isInsThickness: props.isInsThickness,
        isSecondInsThickness: props.isSecondInsThickness,
        isInsHeat: props.isInsHeat,
        isSecondInsHeat: props.isSecondInsHeat,
        isBuildingType: props.isBuildingType,
        isConcreteHeat: props.isConcreteHeat,
        isBracket: props.isBracket,
        isBrickHeat: props.isBrickHeat,
        onBracket: props.onBracket,
        onBracketResult: props.onBracketResult,
      }),
    ]);
  }

  return (
    <div className="bracketData">
      <Bracket
        ukey={132}
        isSecondLayer={props.isSecondLayer}
        isInsThickness={props.isInsThickness}
        isSecondInsThickness={props.isSecondInsThickness}
        isInsHeat={props.isInsHeat}
        isSecondInsHeat={props.isSecondInsHeat}
        isBuildingType={props.isBuildingType}
        isConcreteHeat={props.isConcreteHeat}
        isBracket={props.isBracket}
        isBrickHeat={props.isBrickHeat}
        onBracket={props.onBracket}
        onBracketResult={props.onBracketResult}
      />
      {addBracket}
      <button className="add-bracket" onClick={addBracketInput}></button>
      <div className="navbnt position-relative mt-3 mb-3">
        <Button
          variant="outline-secondary"
          size="lg"
          onClick={() => {
            navigate('/systdata');
          }}
        >
          Назад
        </Button>
        <Button
          className="position-absolute end-0"
          variant="outline-secondary"
          size="lg"
          onClick={() => {
            navigate('/coverdata');
          }}
        >
          Далее
        </Button>
      </div>
    </div>
  );
}
