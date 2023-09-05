import { z } from 'zod';
import { Readable } from 'svelte/store';
import { Tweened } from 'svelte/motion';

export const Tenure = z.enum(['everyone', 'renter', 'mortgagor', 'owner']);
export const Age = z.enum(['<35', '35 to 49', '50 to 64', '65+']);
export const Quintiles = z.enum(['Q1', 'Q2', 'Q3', 'Q4', 'Q5']);
export const Overall = z.enum(['overall']);
export const Breakdown = z.union([Age, Quintiles, Overall]);

// Schemas defined with zod
export const DataRowSchema = z.object({ tenure: Tenure, breakdown: Breakdown, year: z.number(), pct: z.number() });
export const DataSchema = z.array(DataRowSchema);
export const AnnotationConfig = z.object({
  name: z.string(),
  text: z.string(),
  x: z.number(),
  y: z.number(),
  series: Breakdown.optional(),
  tenureType: Tenure.optional(),
  arrows: z
    .array(
      z.object({
        source: z
          .object({ x: z.number().optional(), y: z.number().optional(), offset: z.number().optional() })
          .optional(),
        target: z.object({ x: z.number(), y: z.number(), offset: z.number().optional() })
      })
    )
    .optional()
});
export const VisualisationConfiguration = z
  .object({
    selectedSeries: z.array(Breakdown).default([]),
    selectedTenureTypes: z.array(Tenure).default([]),
    minYear: z.number().default(1984),
    maxYear: z.number().default(2023),
    maxY: z.number().default(0.65),
    annotations: z.array(z.string()).default([]),
    showLineLabels: z.boolean().default(false),
    title: z.string().default('Housing costs as a portion of disposable income'),
    subtitle: z.string().default('')
  })
  .default({});

// Types derived from schemas
export type Tenure = z.infer<typeof Tenure>;
export type Age = z.infer<typeof Age>;
export type Quintiles = z.infer<typeof Quintiles>;
export type Overall = z.infer<typeof Overall>;
export type Breakdown = z.infer<typeof Breakdown>;
export type Extent = [number, number] | [string, string] | undefined;
export type DataRowSchema = z.infer<typeof DataRowSchema>;
export type DataSchema = z.infer<typeof DataSchema>;
export type Settings = { selectedSeries: string[]; selectedTenureTypes: string[]; showLineLabels: boolean };

export type LayerCakeContext = {
  data: Readable<DataSchema>;
  xGet: Readable<(d: DataRowSchema) => number>;
  yGet: Readable<(d: DataRowSchema) => number>;
  xScale: Readable<(x: number) => number>;
  yScale: Readable<(y: number) => number>;
  xDomain: Readable<Tweened<Extent>>;
  xRange: Readable<[number, number]>;
  custom: Readable<Settings>;
};

export type AnnotationConfig = z.infer<typeof AnnotationConfig>;

export type VisualisationConfiguration = z.infer<typeof VisualisationConfiguration>;
