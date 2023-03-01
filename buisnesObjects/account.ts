import { z } from "zod";
import { Builder } from "./builder";

export const UserZod: z.ZodSchema<User> = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
});

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
    projects: z.array(z.string()),
});

export const AccountZod: z.ZodSchema<AccountInfo> = z.object({
    user: UserZod,
    buisness: BuisnessZod,
});

export type AccountError = z.ZodError<AccountInfo>;

export class AccountBuilder extends Builder<AccountInfo> {
    build(): AccountInfo {
        let body = this.body;

        let accountInfo: AccountInfo = {
            buisness: {
                ...body.buisness,
                fte: parseInt(body.buisness.fte),
                pte: parseInt(body.buisness.pte),
                annualRevenue: parseInt(body.buisness.annualRevenue),
                yearOfInception: new Date(body.buisness.yearOfInception),
            },
            user: {
                ...body.user,
            },
        };

        AccountZod.parse(accountInfo);

        return accountInfo;
    }
}
