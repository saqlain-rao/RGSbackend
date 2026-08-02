import { z } from 'zod';

export const userSchema = z.object({
  body: z.object({}).passthrough()
});
