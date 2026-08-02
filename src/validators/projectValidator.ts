import { z } from 'zod';

export const projectSchema = z.object({
  body: z.object({}).passthrough()
});
