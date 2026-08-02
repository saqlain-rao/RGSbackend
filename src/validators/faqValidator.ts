import { z } from 'zod';

export const faqSchema = z.object({
  body: z.object({}).passthrough()
});
