"use client";
import { cn } from "@/lib/utils";
import { TextType } from "@/lib/schemas/text-scheme";

export function TextBuilder({ component }: { component: TextType }) {
  const {
    attributes: { text, color, size, bold, italic, underline },
  } = component;

  return (
    <p
      className={cn(
        "min-h-3 border border-dashed border-zinc-200 dark:border-zinc-800",
        size,
        bold && "font-bold",
        italic && "italic",
        underline && "underline"
      )}
      style={{
        color,
      }}
    >
      {text}
    </p>
  );
}
