import { useState } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Final() {
  const [firstOk, setFirstOk] = useState();
  const [secondOk, setSecondOk] = useState();
  const [thirdOk, setThirdOk] = useState();

  const navigate = useNavigate();
  return (
    <div className="final">
      {firstOk ? (
        <div>
          <h1>
            <Badge bg="secondary">
              R<sub>у</sub> {'<'} R<sub>тр</sub>
            </Badge>
          </h1>
          <h1>Условие выполнено!</h1>
        </div>
      ) : (
        <div>
          <h1>
            <Badge bg="secondary" size="lg">
              R<sub>у</sub> {'<'} R<sub>тр</sub>
            </Badge>
          </h1>
          <h1>Условие не выполнено!</h1>
        </div>
      )}
      {secondOk ? (
        <div>
          <h1>
            <Badge bg="secondary">
              R<sub>у</sub> {'<'} R<sub>тр</sub>
            </Badge>
          </h1>
          <h1>Условие выполнено!</h1>
        </div>
      ) : (
        <div>
          <h1>
            <Badge bg="secondary" size="lg">
              e<sub>в</sub> {'<'} E<sub>н</sub>
            </Badge>
          </h1>
          <h1>Условие не выполнено!</h1>
        </div>
      )}
      {thirdOk ? (
        <div className="final">
          <h1>
            <Badge bg="secondary">
              R<sub>у</sub> {'<'} R<sub>тр</sub>
            </Badge>
          </h1>
          <h1>Условие выполнено!</h1>
        </div>
      ) : (
        <div>
          <h1>
            <Badge bg="secondary" size="lg">
              R<sub>у</sub> {'<'} R<sub>тр</sub>
            </Badge>
          </h1>
          <h1>Условие не выполнено!</h1>
        </div>
      )}
      <Button
        variant="outline-secondary"
        size="lg"
        onClick={() => {
          navigate('/bracketData');
        }}
      >
        Внести изменения
      </Button>
    </div>
  );
}
