"use client";
import { useRef } from "react";
import { useDrop } from "react-dnd";

import {
  OpenLeftSidebar,
  OpenRightSidebar,
} from "./components/open-sidebar-button";
import { cn } from "@/lib/utils";
import { BuilderComponent } from "./components/builder-component";
import { DropContainer } from "@/lib/components/builder/drop-container";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/components/ui/tabs";
import { useComponentsStore } from "@/lib/stores/components-store";
import { Switch } from "@/lib/components/ui/switch";
import { useBuilderLayoutStore } from "@/lib/stores/builder-layout-store";
import { Label } from "@/lib/components/ui/label";

export default function Builder() {
  const ref = useRef<HTMLDivElement>(null);
  const { preview, setPreview } = useBuilderLayoutStore();
  const { components, setSelectedComponent } = useComponentsStore();

  const [{ isOver }, drop] = useDrop({
    accept: ["NEW_COMPONENT", "COMPONENT"],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drop(ref);

  return (
    <Tabs defaultValue="designer" className="h-full">
      <section className="w-full h-full flex flex-col px-2 pb-1">
        <header className="h-14 flex items-center flex-shrink-0 gap-2 ">
          <OpenLeftSidebar />
          <div className="flex-1 flex items-center justify-between">
            <h3 className="text-lg flex-1">Builder</h3>

            <div className="flex items-center space-x-2 mr-4">
              <Switch
                id="preview-mode"
                checked={preview}
                onCheckedChange={setPreview}
              />
              <Label htmlFor="preview-mode">Preview</Label>
            </div>

            <TabsList>
              <TabsTrigger value="designer">Diseñador</TabsTrigger>
              <TabsTrigger value="data">Datos</TabsTrigger>
            </TabsList>
          </div>
          <OpenRightSidebar />
        </header>

        <TabsContent value="designer" className="h-full m-0">
          <div
            ref={ref}
            className={cn(
              "h-full flex relative flex-col border-2 border-dashed px-4",
              preview && "gap-4 py-4",
              isOver && !preview
                ? "border-green-500"
                : "border-zinc-200 dark:border-zinc-800"
            )}
            onClick={() => setSelectedComponent(undefined)}
          >
            <BuilderComponent components={components} />
            {!preview && (
              <DropContainer
                path={components?.length?.toString() ?? "0"}
                isLast
              />
            )}
          </div>
        </TabsContent>
        <TabsContent value="data" className="h-full m-0">
          <div className="h-full border-2 border-zinc-200 dark:border-zinc-800 border-dashed px-4 py-2">
            <pre className="text-xs">{JSON.stringify(components, null, 2)}</pre>
          </div>
        </TabsContent>
      </section>
    </Tabs>
  );
}
