export const brackets = [
  { a: { name: 'MFT-MF HS' }, b: { name: 'MFT-MF HS(sts)' } },
  { a: { name: 'MFT-MF S' }, c: { name: 'MFT-RB S' } },
  { a: { name: 'MFT-MF M' }, b: { name: 'MFT-MF M(sts)' }, c: { name: 'MFT-RB M' } },
  {
    a: { name: 'MFT-MF LM' },
    b: { name: 'MFT-MF LM(perf)' },
    d: { name: 'MFT-RB LM(perf)' },
  },
  {
    a: { name: 'MFT-MF L' },
    b: { name: 'MFT-MF L(perf)' },
    c: { name: 'MFT-RB L' },
    d: { name: 'MFT-RB L(perf)' },
  },
  {
    a: { name: 'MFT-MF LH' },
    b: { name: 'MFT-MF LH(perf)' },
    c: { name: 'MFT-RB LH' },
    d: { name: 'MFT-RB LH(perf)' },
  },
];

export const bracketData = [
  {
    name: 'MFT-MF HS',
    r0: { l1: 0.0037, l2: 0.099, l3: 0.0254, l4: 0.0395, l5: 0.046 },
    r1: { l1: 0.006, l2: 0.012, l3: 0.027, l4: 0.04, l5: 0.046 },
    r2: { l1: 0.0104, l2: 0.016, l3: 0.03, l4: 0.041, l5: 0.046 },
    r3: { l1: 0.0146, l2: 0.019, l3: 0.03, l4: 0.037, l5: 0.041 },
    r4: { l1: 0.0174, l2: 0.021, l3: 0.03, l4: 0.034, l5: 0.037 },
  },
  {
    name: 'MFT-MF S',
    r0: { l1: 0.0033, l2: 0.0093, l3: 0.0243, l4: 0.0394, l5: 0.0454 },
    r1: { l1: 0.006, l2: 0.012, l3: 0.027, l4: 0.041, l5: 0.047 },
    r2: { l1: 0.011, l2: 0.017, l3: 0.032, l4: 0.044, l5: 0.05 },
    r3: { l1: 0.015, l2: 0.02, l3: 0.033, l4: 0.041, l5: 0.046 },
    r4: { l1: 0.017, l2: 0.022, l3: 0.034, l4: 0.039, l5: 0.043 },
  },
  {
    name: 'MFT-MF M',
    r0: { l1: 0.0032, l2: 0.0091, l3: 0.0238, l4: 0.0389, l5: 0.0452 },
    r1: { l1: 0.006, l2: 0.012, l3: 0.027, l4: 0.041, l5: 0.0472 },
    r2: { l1: 0.0113, l2: 0.0175, l3: 0.033, l4: 0.045, l5: 0.051 },
    r3: { l1: 0.0161, l2: 0.0215, l3: 0.035, l4: 0.044, l5: 0.049 },
    r4: { l1: 0.0193, l2: 0.0242, l3: 0.037, l4: 0.043, l5: 0.0476 },
  },
  {
    name: 'MFT-MF LM',
    r0: { l1: 0.0034, l2: 0.01, l3: 0.0267, l4: 0.0448, l5: 0.0521 },
    r1: { l1: 0.0065, l2: 0.0135, l3: 0.031, l4: 0.048, l5: 0.0553 },
    r2: { l1: 0.0124, l2: 0.02, l3: 0.039, l4: 0.054, l5: 0.0614 },
    r3: { l1: 0.0185, l2: 0.0255, l3: 0.043, l4: 0.055, l5: 0.0615 },
    r4: { l1: 0.0226, l2: 0.0292, l3: 0.0457, l4: 0.0557, l5: 0.0616 },
  },
  {
    name: 'MFT-MF L',
    r0: { l1: 0.0037, l2: 0.0113, l3: 0.0302, l4: 0.0513, l5: 0.0597 },
    r1: { l1: 0.007, l2: 0.015, l3: 0.035, l4: 0.055, l5: 0.0635 },
    r2: { l1: 0.0132, l2: 0.022, l3: 0.044, l4: 0.062, l5: 0.0707 },
    r3: { l1: 0.0196, l2: 0.028, l3: 0.049, l4: 0.063, l5: 0.0707 },
    r4: { l1: 0.0239, l2: 0.032, l3: 0.0523, l4: 0.0637, l5: 0.0708 },
  },
  {
    name: 'MFT-MF LH',
    r0: { l1: 0.0027, l2: 0.0121, l3: 0.0336, l4: 0.0539, l5: 0.0628 },
    r1: { l1: 0.007, l2: 0.0162, l3: 0.038, l4: 0.0585, l5: 0.0675 },
    r2: { l1: 0.015, l2: 0.0239, l3: 0.0463, l4: 0.0671, l5: 0.0763 },
    r3: { l1: 0.023, l2: 0.031, l3: 0.0519, l4: 0.0697, l5: 0.078 },
    r4: { l1: 0.028, l2: 0.0357, l3: 0.0557, l4: 0.0714, l5: 0.079 },
  },
  {
    name: 'MFT-RB S',
    r0: { l1: 0.0028, l2: 0.0073, l3: 0.0188, l4: 0.0303, l5: 0.0353 },
    r1: { l1: 0.0052, l2: 0.01, l3: 0.022, l4: 0.033, l5: 0.038 },
    r2: { l1: 0.0098, l2: 0.015, l3: 0.028, l4: 0.038, l5: 0.043 },
    r3: { l1: 0.015, l2: 0.02, l3: 0.032, l4: 0.04, l5: 0.044 },
    r4: { l1: 0.019, l2: 0.023, l3: 0.035, l4: 0.041, l5: 0.045 },
  },
  {
    name: 'MFT-RB M',
    r0: { l1: 0.0033, l2: 0.0088, l3: 0.0217, l4: 0.0368, l5: 0.0428 },
    r1: { l1: 0.006, l2: 0.012, l3: 0.026, l4: 0.04, l5: 0.046 },
    r2: { l1: 0.011, l2: 0.018, l3: 0.034, l4: 0.046, l5: 0.052 },
    r3: { l1: 0.018, l2: 0.024, l3: 0.039, l4: 0.049, l5: 0.055 },
    r4: { l1: 0.022, l2: 0.028, l3: 0.042, l4: 0.051, l5: 0.056 },
  },
  {
    name: 'MFT-RB L',
    r0: { l1: 0.0043, l2: 0.0137, l3: 0.0371, l4: 0.0637, l5: 0.0742 },
    r1: { l1: 0.008, l2: 0.018, l3: 0.043, l4: 0.069, l5: 0.0797 },
    r2: { l1: 0.015, l2: 0.026, l3: 0.054, l4: 0.079, l5: 0.09 },
    r3: { l1: 0.024, l2: 0.035, l3: 0.062, l4: 0.083, l5: 0.0934 },
    r4: { l1: 0.03, l2: 0.041, l3: 0.0673, l4: 0.0857, l5: 0.0955 },
  },
  {
    r0: { l1: 0.0037, l2: 0.0147, l3: 0.0421, l4: 0.0736, l5: 0.0859 },
    r1: { l1: 0.0084, l2: 0.02, l3: 0.049, l4: 0.08, l5: 0.0926 },
    r2: { l1: 0.0172, l2: 0.03, l3: 0.062, l4: 0.092, l5: 0.1052 },
    r3: { l1: 0.0266, l2: 0.039, l3: 0.07, l4: 0.096, l5: 0.1083 },
    r4: { l1: 0.0329, l2: 0.045, l3: 0.0753, l4: 0.0987, l5: 0.1104 },
  },

  {
    name: 'MFT-MF HS(sts)',
    r0: { l1: 0.004, l2: 0.006, l3: 0.0131, l4: 0.0181, l5: 0.0194 },
    r1: { l1: 0.004, l2: 0.006, l3: 0.012, l4: 0.016, l5: 0.017 },
    r2: { l1: 0.004, l2: 0.006, l3: 0.01, l4: 0.012, l5: 0.0125 },
    r3: { l1: 0.004, l2: 0.005, l3: 0.007, l4: 0.008, l5: 0.0083 },
    r4: { l1: 0.004, l2: 0.004, l3: 0.005, l4: 0.005, l5: 0.0054 },
  },

  {
    name: 'MFT-MF M(sts)',
    r0: { l1: 0.0036, l2: 0.0065, l3: 0.0135, l4: 0.02, l5: 0.0219 },
    r1: { l1: 0.0046, l2: 0.007, l3: 0.013, l4: 0.018, l5: 0.0193 },
    r2: { l1: 0.0064, l2: 0.008, l3: 0.012, l4: 0.014, l5: 0.0145 },
    r3: { l1: 0.0062, l2: 0.007, l3: 0.009, l4: 0.011, l5: 0.0115 },
    r4: { l1: 0.0061, l2: 0.0063, l3: 0.007, l4: 0.009, l5: 0.0095 },
  },
  {
    name: 'MFT-MF LM(perf)',
    r0: { l1: 0.0052, l2: 0.008, l3: 0.0151, l4: 0.0211, l5: 0.0227 },
    r1: { l1: 0.0056, l2: 0.008, l3: 0.014, l4: 0.019, l5: 0.0203 },
    r2: { l1: 0.0064, l2: 0.008, l3: 0.012, l4: 0.015, l5: 0.0158 },
    r3: { l1: 0.0068, l2: 0.008, l3: 0.011, l4: 0.012, l5: 0.0123 },
    r4: { l1: 0.0071, l2: 0.008, l3: 0.0103, l4: 0.01, l5: 0.0099 },
  },
  {
    name: 'MFT-MF L(perf)',
    r0: { l1: 0.0058, l2: 0.009, l3: 0.0171, l4: 0.0231, l5: 0.0247 },
    r1: { l1: 0.0062, l2: 0.009, l3: 0.016, l4: 0.021, l5: 0.0223 },
    r2: { l1: 0.007, l2: 0.009, l3: 0.014, l4: 0.017, l5: 0.0178 },
    r3: { l1: 0.009, l2: 0.01, l3: 0.013, l4: 0.015, l5: 0.0155 },
    r4: { l1: 0.01, l2: 0.0107, l3: 0.0123, l4: 0.014, l5: 0.014 },
  },
  {
    name: 'MFT-MF LH(perf)',
    r0: { l1: 0.0059, l2: 0.095, l3: 0.0185, l4: 0.0271, l5: 0.0294 },
    r1: { l1: 0.007, l2: 0.01, l3: 0.018, l4: 0.025, l5: 0.0268 },
    r2: { l1: 0.009, l2: 0.011, l3: 0.017, l4: 0.021, l5: 0.022 },
    r3: { l1: 0.009, l2: 0.011, l3: 0.015, l4: 0.017, l5: 0.0175 },
    r4: { l1: 0.01, l2: 0.011, l3: 0.0137, l4: 0.0143, l5: 0.0145 },
  },
  {
    name: 'MFT-RB LM(perf)',
    r0: { l1: 0.0049, l2: 0.0089, l3: 0.019, l4: 0.0286, l5: 0.031 },
    r1: { l1: 0.0064, l2: 0.01, l3: 0.019, l4: 0.027, l5: 0.029 },
    r2: { l1: 0.0092, l2: 0.012, l3: 0.019, l4: 0.024, l5: 0.0253 },
    r3: { l1: 0.011, l2: 0.013, l3: 0.018, l4: 0.02, l5: 0.0205 },
    r4: { l1: 0.012, l2: 0.014, l3: 0.017, l4: 0.017, l5: 0.0173 },
  },
  {
    name: 'MFT-RB L(perf)',
    r0: { l1: 0.0033, l2: 0.0094, l3: 0.024, l4: 0.0341, l5: 0.0369 },
    r1: { l1: 0.006, l2: 0.011, l3: 0.023, l4: 0.032, l5: 0.0343 },
    r2: { l1: 0.011, l2: 0.014, l3: 0.022, l4: 0.028, l5: 0.0295 },
    r3: { l1: 0.013, l2: 0.015, l3: 0.021, l4: 0.024, l5: 0.0246 },
    r4: { l1: 0.014, l2: 0.016, l3: 0.02, l4: 0.021, l5: 0.0216 },
  },
  {
    name: 'MFT-RB LH(perf)',
    r0: { l1: 0.0056, l2: 0.0114, l3: 0.026, l4: 0.0391, l5: 0.0425 },
    r1: { l1: 0.0078, l2: 0.013, l3: 0.026, l4: 0.037, l5: 0.0398 },
    r2: { l1: 0.012, l2: 0.016, l3: 0.026, l4: 0.033, l5: 0.0348 },
    r3: { l1: 0.015, l2: 0.018, l3: 0.025, l4: 0.029, l5: 0.03 },
    r4: { l1: 0.017, l2: 0.024, l3: 0.024, l4: 0.026, l5: 0.0268 },
  },
];
