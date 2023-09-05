import { Breakdown, Overall, Tenure, VisualisationConfiguration } from './schemas';

export const updateConfig = (config: VisualisationConfiguration): VisualisationConfiguration => {
  const seriesMap = new Map([['all', Overall.enum.overall]]);
  const tenureMap = new Map([
    ['rent', Tenure.enum.renter],
    ['mortgage', Tenure.enum.mortgagor],
    ['mortgagee', Tenure.enum.mortgagor],
    ['overall', Tenure.enum.everyone],
    ['own', Tenure.enum.owner]
  ]);
  return {
    ...config,
    selectedSeries: config.selectedSeries.map(d => seriesMap.get(d) || d),
    selectedTenureTypes: config.selectedTenureTypes.map(d => tenureMap.get(d) || d)
  };
};
