import { OrdinalPalette, getOrdinalCategoricalPalette } from '@abcnews/palette';

export const getColourFor = (name: string, tenureType: string) => {
  const quartiles = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'].reverse();
  const ages = ['<35', '35 to 49', '50 to 64', '65+'].reverse();

  const type = quartiles.includes(name) ? quartiles : ages;

  switch (tenureType) {
    case 'everyone':
      return name === 'overall'
        ? '#6E7787'
        : getOrdinalCategoricalPalette(type.length, OrdinalPalette.Green)[type.indexOf(name)];
    case 'owner':
      return name === 'overall'
        ? '#6E7787'
        : getOrdinalCategoricalPalette(type.length, OrdinalPalette.Purple)[type.indexOf(name)];
    case 'mortgagee':
      return name === 'overall'
        ? '#CF4452'
        : getOrdinalCategoricalPalette(type.length, OrdinalPalette.Red)[type.indexOf(name)];
    case 'renter':
      return name === 'overall'
        ? '#007BC7'
        : getOrdinalCategoricalPalette(type.length, OrdinalPalette.Blue)[type.indexOf(name)];
  }

  return '#000';
};
