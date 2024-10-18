import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/lib/components/ui/resizable";
import { DndProvider } from "@/lib/providers/dnd-provider";
import { ScrollArea } from "@/lib/components/ui/scroll-area";

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
            <ScrollArea className="w-full h-[calc(100vh-4.0625rem)]">
              {children}
            </ScrollArea>
          </ResizablePanel>
          <ResizableHandle />
          {rightSidebar}
        </ResizablePanelGroup>
      </main>
    </DndProvider>
  );
}
