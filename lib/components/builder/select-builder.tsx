import { IComponent } from "@/lib/schemas/component-base-schema";
import { SelectAttributes } from "@/lib/schemas/select-schema";
import { Combobox } from "../ui/combobox";

export function SelectBuilder({
  component,
}: {
  component: IComponent<SelectAttributes>;
}) {
  const { attributes } = component;

  return (
    <fieldset className="pointer-events-none">
      <Combobox {...attributes} items={[]} onChange={() => {}} />
    </fieldset>
  );
}
