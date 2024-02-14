function pickRandomProperty(obj) {
  var result;
  var count = 0;
  for (var prop in obj) if (Math.random() < 1 / ++count) result = prop;
  return result;
}

export function randomBrightColorPicker() {
  var colorsBright = {
    red: {
      700: '#d32f2f',
      800: '#c62828',
      900: '#b71c1c'
    },
    pink: {
      700: '#c2185b',
      800: '#ad1457',
      900: '#880e4f'
    },
    purple: {
      700: '#7b1fa2',
      800: '#6a1b9a',
      900: '#4a148c'
    },
    deepPurple: {
      700: '#512da8',
      800: '#4527a0',
      900: '#311b92'
    },
    indigo: {
      700: '#303f9f',
      800: '#283593',
      900: '#1a237e'
    },
    blue: {
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1'
    },
    lightBlue: {
      700: '#0288d1',
      800: '#0277bd',
      900: '#01579b'
    },
    cyan: {
      700: '#0097a7',
      800: '#00838f',
      900: '#006064'
    },
    teal: {
      700: '#00796b',
      800: '#00695c',
      900: '#004d40'
    },
    green: {
      700: '#388e3c',
      800: '#2e7d32',
      900: '#1b5e20'
    },
    lightGreen: {
      700: '#689f38',
      800: '#558b2f',
      900: '#33691e'
    },
    lime: {
      700: '#afb42b',
      800: '#9e9d24',
      900: '#827717'
    },
    brown: {
      700: '#5d4037',
      800: '#4e342e',
      900: '#3e2723'
    },
    grey: {
      700: '#616161',
      800: '#424242',
      900: '#212121'
    }
  };

  var colorList = colorsBright[pickRandomProperty(colorsBright)];
  var newColorKey = pickRandomProperty(colorList);
  var newColor = colorList[newColorKey];
  return newColor;
}
