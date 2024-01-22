import { Matrix } from 'mathjs';

export const brackets = [
  { a: { name: 'MFT-MF HS', value: 1 }, b: { name: 'MFT-MF HS', value: 2 } },
  { a: { name: 'MFT-MF S', value: 3 }, b: { name: 'MFT-MF S', value: 4 } },
  { a: { name: 'MFT-MF M', value: 5 }, b: { name: 'MFT-MF M', value: 6 }, c: { name: 'MFT-RB M', value: 7 } },
  {
    a: { name: 'MFT-MF LM', value: 8 },
    b: { name: 'MFT-MF LM', value: 9 },
    c: { name: 'MFT-RB LM', value: 10 },
    d: { name: 'MFT-RB LM', value: 11 },
  },
  {
    a: { name: 'MFT-MF L', value: 12 },
    b: { name: 'MFT-MF L', value: 13 },
    c: { name: 'MFT-RB L', value: 14 },
    d: { name: 'MFT-RB L', value: 15 },
  },
  {
    a: { name: 'MFT-MF HAB', value: 16 },
    b: { name: 'MFT-MF LH', value: 17 },
    c: { name: 'MFT-RB LH', value: 18 },
    d: { name: 'MFT-RB LH', value: 19 },
  },
];

export const bracketData = [
  {
    name: 'MFT-MF HS',
    r1: { l1: 0.006, l2: 0.012, l3: 0.027, l4: 0.04, l5: 0.046 },
    r2: { l1: 0.0104, l2: 0.016, l3: 0.03, l4: 0.041, l5: 0.046 },
    r3: { l1: 0.0146, l2: 0.019, l3: 0.03, l4: 0.037, l5: 0.041 },
    r4: { l1: 0.0174, l2: 0.021, l3: 0.03, l4: 0.034, l5: 0.037 },
  },
  {
    name: 'MFT-MF S',
    r1: { l1: 0.006, l2: 0.012, l3: 0.027, l4: 0.041, l5: 0.047 },
    r2: { l1: 0.011, l2: 0.017, l3: 0.032, l4: 0.044, l5: 0.05 },
    r3: { l1: 0.015, l2: 0.02, l3: 0.033, l4: 0.041, l5: 0.046 },
    r4: { l1: 0.017, l2: 0.022, l3: 0.034, l4: 0.039, l5: 0.043 },
  },
  {
    name: 'MFT-MF M',
    r1: { l1: 0.0046, l2: 0.007, l3: 0.013, l4: 0.018, l5: 0.02 },
    r2: { l1: 0.0064, l2: 0.008, l3: 0.012, l4: 0.012, l5: 0.015 },
    r3: { l1: 0.0062, l2: 0.007, l3: 0.009, l4: 0.009, l5: 0.012 },
    r4: { l1: 0.0061, l2: 0.006, l3: 0.007, l4: 0.007, l5: 0.01 },
  },
  {
    name: 'MFT-MF LM',
    r1: { l1: 0.0056, l2: 0.008, l3: 0.014, l4: 0.019, l5: 0.02 },
    r2: { l1: 0.064, l2: 0.008, l3: 0.012, l4: 0.015, l5: 0.017 },
    r3: { l1: 0.068, l2: 0.008, l3: 0.011, l4: 0.012, l5: 0.013 },
    r4: { l1: 0.007, l2: 0.008, l3: 0.01, l4: 0.01, l5: 0.011 },
  },
  {
    name: 'MFT-MF L',
    r1: { l1: 0.0062, l2: 0.009, l3: 0.016, l4: 0.021, l5: 0.024 },
    r2: { l1: 0.007, l2: 0.009, l3: 0.012, l4: 0.017, l5: 0.019 },
    r3: { l1: 0.009, l2: 0.01, l3: 0.013, l4: 0.015, l5: 0.016 },
    r4: { l1: 0.01, l2: 0.011, l3: 0.012, l4: 0.014, l5: 0.014 },
  },
  {
    name: 'MFT-MF LH',
    r1: { l1: 0.0068, l2: 0.01, l3: 0.018, l4: 0.025, l5: 0.028 },
    r2: { l1: 0.0086, l2: 0.011, l3: 0.017, l4: 0.021, l5: 0.023 },
    r3: { l1: 0.0094, l2: 0.011, l3: 0.015, l4: 0.017, l5: 0.018 },
    r4: { l1: 0.01, l2: 0.011, l3: 0.014, l4: 0.014, l5: 0.015 },
  },
  {
    name: 'MFT-RB S',
    r1: { l1: 0.0052, l2: 0.01, l3: 0.022, l4: 0.033, l5: 0.038 },
    r2: { l1: 0.0098, l2: 0.015, l3: 0.028, l4: 0.038, l5: 0.043 },
    r3: { l1: 0.015, l2: 0.02, l3: 0.032, l4: 0.04, l5: 0.044 },
    r4: { l1: 0.019, l2: 0.023, l3: 0.035, l4: 0.041, l5: 0.045 },
  },
  {
    name: 'MFT-RB M',
    r1: { l1: 0.006, l2: 0.012, l3: 0.026, l4: 0.04, l5: 0.046 },
    r2: { l1: 0.011, l2: 0.018, l3: 0.034, l4: 0.046, l5: 0.052 },
    r3: { l1: 0.018, l2: 0.024, l3: 0.039, l4: 0.049, l5: 0.055 },
    r4: { l1: 0.022, l2: 0.028, l3: 0.042, l4: 0.051, l5: 0.056 },
  },
  {
    name: 'MFT-RB L',
    r1: { l1: 0.007, l2: 0.017, l3: 0.041, l4: 0.065, l5: 0.075 },
    r2: { l1: 0.014, l2: 0.025, l3: 0.052, l4: 0.075, l5: 0.086 },
    r3: { l1: 0.024, l2: 0.034, l3: 0.06, l4: 0.08, l5: 0.09 },
    r4: { l1: 0.03, l2: 0.04, l3: 0.065, l4: 0.083, l5: 0.093 },
  },
  {
    name: 'MFT-RB HAB',
    r1: { l1: 0.0074, l2: 0.017, l3: 0.041, l4: 0.065, l5: 0.075 },
    r2: { l1: 0.0142, l2: 0.025, l3: 0.052, l4: 0.075, l5: 0.086 },
    r3: { l1: 0.0236, l2: 0.034, l3: 0.06, l4: 0.08, l5: 0.09 },
    r4: { l1: 0.03, l2: 0.04, l3: 0.065, l4: 0.083, l5: 0.093 },
  },

  {
    name: 'MFT-MF HS',
    r1: { l1: 0.0036, l2: 0.006, l3: 0.012, l4: 0.016, l5: 0.018 },
    r2: { l1: 0.0044, l2: 0.006, l3: 0.01, l4: 0.012, l5: 0.013 },
    r3: { l1: 0.0042, l2: 0.005, l3: 0.007, l4: 0.008, l5: 0.009 },
    r4: { l1: 0.0041, l2: 0.004, l3: 0.005, l4: 0.005, l5: 0.006 },
  },
  {
    name: 'MFT-MF S',
    r1: { l1: 0.005, l2: 0.01, l3: 0.022, l4: 0.033, l5: 0.038 },
    r2: { l1: 0.01, l2: 0.015, l3: 0.028, l4: 0.038, l5: 0.043 },
    r3: { l1: 0.015, l2: 0.02, l3: 0.032, l4: 0.04, l5: 0.044 },
    r4: { l1: 0.019, l2: 0.023, l3: 0.035, l4: 0.041, l5: 0.045 },
  },

  {
    name: 'MFT-MF M',
    r1: { l1: 0.005, l2: 0.01, l3: 0.022, l4: 0.033, l5: 0.038 },
    r2: { l1: 0.01, l2: 0.015, l3: 0.028, l4: 0.038, l5: 0.043 },
    r3: { l1: 0.015, l2: 0.02, l3: 0.032, l4: 0.04, l5: 0.044 },
    r4: { l1: 0.019, l2: 0.023, l3: 0.035, l4: 0.041, l5: 0.045 },
  },
  {
    name: 'MFT-MF LM',
    r1: { l1: 0.005, l2: 0.01, l3: 0.022, l4: 0.033, l5: 0.038 },
    r2: { l1: 0.01, l2: 0.015, l3: 0.028, l4: 0.038, l5: 0.043 },
    r3: { l1: 0.015, l2: 0.02, l3: 0.032, l4: 0.04, l5: 0.044 },
    r4: { l1: 0.019, l2: 0.023, l3: 0.035, l4: 0.041, l5: 0.045 },
  },
  {
    name: 'MFT-MF L',
    r1: { l1: 0.005, l2: 0.01, l3: 0.022, l4: 0.033, l5: 0.038 },
    r2: { l1: 0.01, l2: 0.015, l3: 0.028, l4: 0.038, l5: 0.043 },
    r3: { l1: 0.015, l2: 0.02, l3: 0.032, l4: 0.04, l5: 0.044 },
    r4: { l1: 0.019, l2: 0.023, l3: 0.035, l4: 0.041, l5: 0.045 },
  },
  {
    name: 'MFT-MF LH',
    r1: { l1: 0.005, l2: 0.01, l3: 0.022, l4: 0.033, l5: 0.038 },
    r2: { l1: 0.01, l2: 0.015, l3: 0.028, l4: 0.038, l5: 0.043 },
    r3: { l1: 0.015, l2: 0.02, l3: 0.032, l4: 0.04, l5: 0.044 },
    r4: { l1: 0.019, l2: 0.023, l3: 0.035, l4: 0.041, l5: 0.045 },
  },
  {
    name: 'MFT-RB LM',
    r1: { l1: 0.0064, l2: 0.01, l3: 0.019, l4: 0.027, l5: 0.031 },
    r2: { l1: 0.0092, l2: 0.012, l3: 0.019, l4: 0.024, l5: 0.027 },
    r3: { l1: 0.011, l2: 0.013, l3: 0.018, l4: 0.02, l5: 0.022 },
    r4: { l1: 0.012, l2: 0.014, l3: 0.017, l4: 0.017, l5: 0.018 },
  },
  {
    name: 'MFT-RB L',
    r1: { l1: 0.006, l2: 0.011, l3: 0.023, l4: 0.032, l5: 0.037 },
    r2: { l1: 0.011, l2: 0.014, l3: 0.022, l4: 0.028, l5: 0.031 },
    r3: { l1: 0.013, l2: 0.015, l3: 0.021, l4: 0.024, l5: 0.026 },
    r4: { l1: 0.014, l2: 0.016, l3: 0.02, l4: 0.021, l5: 0.023 },
  },
  {
    name: 'MFT-RB LH',
    r1: { l1: 0.0078, l2: 0.013, l3: 0.026, l4: 0.037, l5: 0.042 },
    r2: { l1: 0.012, l2: 0.016, l3: 0.026, l4: 0.033, l5: 0.037 },
    r3: { l1: 0.015, l2: 0.018, l3: 0.025, l4: 0.029, l5: 0.032 },
    r4: { l1: 0.017, l2: 0.024, l3: 0.024, l4: 0.026, l5: 0.028 },
  },
];
