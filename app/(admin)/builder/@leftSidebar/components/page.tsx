"use client";
import { useRef } from "react";
import { useDrag } from "react-dnd";

import {
  ComponentDefinition,
  COMPONENTS_DEFINITION,
} from "@/lib/constants/components-definition";

export default function ComponentsSection() {
  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(60px,1fr))] gap-2 p-2">
      {Object.entries(COMPONENTS_DEFINITION).map(([key, component]) => (
        <DraggableComponent key={key} type={key} component={component} />
      ))}
    </section>
  );
}

const DraggableComponent = ({
  type,
  component,
}: {
  type: string;
  component: ComponentDefinition;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag({
    type: "NEW_COMPONENT",
    item: { type },
  });

  drag(ref);

  return (
    <div
      ref={ref}
      className="flex flex-col justify-center items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:cursor-grab group"
    >
      <component.icon className="w-4 h-4" />
      <div className="relative max-w-full">
        <span className="inline-block text-xs text-center text-ellipsis overflow-hidden max-w-full">
          {component.name}
        </span>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 hidden group-hover:block text-xs text-center bg-zinc-100 dark:bg-zinc-800 px-2 rounded-md">
          {component.name}
        </div>
      </div>
    </div>
  );
};
