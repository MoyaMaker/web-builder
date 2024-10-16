"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { IComponent } from "../schemas/component-base-schema";
import {
  ComponentNameType,
  COMPONENTS_SCHEMAS,
  COMPONENTS_DEFAULT_DATA,
} from "../constants/components-definition";
import { generateId } from "../helpers/generate-id";
import {
  adjustPath,
  getPath,
  getPathArray,
  insertAtPath,
  removeAtPath,
} from "../helpers/path-helpers";

type TreeComponentsContextType = {
  isSelecting: boolean;
  setIsSelecting: Dispatch<SetStateAction<boolean>>;
  components: IComponent[] | undefined;
  selectedComponent: IComponent | undefined;
  setSelectedComponent: Dispatch<SetStateAction<IComponent | undefined>>;
  createComponent(type: ComponentNameType, path: string): void;
  updateComponentAttributes(
    id: string,
    valid: boolean,
    attributes: IComponent["attributes"]
  ): void;
  copyComponent(component: IComponent): void;
  removeComponent(id: string): void;
  moveComponent(component: IComponent, path: string): void;
};

const TreeComponentsContext = createContext<TreeComponentsContextType | null>(
  null
);

export const TreeComponentsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }: { children: React.ReactNode }) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<
    IComponent | undefined
  >();
  const [components, setComponents] = useState<IComponent[] | undefined>();

  const createComponent = (type: ComponentNameType, path: string) => {
    const schema = COMPONENTS_SCHEMAS[type];

    const defaultData = COMPONENTS_DEFAULT_DATA[type];
    const component: IComponent = {
      ...defaultData,
      id: `${type}_${generateId()}`,
      type,
      valid: false,
    };

    // Generate component data
    const componentParse = schema.safeParse({
      id: `${type}_${generateId()}`,
      type,
      attributes: {},
      valid: true,
    });

    component.valid = componentParse.success;

    addComponent(component, path);
  };

  const addComponent = (component: IComponent, path: string) => {
    const prevComponents = [...(components ?? [])];

    insertAtPath(component, path, prevComponents);

    setComponents(prevComponents);
  };

  const updateComponentAttributes = (
    id: string,
    valid: boolean,
    attributes: IComponent["attributes"]
  ) => {
    const prevComponents = [...(components ?? [])];

    if (!prevComponents) return prevComponents;

    setComponents(
      prevComponents.map((component) =>
        component.id === id
          ? {
              ...component,
              valid,
              attributes,
            }
          : component
      )
    );
  };

  const updateChildrenId = (children: IComponent[]) => {
    for (let index = 0; index < children.length; index++) {
      children[index].id = `${children[index].type}_${generateId()}`;

      if (children[index]?.children) {
        return updateChildrenId(children[index].children!);
      }
    }

    return children;
  };

  const copyComponent = (component: IComponent) => {
    const newComponent = JSON.parse(JSON.stringify(component));
    newComponent.id = `${newComponent.type}_${generateId()}`;
    if (newComponent?.children)
      newComponent.children = updateChildrenId(newComponent.children);
    const path = getPath(component.id, components ?? []);
    if (!path) return;

    const pathArray = getPathArray(path);
    const newPath = pathArray
      .map((p, i) => (i === pathArray.length - 1 ? p + 1 : p))
      .join("-");

    addComponent(newComponent, newPath);
  };

  const removeComponent = (id: string) => {
    const prevComponents = [...(components ?? [])];
    const path = getPath(id, prevComponents);
    if (!path) return;
    removeAtPath(prevComponents, path);

    setComponents(prevComponents);
    setSelectedComponent(undefined);
  };

  const moveComponent = (component: IComponent, path: string) => {
    const prevComponents = [...(components ?? [])];

    const sourcePath = getPath(component.id, prevComponents);
    if (!sourcePath) return;

    removeAtPath(prevComponents, sourcePath);

    const adjustedPath = adjustPath(path, sourcePath);

    insertAtPath(component, adjustedPath, prevComponents);

    setComponents(prevComponents);
  };

  return (
    <TreeComponentsContext.Provider
      value={{
        isSelecting,
        setIsSelecting,
        components,
        selectedComponent,
        setSelectedComponent,
        createComponent,
        updateComponentAttributes,
        copyComponent,
        removeComponent,
        moveComponent,
      }}
    >
      {children}
    </TreeComponentsContext.Provider>
  );
};

export function useTreeComponents() {
  const context = useContext(TreeComponentsContext);
  if (!context) {
    throw new Error(
      "useTreeComponents must be used within a TreeComponentsProvider"
    );
  }
  return context;
}
