import { z } from 'zod';

export const contactmessageSchema = z.object({
  body: z.object({}).passthrough()
});
