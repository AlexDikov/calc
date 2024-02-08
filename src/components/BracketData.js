import { useNavigate } from 'react-router-dom';
import Bracket from './Bracket';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import React from 'react';

export default function BracketData(props) {
  const navigate = useNavigate();
  const [addBracket, setAddBracket] = useState([]);
  const [uKey, setUKey] = useState(1);

  function addBracketInput() {
    setAddBracket((prevBrackets) => [
      ...prevBrackets,
      React.cloneElement(<Bracket />, {
        key: uKey,
        ukey: uKey,
        isSecondLayer: props.isSecondLayer,
        isInsThickness: props.isInsThickness,
        isSecondInsThickness: props.isSecondInsThickness,
        isInsLambda: props.isInsLambda,
        isSecondInsLambda: props.isSecondInsLambda,
        isBuildingType: props.isBuildingType,
        isConcreteLambda: props.isConcreteLambda,
        isBrickLambda: props.isBrickLambda,
        onBracketResult: props.onBracketResult,
      }),
    ]);
    setUKey((prevKey) => prevKey + 1);
  }

  return (
    <div className="bracketData">
      <Bracket
        ukey={0}
        isSecondLayer={props.isSecondLayer}
        isInsThickness={props.isInsThickness}
        isSecondInsThickness={props.isSecondInsThickness}
        isInsLambda={props.isInsLambda}
        isSecondInsLambda={props.isSecondInsLambda}
        isBuildingType={props.isBuildingType}
        isConcreteLambda={props.isConcreteLambda}
        isBrickLambda={props.isBrickLambda}
        onBracketResult={props.onBracketResult}
      />
      {addBracket}
      <button className="add-bracket" key="add-btn" onClick={addBracketInput}></button>

      <Button
        className="btn-previous"
        variant="outline-secondary"
        size="sm"
        onClick={() => {
          navigate('/systdata');
        }}
      >
        Назад
      </Button>
      <Button
        className="btn-next"
        variant="outline-secondary"
        size="sm"
        onClick={() => {
          navigate('/coverdata');
        }}
      >
        Далее
      </Button>
    </div>
  );
}
