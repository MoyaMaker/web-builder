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
  const { columns } = component.attributes;

  return (
    <div className="border border-dashed border-zinc-200 dark:border-zinc-800">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        <BuilderComponent components={children} path={path} />
        <DropContainer
          className={cn(!children?.length && "min-h-6")}
          path={`${path}-${children?.length ?? 0}`}
        />
      </div>
    </div>
  );
}
