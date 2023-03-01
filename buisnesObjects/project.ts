import { z, infer } from "zod";
import { Builder } from "./builder";
import { TagZod } from "./tag";

export const ProjectZod: z.ZodSchema<Project> = z.object({
    name: z.string(),
    description: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    capex: z.number(),
    annualOpex: z.number(),
    tags: z.array(TagZod),
    status: z.string(),
});

export class ProjectBuilder extends Builder<Project> {
    build(): Project {
        let body = this.body;

        let project: Project = {
            ...body,
            startDate: new Date(body.startDate),
            endDate: new Date(body.endDate),
            tags: [],
        };

        ProjectZod.parse(project);

        return project;
    }
}
