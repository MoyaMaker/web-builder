"use client";
import React, { useRef, useState } from "react";
import { useDrop } from "react-dnd";

import {
  OpenLeftSidebar,
  OpenRightSidebar,
} from "./components/open-sidebar-button";
import { cn } from "@/lib/utils";
import { useTreeComponents } from "@/lib/providers/tree-components-provider";
import { BuilderComponent } from "./components/builder-component";
import { DropContainer } from "@/lib/components/builder/drop-container";

export default function Builder() {
  const ref = useRef<HTMLDivElement>(null);
  const selectionStartRef = useRef({ x: 0, y: 0 });
  const { isSelecting, setIsSelecting, components, setSelectedComponent } =
    useTreeComponents();
  const [selectionBox, setSelectionBox] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const [{ isOver }, drop] = useDrop({
    accept: ["NEW_COMPONENT", "COMPONENT"],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drop(ref);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const nodes = ref.current?.childNodes;
    if (e.target !== (nodes && nodes[nodes?.length - 1])) {
      if (e.target !== ref.current) return;
    }

    setIsSelecting(true);
    const rect = ref?.current?.getBoundingClientRect();
    if (!rect) return;
    selectionStartRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setSelectionBox({
      top: e.clientY - rect.top,
      left: e.clientX - rect.left,
      width: 0,
      height: 0,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isSelecting) return;
    const rect = ref?.current?.getBoundingClientRect();
    if (!rect) return;
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const width = currentX - selectionStartRef.current.x;
    const height = currentY - selectionStartRef.current.y;

    setSelectionBox({
      top: Math.min(selectionStartRef.current.y, currentY),
      left: Math.min(selectionStartRef.current.x, currentX),
      width: Math.abs(width),
      height: Math.abs(height),
    });
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  return (
    <section className="w-full h-full flex flex-col px-2 pb-1">
      <header className="h-14 flex items-center flex-shrink-0 gap-2 ">
        <OpenLeftSidebar />
        <div className="flex-1">
          <h3 className="text-lg">Builder</h3>
        </div>
        <OpenRightSidebar />
      </header>

      <div
        ref={ref}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className={cn(
          "h-full flex relative flex-col border-2 border-dashed px-4",
          isOver ? "border-green-500" : "border-zinc-200 dark:border-zinc-800"
        )}
        onClick={() => setSelectedComponent(undefined)}
      >
        <BuilderComponent components={components} />
        <DropContainer path={components?.length?.toString() ?? "0"} isLast />
        {isSelecting && (
          <div
            style={{
              ...selectionBox,
            }}
            className="absolute border border-dashed pointer-events-none border-blue-500 bg-blue-500/10"
          />
        )}
      </div>
      {/* <div>
        <pre className="text-xs">{JSON.stringify(components, null, 2)}</pre>
      </div> */}
    </section>
  );
}
