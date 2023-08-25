import { z } from 'zod';
import { Readable } from 'svelte/store';
import { Tweened } from 'svelte/motion';

// Schemas defined with zod
export const DataRowSchema = z.object({ tenure: z.string(), breakdown: z.string(), year: z.number(), pct: z.number() });
export const DataSchema = z.array(DataRowSchema);
export const AnnotationConfig = z.object({
  name: z.string(),
  text: z.string(),
  x: z.number(),
  y: z.number(),
  series: z.string().optional(),
  tenureType: z.string().optional(),
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
    selectedSeries: z.array(z.string()).default([]),
    selectedTenureTypes: z.array(z.string()).default([]),
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
