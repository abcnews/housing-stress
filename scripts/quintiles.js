import path from 'node:path';
import xlsx from 'xlsx';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { writeFile } from 'node:fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataPath = path.join(__dirname, '..', 'data');
const inputPath = path.join(dataPath, 'ben-philips-housing-data', 'Rent Mortgage Oz2.xls');
const outputPath = path.join(dataPath, 'housing-data-clean', 'quintiles.json');

const workbook = xlsx.readFile(inputPath);
const sheetNames = workbook.SheetNames;

// Get the data of the first sheet (should be "working")
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]], { range: 'B60:U65' });

const clean = data.reduce((acc, d) => {
  let q = d.Year;
  Object.entries(d).forEach(([key, value]) => {
    if (key !== 'Year') {
      acc.push([q, +key, value]);
    }
  });
  return acc;
}, []);

writeFile(outputPath, JSON.stringify(clean), err => {
  if (err) throw err;
});
