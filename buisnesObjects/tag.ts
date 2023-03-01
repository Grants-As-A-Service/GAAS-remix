import { z } from 'zod'

export const TagZod: z.ZodSchema<Tag> = z.object({
    name: z.string(),
    strength: z.number(),
    description: z.string(),
    quantifier: z.number().min(0).max(10)
})