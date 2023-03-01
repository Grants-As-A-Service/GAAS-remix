import { z } from "zod";

export const loginObject = z.object({
    email: z.string(),
    password: z.string(),
});
