import { IComponent } from "@/lib/schemas/component-base-schema";
import { SelectAttributes } from "@/lib/schemas/select-schema";
import { Combobox } from "../ui/combobox";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

export function SelectBuilder({
  component,
}: {
  component: IComponent<SelectAttributes>;
}) {
  const { label, placeholder, required, disabled } = component.attributes;

  return (
    <fieldset className="pointer-events-none">
      {label && (
        <Label
          htmlFor={component.id}
          className={cn(
            required && "after:content-['*'] after:ml-0.5 after:text-red-500"
          )}
        >
          {label}
        </Label>
      )}
      <Combobox
        id={component.id}
        placeholder={placeholder}
        items={[]}
        disabled={disabled}
        onChange={() => {}}
      />
    </fieldset>
  );
}
