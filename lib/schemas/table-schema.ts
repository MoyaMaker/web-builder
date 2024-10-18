import { z } from "zod";
import { ComponentBaseSchema } from "./component-base-schema";
import { FormElementType } from "../constants/form-elements-definition";

export const TableAttributesSchema = z.object({
  title: z
    .string()
    .optional()
    .describe("Text" as FormElementType),
  searchable: z
    .boolean()
    .optional()
    .describe("Boolean" as FormElementType),
});

export const TableSchema = ComponentBaseSchema.extend({
  attributes: TableAttributesSchema,
});

export type TableType = z.infer<typeof TableSchema>;
export type TableAttributes = z.infer<typeof TableAttributesSchema>;
