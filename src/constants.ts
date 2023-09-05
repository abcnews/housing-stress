import { AnnotationConfig } from './schemas';

export const subtitles: { id: string; text: string }[] = [
  { id: 'm', text: 'For mortgagors' },
  { id: 'r', text: 'For renters' }
];

export const annotations: AnnotationConfig[] = [
  {
    name: '90s high point',
    text: 'In <strong>1993</strong> housing costs were at <strong>16.7%</strong> of disposable income',
    x: 1997,
    y: 0.5,
    arrows: [{ source: { offset: 10 }, target: { x: 1993, y: 0.167 } }]
  },
  {
    name: 'Current high point',
    text: "It's up to <strong>20.1%</strong> in <strong>2023</strong>",
    x: 2016,
    y: 0.3,
    arrows: [{ source: { offset: 10 }, target: { x: 2023, y: 0.2, offset: 10 } }]
  },
  {
    name: 'GFC high interest rates',
    text: "With official <strong>interest rates at 7.25%</strong> in July 2008, housing costs didn't spike",
    x: 2001,
    y: 0.38,
    arrows: [{ source: { offset: 10 }, target: { x: 2008, y: 0.159, offset: 10 } }]
  },
  {
    name: 'Everyone - Overall',
    text: '<em><strong>Everyone</strong></em>',
    series: 'overall',
    tenureType: 'everyone',
    x: 2010,
    y: 0.14
  },
  {
    name: 'Renters — Overall',
    text: '<em><strong>Renters</strong></em>',
    series: 'overall',
    tenureType: 'renter',
    x: 2015,
    y: 0.24
  },
  {
    name: 'Mortgagors — Overall',
    text: '<em><strong>Mortgagors</strong></em>',
    series: 'overall',
    tenureType: 'mortgagor',
    x: 2020,
    y: 0.3
  },
  {
    name: 'Owners — Overall',
    text: '<em><strong>Owners</strong></em>',
    series: 'overall',
    tenureType: 'owner',
    x: 2007,
    y: 0.05
  },
  {
    name: 'Mortgagors — Overall — %',
    text: 'Housing costs for <em><strong>mortgagors</strong></em> are now at <strong>28.1%</strong> of disposable income',
    series: 'overall',
    tenureType: 'mortgagor',
    x: 2013,
    y: 0.4,
    arrows: [{ source: { offset: 10 }, target: { x: 2023, y: 0.281, offset: 10 } }]
  },
  {
    name: 'Quintile 1 - Overall',
    text: 'Lowest 20%',
    series: 'Q1',
    tenureType: 'mortgagor',
    x: 1995,
    y: 0.23
  },
  {
    name: 'Quintile 5 - Overall',
    text: 'Highest 20%',
    series: 'Q5',
    tenureType: 'mortgagor',
    x: 1995,
    y: 0.23
  },
  {
    name: 'Quintile 1 - Mortgage',
    text: '<em><strong>Lowest</strong> 20% of incomes</em>',
    series: 'Q1',
    tenureType: 'mortgagor',
    x: 2008,
    y: 0.49
  },
  {
    name: 'Quintile 5 - Mortgage',
    text: '<em><strong>Highest</strong> 20% of incomes</em>',
    series: 'Q5',
    tenureType: 'mortgagor',
    x: 2013,
    y: 0.12
  },
  {
    name: 'Quintile 1 - Mortgage — %',
    text: 'Those on the <em><strong>lowest</strong></em> incomes now have mortgage costs at <strong>64.2%</strong> of disposable income',
    series: 'Q1',
    tenureType: 'mortgagor',
    x: 2008,
    y: 0.56,
    arrows: [{ source: { offset: 10 }, target: { x: 2023, y: 0.642, offset: 10 } }]
  },
  {
    name: 'Quintile 2 - Mortgage — %',
    text: 'Mortgagors closer to the middle can still spend more than <strong>40%</strong> of disposable income on housing costs',
    series: 'Q2',
    tenureType: 'mortgagor',
    x: 2008,
    y: 0.46,
    arrows: [{ source: { offset: 10 }, target: { x: 2023, y: 0.407, offset: 10 } }]
  },
  {
    name: 'Quintile 5 - Mortgage — %',
    text: "The <em><strong>highest</strong></em> earners' mortgage costs are <strong>22.9%</strong> of disposable income",
    series: 'Q5',
    tenureType: 'mortgagor',
    x: 2008,
    y: 0.3,
    arrows: [{ source: { offset: 10 }, target: { x: 2023, y: 0.229, offset: 10 } }]
  },
  {
    name: 'Quintile 1 - Rent — %',
    text: "The <em><strong>lowest</strong></em> earners' rental costs are <strong>32.6%</strong> of disposable income",
    series: 'Q1',
    tenureType: 'renter',
    x: 2012,
    y: 0.5,
    arrows: [{ source: { offset: 10 }, target: { x: 2023, y: 0.326, offset: 10 } }]
  },
  {
    name: 'Quintile 5 - Rent — %',
    text: "The <em><strong>highest</strong></em> earners' rental costs are <strong>14.4%</strong> of disposable income",
    series: 'Q5',
    tenureType: 'renter',
    x: 2014,
    y: 0.25,
    arrows: [{ source: { offset: 10 }, target: { x: 2023, y: 0.144, offset: 10 } }]
  },
  {
    name: 'Overall - 65+',
    text: 'The <em><strong>lowest</strong></em> on average because only <strong>11%</strong> have a mortgage',
    series: '65+',
    tenureType: 'everyone',
    x: 2010,
    y: 0.4,
    arrows: [{ source: { offset: 10 }, target: { x: 2023, y: 0.09, offset: 10 } }]
  }
];
