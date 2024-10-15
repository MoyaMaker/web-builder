export enum FontSize {
  "text-xs",
  "text-sm",
  "text-base",
  "text-lg",
  "text-xl",
}

export const FONT_SIZES: Record<string, FontSize> = {
  "extra pequeño": FontSize["text-xs"],
  pequeño: FontSize["text-sm"],
  mediano: FontSize["text-base"],
  grande: FontSize["text-lg"],
  "extra grande": FontSize["text-xl"],
};
