import { z } from 'zod';

export const quintileDataSchema = z.array(z.tuple([z.string(), z.string(), z.number(), z.number()]));
