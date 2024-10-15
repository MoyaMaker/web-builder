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
  COMPONENTS_DEFAULT_ATTRIBUTES,
} from "../constants/components-definition";
import { generateId } from "../helpers/generate-id";

type TreeComponentsContextType = {
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
};

const TreeComponentsContext = createContext<TreeComponentsContextType | null>(
  null
);

export const TreeComponentsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }: { children: React.ReactNode }) => {
  const [selectedComponent, setSelectedComponent] = useState<
    IComponent | undefined
  >();
  const [components, setComponents] = useState<IComponent[] | undefined>();

  const createComponent = (type: ComponentNameType, path: string) => {
    const schema = COMPONENTS_SCHEMAS[type];

    const component: IComponent = {
      id: `${type}_${generateId()}`,
      type,
      attributes: COMPONENTS_DEFAULT_ATTRIBUTES[type],
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

    addComponent(component);
  };

  const addComponent = (component: IComponent) => {
    setComponents((prevComponents) => {
      if (!prevComponents) {
        return [component];
      }
      return [...prevComponents, component];
    });
  };

  const updateComponentAttributes = (
    id: string,
    valid: boolean,
    attributes: IComponent["attributes"]
  ) => {
    setComponents((prevComponents) => {
      if (!prevComponents) return prevComponents;

      return prevComponents.map((component) =>
        component.id === id
          ? {
              ...component,
              valid,
              attributes,
            }
          : component
      );
    });
  };

  const copyComponent = (component: IComponent) => {
    const newComponent = { ...component };
    newComponent.id = `${component.type}_${generateId()}`;
    addComponent(newComponent);
  };

  const removeComponent = (id: string) => {
    setComponents((prevComponents) => {
      if (!prevComponents) return prevComponents;

      return prevComponents.filter((component) => component.id !== id);
    });
    setSelectedComponent(undefined);
  };

  return (
    <TreeComponentsContext.Provider
      value={{
        components,
        selectedComponent,
        setSelectedComponent,
        createComponent,
        updateComponentAttributes,
        copyComponent,
        removeComponent,
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
