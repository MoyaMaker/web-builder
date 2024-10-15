import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import { z } from "zod";
import {
  CaseSensitiveIcon,
  HashIcon,
  LayoutDashboardIcon,
  ListIcon,
  LucideProps,
  PencilIcon,
  SquareMousePointerIcon,
  TableIcon,
  TextCursorInputIcon,
} from "lucide-react";

import { InputAttributes, InputSchema } from "../schemas/input-schema";
import { IComponent } from "../schemas/component-base-schema";
import { TableAttributes, TableSchema } from "../schemas/table-schema";
import { SelectAttributes, SelectSchema } from "../schemas/select-schema";
import { TextAttributes, TextSchema } from "../schemas/text-scheme";
import { FontSize } from "./font-size";
import { ButtonAttributes, ButtonSchema } from "../schemas/button-schema";
import { FormAttributes, FormSchema } from "../schemas/form-schema";
import { NumberAttributes, NumberSchema } from "../schemas/number-schema";
import { InputBuilder } from "../components/builder/input-builder";
import { NumberBuilder } from "../components/builder/number-builder";
import { SelectBuilder } from "../components/builder/select-builder";
import { ContainerBuilder } from "../components/builder/container-builder";
import {
  ContainerAttributes,
  ContainerSchema,
} from "../schemas/container-schema";

export type ComponentDefinition = {
  name: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export const COMPONENTS_KEYS = [
  "table",
  "text",
  "button",
  "input",
  "form",
  "select",
  "number",
  "container",
] as const;

export type ComponentNameType = (typeof COMPONENTS_KEYS)[number];

export const COMPONENTS_DEFINITION: Readonly<
  Record<ComponentNameType, ComponentDefinition>
> = {
  table: {
    name: "Tabla",
    icon: TableIcon,
  },
  text: {
    name: "Texto",
    icon: CaseSensitiveIcon,
  },
  button: {
    name: "Botón",
    icon: SquareMousePointerIcon,
  },
  input: {
    name: "Entrada",
    icon: PencilIcon,
  },
  form: {
    name: "Formulario",
    icon: TextCursorInputIcon,
  },
  select: {
    name: "Lista",
    icon: ListIcon,
  },
  number: {
    name: "Entrada numérica",
    icon: HashIcon,
  },
  container: {
    name: "Contenedor",
    icon: LayoutDashboardIcon,
  },
};

export const COMPONENTS_SCHEMAS: Record<ComponentNameType, z.ZodObject<any>> = {
  table: TableSchema,
  text: TextSchema,
  button: ButtonSchema,
  input: InputSchema,
  form: FormSchema,
  select: SelectSchema,
  number: NumberSchema,
  container: ContainerSchema,
};

export const COMPONENTS_DEFAULT_ATTRIBUTES: Record<
  ComponentNameType,
  IComponent["attributes"]
> = {
  table: {
    title: "Table",
    data: "",
  } as TableAttributes,
  text: {
    text: "Texto",
    color: "#000000",
    size: FontSize["text-base"],
  } as TextAttributes,
  button: {
    text: "Button",
    size: FontSize["text-base"],
  } as ButtonAttributes,
  input: {
    label: "Label",
  } as InputAttributes,
  form: {
    data: "",
  } as FormAttributes,
  select: {
    placeholder: "Seleccione",
  } as SelectAttributes,
  number: {} as NumberAttributes,
  container: {} as ContainerAttributes,
};

export const COMPONENTS_JSX_ELEMENTS: Record<
  ComponentNameType,
  React.ComponentType<{ component: IComponent<any>; path?: string }>
> = {
  table: InputBuilder as any,
  text: InputBuilder as any,
  button: InputBuilder as any,
  input: InputBuilder as any,
  form: InputBuilder as any,
  select: SelectBuilder as any,
  number: NumberBuilder as any,
  container: ContainerBuilder as any,
};
