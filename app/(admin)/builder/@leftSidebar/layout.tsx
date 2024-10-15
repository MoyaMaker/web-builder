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
import { useBuilderLayout } from "@/lib/providers/builder-layout-provider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { ResizablePanel } from "@/lib/components/ui/resizable";
import { ScrollArea } from "@/lib/components/ui/scroll-area";
import { ImperativePanelHandle } from "react-resizable-panels";

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

export default function LeftSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const refLeftSidebar = useRef<ImperativePanelHandle>(null);
  const pathname = usePathname();

  const { isOpenLeftSidebar, setOpenLeftSidebar } = useBuilderLayout();

  const sectionActive = useMemo(
    () =>
      pathname === "/builder"
        ? tabsSections[0]
        : tabsSections.find((sec) => pathname.includes(sec.value)),
    [pathname]
  );

  useEffect(() => {
    if (isOpenLeftSidebar) {
      refLeftSidebar.current?.expand();
    } else {
      refLeftSidebar.current?.collapse();
    }
  }, [isOpenLeftSidebar]);

  return (
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
        <aside className="text-sm">
          <header className="h-14 flex items-center gap-2 p-2">
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

            <span>{sectionActive?.name}</span>
          </header>

          <Separator />

          <section className="flex gap-2 p-2">
            {tabsSections.map((tab) => (
              <Tooltip key={tab.name}>
                <TooltipTrigger asChild>
                  <Button
                    variant={
                      sectionActive?.value === tab.value ? "default" : "ghost"
                    }
                    size="icon"
                    asChild
                  >
                    <Link href={`/builder/${tab.value}`}>
                      <tab.icon className="w-4 h-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{tab.name}</TooltipContent>
              </Tooltip>
            ))}
          </section>

          <Separator />

          {children}
        </aside>
      </ScrollArea>
    </ResizablePanel>
  );
}
