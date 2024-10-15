import { z } from "zod";

import { ComponentBaseSchema } from "./component-base-schema";

export const FormAttributesSchema = z.object({
  data: z.string().min(1),
});

export const FormSchema = ComponentBaseSchema.extend({
  attributes: FormAttributesSchema,
});

export type FormType = z.infer<typeof FormSchema>;
export type FormAttributes = z.infer<typeof FormAttributesSchema>;
