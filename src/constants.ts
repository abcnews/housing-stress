import { AnnotationConfig } from './schemas';

export const annotations: AnnotationConfig[] = [
  { name: '90s high point', text: '1990', x: 1995, y: 0.35, arrows: [{ target: { x: 1993, y: 0.18 } }] },
  {
    name: 'Current high point',
    text: 'Now',
    x: 2020,
    y: 0.3,
    offset: 15,
    arrows: [{ target: { x: 2023, y: 0.18, offset: 10 } }]
  }
];
