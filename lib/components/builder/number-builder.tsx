"use client";
import { Input } from "@/lib/components/ui/input";
import { IComponent } from "@/lib/schemas/component-base-schema";
import { NumberAttributes } from "@/lib/schemas/number-schema";

export function NumberBuilder(component: IComponent<NumberAttributes>) {
  const { attributes } = component;

  return (
    <Input {...attributes} type="number" className="pointer-events-none" />
  );
}
