"use client";
import { Input } from "@/lib/components/ui/input";
import { InputType } from "@/lib/schemas/input-schema";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

export function InputBuilder({ component }: { component: InputType }) {
  const { attributes } = component;

  return (
    <fieldset className="grid gap-2 pointer-events-none">
      <Label
        htmlFor={component.id}
        className={cn(
          attributes.required &&
            "after:content-['*'] after:ml-0.5 after:text-red-500"
        )}
      >
        {attributes.label}
      </Label>
      <Input id={component.id} type="text" {...attributes} />
    </fieldset>
  );
}
