import { z } from "zod";
import { Builder } from "./builder";

export const TagNameZod: z.ZodSchema<TagName> = z.object({ name: z.string() });

export class TagNameBuilder extends Builder<TagName> {
    build(): TagName {
        let body = this.body;

        let tag: TagName = body;

        TagNameZod.parse(tag);

        return tag;
    }
}
