import { z } from "zod";
import { ComponentBaseSchema } from "./component-base-schema";
import { FontSize } from "../constants/font-size";
import { FormElementType } from "../constants/form-elements-definition";

export const TextAttributesSchema = z.object({
  text: z
    .string()
    .min(1)
    .describe("Text" as FormElementType),
  color: z.string().describe("Color" as FormElementType),
  size: z.nativeEnum(FontSize).describe("FontSize" as FormElementType),
  bold: z
    .boolean()
    .optional()
    .describe("Boolean" as FormElementType),
  italic: z
    .boolean()
    .optional()
    .describe("Boolean" as FormElementType),
  underline: z
    .boolean()
    .optional()
    .describe("Boolean" as FormElementType),
});

export const TextSchema = ComponentBaseSchema.extend({
  attributes: TextAttributesSchema,
});

export type TextType = z.infer<typeof TextSchema>;
export type TextAttributes = z.infer<typeof TextAttributesSchema>;
