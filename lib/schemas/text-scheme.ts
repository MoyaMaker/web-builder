import { z } from "zod";
import { ComponentBaseSchema } from "./component-base-schema";
import { FontSize } from "../constants/font-size";

export const TextAttributesSchema = z.object({
  text: z.string().min(1),
  color: z.string(),
  size: z.nativeEnum(FontSize),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
});

export const TextSchema = ComponentBaseSchema.extend({
  attributes: TextAttributesSchema,
});

export type TextType = z.infer<typeof TextSchema>;
export type TextAttributes = z.infer<typeof TextAttributesSchema>;
