import { z } from 'zod';

export const careerSchema = z.object({
  body: z.object({}).passthrough()
});
