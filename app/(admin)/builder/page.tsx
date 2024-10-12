"use client";
import { PanelLeftOpenIcon, PanelRightOpenIcon } from "lucide-react";

import { Button } from "@/lib/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/lib/components/ui/tooltip";
import { useBuilderLayout } from "@/lib/providers/builder-layout-provider";

export default function Builder() {
  const {
    isOpenLeftSidebar,
    isOpenRightSidebar,
    setOpenLeftSidebar,
    setOpenRightSidebar,
  } = useBuilderLayout();

  return (
    <section className="px-2">
      <header className="h-14 flex items-center gap-2">
        {!isOpenLeftSidebar && (
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
        )}
        <div className="flex-1">
          <h3 className="text-2xl font-bold">Builder</h3>
        </div>
        {!isOpenRightSidebar && (
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
        )}
      </header>
    </section>
  );
}
