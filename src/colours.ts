import { OrdinalPalette, getOrdinalCategoricalPalette } from '@abcnews/palette';
import { Age, Breakdown, Quintiles, Tenure } from './schemas';

export const getColourFor = (name: Breakdown | undefined, tenureType: Tenure | undefined) => {
  if (!name || !tenureType) return '#000';

  const quintiles: string[] = [...Quintiles.options].reverse();
  const ages: string[] = [...Age.options].reverse();

  const type = quintiles.includes(name) ? quintiles : ages;

  switch (tenureType) {
    case 'everyone':
      return name === 'overall'
        ? '#6E7787'
        : getOrdinalCategoricalPalette(type.length, OrdinalPalette.Green)[type.indexOf(name)];
    case 'owner':
      return name === 'overall'
        ? '#c449b1'
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
