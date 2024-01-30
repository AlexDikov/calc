import { windows } from './windows';
import { bracketData } from './brackets';

export default function DCalc(props) {
  const value1 = props.isSecondLayer
    ? 0.001 /
      ((props.isInsThickness / (props.isInsThickness + props.isSecondInsThickness)) * props.isInsHeat +
        (props.isSecondInsThickness / (props.isInsThickness + props.isSecondInsThickness)) * props.isSecondInsHeat)
    : props.isInsThickness / props.isInsHeat;
  const value2 = props.isBuildingType === 1 ? props.isConcreteHeat : props.isBrickHeat;

  const row = () => {
    if (props.ArrayType === 'windows') {
      let row1, row2;
      let item;
      let preItem;

      preItem = windows.find((item) => item.name === props.isWindowDepth);
      item = Object.values(preItem[props.isWindowHeight]);

      if (1.5 < value1 && value1 < 3) {
        row1 = item[0];
        row2 = item[1];
      } else if (3 < value1 && value1 < 6) {
        row1 = item[1];
        row2 = item[2];
      } else if (6 < value1 && value1 < 8) {
        row1 = item[2];
        row2 = item[3];
      }

      return { row1, row2 };
    } else {
      let row1, row2;
      let heatItem;

      heatItem = bracketData.find((item) => item.name === props.isBracket);
      if (1.5 < value1 && value1 < 3) {
        row1 = heatItem.r1;
        row2 = heatItem.r2;
      } else if (3 < value1 && value1 < 6) {
        row1 = heatItem.r2;
        row2 = heatItem.r3;
      } else if (6 < value1 && value1 < 8) {
        row1 = heatItem.r3;
        row2 = heatItem.r4;
      }

      return { row1, row2 };
    }
  };

  const column = () => {
    const { row1, row2 } = row();

    if (0.04 < value2 && value2 < 0.2) {
      return [row1.l1, row1.l2, row2.l1, row2.l2];
    } else if (0.2 < value2 && value2 < 0.6) {
      return [row1.l2, row1.l3, row2.l2, row2.l3];
    } else if (0.6 < value2 && value2 < 1.8) {
      return [row1.l3, row1.l4, row2.l3, row2.l4];
    } else if (1.8 < value2 && value2 < 2.1) {
      return [row1.l4, row1.l5, row2.l4, row2.l5];
    }
  };

  const finalValue = () => {
    const columnResult = column();

    const x1 = () => {
      if (0.04 < value2 && value2 < 0.2) return 0.04;
      if (0.2 < value2 && value2 < 0.6) return 0.2;
      if (0.6 < value2 && value2 < 1.8) return 0.6;
      if (1.8 < value2 && value2 < 2.1) return 1.8;
    };

    const x2 = () => {
      if (0.04 < value2 && value2 < 0.2) return 0.2;
      if (0.2 < value2 && value2 < 0.6) return 0.6;
      if (0.6 < value2 && value2 < 1.8) return 1.8;
      if (1.8 < value2 && value2 < 2.1) return 2.1;
    };

    const y1 = () => {
      if (0.4 < value1 && value1 < 1.5) return 0.4;
      if (1.5 < value1 && value1 < 3) return 1.5;
      if (3 < value1 && value1 < 6) return 3;
      if (6 < value1 && value1 < 8) return 6;
    };

    const y2 = () => {
      if (0.4 < value1 && value1 < 1.5) return 1.5;
      if (1.5 < value1 && value1 < 3) return 3;
      if (3 < value1 && value1 < 6) return 6;
      if (6 < value1 && value1 < 8) return 8;
    };

    const pre1 = columnResult[0] + ((value2 - x1()) * (columnResult[1] - columnResult[0])) / (x2() - x1());
    const pre2 = columnResult[2] + ((value2 - x1()) * (columnResult[3] - columnResult[2])) / (x2() - x1());

    const final = pre1 + ((value1 - y1()) * (pre2 - pre1)) / (y2() - y1());

    props.onWindowHeatLoss(final);
  };
  finalValue();
}
