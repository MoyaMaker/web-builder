"use client";
import { Button } from "@/lib/components/ui/button";
import { ButtonType } from "@/lib/schemas/button-schema";
import { cn } from "@/lib/utils";

export function ButtonBuilder({ component }: { component: ButtonType }) {
  const { size, text, style } = component.attributes;

  return (
    <Button variant={style} size="default" className={cn(size)}>
      {text}
    </Button>
  );
}
