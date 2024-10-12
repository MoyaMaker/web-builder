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
  const pathname = usePathname();
  const { setOpenLeftSidebar } = useBuilderLayout();

  return (
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

        <span>
          {tabsSections.find((sec) => pathname.includes(sec.value))?.name}
        </span>
      </header>

      <Separator />

      <section className="flex gap-2 p-2">
        {tabsSections.map((tab) => (
          <Tooltip key={tab.name}>
            <TooltipTrigger asChild>
              <Button
                variant={pathname.includes(tab.value) ? "default" : "ghost"}
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
  );
}
