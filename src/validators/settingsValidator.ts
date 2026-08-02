import { z } from 'zod';

export const settingsSchema = z.object({
  body: z.object({}).passthrough()
});
