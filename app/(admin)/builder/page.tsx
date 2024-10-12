"use client";
import { useRef } from "react";
import { useDrop } from "react-dnd";
import { PanelLeftOpenIcon, PanelRightOpenIcon } from "lucide-react";

import { Button } from "@/lib/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/lib/components/ui/tooltip";
import { useBuilderLayout } from "@/lib/providers/builder-layout-provider";
import { cn } from "@/lib/utils";

export default function Builder() {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: ["COMPONENT"],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop(item, monitor) {
      console.log(item, monitor);
    },
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
          "h-full border-2 border-dashed",
          isOver ? "border-green-500" : "border-zinc-200 dark:border-zinc-800"
        )}
      ></div>
    </section>
  );
}

const OpenLeftSidebar = () => {
  const { isOpenLeftSidebar, setOpenLeftSidebar } = useBuilderLayout();

  return (
    !isOpenLeftSidebar && (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpenLeftSidebar(true)}
          >
            <PanelLeftOpenIcon className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Expandir panel</TooltipContent>
      </Tooltip>
    )
  );
};

const OpenRightSidebar = () => {
  const { isOpenRightSidebar, setOpenRightSidebar } = useBuilderLayout();

  return (
    !isOpenRightSidebar && (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpenRightSidebar(true)}
          >
            <PanelRightOpenIcon className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Expandir panel</TooltipContent>
      </Tooltip>
    )
  );
};
