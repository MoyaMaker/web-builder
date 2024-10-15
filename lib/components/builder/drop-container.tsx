"use client";
import { useRef } from "react";
import { useDrop } from "react-dnd";

import { cn } from "@/lib/utils";
import { ComponentNameType } from "@/lib/constants/components-definition";
import { useTreeComponents } from "@/lib/providers/tree-components-provider";
import { IComponent } from "@/lib/schemas/component-base-schema";

export function DropContainer({
  path,
  className,
  isLast = false,
}: {
  path: string;
  className?: string;
  isLast?: boolean;
}) {
  const { createComponent } = useTreeComponents();
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: ["NEW_COMPONENT", "COMPONENT"],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: (item, monitor) => {
      if (monitor.getItemType() === "COMPONENT") {
        const { component, path: actualPath } = item as {
          component: IComponent;
          path: string;
        };
        console.log(component, actualPath, path);
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
      className={cn(
        "w-full h-2",
        isOver && "bg-green-500/50",
        className,
        isLast && "flex-1"
      )}
    />
  );
}
