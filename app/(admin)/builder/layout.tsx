import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/lib/components/ui/resizable";
import { DndProvider } from "@/lib/providers/dnd-provider";
import { BuilderLayoutProvider } from "@/lib/providers/builder-layout-provider";
import { TreeComponentsProvider } from "@/lib/providers/tree-components-provider";

type LayoutContentProps = {
  children: React.ReactNode;
  leftSidebar: React.ReactNode;
  rightSidebar: React.ReactNode;
};

export default function BuilderLayout({
  children,
  leftSidebar,
  rightSidebar,
}: LayoutContentProps) {
  return (
    <DndProvider>
      <BuilderLayoutProvider>
        <TreeComponentsProvider>
          <main className="flex-1 flex flex-col">
            <ResizablePanelGroup direction="horizontal" className="flex-1">
              {leftSidebar}
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
              {rightSidebar}
            </ResizablePanelGroup>
          </main>
        </TreeComponentsProvider>
      </BuilderLayoutProvider>
    </DndProvider>
  );
}
