import { z } from "zod";

import { ComponentBaseSchema } from "./component-base-schema";

export const NumberAttributesSchema = z.object({
  placeholder: z.string().optional(),
  defaultValue: z.string().optional(),
  required: z.boolean().optional(),
  disabled: z.boolean().optional(),
  readonly: z.boolean().optional(),
  autofocus: z.boolean().optional(),
  maxLength: z.number().optional(),
  minLength: z.number().optional(),
});

export const NumberSchema = ComponentBaseSchema.extend({
  attributes: NumberAttributesSchema,
});

export type NumberType = z.infer<typeof NumberSchema>;
export type NumberAttributes = z.infer<typeof NumberAttributesSchema>;
