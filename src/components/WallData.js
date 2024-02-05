import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SecondLayer from './SecondLayer';
import FirstLayer from './FirstLayer';
import Concrete from './Concrete';
import Brick from './Brick';

export default function WallData(props) {
  const navigate = useNavigate();

  const wall = () => {
    if (props.isBuildingType === '1')
      return (
        <Concrete
          onConcreteThickness={props.onConcreteThickness}
          onConcreteDensity={props.onConcreteDensity}
          onConcreteLambda={props.onConcreteLambda}
          onConcreteVapor={props.onConcreteVapor}
          onConcreteAir={props.onConcreteAir}
          isConcreteSpLambda={props.isConcreteSpLambda}
          onConcreteSpLambda={props.onConcreteSpLambda}
        />
      );
    if (props.isBuildingType === '2')
      return (
        <>
          <Concrete
            onConcreteThickness={props.onConcreteThickness}
            onConcreteDensity={props.onConcreteDensity}
            onConcreteLambda={props.onConcreteLambda}
            onConcreteVapor={props.onConcreteVapor}
            onConcreteAir={props.onConcreteAir}
            isConcreteSpLambda={props.isConcreteSpLambda}
            onConcreteSpLambda={props.onConcreteSpLambda}
          />
          <Brick
            onBrickThickness={props.onBrickThickness}
            onBrickDensity={props.onBrickDensity}
            onBrickLambda={props.onBrickLambda}
            onBrickVapor={props.onBrickVapor}
            onBrickAir={props.onBrickAir}
          />
        </>
      );
    if (props.isBuildingType === '3')
      return (
        <Brick
          onBrickThickness={props.onBrickThickness}
          onBrickDensity={props.onBrickDensity}
          onBrickLambda={props.onBrickLambda}
          onBrickVapor={props.onBrickVapor}
          onBrickAir={props.onBrickAir}
        />
      );
  };

  return (
    <div>
      <div className="wallData">
        {wall()}

        <FirstLayer
          onAddSecondLayer={props.onAddSecondLayer}
          isSecondLayer={props.isSecondLayer}
          onInsThickness={props.onInsThickness}
          onInsDensity={props.onInsDensity}
          onInsLambda={props.onInsLambda}
          onInsVapor={props.onInsVapor}
          onInsAir={props.onInsAir}
        />

        {props.isSecondLayer ? (
          <SecondLayer
            onDelete={props.onDeleteSecondLayer}
            onSecondInsThickness={props.onSecondInsThickness}
            onSecondInsDensity={props.onSecondInsDensity}
            onSecondInsLambda={props.onSecondInsLambda}
            onSecondInsVapor={props.onSecondInsVapor}
            onSecondInsAir={props.onSecondInsAir}
          />
        ) : null}
      </div>
      <div className="navbnt position-relative mt-3 mb-3">
        <Button
          variant="outline-secondary"
          size="lg"
          onClick={() => {
            navigate('/');
          }}
        >
          Назад
        </Button>
        <Button
          className="position-absolute end-0 bottom-0"
          variant="outline-secondary"
          size="lg"
          onClick={() => {
            navigate('/systdata');
          }}
        >
          Далее
        </Button>
      </div>
    </div>
  );
}
