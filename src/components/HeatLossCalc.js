import { bracketData } from './brackets';
import { windows } from './windows';

export default function HeatLossCalc(props) {
  const arrayType = props.isArrayType;

  const ins = () => {
    let ins1, ins2;
    let heatItem;
    let preItem;
    if (arrayType === 'bracketData') {
      console.log(bracketData);
      heatItem = bracketData.find((item) => item.name === props.isBracket);
      if (1.5 < props.insValue && props.insValue < 3) {
        ins1 = heatItem.r1;
        ins2 = heatItem.r2;
      } else if (3 < props.insValue && props.insValue < 6) {
        ins1 = heatItem.r2;
        ins2 = heatItem.r3;
      } else if (6 < props.insValue && props.insValue < 8) {
        ins1 = heatItem.r3;
        ins2 = heatItem.r4;
      }
    } else if (arrayType === 'windows') {
      preItem = windows.find((item) => item.name === props.isWindowDepth);
      heatItem = Object.values(preItem[props.isWindowHeight]);

      if (1.5 < props.insValue && props.insValue < 3) {
        ins1 = heatItem[0];
        ins2 = heatItem[1];
      } else if (3 < props.insValue && props.insValue < 6) {
        ins1 = heatItem[1];
        ins2 = heatItem[2];
      } else if (6 < props.insValue && props.insValue < 8) {
        ins1 = heatItem[2];
        ins2 = heatItem[3];
      }
    }
    return { ins1, ins2 };
  };

  const wall = () => {
    const { ins1, ins2 } = ins();

    if (0.04 < props.wallValue && props.wallValue < 0.2) {
      return [ins1.l1, ins1.l2, ins2.l1, ins2.l2];
    } else if (0.2 < props.wallValue && props.wallValue < 0.6) {
      return [ins1.l2, ins1.l3, ins2.l2, ins2.l3];
    } else if (0.6 < props.wallValue && props.wallValue < 1.8) {
      return [ins1.l3, ins1.l4, ins2.l3, ins2.l4];
    } else if (1.8 < props.wallValue && props.wallValue < 2.1) {
      return [ins1.l4, ins1.l5, ins2.l4, ins2.l5];
    }
  };

  const finalValue = () => {
    const wallResult = wall();

    const wallX1 = () => {
      if (0.04 < props.wallValue && props.wallValue < 0.2) return 0.04;
      if (0.2 < props.wallValue && props.wallValue < 0.6) return 0.2;
      if (0.6 < props.wallValue && props.wallValue < 1.8) return 0.6;
      if (1.8 < props.wallValue && props.wallValue < 2.1) return 1.8;
    };

    const wallX2 = () => {
      if (0.04 < props.wallValue && props.wallValue < 0.2) return 0.2;
      if (0.2 < props.wallValue && props.wallValue < 0.6) return 0.6;
      if (0.6 < props.wallValue && props.wallValue < 1.8) return 1.8;
      if (1.8 < props.wallValue && props.wallValue < 2.1) return 2.1;
    };

    const insX1 = () => {
      if (0.4 < props.insValue && props.insValue < 1.5) return 0.4;
      if (1.5 < props.insValue && props.insValue < 3) return 1.5;
      if (3 < props.insValue && props.insValue < 6) return 3;
      if (6 < props.insValue && props.insValue < 8) return 6;
    };

    const insX2 = () => {
      if (0.4 < props.insValue && props.insValue < 1.5) return 1.5;
      if (1.5 < props.insValue && props.insValue < 3) return 3;
      if (3 < props.insValue && props.insValue < 6) return 6;
      if (6 < props.insValue && props.insValue < 8) return 8;
    };

    const pre1 =
      wallResult[0] + ((props.wallValue - wallX1()) * (wallResult[1] - wallResult[0])) / (wallX2() - wallX1());
    const pre2 =
      wallResult[2] + ((props.wallValue - wallX1()) * (wallResult[3] - wallResult[2])) / (wallX2() - wallX1());

    const final = pre1 + ((props.insValue - insX1()) * (pre2 - pre1)) / (insX2() - insX1());

    arrayType === 'bracketData' ? props.onCalcResult(final) : props.onWindowHeatLoss(final);
  };
  finalValue();
}
