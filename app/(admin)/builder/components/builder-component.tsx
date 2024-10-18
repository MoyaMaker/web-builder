"use client";
import { useRef } from "react";
import { useDrag } from "react-dnd";
import { CopyIcon, Trash2Icon } from "lucide-react";

import { useComponentsStore } from "@/lib/stores/components-store";
import {
  ComponentNameType,
  COMPONENTS_DEFINITION,
  COMPONENTS_JSX_ELEMENTS,
} from "@/lib/constants/components-definition";
import { cn } from "@/lib/utils";
import { IComponent } from "@/lib/schemas/component-base-schema";
import { Button } from "@/lib/components/ui/button";
import { DropContainer } from "@/lib/components/builder/drop-container";

export function BuilderComponent({
  path,
  components,
}: {
  path?: string;
  components: IComponent[] | undefined;
}) {
  return components?.map((component, index) => (
    <DraggableComponent
      key={component.id}
      path={path ? `${path}-${index}` : index.toString()}
      component={component}
    />
  ));
}

const DraggableComponent = ({
  path,
  component,
}: {
  path: string;
  component: IComponent;
}) => {
  const { setSelectedComponent } = useComponentsStore();
  const ref = useRef<HTMLDivElement>(null);
  const type = component.type as ComponentNameType;
  const Element = COMPONENTS_JSX_ELEMENTS[type];

  // const [isHovered, setIsHovered] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: "COMPONENT",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: {
      component,
      path,
    },
  });

  drag(ref);

  return (
    <div id={component.id}>
      <DropContainer path={path} />
      <div
        ref={ref}
        className={cn(
          "relative hover:cursor-pointer group",
          isDragging && "opacity-30 pointer-events-none"
        )}
        onClick={(e) => {
          setSelectedComponent(component);
          e.stopPropagation();
        }}
      >
        {!isDragging && <SelectedComponent component={component} />}
        <Element component={component} path={path} />
      </div>
    </div>
  );
};

const SelectedComponent = ({ component }: { component: IComponent }) => {
  const { id, type, valid } = component;
  const { selectedComponent, copyComponent, removeComponent } =
    useComponentsStore();
  const componentDefinition = COMPONENTS_DEFINITION[type as ComponentNameType];

  const isSelected = selectedComponent?.id === id;

  if (!isSelected) return null;

  return (
    <>
      {/* Banner name */}
      <span
        className={cn(
          "absolute top-0 left-0 -translate-y-full text-xs font-medium px-0.5 text-white pointer-events-none",
          valid ? "bg-green-600" : "bg-red-600"
        )}
      >
        {componentDefinition.name}
      </span>

      {/* Actions */}
      <div
        className={cn(
          "absolute top-0 right-0 -translate-y-full flex",
          valid ? "bg-green-600" : "bg-red-600"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="p-0 w-6 h-6 text-white hover:text-white hover:bg-green-500/90 dark:hover:bg-green-900/90"
          onClick={(e) => {
            copyComponent(component);
            e.stopPropagation();
          }}
        >
          <CopyIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="p-0 w-6 h-6 text-white hover:text-white hover:bg-red-500/90 dark:hover:bg-red-900/90"
          onClick={(e) => {
            removeComponent(id);
            e.stopPropagation();
          }}
        >
          <Trash2Icon className="w-4 h-4" />
        </Button>
      </div>
      {/* Border */}
      <div
        className={cn(
          "absolute w-full h-full border border-dashed pointer-events-none",
          valid ? "border-green-600" : "border-red-600"
        )}
      />
    </>
  );
};
