import { z } from 'zod';

export const testimonialSchema = z.object({
  body: z.object({}).passthrough()
});
