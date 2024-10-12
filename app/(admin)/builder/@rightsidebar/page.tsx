"use client";
import { PanelRightCloseIcon } from "lucide-react";

import { Button } from "@/lib/components/ui/button";
import { Separator } from "@/lib/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/lib/components/ui/tooltip";
import { useBuilderLayout } from "@/lib/providers/builder-layout-provider";

export default function RightSidebar() {
  const { setOpenRightSidebar } = useBuilderLayout();

  return (
    <aside className="text-sm">
      <header className="h-14 flex justify-end items-center p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpenRightSidebar(false)}
            >
              <PanelRightCloseIcon className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Minimizar panel</TooltipContent>
        </Tooltip>
      </header>

      <Separator />

      <section className="p-2">hello</section>
    </aside>
  );
}
