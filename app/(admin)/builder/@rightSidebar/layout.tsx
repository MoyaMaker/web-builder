"use client";
import { useEffect, useRef } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { PanelRightCloseIcon } from "lucide-react";

import { Button } from "@/lib/components/ui/button";
import { Separator } from "@/lib/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/lib/components/ui/tooltip";
import { ResizablePanel } from "@/lib/components/ui/resizable";
import { ScrollArea } from "@/lib/components/ui/scroll-area";
import { useBuilderLayout } from "@/lib/providers/builder-layout-provider";
import { useTreeComponents } from "@/lib/providers/tree-components-provider";
import {
  ComponentNameType,
  COMPONENTS_DEFINITION,
} from "@/lib/constants/components-definition";

export default function LeftSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { selectedComponent } = useTreeComponents();
  const refRightSidebar = useRef<ImperativePanelHandle>(null);
  const { isOpenRightSidebar, setOpenRightSidebar } = useBuilderLayout();

  const componentName = selectedComponent?.type
    ? COMPONENTS_DEFINITION[selectedComponent.type as ComponentNameType].name
    : "";

  useEffect(() => {
    if (isOpenRightSidebar) {
      refRightSidebar.current?.expand();
    } else {
      refRightSidebar.current?.collapse();
    }
  }, [isOpenRightSidebar]);

  return (
    <ResizablePanel
      ref={refRightSidebar}
      order={3}
      defaultSize={20}
      minSize={15}
      maxSize={20}
      collapsible={true}
      collapsedSize={0}
      onCollapse={() => setOpenRightSidebar(false)}
      onResize={() => setOpenRightSidebar(true)}
    >
      <ScrollArea className="h-[calc(100vh-4.0625rem)]">
        <aside className="text-sm">
          <header className="h-14 flex justify-between items-center p-2">
            <span className="truncate">{componentName}</span>

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

          {children}
        </aside>
      </ScrollArea>
    </ResizablePanel>
  );
}
