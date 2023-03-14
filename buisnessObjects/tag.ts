import { z } from "zod";
import { Builder } from "./builder";

export const TagZod: z.ZodSchema<Tag> = z.object({
    name: z.string(),
    strength: z.number(),
    description: z.string(),
    quantifier: z.number().min(0).max(10),
});

export class TagBuilder extends Builder<Tag> {
    build(): Tag {
        let body = this.body;

        let tag: Tag = {
            ...body,
            strength: parseInt(body.strength),
            quantifier: parseInt(body.quantifier),
        };

        TagZod.parse(tag);

        return tag;
    }
}
