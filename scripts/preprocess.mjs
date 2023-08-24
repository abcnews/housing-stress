import path from 'node:path';
import xlsx from 'xlsx';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync, writeFile } from 'node:fs';
import { csvParse, csvFormat } from 'd3-dsv';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataPath = path.join(__dirname, '..', 'data');
const rentMortgageOz2Path = path.join(dataPath, 'ben-philips-housing-data', 'Rent Mortgage Oz2.xls');
const tenurePath = path.join(dataPath, 'ben-philips-housing-data', 'tenureqntl.csv');
const hstress3Path = path.join(dataPath, 'ben-philips-housing-data', 'hstress3.xlsx');
const outputPath = path.join(dataPath, 'housing-data-clean', 'data.json');
const outputPathCSV = path.join(dataPath, 'housing-data-clean', 'data.csv');

const rentMortgageOz2 = xlsx.readFile(rentMortgageOz2Path);

// Everyone / Quintile
const byQuintileRaw = xlsx.utils.sheet_to_json(rentMortgageOz2.Sheets['working'], { range: 'B60:U65' });
const byQuintile = byQuintileRaw.reduce((acc, d) => {
  const quintile = d.Year;
  Object.entries(d).forEach(([year, pct]) => {
    if (year !== 'Year') {
      acc.push({ tenure: 'everyone', breakdown: quintile, year: +year, pct });
    }
  });
  return acc;
}, []);

// (Renter/Mortgagee) / Quintile
const byTenureAndQunintileRaw = csvParse(readFileSync(tenurePath).toString());
const byTenureAndQunintile = byTenureAndQunintileRaw.map(d => {
  return {
    tenure: d.Tenure === 'Renter' ? 'renter' : 'mortgagee',
    breakdown: d.Quintile,
    year: +d.Year,
    pct: +d.Mortgage // This column is missnamed in the CSV
  };
});

// (Renter/Mortgagee/Everyone) / Overall
const byTenureRaw = xlsx.utils.sheet_to_json(rentMortgageOz2.Sheets['working'], { range: 'A24:D44' });
const byTenure = byTenureRaw.reduce((acc, d) => {
  acc.push({ tenure: 'renter', breakdown: 'overall', year: +d.Year, pct: +d.Rent });
  acc.push({ tenure: 'mortgagee', breakdown: 'overall', year: +d.Year, pct: +d.Mortgage });
  acc.push({ tenure: 'everyone', breakdown: 'overall', year: +d.Year, pct: +d.All });
  return acc;
}, []);

// (Renter/Mortgagee/Owner) / Age
const byAgeWorkbook = xlsx.readFile(hstress3Path);
const byTenureAndAgeRaw = xlsx.utils.sheet_to_json(byAgeWorkbook.Sheets['Table 32 - Table 32'], { range: 'P5:U58' });
const byTenureAndAge = byTenureAndAgeRaw.reduce((acc, d) => {
  const tenureMap = new Map([
    ['Mortgagor', 'mortgagee'],
    ['Renter', 'renter'],
    ['Owner', 'owner']
  ]);
  Object.entries(d).forEach(([key, value]) => {
    if (!key.startsWith('__')) {
      acc.push({
        tenure: tenureMap.get(d.__EMPTY_1),
        breakdown: key,
        year: +d.__EMPTY,
        pct: value
      });
    }
  });
  return acc;
}, []);

// Owners / Overall
// Get a list of the years covered to match up with data
const byOwnersOverallYears = xlsx.utils.sheet_to_json(byAgeWorkbook.Sheets['Table 4 - Table 4'], { range: 'A5:A23' });
const byOwnersOverallRaw = xlsx.utils
  .sheet_to_json(byAgeWorkbook.Sheets['Table 4 - Table 4'], { range: 'B3:C23' })
  .slice(1) // Get rid of extra row due to merged cells in source sheet
  .map((d, i) => ({ ...byOwnersOverallYears[i], ...d }))
  .reverse(); // Revserse so we can pluck the 2007 adjustment year from the first row.

const byOwnersOverall = byOwnersOverallRaw
  .reduce(
    (acc, d, i) => {
      // Save the 20072 pct value so <= 2007 values can be adjusted later
      if (i === 0) {
        acc['20072'] = d.hcost / d.dispinc;
        return acc;
      }

      // Calculate the ratio so <= 2007 values can be adjusted
      if (d.year === 2007) {
        acc.ratio = acc['20072'] / (d.hcost / d.dispinc);
      }

      acc.data.push({
        tenure: 'owner',
        breakdown: 'overall',
        year: +d.year,
        pct: +d.year <= 2007 ? (d.hcost / d.dispinc) * acc.ratio : d.hcost / d.dispinc
      });
      return acc;
    },
    { data: [] }
  )
  .data.reverse(); // Grab just the data, not the workings and reverse it back to year order for good measure

// Everyone / Age

// Get a list of the years covered to match up with the data
const byAgeYears = xlsx.utils.sheet_to_json(byAgeWorkbook.Sheets['Table 12 - Table 12'], { range: 'A5:A23' });

const byEveryoneAgeRaw = xlsx.utils
  .sheet_to_json(byAgeWorkbook.Sheets['Table 12 - Table 12'], { range: 'B3:U23' })
  .slice(1) // Remove extra row due to merged cells in source sheet
  .map((d, i) => ({ ...byAgeYears[i], ...d }))
  .reverse(); // Reverse it so we can pluck the 2007 adjustment year from the first row.

const byEveryoneAge = byEveryoneAgeRaw
  .reduce(
    (acc, d, i) => {
      if (i === 0) {
        acc['20072'] = {
          '<35': d.hcost / d.dispinc,
          '35 to 49': d.hcost_1 / d.dispinc_1,
          '50 to 64': d.hcost_2 / d.dispinc_2,
          '65+': d.hcost_3 / d.dispinc_3
        };
        return acc;
      }

      // Calculate the ratios for adjusting years <= 2007
      if (d.year === 2007) {
        acc['ratio'] = {
          '<35': acc['20072']['<35'] / (d.hcost / d.dispinc),
          '35 to 49': acc['20072']['35 to 49'] / (d.hcost_1 / d.dispinc_1),
          '50 to 64': acc['20072']['50 to 64'] / (d.hcost_2 / d.dispinc_2),
          '65+': acc['20072']['65+'] / (d.hcost_3 / d.dispinc_3)
        };
      }

      // Add the data
      acc.data.push({
        tenure: 'everyone',
        breakdown: '<35',
        year: +d.year,
        pct: d.year <= 2007 ? (d.hcost / d.dispinc) * acc.ratio['<35'] : d.hcost / d.dispinc
      });
      acc.data.push({
        tenure: 'everyone',
        breakdown: '35 to 49',
        year: +d.year,
        pct: +d.year <= 2007 ? (d.hcost_1 / d.dispinc_1) * acc.ratio['35 to 49'] : d.hcost_1 / d.dispinc_1
      });
      acc.data.push({
        tenure: 'everyone',
        breakdown: '50 to 64',
        year: +d.year,
        pct: +d.year <= 2007 ? (d.hcost_2 / d.dispinc_2) * acc.ratio['50 to 64'] : d.hcost_2 / d.dispinc_2
      });
      acc.data.push({
        tenure: 'everyone',
        breakdown: '65+',
        year: +d.year,
        pct: +d.year <= 2007 ? (d.hcost_3 / d.dispinc_3) * acc.ratio['65+'] : d.hcost_3 / d.dispinc_3
      });
      return acc;
    },
    { data: [] }
  )
  .data.reverse(); // Grab just the data, not the workings and reverse it back to year order for good measure

const clean = [
  ...byQuintile,
  ...byTenureAndQunintile,
  ...byTenure,
  ...byTenureAndAge,
  ...byOwnersOverall,
  ...byEveryoneAge
].filter(d => d.year !== 2021);

writeFile(outputPath, JSON.stringify(clean), err => {
  if (err) throw err;
});

writeFile(outputPathCSV, csvFormat(clean), err => {
  if (err) throw err;
});
