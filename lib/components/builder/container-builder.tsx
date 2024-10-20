"use client";
import { BuilderComponent } from "@/app/(admin)/builder/components/builder-component";
import { ContainerType } from "@/lib/schemas/container-schema";
import { DropContainer } from "./drop-container";
import { cn } from "@/lib/utils";
import { useBuilderLayoutStore } from "@/lib/stores/builder-layout-store";

export function ContainerBuilder({
  component,
  path,
}: {
  component: ContainerType;
  path?: string;
}) {
  const { preview } = useBuilderLayoutStore();

  const { children } = component;
  const { columns } = component.attributes;

  return (
    <div
      className={cn(
        !preview && "border border-dashed border-zinc-200 dark:border-zinc-800"
      )}
    >
      <div
        className={cn("relative grid gap-x-4 items-end", preview && "gap-4")}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {!preview && (
          <ContainerGridPreview
            columns={columns}
            childrenLength={children && children.length ? children.length : 0}
          />
        )}
        <BuilderComponent components={children} path={path} />
        {!preview && (
          <DropContainer
            className={cn(
              "h-full",
              children && children.length % columns === 0 && "col-span-full"
            )}
            path={`${path}-${children?.length ?? 0}`}
          />
        )}
      </div>
    </div>
  );
}

const ContainerGridPreview = ({
  columns,
  childrenLength,
}: {
  columns: number;
  childrenLength: number;
}) => {
  const lengthRounded = Math.round(childrenLength / columns);
  const rows =
    childrenLength % columns === 0 ? lengthRounded + 1 : lengthRounded;

  return (
    <div
      className="w-full h-full absolute top-0 left-0 grid pointer-events-none"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gridTemplateRows: Array.from({
          length: rows,
        })
          .map((_, i) => (lengthRounded === i ? "1rem" : "1fr"))
          .join(" "),
      }}
    >
      {Array.from({ length: childrenLength }).map((_, i) => (
        <div
          key={i}
          className="w-full h-full border border-dashed border-zinc-200 dark:border-zinc-800"
        />
      ))}
      <div
        className={cn(
          "w-full h-full border border-dashed border-zinc-200 dark:border-zinc-800",
          childrenLength % columns === 0 && "col-span-full"
        )}
      />
    </div>
  );
};
