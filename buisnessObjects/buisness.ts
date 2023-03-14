import { z } from "zod";
import { Builder } from "./builder";

export const BuisnessZod: z.ZodSchema<Business> = z.object({
	name: z.string(),
	phone: z.string(),
	address: z.string(),
	city: z.string(),
	province: z.string(),
	postalCode: z.string(),
	industry: z.string(),
	fte: z.number(),
	pte: z.number(),
	annualRevenue: z.number(),
	yearOfInception: z.date(),
});

export type BuisnessError = z.ZodError<Business>;

export class BuisnessBuilder extends Builder<Business> {
	build(): Business {
		let body = this.body;

		let buisness: Business = {
			...body,
			fte: parseInt(body.fte),
			pte: parseInt(body.pte),
			annualRevenue: parseInt(body.annualRevenue),
			yearOfInception: new Date(body.yearOfInception),
		};

		BuisnessZod.parse(buisness);

		return buisness;
	}
}
