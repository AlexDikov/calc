import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Concrete from './Concrete';
import Brick from './Brick';
import WallInput from './WallInput';

export default function WallData({
  isBuildingType,
  isCityProp,
  isSecondIns,
  onAddSecondIns,
  onBrickAir,
  onBrickDensity,
  onBrickLambda,
  onBrickThickness,
  onBrickVapor,
  onDeleteSecondIns,
  onConcreteAir,
  onConcreteDensity,
  onConcreteLambda,
  onConcreteThickness,
  onConcreteVapor,
  onInsAir,
  onInsDensity,
  onInsLambda,
  onInsThickness,
  onInsVapor,
  onSecondInsAir,
  onSecondInsDensity,
  onSecondInsLambda,
  onSecondInsThickness,
  onSecondInsVapor,
}) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="wallData">
        {isBuildingType !== '3' ? (
          <WallInput
            isCityProp={isCityProp}
            isName="Железобетон"
            isId="concrete"
            onAir={onConcreteAir}
            onDensity={onConcreteDensity}
            onLambda={onConcreteLambda}
            onThickness={onConcreteThickness}
            onVapor={onConcreteVapor}
            isSpAir={1}
            isSpLambda={isCityProp.s === 'A' ? 1.72 : 2.04}
            isSpVapor={20000}
          />
        ) : null}
        {isBuildingType !== '1' ? (
          <WallInput
            isCityProp={isCityProp}
            isName="Кладка"
            isId="brick"
            onAir={onBrickAir}
            onDensity={onBrickDensity}
            onLambda={onBrickLambda}
            onThickness={onBrickThickness}
            onVapor={onBrickVapor}
          />
        ) : null}
        <WallInput
          isCityProp={isCityProp}
          isId="ins-1"
          isName="Утеплитель"
          onAddSecondIns={onAddSecondIns}
          isSecondIns={isSecondIns}
          onAir={onInsAir}
          onDensity={onInsDensity}
          onLambda={onInsLambda}
          onThickness={onInsThickness}
          onVapor={onInsVapor}
        />
        {isSecondIns ? (
          <WallInput
            isCityProp={isCityProp}
            isName="Утеплитель"
            isId="ins-2"
            onDeleteSecondIns={onDeleteSecondIns}
            isSecondIns={isSecondIns}
            onAir={onSecondInsAir}
            onDensity={onSecondInsDensity}
            onLambda={onSecondInsLambda}
            onThickness={onSecondInsThickness}
            onVapor={onSecondInsVapor}
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
  );
}
