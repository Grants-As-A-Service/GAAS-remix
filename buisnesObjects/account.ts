import { z } from "zod";

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

export class AccountBuilder {
    body: any;

    constructor(body: any) {
        this.body = body;
    }

    build(): AccountInfo {
        let body = this.body;

        return {
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
    }
}
