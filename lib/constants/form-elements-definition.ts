import { TextFormAttribute } from "../components/builder-form-attributes/text-form-attribute";
import { BooleanFormAttribute } from "../components/builder-form-attributes/boolean-form-attribute";
import { NumberFormAttribute } from "../components/builder-form-attributes/number-form-attribute";
import { ColorFormAttribute } from "../components/builder-form-attributes/color-form-attribute";
import { FontSizeFormAttribute } from "../components/builder-form-attributes/font-size-form-attribute";
import { ButtonStyleFormAttribute } from "../components/builder-form-attributes/button-style-form-attribute";

export type FormElementType =
  | "Text"
  | "Boolean"
  | "Number"
  | "Color"
  | "FontSize"
  | "ButtonStyle";

export const FORM_ELEMENTS_DEFINITION: Record<
  FormElementType,
  React.ComponentType<{
    name: string;
  }>
> = {
  Text: TextFormAttribute,
  Boolean: BooleanFormAttribute,
  Number: NumberFormAttribute,
  Color: ColorFormAttribute,
  FontSize: FontSizeFormAttribute,
  ButtonStyle: ButtonStyleFormAttribute,
};
