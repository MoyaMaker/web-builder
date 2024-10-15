import { z } from "zod";

export const ComponentBaseSchema = z.object({
  id: z.string(),
  type: z.string().readonly(),
  valid: z.boolean(),
  attributes: z.object({}),
});

export type IComponent<T = {}> = z.infer<typeof ComponentBaseSchema> & {
  attributes: T;
  children?: IComponent[];
};
