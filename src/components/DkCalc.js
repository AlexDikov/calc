import { DefaultContext } from '../contexts/DefaultContext';
import { dk } from './dk';
import { useContext, useEffect } from 'react';
export default function DkCalc(props) {
  const context = useContext(DefaultContext);

  const ins = () => {
    let ins1, ins2;
    if (0.02 < context.d && context.d <= 0.04) {
      ins1 = dk.r1;
      ins2 = dk.r2;
    } else if (0.04 < context.d && context.d <= 0.06) {
      ins1 = dk.r2;
      ins2 = dk.r3;
    } else if (0.08 < context.d && context.d <= 0.1) {
      ins1 = dk.r3;
      ins2 = dk.r4;
    } else if (0.1 < context.d && context.d <= 0.12) {
      ins1 = dk.r3;
      ins2 = dk.r4;
    } else if (0.12 < context.d && context.d <= 0.14) {
      ins1 = dk.r5;
      ins2 = dk.r6;
    } else if (0.14 < context.d && context.d <= 0.16) {
      ins1 = dk.r5;
      ins2 = dk.r6;
    } else if (0.16 < context.d && context.d <= 0.18) {
      ins1 = dk.r7;
      ins2 = dk.r8;
    } else if (0.18 < context.d && context.d <= 0.2) {
      ins1 = dk.r9;
      ins2 = dk.r10;
    }
    return { ins1, ins2 };
  };

  const wall = () => {
    const { ins1, ins2 } = ins();

    if (0.001 < context.k && context.k <= 0.005) {
      return [ins1.l1, ins1.l2, ins2.l1, ins2.l2];
    } else if (0.005 < context.k && context.k <= 0.01) {
      return [ins1.l2, ins1.l3, ins2.l2, ins2.l3];
    } else if (0.01 < context.k && context.k <= 0.015) {
      return [ins1.l3, ins1.l4, ins2.l3, ins2.l4];
    } else if (0.015 < context.k && context.k <= 0.02) {
      return [ins1.l4, ins1.l5, ins2.l4, ins2.l5];
    } else if (0.02 < context.k && context.k <= 0.03) {
      return [ins1.l5, ins1.l6, ins2.l5, ins2.l6];
    } else if (0.03 < context.k && context.k <= 0.04) {
      return [ins1.l6, ins1.l7, ins2.l6, ins2.l7];
    } else if (0.04 < context.k && context.k <= 0.06) {
      return [ins1.l7, ins1.l8, ins2.l7, ins2.l8];
    } else if (0.06 < context.k && context.k <= 0.08) {
      return [ins1.l8, ins1.l9, ins2.l8, ins2.l9];
    } else if (0.08 < context.k && context.k <= 0.1) {
      return [ins1.l9, ins1.l10, ins2.l9, ins2.l10];
    } else if (0.1 < context.k && context.k <= 0.12) {
      return [ins1.l10, ins1.l11, ins2.l10, ins2.l11];
    }
  };
  useEffect(() => {
    const finalValue = () => {
      const wallResult = wall();

      const wallX1 = () => {
        if (0.02 <= context.k && context.k < 0.04) return 0.02;
        if (0.04 <= context.k && context.k < 0.06) return 0.04;
        if (0.06 <= context.k && context.k < 0.08) return 0.06;
        if (0.08 <= context.k && context.k < 0.1) return 0.08;
        if (0.1 <= context.k && context.k < 0.12) return 0.1;
        if (0.12 <= context.k && context.k < 0.14) return 0.12;
        if (0.14 <= context.k && context.k < 0.16) return 0.14;
        if (0.16 <= context.k && context.k < 0.18) return 0.16;
        if (0.18 <= context.k && context.k < 0.2) return 0.18;
      };

      const wallX2 = () => {
        if (0.02 < context.k && context.k <= 0.04) return 0.04;
        if (0.04 < context.k && context.k <= 0.06) return 0.06;
        if (0.06 < context.k && context.k <= 0.08) return 0.08;
        if (0.08 < context.k && context.k <= 0.1) return 0.1;
        if (0.1 < context.k && context.k <= 0.12) return 0.12;
        if (0.12 < context.k && context.k <= 0.14) return 0.14;
        if (0.14 < context.k && context.k <= 0.16) return 0.16;
        if (0.16 < context.k && context.k <= 0.18) return 0.18;
        if (0.18 < context.k && context.k <= 0.2) return 0.2;
      };
      const insX1 = () => {
        if (0.001 <= context.d && context.d < 0.005) return 0.001;
        if (0.005 <= context.d && context.d < 0.01) return 0.005;
        if (0.01 <= context.d && context.d < 0.015) return 0.01;
        if (0.02 <= context.d && context.d < 0.03) return 0.02;
        if (0.03 <= context.d && context.d < 0.04) return 0.03;
        if (0.04 <= context.d && context.d < 0.06) return 0.04;
        if (0.06 <= context.d && context.d < 0.08) return 0.06;
        if (0.08 <= context.d && context.d < 0.1) return 0.08;
        if (0.1 <= context.d && context.d < 0.12) return 0.1;
      };

      const insX2 = () => {
        if (0.001 < context.d && context.d <= 0.005) return 0.005;
        if (0.005 < context.d && context.d <= 0.01) return 0.01;
        if (0.01 < context.d && context.d <= 0.015) return 0.015;
        if (0.015 < context.d && context.d <= 0.02) return 0.02;
        if (0.02 < context.d && context.d <= 0.03) return 0.03;
        if (0.03 < context.d && context.d <= 0.04) return 0.04;
        if (0.04 < context.d && context.d <= 0.06) return 0.06;
        if (0.06 < context.d && context.d <= 0.08) return 0.08;
        if (0.08 < context.d && context.d <= 0.1) return 0.1;
        if (0.1 < context.d && context.d <= 0.12) return 0.12;
      };

      const pre1 = wallResult[0] + ((context.k - wallX1()) * (wallResult[1] - wallResult[0])) / (wallX2() - wallX1());
      const pre2 = wallResult[2] + ((context.k - wallX1()) * (wallResult[3] - wallResult[2])) / (wallX2() - wallX1());

      const final = pre1 + ((context.d - insX1()) * (pre2 - pre1)) / (insX2() - insX1());

      context.handleDk(final);
    };
    finalValue();
  }, [context.d, context.k, context.handleDk]);
}
