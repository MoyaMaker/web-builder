import { z } from "zod";

import { ComponentBaseSchema } from "./component-base-schema";
import { FormElementType } from "../constants/form-elements-definition";

export const ContainerAttributesSchema = z.object({
  columns: z.coerce
    .number()
    .min(1)
    .max(12)
    .describe("Number" as FormElementType),
});

export const ContainerSchema = ComponentBaseSchema.extend({
  attributes: ContainerAttributesSchema,
  children: z.array(ComponentBaseSchema).default([]),
});

export type ContainerType = z.infer<typeof ContainerSchema>;
export type ContainerAttributes = z.infer<typeof ContainerAttributesSchema>;
