"use client";
import {
  Layers3Icon,
  LayoutDashboardIcon,
  PanelLeftCloseIcon,
} from "lucide-react";

import { Button } from "@/lib/components/ui/button";
import { Separator } from "@/lib/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/lib/components/ui/tooltip";
import { Tabs, TabsContent } from "@/lib/components/ui/tabs";
import { useBuilderLayout } from "@/lib/providers/builder-layout-provider";

const tabsSections = [
  {
    name: "Paginas",
    value: "pages",
    icon: Layers3Icon,
  },
  {
    name: "Componentes",
    value: "components",
    icon: LayoutDashboardIcon,
  },
];

export default function LeftSidebar() {
  const { sectionActive, setOpenLeftSidebar, setSectionActive } =
    useBuilderLayout();

  return (
    <aside className="text-sm">
      <Tabs value={sectionActive}>
        <header className="h-14 flex items-center p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpenLeftSidebar(false)}
              >
                <PanelLeftCloseIcon className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Minimizar panel</TooltipContent>
          </Tooltip>
        </header>

        <Separator />

        <section className="flex gap-2 p-2">
          {tabsSections.map((tab) => (
            <Tooltip key={tab.name}>
              <TooltipTrigger asChild>
                <Button
                  variant={sectionActive === tab.value ? "default" : "ghost"}
                  size="icon"
                  key={tab.name}
                  onClick={() => setSectionActive(tab.value)}
                >
                  <tab.icon className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">{tab.name}</TooltipContent>
            </Tooltip>
          ))}
        </section>

        <Separator />

        <TabsContent value="pages" className="p-2">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="components" className="p-2">
          Make changes to your account here.
        </TabsContent>
      </Tabs>
    </aside>
  );
}
