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
	status: z.string(),
});

export class ProjectBuilder extends Builder<Project> {
	build(): Project {
		let body = this.body;

		let project: Project = {
			...body,
			capex: parseInt(body.capex),
			annualOpex: parseInt(body.annualOpex),
			startDate: new Date(body.startDate),
			endDate: new Date(body.endDate),
		};

		ProjectZod.parse(project);

		return project;
	}
}
