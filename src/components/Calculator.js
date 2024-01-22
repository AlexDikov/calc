import { useState } from 'react';
import BracketParam from './HeatLossCalc';
import HeatLossCalc from './HeatLossCalc';

export default function Calculator(props) {
  const wallHeatCond = props.wall;
  const heatTemp = props.isHeatTemp;
  const heatLength = props.isHeatLength;
  const innerTemp = props.isInnerTemp;
  const innerHumidity = props.isInnerHumidity;
  const k = 1.3;

  const b = () => {
    if (props.isBuildingAim == 1) return 1.4;
    if (props.isBuildingAim == 2) return 1.2;
    if (props.isBuildingAim == 3) return 1;
  };
  const a = () => {
    if (props.isBuildingAim == 1) return 0.00035;
    if (props.isBuildingAim == 2) return 0.0003;
    if (props.isBuildingAim == 3) return 0.0002;
  };

  const rCond = props.rCond;
  const rS = props.rS;
  const height = props.height;
  const tempOut = props.tempOut;
  const gapAreaIn = props.gapAreaIn;
  const gapAreaOut = props.gapAreaOut;
  const gapAreaMed = props.gapAreaMed;
  const gapThickness = props.gapThickness;
  const c = props.c;
  const alphaOutWall = props.alphaOutWall;
  const rRainscreen = props.rRainscreen;
  const tempIn = props.tempIn;
  const rVaporWhole = props.rVaporWhole;
  const rVaporIn = props.rVaporIn;
  const eVaporIn = props.eVaporIn;
  const eVaporOut = props.eVaporOut;

  const gsop = (innerTemp - heatTemp) * heatLength;
  const rObl = (a() * gsop + b()) * props.isMr;
  const preIns =
    (k * rObl -
      props.isConcreteThickness / 1000 / props.isConcreteSpHeat -
      props.isBrickThickness / 1000 / props.isBrickHeat -
      1 / 8.7 -
      1 / 12) *
    (props.isSecondIns
      ? props.isInsThickness / 1000 +
        props.isSecondInsThickness /
          1000 /
          (props.isInsThickness / 1000 / props.isInsHeat + props.isSecondInsThickness / 1000 / props.isSecondInsHeat)
      : props.isInsHeat);

  const insValue = 2.5;
  const wallValue = 0.26;

  const linearLoss = props.isWindowHeatLoss * props.isWindowLength;

  const pointLoss =
    (props.calcResult * props.isBracketPcs) / (props.concreteArea + props.brickArea) +
    (props.isGribDepth * props.isGribPcs) / (props.concreteArea + props.brickArea);

  const rRed = 1 / (1 / rCond + linearLoss + pointLoss);
  const rCond0 = 1 / 8.7 + rS + 1 / 12;
  //   const r = rRed / rCond0;

  //   const tempGap = tempOut + 1;
  //   const epsilon =
  //     1.2(gapAreaMed / gapAreaIn) ^ (2 + ((0.04 * height) / 2) * gapThickness + 1.2(gapAreaMed / gapAreaOut));

  //   const vGap = Math.sqrt((0.08 * height(tempGap - tempOut)) / epsilon);
  //   const xZero = 1005 * vGap * gapThickness * (373 / 273 + tempGap);
  //   const m = (0.04 * ((273 + tempGap) / 100)) ^ 3;
  //   const alphaC = 7.34(vGap) ^ (0.656 + 3.78 * Math.E) ^ (-1.91 * vGap);
  //   const alphaR = m / (1 / 5.77 + 1 / 4, 4 + 1 / c);
  //   const alphaGap = alphaC + 2 * alphaR;
  //   const rOut = 1 / alphaOutWall + 1 / alphaGap + rRainscreen;
  //   const tempZero = (tempIn / rRed + tempOut / rOut) / (1 / rRed + rOut);
  //   const tempGaps = tempZero - (((tempZero - tempOut) * xZero) / height) * (1 - Math.exp(-height / xZero));

  //   const vRedStart = Math.sqrt((0.08 * height) / epsilon) * Math.sqrt(rOut * rRed * (tempIn - tempOut));

  //   const q = ((1 / 2) * rVaporWhole + (1 / 4) * rVaporIn) * (eVaporIn - eVaporOut);
  return;
}
