import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SecondLayer from './SecondLayer';
import FirstLayer from './FirstLayer';
import Concrete from './Concrete';
import Brick from './Brick';

export default function WallData(props) {
  const navigate = useNavigate();

  const wall = () => {
    if (props.isBuildingType == 1)
      return (
        <Concrete
          onConcreteThickness={props.onConcreteThickness}
          onConcreteDensity={props.onConcreteDensity}
          onConcreteHeat={props.onConcreteHeat}
          onConcreteVapor={props.onConcreteVapor}
          onConcreteAir={props.onConcreteAir}
          isConcreteSpHeat={props.isConcreteSpHeat}
          onConcreteSpHeat={props.onConcreteSpHeat}
        />
      );
    if (props.isBuildingType == 2)
      return (
        <>
          <Concrete
            onConcreteThickness={props.onConcreteThickness}
            onConcreteDensity={props.onConcreteDensity}
            onConcreteHeat={props.onConcreteHeat}
            onConcreteVapor={props.onConcreteVapor}
            onConcreteAir={props.onConcreteAir}
            isConcreteSpHeat={props.isConcreteSpHeat}
            onConcreteSpHeat={props.onConcreteSpHeat}
          />
          <Brick
            onAddFirstLayer={props.onAddFirstLayer}
            isFirstLayer={props.isFirstLayer}
            onBrickThickness={props.onBrickThickness}
            onBrickDensity={props.onBrickDensity}
            onBrickHeat={props.onBrickHeat}
            onBrickVapor={props.onBrickVapor}
            onBrickAir={props.onBrickAir}
          />
        </>
      );
    if (props.isBuildingType == 3)
      return (
        <Brick
          onAddFirstLayer={props.onAddFirstLayer}
          isFirstLayer={props.isFirstLayer}
          onBrickThickness={props.onBrickThickness}
          onBrickDensity={props.onBrickDensity}
          onBrickHeat={props.onBrickHeat}
          onBrickVapor={props.onBrickVapor}
          onBrickAir={props.onBrickAir}
        />
      );
  };

  return (
    <div>
      <div className="wallData">
        {wall()}
        {props.isFirstLayer ? (
          <FirstLayer
            onDelete={props.onDeleteFirstLayer}
            onAddSecondLayer={props.onAddSecondLayer}
            isSecondLayer={props.isSecondLayer}
            onInsThickness={props.onInsThickness}
            onInsDensity={props.onInsDensity}
            onInsHeat={props.onInsHeat}
            onInsVapor={props.onInsVapor}
            onInsAir={props.onInsAir}
          />
        ) : null}
        {props.isSecondLayer ? (
          <SecondLayer
            onDelete={props.onDeleteSecondLayer}
            onSecondInsThickness={props.onSecondInsThickness}
            onSecondInsDensity={props.onSecondInsDensity}
            onSecondInsHeat={props.onSecondInsHeat}
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
            navigate('/objdata');
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
