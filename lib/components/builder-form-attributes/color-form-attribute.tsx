import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";

export function ColorFormAttribute({ name }: { name: string }) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Input
          id={name}
          type="color"
          {...field}
          className="h-8 py-1 [font-size:inherit] [line-height:inherit]"
        />
      )}
    />
  );
}
