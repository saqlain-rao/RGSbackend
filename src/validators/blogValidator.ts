import { z } from 'zod';

export const blogSchema = z.object({
  body: z.object({}).passthrough()
});
