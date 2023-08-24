import { VisualisationConfiguration } from './schemas';

export const updateConfig = (config: VisualisationConfiguration): VisualisationConfiguration => {
  const seriesMap = new Map([['all', 'overall']]);
  const tenureMap = new Map([
    ['rent', 'renter'],
    ['mortgage', 'mortgagee'],
    ['overall', 'everyone'],
    ['own', 'owner']
  ]);
  return {
    ...config,
    selectedSeries: config.selectedSeries.map(d => seriesMap.get(d) || d),
    selectedTenureTypes: config.selectedTenureTypes.map(d => tenureMap.get(d) || d)
  };
};
