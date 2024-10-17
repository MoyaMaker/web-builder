"use client";
import { useRef } from "react";
import { useDrop } from "react-dnd";

import { cn } from "@/lib/utils";
import { ComponentNameType } from "@/lib/constants/components-definition";
import { useTreeComponents } from "@/lib/providers/tree-components-provider";
import { IComponent } from "@/lib/schemas/component-base-schema";
// import { getPathArray } from "@/lib/helpers/path-helpers";

export function DropContainer({
  path,
  className,
  isLast = false,
}: {
  path: string;
  disabled?: boolean;
  className?: string;
  isLast?: boolean;
}) {
  const { createComponent, moveComponent } = useTreeComponents();
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ["NEW_COMPONENT", "COMPONENT"],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (item, monitor) => {
      const itemType = monitor.getItemType();
      if (itemType === "COMPONENT") {
        // const { path: actualPath } = item as {
        //   path: string;
        // };
        // if (actualPath === path) return false;

        // const draggedParts = getPathArray(actualPath);
        // const dropParts = getPathArray(path);

        // if (actualPath.length === path.length) {
        //   const draggedIndex = draggedParts[draggedParts.length - 1];
        //   const droppedIndex = dropParts[dropParts.length - 1];
        //   if (draggedIndex + 1 === droppedIndex) return false;
        // }

        return true;
      }
      if (itemType === "NEW_COMPONENT") {
        return true;
      }

      return false;
    },
    drop: (item, monitor) => {
      if (monitor.getItemType() === "COMPONENT") {
        const { component } = item as {
          component: IComponent;
        };
        moveComponent(component, path);
      } else if (monitor.getItemType() === "NEW_COMPONENT") {
        const { type } = item as { type: ComponentNameType };
        createComponent(type, path);
      }
    },
  });

  drop(ref);

  return (
    <div
      ref={ref}
      data-path={path}
      className={cn(
        "w-full min-h-4 text-xs",
        isOver && canDrop && "bg-green-500/50",
        className,
        isLast && "flex-1"
      )}
    />
  );
}
