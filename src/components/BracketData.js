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
        isInsHeat: props.isInsHeat,
        isSecondInsHeat: props.isSecondInsHeat,
        isBuildingType: props.isBuildingType,
        isConcreteHeat: props.isConcreteHeat,
        isBrickHeat: props.isBrickHeat,
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
        isInsHeat={props.isInsHeat}
        isSecondInsHeat={props.isSecondInsHeat}
        isBuildingType={props.isBuildingType}
        isConcreteHeat={props.isConcreteHeat}
        isBrickHeat={props.isBrickHeat}
        onBracketResult={props.onBracketResult}
      />
      {addBracket}
      <button className="add-bracket" key="add-btn" onClick={addBracketInput}></button>
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
