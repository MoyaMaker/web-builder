"use client";
import { useEffect, useRef } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/lib/components/ui/resizable";
import { ScrollArea } from "@/lib/components/ui/scroll-area";
import {
  BuilderLayoutProvider,
  useBuilderLayout,
} from "@/lib/providers/builder-layout-provider";
import { DndProvider } from "./components/dnd-provider";

type LayoutContentProps = {
  children: React.ReactNode;
  leftSidebar: React.ReactNode;
  rightSidebar: React.ReactNode;
};

export default function BuilderLayout({ ...children }: LayoutContentProps) {
  return (
    <BuilderLayoutProvider>
      <LayoutContent {...children} />
    </BuilderLayoutProvider>
  );
}

const LayoutContent = ({
  children,
  leftSidebar,
  rightSidebar,
}: LayoutContentProps) => {
  const refLeftSidebar = useRef<ImperativePanelHandle>(null);
  const refRightSidebar = useRef<ImperativePanelHandle>(null);
  const {
    isOpenLeftSidebar,
    isOpenRightSidebar,
    setOpenLeftSidebar,
    setOpenRightSidebar,
  } = useBuilderLayout();

  useEffect(() => {
    if (isOpenLeftSidebar) {
      refLeftSidebar.current?.expand();
    } else {
      refLeftSidebar.current?.collapse();
    }
  }, [isOpenLeftSidebar]);

  useEffect(() => {
    if (isOpenRightSidebar) {
      refRightSidebar.current?.expand();
    } else {
      refRightSidebar.current?.collapse();
    }
  }, [isOpenRightSidebar]);

  return (
    <DndProvider>
      <main className="flex-1 flex flex-col">
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel
            ref={refLeftSidebar}
            order={1}
            defaultSize={15}
            minSize={15}
            maxSize={15}
            collapsible={true}
            collapsedSize={0}
            onCollapse={() => setOpenLeftSidebar(false)}
            onResize={() => setOpenLeftSidebar(true)}
          >
            <ScrollArea className="h-[calc(100vh-4.0625rem)]">
              {leftSidebar}
            </ScrollArea>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            order={2}
            defaultSize={70}
            collapsible={false}
            className="flex"
          >
            {/* <ScrollArea className="h-[calc(100vh-4.0625rem)]">
            </ScrollArea> */}
            {children}
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            ref={refRightSidebar}
            order={3}
            defaultSize={15}
            minSize={15}
            maxSize={15}
            collapsible={true}
            collapsedSize={0}
            onCollapse={() => setOpenRightSidebar(false)}
            onResize={() => setOpenRightSidebar(true)}
          >
            <ScrollArea className="h-[calc(100vh-4.0625rem)]">
              {rightSidebar}
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </DndProvider>
  );
};
