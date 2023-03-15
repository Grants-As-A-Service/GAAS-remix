import { z } from "zod";
import { Builder } from "./builder";

export const GrantZod: z.ZodSchema<Grant> = z.object({
	title: z.string(),
	description: z.string(),
	creator: z.string(),
	tags: z.array(z.string()),
	createdAt: z.date(),
});

export class GrantBuilder extends Builder<Grant> {
	build(): Grant {
		let body = this.body;

		let grant: Grant = {
			...body,
			createdAt: new Date(body.createdAt),
		};

		GrantZod.parse(grant);

		return grant;
	}
}
