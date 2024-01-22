import { useNavigate } from 'react-router-dom';
import Bracket from './Bracket';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function BracketData(props) {
  const navigate = useNavigate();
  const [addBracket, setAddBracket] = useState([]);
  //useEffect(() => props.onBracketType(), []);

  function addBracketInput() {
    setAddBracket([...addBracket, <Bracket />]);
  }
  return (
    <div className="bracketData">
      <Bracket onBracketResult={props.onBracketResult} isArrayType={props.isArrayType} />

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
