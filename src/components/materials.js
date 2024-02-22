export const materials = {
  brick: [
    {
      name: 'газо- и пенобетон на цементном вяжущем',
      value: 1,
      d: {
        400: { la: 0.14, lb: 0.15, v: 0.23 },
        600: { la: 0.22, lb: 0.26, v: 0.17 },
        800: { la: 0.33, lb: 0.37, v: 0.14 },
        1000: { la: 0.38, lb: 0.43, v: 0.11 },
      },
    },
    {
      name: 'керамзитобетон беспесчанный',
      value: 2,
      d: {
        300: { la: 0.105, lb: 0.11, v: 0.195 },
        400: { la: 0.115, lb: 0.125, v: 0.175 },
        500: { la: 0.13, lb: 0.14, v: 0.165 },
        600: { la: 0.14, lb: 0.15, v: 0.155 },
        700: { la: 0.145, lb: 0.155, v: 0.145 },
      },
    },
    {
      name: 'керамзитобетон на керамзитовом песке',
      value: 3,
      d: {
        500: { la: 0.17, lb: 0.23, v: 0.3 },
        600: { la: 0.2, lb: 0.26, v: 0.26 },
        800: { la: 0.24, lb: 0.31, v: 0.19 },
        1000: { la: 0.33, lb: 0.41, v: 0.14 },
        1200: { la: 0.44, lb: 0.52, v: 0.11 },
        1400: { la: 0.56, lb: 0.65, v: 0.098 },
        1600: { la: 0.67, lb: 0.79, v: 0.09 },
        1800: { la: 0.8, lb: 0.92, v: 0.09 },
      },
    },
    { name: 'глиняный обыкновенный на ц-п растворе', value: 4, d: { 1800: { la: 0.81, lb: 0.032, v: 0.11 } } },
    {
      name: 'керамический пустотный на ц-п растворе',
      value: 5,
      d: {
        1200: { la: 0.47, lb: 0.52, v: 0.17 },
        1400: { la: 0.52, lb: 0.58, v: 0.16 },
        1600: { la: 0.58, lb: 0.64, v: 0.14 },
      },
    },
    { name: 'силикатный на ц-п растворе', value: 6, d: { 1800: { la: 0.76, lb: 0.87, v: 0.11 } } },
    { name: 'силикатный 11-пустотный на ц-п растворе', value: 7, d: { 1500: { la: 0.7, lb: 0.81, v: 0.13 } } },
    { name: 'силикатный 14-пустотный на ц-п растворе', value: 8, d: { 1400: { la: 0.64, lb: 0.76, v: 0.14 } } },
  ],

  concrete: [
    { name: 'бетон на гравии или щебне из природного камня', value: 9, d: { 2400: { la: 0.031, lb: 0.032, v: 0.05 } } },
    { name: 'железобетон', value: 10, d: { 2500: { la: 0.031, lb: 0.032, v: 0.05 } } },
    { name: 'раствор цементно-песчанный', value: 11, d: { 1800: { la: 0.031, lb: 0.032, v: 0.05 } } },
  ],

  ins: [
    {
      name: 'листы гипсовые обшивные',
      value: 12,
      d: { 800: { la: 0.019, lb: 0.21, v: 0.075 }, 1050: { la: 0.34, lb: 0.36, v: 0.075 } },
    },
    {
      name: 'пенополистирол',
      value: 13,
      d: {
        10: { la: 0.052, lb: 0.059, v: 0.05 },
        '12-14': { la: 0.044, lb: 0.05, v: 0.05 },
        '14-15': { la: 0.043, lb: 0.049, v: 0.05 },
        '15-17': { la: 0.042, lb: 0.048, v: 0.05 },
        '17-20': { la: 0.041, lb: 0.047, v: 0.05 },
        '20-25': { la: 0.04, lb: 0.046, v: 0.05 },
        '25-30': { la: 0.038, lb: 0.044, v: 0.05 },
        '30-35': { la: 0.04, lb: 0.046, v: 0.05 },
        '35-38': { la: 0.04, lb: 0.046, v: 0.05 },
      },
    },
    {
      name: 'пенополиуретан',
      value: 14,
      d: {
        40: { la: 0.031, lb: 0.04, v: 0.05 },
        60: { la: 0.036, lb: 0.041, v: 0.05 },
        80: { la: 0.042, lb: 0.05, v: 0.05 },
      },
    },
    {
      name: 'плиты из гипса',
      value: 15,
      d: { 1100: { la: 0.035, lb: 0.041, v: 0.11 }, 1350: { la: 0.5, lb: 0.56, v: 0.098 } },
    },
    {
      name: 'плиты из стекольного штапельного волокна',
      value: 16,
      d: {
        15: { la: 0.049, lb: 0.055, v: 0.55 },
        17: { la: 0.047, lb: 0.053, v: 0.54 },
        20: { la: 0.043, lb: 0.046, v: 0.53 },
        30: { la: 0.042, lb: 0.046, v: 0.52 },
        35: { la: 0.041, lb: 0.046, v: 0.52 },
        45: { la: 0.041, lb: 0.045, v: 0.51 },
        60: { la: 0.04, lb: 0.045, v: 0.51 },
        75: { la: 0.042, lb: 0.047, v: 0.5 },
        85: { la: 0.046, lb: 0.05, v: 0.5 },
      },
    },
    {
      name: 'плиты минераловатные из каменного волокна',
      value: 17,
      d: {
        '25-50': { la: 0.042, lb: 0.045, v: 0.37 },
        '40-60': { la: 0.041, lb: 0.044, v: 0.35 },
        '80-125': { la: 0.042, lb: 0.045, v: 0.32 },
        '125-175': { la: 0.043, lb: 0.046, v: 0.31 },
        180: { la: 0.045, lb: 0.048, v: 0.3 },
      },
    },
    {
      name: 'экструдированный пенополистирол',
      value: 18,
      d: { '25-33': { la: 0.03, lb: 0.031, v: 0.05 }, '35-45': { la: 0.031, lb: 0.032, v: 0.05 } },
    },
  ],
};