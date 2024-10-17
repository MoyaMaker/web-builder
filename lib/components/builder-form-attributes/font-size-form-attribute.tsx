"use client";
import { Controller, useFormContext } from "react-hook-form";
import { Combobox } from "../ui/combobox";
import { FONT_SIZES } from "@/lib/constants/font-size";

export function FontSizeFormAttribute({ name }: { name: string }) {
  const { control } = useFormContext();

  const items = Object.entries(FONT_SIZES).map(([key, value]) => ({
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
