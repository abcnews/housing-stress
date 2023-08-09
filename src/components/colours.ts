import { OrdinalPalette, getOrdinalCategoricalPalette } from '@abcnews/palette';

export const getColourFor = (name: string, tenureType: string) => {
  const names = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'].reverse();

  switch (tenureType) {
    case 'overall':
      return name === 'all' ? '#6E7787' : getOrdinalCategoricalPalette(5, OrdinalPalette.Green)[names.indexOf(name)];
    case 'mortgage':
      return name === 'all' ? '#CF4452' : getOrdinalCategoricalPalette(5, OrdinalPalette.Red)[names.indexOf(name)];
    case 'rent':
      return name === 'all' ? '#007BC7' : getOrdinalCategoricalPalette(5, OrdinalPalette.Blue)[names.indexOf(name)];
  }

  return '#000';
};
