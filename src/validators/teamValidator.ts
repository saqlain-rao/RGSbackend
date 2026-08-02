import { z } from 'zod';

export const teamSchema = z.object({
  body: z.object({}).passthrough()
});
