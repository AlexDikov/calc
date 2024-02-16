import { useContext, useState } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { DefaultContext } from '../contexts/DefaultContext';

export default function Final() {
  const [firstOk, setFirstOk] = useState(false);
  const [secondOk, setSecondOk] = useState(false);
  const [thirdOk, setThirdOk] = useState(false);

  const context = useContext(DefaultContext);

  const checkValues = () => {
    if (context.finalValues.r1 < context.finalValues.r2) setFirstOk(true);
    if (context.finalValues.e1 < context.finalValues.e2) setSecondOk(true);
    if (context.finalValues.g1 < context.finalValues.g2) setThirdOk(true);
  };
  checkValues();

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
          <h1>Условие выполнено</h1>
        </div>
      ) : (
        <div>
          <h1>
            <Badge bg="secondary" size="lg">
              R<sub>у</sub> {'>'} R<sub>тр</sub>
            </Badge>
          </h1>
          <h1>Условие не выполнено! Увеличьте слой утеплителя.</h1>
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
              e<sub>в</sub> {'>'} E<sub>н</sub>
            </Badge>
          </h1>
          <h1>Условие не выполнено!</h1>
        </div>
      )}
      {thirdOk ? (
        <div className="final">
          <h1>
            <Badge bg="secondary">
              G {'<'} G<sub>тр</sub>
            </Badge>
          </h1>
          <h1>Условие выполнено!</h1>
        </div>
      ) : (
        <div>
          <h1>
            <Badge bg="secondary" size="lg">
              G<sub>у</sub> {'>'} G<sub>тр</sub>
            </Badge>
          </h1>
          <h1>Условие не выполнено!</h1>
        </div>
      )}
      <Button
        className="btn-previous"
        variant="outline-secondary"
        size="sm"
        onClick={() => {
          navigate('/coverdata');
        }}
      >
        Назад
      </Button>
      <Button
        className="btn-next"
        variant="outline-secondary"
        size="sm"
        onClick={() => {
          navigate('/pz');
        }}
      >
        Далее
      </Button>
    </div>
  );
}
