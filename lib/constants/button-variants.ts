import { ButtonProps } from "@/lib/components/ui/button";

type ButtonVariant = ButtonProps["variant"];

export const BUTTON_VARIANTS: Record<
  Exclude<ButtonVariant, null | undefined>,
  string
> = {
  default: "default",
  destructive: "destructive",
  outline: "outline",
  secondary: "secondary",
  ghost: "ghost",
  link: "link",
};
