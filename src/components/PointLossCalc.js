import { useContext, useEffect } from 'react';
import { bracketData } from './brackets';
import { DefaultContext } from '../contexts/DefaultContext';

export default function PointLossCalc(props) {
  const { isBracket, ukey, isBracketPcs, isBracketType, isBracketWeight, isWallType } = props;
  const context = useContext(DefaultContext);
  useEffect(() => {
    const insValue = context.secondIns
      ? context.insThickness / context.insLambda + context.secondInsThickness / context.secondInsLambda
      : context.insThickness / context.insLambda;
    const wallValue = props.isBracketType === true ? context.concreteLambda : context.brickLambda;

    const ins = () => {
      let ins1, ins2;
      let heatItem;

      heatItem = bracketData.find((item) => item.name === props.isBracket);
      if (1.5 < insValue && insValue < 3) {
        ins1 = heatItem.r1;
        ins2 = heatItem.r2;
      } else if (3 < insValue && insValue < 6) {
        ins1 = heatItem.r2;
        ins2 = heatItem.r3;
      } else if (6 < insValue && insValue < 8) {
        ins1 = heatItem.r3;
        ins2 = heatItem.r4;
      }

      return { ins1, ins2 };
    };

    const wall = () => {
      const { ins1, ins2 } = ins();

      if (0.04 < wallValue && wallValue < 0.2) {
        return [ins1.l1, ins1.l2, ins2.l1, ins2.l2];
      } else if (0.2 < wallValue && wallValue < 0.6) {
        return [ins1.l2, ins1.l3, ins2.l2, ins2.l3];
      } else if (0.6 < wallValue && wallValue < 1.8) {
        return [ins1.l3, ins1.l4, ins2.l3, ins2.l4];
      } else if (1.8 < wallValue && wallValue < 2.1) {
        return [ins1.l4, ins1.l5, ins2.l4, ins2.l5];
      }
    };

    const finalValue = () => {
      const wallResult = wall();

      const wallX1 = () => {
        if (0.04 < wallValue && wallValue < 0.2) return 0.04;
        if (0.2 < wallValue && wallValue < 0.6) return 0.2;
        if (0.6 < wallValue && wallValue < 1.8) return 0.6;
        if (1.8 < wallValue && wallValue < 2.1) return 1.8;
      };

      const wallX2 = () => {
        if (0.04 < wallValue && wallValue < 0.2) return 0.2;
        if (0.2 < wallValue && wallValue < 0.6) return 0.6;
        if (0.6 < wallValue && wallValue < 1.8) return 1.8;
        if (1.8 < wallValue && wallValue < 2.1) return 2.1;
      };

      const insX1 = () => {
        if (0.4 < insValue && insValue < 1.5) return 0.4;
        if (1.5 < insValue && insValue < 3) return 1.5;
        if (3 < insValue && insValue < 6) return 3;
        if (6 < insValue && insValue < 8) return 6;
      };

      const insX2 = () => {
        if (0.4 < insValue && insValue < 1.5) return 1.5;
        if (1.5 < insValue && insValue < 3) return 3;
        if (3 < insValue && insValue < 6) return 6;
        if (6 < insValue && insValue < 8) return 8;
      };

      const pre1 = wallResult[0] + ((wallValue - wallX1()) * (wallResult[1] - wallResult[0])) / (wallX2() - wallX1());
      const pre2 = wallResult[2] + ((wallValue - wallX1()) * (wallResult[3] - wallResult[2])) / (wallX2() - wallX1());

      const final = pre1 + ((insValue - insX1()) * (pre2 - pre1)) / (insX2() - insX1());

      context.handleBracketResult({
        index: ukey,
        value: final,
        bracket: isBracket,
        pcs: isBracketPcs,
        weight: isBracketWeight,
        type: isBracketType,
        wall: isWallType,
      });
    };

    finalValue();
  }, [ukey, isBracket, isBracketPcs, isBracketType, isBracketWeight, isWallType]);
}
