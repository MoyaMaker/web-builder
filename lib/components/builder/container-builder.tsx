"use client";
import { BuilderComponent } from "@/app/(admin)/builder/components/builder-component";
import { ContainerType } from "@/lib/schemas/container-schema";
import { DropContainer } from "./drop-container";
import { cn } from "@/lib/utils";

export function ContainerBuilder({
  component,
  path,
}: {
  component: ContainerType;
  path?: string;
}) {
  const { children } = component;

  return (
    <div className="border border-dashed border-zinc-200 dark:border-zinc-800">
      <BuilderComponent
        components={children}
        path={`${path}-${children?.length ?? 0}`}
      />
      <DropContainer
        className={cn(!children?.length && "min-h-6")}
        path={`${path}-${children?.length ?? 0}`}
      />
    </div>
  );
}
