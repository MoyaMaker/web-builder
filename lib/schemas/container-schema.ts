import { z } from "zod";

import { ComponentBaseSchema } from "./component-base-schema";

export const ContainerAttributesSchema = z.object({});

export const ContainerSchema = ComponentBaseSchema.extend({
  attributes: ContainerAttributesSchema,
  children: z.array(ComponentBaseSchema).default([]),
});

export type ContainerType = z.infer<typeof ContainerSchema>;
export type ContainerAttributes = z.infer<typeof ContainerAttributesSchema>;
