import { z } from "zod";
import { Builder } from "./builder";

export const GovernmentZod: z.ZodSchema<Government> = z.object({
	name: z.string(),
	level: z.string(),
	govDetails: z.string(),
	annualFundingBudget: z.number(),
	fundedProjects: z.number(),
});

export type GovernmentError = z.ZodError<Government>;

export class GovernmentBuilder extends Builder<Government> {
	build(): Government {
		let body = this.body;

		let government: Government = {
			...body,
			annualFundingBudget: parseInt(body.annualFundingBudget),
			fundedProjects: parseInt(body.fundedProjects),
		};

		GovernmentZod.parse(government);

		return government;
	}
}
