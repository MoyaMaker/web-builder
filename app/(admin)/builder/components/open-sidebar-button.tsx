"use client";
import { PanelLeftOpenIcon, PanelRightOpenIcon } from "lucide-react";

import { Button } from "@/lib/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/lib/components/ui/tooltip";
import { useBuilderLayout } from "@/lib/providers/builder-layout-provider";

export const OpenLeftSidebar = () => {
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

export const OpenRightSidebar = () => {
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
