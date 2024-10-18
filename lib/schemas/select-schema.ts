import { z } from "zod";

import { ComponentBaseSchema } from "./component-base-schema";
import { FormElementType } from "../constants/form-elements-definition";

export const SelectAttributesSchema = z.object({
  label: z
    .string()
    .optional()
    .describe("Text" as FormElementType),
  placeholder: z
    .string()
    .optional()
    .describe("Text" as FormElementType),
  required: z
    .boolean()
    .optional()
    .describe("Boolean" as FormElementType),
  disabled: z
    .boolean()
    .optional()
    .describe("Boolean" as FormElementType),
});

export const SelectSchema = ComponentBaseSchema.extend({
  attributes: SelectAttributesSchema,
});

export type SelectType = z.infer<typeof SelectSchema>;
export type SelectAttributes = z.infer<typeof SelectAttributesSchema>;
