import path from 'node:path';
import xlsx from 'xlsx';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync, writeFile } from 'node:fs';
import { csvParse } from 'd3-dsv';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataPath = path.join(__dirname, '..', 'data');
const inputPath = path.join(dataPath, 'ben-philips-housing-data', 'Rent Mortgage Oz2.xls');
const tenurePath = path.join(dataPath, 'ben-philips-housing-data', 'tenureqntl.csv');
const agePath = path.join(dataPath, 'ben-philips-housing-data', 'hstress3.xlsx');
const outputPath = path.join(dataPath, 'housing-data-clean', 'data.json');

const workbook = xlsx.readFile(inputPath);
const sheetNames = workbook.SheetNames;

// Get the data of the first sheet (should be "working")
const byYearAndQuintileRaw = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]], { range: 'B60:U65' });
const byYearAndQuintile = byYearAndQuintileRaw.reduce((acc, d) => {
  let q = d.Year;
  Object.entries(d).forEach(([key, value]) => {
    if (key !== 'Year') {
      acc.push(['overall', q, +key, value]);
    }
  });
  return acc;
}, []);

const byTenureAndYearAndQunintileRaw = csvParse(readFileSync(tenurePath).toString());
const byTenureAndYearAndQunintile = byTenureAndYearAndQunintileRaw.map(d => {
  return [d.Tenure === 'Renter' ? 'rent' : 'mortgage', d.Quintile, +d.Year, +d.Mortgage];
});

const byTenureAndYearRaw = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]], { range: 'A24:D44' });
const byTenureAndYear = byTenureAndYearRaw.reduce((acc, d) => {
  acc.push(['rent', 'all', +d.Year, +d.Rent]);
  acc.push(['mortgage', 'all', +d.Year, +d.Mortgage]);
  acc.push(['overall', 'all', +d.Year, +d.All]);
  return acc;
}, []);

const byAgeWorkbook = xlsx.readFile(agePath);
const byYearAndAgeRaw = xlsx.utils.sheet_to_json(byAgeWorkbook.Sheets['Table 32 - Table 32'], { range: 'P5:U58' });
const byYearAndAge = byYearAndAgeRaw.reduce((acc, d) => {
  Object.entries(d).forEach(([key, value]) => {
    if (!key.startsWith('__')) {
      acc.push([
        d.__EMPTY_1 === 'Mortgagor' ? 'mortgage' : d.__EMPTY_1 === 'Renter' ? 'rent' : 'own',
        key,
        +d.__EMPTY,
        value
      ]);
    }
  });
  return acc;
}, []);

const clean = [...byYearAndQuintile, ...byTenureAndYearAndQunintile, ...byTenureAndYear, ...byYearAndAge].filter(
  d => d[2] !== 2021
);

writeFile(outputPath, JSON.stringify(clean), err => {
  if (err) throw err;
});
