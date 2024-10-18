"use client";
import { z, ZodObject, ZodType } from "zod";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useComponentsStore } from "@/lib/stores/components-store";
import { Label } from "@/lib/components/ui/label";
import {
  ComponentNameType,
  COMPONENTS_SCHEMAS,
} from "@/lib/constants/components-definition";

import {
  FORM_ELEMENTS_DEFINITION,
  FormElementType,
} from "@/lib/constants/form-elements-definition";
import { useCallback, useEffect } from "react";

export default function ComponentsSection() {
  const { selectedComponent } = useComponentsStore();

  return (
    <div className="">
      {selectedComponent && (
        <FormComponentAttributes key={selectedComponent.id} />
      )}
    </div>
  );
}

const FormComponentAttributes = () => {
  const { selectedComponent, updateComponentAttributes } = useComponentsStore();

  const schema =
    COMPONENTS_SCHEMAS[selectedComponent?.type as ComponentNameType];
  type InferType = z.infer<typeof schema>;

  const attributesZod: ZodObject<never> = schema.shape.attributes;

  const form = useForm<InferType>({
    mode: "all",
    resolver: zodResolver(attributesZod),
    shouldFocusError: false,
    defaultValues: selectedComponent?.attributes,
  });

  const onSubmit: SubmitHandler<InferType> = useCallback(
    (data) => {
      updateComponentAttributes(selectedComponent!, true, data);
    },
    [selectedComponent, updateComponentAttributes]
  );

  const onError: SubmitErrorHandler<InferType> = useCallback(
    (error) => {
      console.error(error);
      updateComponentAttributes(selectedComponent!, false, form.watch());
    },
    [form, selectedComponent, updateComponentAttributes]
  );

  useEffect(() => {
    form.trigger();

    const subscription = form.watch(() =>
      form.handleSubmit(onSubmit, onError)()
    );

    return () => subscription.unsubscribe();
  }, [form, onError, onSubmit]);

  return (
    <FormProvider key={selectedComponent?.id} {...form}>
      <form
        id={`form_${selectedComponent?.id}`}
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="grid gap-2 p-2"
      >
        {Object.entries(attributesZod.shape).map(([key, zodType]) => {
          const zodElement = zodType as ZodType<unknown>;
          const type = (zodElement.description as FormElementType) ?? "Text";

          const FormElement = FORM_ELEMENTS_DEFINITION[type] ?? null;

          return (
            <fieldset
              key={key}
              className="grid grid-cols-[0.35fr_0.65fr] items-center gap-1 text-xs"
            >
              <Label
                htmlFor={key}
                className="truncate [font-size:inherit] [line-height:inherit]"
              >
                {key}
              </Label>
              {FormElement ? <FormElement name={key} /> : type}
            </fieldset>
          );
        })}
      </form>
    </FormProvider>
  );
};
