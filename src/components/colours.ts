import { OrdinalPalette, getOrdinalCategoricalPalette } from '@abcnews/palette';

export const getColourFor = (name: string, tenureType: string) => {
  const quartiles = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'].reverse();
  const ages = ['<35', '35 to 49', '50 to 64', '65+'].reverse();

  const type = quartiles.includes(name) ? quartiles : ages;

  switch (tenureType) {
    case 'overall':
      return name === 'all'
        ? '#6E7787'
        : getOrdinalCategoricalPalette(type.length, OrdinalPalette.Green)[type.indexOf(name)];
    case 'own':
      return name === 'all'
        ? '#6E7787'
        : getOrdinalCategoricalPalette(type.length, OrdinalPalette.Purple)[type.indexOf(name)];
    case 'mortgage':
      return name === 'all'
        ? '#CF4452'
        : getOrdinalCategoricalPalette(type.length, OrdinalPalette.Red)[type.indexOf(name)];
    case 'rent':
      return name === 'all'
        ? '#007BC7'
        : getOrdinalCategoricalPalette(type.length, OrdinalPalette.Blue)[type.indexOf(name)];
  }

  return '#000';
};
