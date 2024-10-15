"use client";
import { Switch } from "@/lib/components/ui/switch";
import { Controller, useFormContext } from "react-hook-form";

export function BooleanFormAttribute({ name }: { name: string }) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex justify-end items-center">
          <Switch
            id={name}
            name={field.name}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </div>
      )}
    />
  );
}
