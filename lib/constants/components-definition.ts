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
import { NumberSchema, NumberType } from "../schemas/number-schema";
import { InputBuilder } from "../components/builder/input-builder";
import { NumberBuilder } from "../components/builder/number-builder";
import { SelectBuilder } from "../components/builder/select-builder";
import { ContainerBuilder } from "../components/builder/container-builder";
import {
  ContainerAttributes,
  ContainerSchema,
} from "../schemas/container-schema";
import { TextBuilder } from "../components/builder/text-builder";
import { TableBuilder } from "../components/builder/table-builder";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const COMPONENTS_DEFAULT_DATA: Record<ComponentNameType, IComponent> = {
  table: {
    id: "",
    type: "",
    valid: true,
    attributes: {
      title: "Table",
      data: "",
    },
  } as IComponent<TableAttributes>,
  text: {
    id: "",
    type: "",
    valid: true,
    attributes: {
      text: "Texto",
      color: "#000000",
      size: FontSize.TextBase,
    },
  } as IComponent<TextAttributes>,
  button: {
    id: "",
    type: "",
    valid: true,
    attributes: {
      text: "Button",
      size: FontSize.TextBase,
    },
  } as IComponent<ButtonAttributes>,
  input: {
    id: "",
    type: "",
    valid: true,
    attributes: {
      label: "Label",
    },
  } as IComponent<InputAttributes>,
  form: {
    id: "",
    type: "",
    valid: true,
    attributes: {
      data: "",
    },
    children: [],
  } as IComponent<FormAttributes>,
  select: {
    id: "",
    type: "",
    valid: true,
    attributes: {
      placeholder: "Seleccione",
    },
  } as IComponent<SelectAttributes>,
  number: {
    id: "",
    type: "",
    valid: true,
  } as IComponent<NumberType>,
  container: {
    id: "",
    type: "",
    valid: true,
    attributes: {},
    children: [],
  } as IComponent<ContainerAttributes>,
};

export const COMPONENTS_JSX_ELEMENTS: Record<
  ComponentNameType,
  React.ComponentType<{ component: IComponent; path?: string }>
> = {
  table: TableBuilder as never,
  text: TextBuilder as never,
  button: InputBuilder as never,
  input: InputBuilder as never,
  form: InputBuilder as never,
  select: SelectBuilder as never,
  number: NumberBuilder as never,
  container: ContainerBuilder as never,
};
