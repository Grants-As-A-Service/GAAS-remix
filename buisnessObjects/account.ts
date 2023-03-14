import { z } from "zod";
import { Builder } from "./builder";

export const AccountZod: z.ZodSchema<Account> = z.object({
	name: z.string(),
	email: z.string(),
	phone: z.string(),
});

export type AccountError = z.ZodError<Account>;

export class AccountBuilder extends Builder<Account> {
	build(): Account {
		let body = this.body;

		let accountInfo: Account = {
			...body,
		};

		AccountZod.parse(accountInfo);

		return accountInfo;
	}
}
