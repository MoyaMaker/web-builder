import { z } from "zod";
import { ComponentBaseSchema } from "./component-base-schema";
import { FormElementType } from "../constants/form-elements-definition";

export const InputAttributesSchema = z.object({
  label: z
    .string()
    .optional()
    .describe("Text" as FormElementType),
  placeholder: z
    .string()
    .optional()
    .describe("Text" as FormElementType),
  defaultValue: z
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
  readOnly: z
    .boolean()
    .optional()
    .describe("Boolean" as FormElementType),
  autoFocus: z
    .boolean()
    .optional()
    .describe("Boolean" as FormElementType),
  maxLength: z
    .number()
    .optional()
    .describe("Number" as FormElementType),
  minLength: z
    .number()
    .optional()
    .describe("Number" as FormElementType),
});

export const InputSchema = ComponentBaseSchema.extend({
  attributes: InputAttributesSchema,
});

export type InputType = z.infer<typeof InputSchema>;
export type InputAttributes = z.infer<typeof InputAttributesSchema>;
