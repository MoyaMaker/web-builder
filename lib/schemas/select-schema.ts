import { z } from "zod";

import { ComponentBaseSchema } from "./component-base-schema";

export const SelectAttributesSchema = z.object({
  placeholder: z.string().optional(),
});

export const SelectSchema = ComponentBaseSchema.extend({
  attributes: SelectAttributesSchema,
});

export type SelectType = z.infer<typeof SelectSchema>;
export type SelectAttributes = z.infer<typeof SelectAttributesSchema>;
