import { z } from "zod";

import { FontSize } from "../constants/font-size";

export const ButtonAttributesSchema = z.object({
  text: z.string().min(1),
  size: z.nativeEnum(FontSize),
});

export const ButtonSchema = z.object({
  attributes: ButtonAttributesSchema,
});

export type ButtonType = z.infer<typeof ButtonSchema>;
export type ButtonAttributes = z.infer<typeof ButtonAttributesSchema>;
