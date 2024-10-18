"use client";
import { Input } from "@/lib/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";

export function NumberFormAttribute({ name }: { name: string }) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Input
          id={name}
          type="number"
          {...field}
          value={field.value ?? ""}
          className="h-8 py-1 [font-size:inherit] [line-height:inherit]"
        />
      )}
    />
  );
}
