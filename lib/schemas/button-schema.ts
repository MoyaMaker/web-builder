import { z } from "zod";

import { FontSize } from "../constants/font-size";
import { ComponentBaseSchema } from "./component-base-schema";
import { FormElementType } from "../constants/form-elements-definition";
import { ButtonProps } from "../components/ui/button";

export const ButtonAttributesSchema = z.object({
  text: z
    .string()
    .min(1)
    .describe("Text" as FormElementType),
  size: z.nativeEnum(FontSize).describe("FontSize" as FormElementType),
  style: z.string().describe("ButtonStyle" as FormElementType),
});

export const ButtonSchema = ComponentBaseSchema.extend({
  attributes: ButtonAttributesSchema,
});

export type ButtonAttributes = z.infer<typeof ButtonAttributesSchema> & {
  style: ButtonProps["variant"];
};
export type ButtonType = z.infer<typeof ButtonSchema> & {
  attributes: ButtonAttributes;
};
