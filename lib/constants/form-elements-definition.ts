import { TextFormAttribute } from "../components/builder-form-attributes/text-form-attribute";
import { BooleanFormAttribute } from "../components/builder-form-attributes/boolean-form-attribute";
import { NumberFormAttribute } from "../components/builder-form-attributes/number-form-attribute";

export type FormElementType = "Text" | "Boolean" | "Number";

export const FORM_ELEMENTS_DEFINITION: Record<
  FormElementType,
  React.ComponentType<{
    name: string;
  }>
> = {
  Text: TextFormAttribute,
  Boolean: BooleanFormAttribute,
  Number: NumberFormAttribute,
};
