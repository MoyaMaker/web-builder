"use client";
import { useRef } from "react";
import { useDrop } from "react-dnd";

import {
  OpenLeftSidebar,
  OpenRightSidebar,
} from "./components/open-sidebar-button";
import { cn } from "@/lib/utils";
import { useTreeComponents } from "@/lib/providers/tree-components-provider";
import { ComponentNameType } from "@/lib/constants/components-definition";
import { BuilderComponent } from "./components/builder-component";
import { DropContainer } from "@/lib/components/builder/drop-container";

export default function Builder() {
  const ref = useRef<HTMLDivElement>(null);
  const { components, setSelectedComponent } = useTreeComponents();

  const [{ isOver }, drop] = useDrop({
    accept: ["NEW_COMPONENT", "COMPONENT"],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drop(ref);

  return (
    <section className="w-full flex flex-col px-2 pb-1">
      <header className="h-14 flex items-center flex-shrink-0 gap-2 ">
        <OpenLeftSidebar />
        <div className="flex-1">
          <h3 className="text-lg">Builder</h3>
        </div>
        <OpenRightSidebar />
      </header>

      <div
        ref={ref}
        className={cn(
          "h-full flex flex-col border-2 border-dashed p-4",
          isOver ? "border-green-500" : "border-zinc-200 dark:border-zinc-800"
        )}
        onClick={() => setSelectedComponent(undefined)}
      >
        <BuilderComponent components={components} />
        <DropContainer path={components?.length?.toString() ?? "0"} isLast />
      </div>
      {/* <div>
        <pre className="text-xs">
          {JSON.stringify(selectedComponent, null, 2)}
        </pre>
        <pre className="text-xs">{JSON.stringify(components, null, 2)}</pre>
      </div> */}
    </section>
  );
}
