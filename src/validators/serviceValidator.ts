import { z } from 'zod';

export const serviceSchema = z.object({
  body: z.object({}).passthrough()
});
