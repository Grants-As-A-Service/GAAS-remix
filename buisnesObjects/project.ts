import { z, infer } from 'zod'
import { TagZod } from './tag'


export const ProjectZod: z.ZodSchema<Project> = z.object({
    name: z.string(),
    description: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    capex: z.number(),
    annualOpex: z.number(),
    tags: z.array(TagZod),
    status: z.string()
})
