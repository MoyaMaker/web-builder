"use client";
import { Controller, useFormContext } from "react-hook-form";

import { Combobox } from "@/lib/components/ui/combobox";
import { BUTTON_VARIANTS } from "@/lib/constants/button-variants";

export function ButtonStyleFormAttribute({ name }: { name: string }) {
  const { control } = useFormContext();

  const items = Object.entries(BUTTON_VARIANTS).map(([key, value]) => ({
    label: key,
    value,
  }));

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Combobox
          className="h-8"
          items={items}
          defaultValue={field.value}
          onChange={(value) => field.onChange(value)}
        />
      )}
    />
  );
}
