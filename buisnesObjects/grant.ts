import { z } from "zod"

export const GrantZod: z.ZodSchema<Grant> = z.object({
    title: z.string(),
    description: z.string(),
    creator: z.string(),
    tags: z.array(z.string()),
    createdAt: z.date()
});
