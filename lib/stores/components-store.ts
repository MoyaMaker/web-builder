"use client";
import { create } from "zustand";

import { IComponent } from "@/lib/schemas/component-base-schema";
import {
  ComponentNameType,
  COMPONENTS_DEFAULT_DATA,
  COMPONENTS_SCHEMAS,
} from "@/lib/constants/components-definition";
import {
  adjustPath,
  getPath,
  getPathArray,
  insertAtPath,
  removeAtPath,
  replaceAtPath,
} from "../helpers/path-helpers";
import { generateId } from "../helpers/generate-id";

type ComponentsStoreType = {
  components: IComponent[] | undefined;
  selectedComponent: IComponent | undefined;
  setSelectedComponent(component: IComponent | undefined): void;
  createComponent(type: ComponentNameType, path: string): void;
  updateComponentAttributes(
    component: IComponent,
    valid: boolean,
    attributes: IComponent["attributes"]
  ): void;
  copyComponent(component: IComponent): void;
  removeComponent(id: string): void;
  moveComponent(component: IComponent, path: string): void;
};

export const useComponentsStore = create<ComponentsStoreType>((set) => ({
  components: undefined,
  selectedComponent: undefined,
  setSelectedComponent: (component: IComponent | undefined) =>
    set({ selectedComponent: component }),
  createComponent: (type: ComponentNameType, path: string) =>
    set((state) => {
      const schema = COMPONENTS_SCHEMAS[type];

      const defaultData = JSON.parse(
        JSON.stringify(COMPONENTS_DEFAULT_DATA[type])
      );

      const component: IComponent = {
        ...defaultData,
        id: `${type}_${generateId()}`,
        type,
        valid: false,
      };

      // Generate component data
      const componentParse = schema.safeParse(component);

      component.valid = componentParse.success;

      const prevComponents = [...(state.components ?? [])];

      insertAtPath(component, path, prevComponents);

      return {
        components: prevComponents,
      };
    }),
  updateComponentAttributes: (
    component: IComponent,
    valid: boolean,
    attributes: IComponent["attributes"]
  ) =>
    set((state) => {
      const prevComponents = [...(state.components ?? [])];

      if (!prevComponents) return { components: prevComponents };

      const path = getPath(component.id, prevComponents);
      if (!path) return { components: prevComponents };

      replaceAtPath(
        {
          ...component,
          valid,
          attributes,
        },
        path,
        prevComponents
      );

      return {
        components: prevComponents,
      };
    }),
  copyComponent: (component: IComponent) =>
    set((state) => {
      const newComponent = JSON.parse(JSON.stringify(component));
      newComponent.id = `${newComponent.type}_${generateId()}`;

      if (newComponent?.children)
        newComponent.children = updateChildrenId(newComponent.children);
      const path = getPath(component.id, state.components ?? []);
      if (!path) return { components: state.components };

      const pathArray = getPathArray(path);
      const newPath = pathArray
        .map((p, i) => (i === pathArray.length - 1 ? p + 1 : p))
        .join("-");

      const prevComponents = [...(state.components ?? [])];

      insertAtPath(newComponent, newPath, prevComponents);

      return {
        components: prevComponents,
      };
    }),
  removeComponent: (id: string) =>
    set((state) => {
      const prevComponents = [...(state.components ?? [])];
      const path = getPath(id, prevComponents);
      if (!path) return { components: prevComponents };
      removeAtPath(prevComponents, path);

      return {
        components: prevComponents,
        selectedComponent: undefined,
      };
    }),
  moveComponent: (component: IComponent, path: string) =>
    set((state) => {
      const prevComponents = [...(state.components ?? [])];

      const sourcePath = getPath(component.id, prevComponents);
      if (!sourcePath) return { components: prevComponents };

      removeAtPath(prevComponents, sourcePath);

      const adjustedPath = adjustPath(path, sourcePath);

      insertAtPath(component, adjustedPath, prevComponents);

      return {
        components: prevComponents,
      };
    }),
}));

const updateChildrenId = (children: IComponent[]) => {
  for (let index = 0; index < children.length; index++) {
    children[index].id = `${children[index].type}_${generateId()}`;

    if (children[index]?.children) {
      children[index].children = updateChildrenId(children[index].children!);
    }
  }

  return children;
};
