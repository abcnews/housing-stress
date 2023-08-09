import { AnnotationConfig } from './schemas';

export const subtitles: { id: string; text: string }[] = [
  { id: 'm', text: 'For mortgagees' },
  { id: 'r', text: 'For renters' }
];

export const annotations: AnnotationConfig[] = [
  {
    name: '90s high point',
    text: 'In <strong>1993</strong> housing costs were at <strong>15.7%</strong> of disposable income',
    // text: 'Previous<br> high: <strong>15.7%</strong>',
    x: 1990,
    y: 0.35,
    arrows: [{ source: { offset: 30 }, target: { x: 1993, y: 0.159 } }]
  },
  {
    name: 'Current high point',
    text: "It's up to <strong>17.6%</strong> in <strong>2023</strong>",
    x: 2016,
    y: 0.3,
    arrows: [{ source: { offset: 25 }, target: { x: 2023, y: 0.18, offset: 10 } }]
  },

  {
    name: 'Everyone - Overall',
    text: '<em><strong>Everyone</strong></em>',
    series: 'all',
    tenureType: 'everyone',
    x: 2010,
    y: 0.13
  },
  {
    name: 'Renters — Overall',
    text: '<em><strong>Renters</strong></em>',
    series: 'all',
    tenureType: 'rent',
    x: 2013,
    y: 0.26
  },
  {
    name: 'Mortgagees — Overall',
    text: '<em><strong>Mortgagees</strong></em>',
    series: 'all',
    tenureType: 'mortgage',
    x: 2013,
    y: 0.2
  },
  {
    name: 'Mortgagees — Overall — %',
    text: 'Housing costs for <em><strong>mortgagees</strong></em> are now at <strong>25.1%</strong> of disposable income',
    series: 'all',
    tenureType: 'mortgage',
    x: 2013,
    y: 0.4,
    arrows: [{ source: { offset: 80 }, target: { x: 2023, y: 0.25, offset: 10 } }]
  },
  {
    name: 'Quintile 1 - Overall',
    text: 'Lowest 20%',
    series: 'Q1',
    tenureType: 'mortgage',
    x: 1995,
    y: 0.23
  },
  {
    name: 'Quintile 5 - Overall',
    text: 'Highest 20%',
    series: 'Q5',
    tenureType: 'mortgage',
    x: 1995,
    y: 0.23
  },
  {
    name: 'Quintile 1 - Mortgage',
    text: '<em><strong>Lowest</strong> 20% of incomes</em>',
    series: 'Q1',
    tenureType: 'mortgage',
    x: 2008,
    y: 0.49
  },
  {
    name: 'Quintile 5 - Mortgage',
    text: '<em><strong>Highest</strong> 20% of incomes</em>',
    series: 'Q5',
    tenureType: 'mortgage',
    x: 2013,
    y: 0.12
  },
  {
    name: 'Quintile 1 - Mortgage — %',
    text: 'Those on the <em><strong>lowest</strong></em> incomes now have mortgage costs at <strong>64.2%</strong> of disposable income',
    series: 'Q1',
    tenureType: 'mortgage',
    x: 2008,
    y: 0.55,
    arrows: [{ source: { offset: 80 }, target: { x: 2023, y: 0.642, offset: 10 } }]
  },
  {
    name: 'Quintile 5 - Mortgage — %',
    text: "The <em><strong>highest</strong></em> earners' mortgage costs are <strong>22.9%</strong> of disposable income",
    series: 'Q5',
    tenureType: 'mortgage',
    x: 2008,
    y: 0.3,
    arrows: [{ source: { offset: 80 }, target: { x: 2023, y: 0.229, offset: 10 } }]
  },
  {
    name: 'Quintile 1 - Rent — %',
    text: "The <em><strong>lowest</strong></em> earners' rental costs are <strong>32.6%</strong> of disposable income",
    series: 'Q1',
    tenureType: 'rent',
    x: 2012,
    y: 0.5,
    arrows: [{ source: { offset: 80 }, target: { x: 2023, y: 0.326, offset: 10 } }]
  },
  {
    name: 'Quintile 5 - Rent — %',
    text: "The <em><strong>highest</strong></em> earners' rental costs are <strong>14.4%</strong> of disposable income",
    series: 'Q5',
    tenureType: 'rent',
    x: 2014,
    y: 0.25,
    arrows: [{ source: { offset: 80 }, target: { x: 2023, y: 0.144, offset: 10 } }]
  }
];
