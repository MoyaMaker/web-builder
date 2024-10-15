import { z } from "zod";
import { ComponentBaseSchema } from "./component-base-schema";

export const TableAttributesSchema = z.object({
  title: z.string().optional(),
  data: z.string().min(1),
});

export const TableSchema = ComponentBaseSchema.extend({
  attributes: TableAttributesSchema,
});

export type TableType = z.infer<typeof TableSchema>;
export type TableAttributes = z.infer<typeof TableAttributesSchema>;
